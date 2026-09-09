// Client-side "scripted RAG": maps a visitor's question to a set of response
// blocks without any network call. Anything that doesn't match falls back to
// the serverless /api/chat endpoint (see src/lib/chat.ts).
//
// Matching has two stages:
//   1. Structured questions — years ("in 2019"), durations ("how long at X"),
//      ordering ("before PharmEasy", "first job").
//   2. Keyword intents — scored, with "!strong" terms (company names, topic
//      words) required for longer questions so filler like "work" never wins.

import { offers, profile, projects, roles, suggestions, type Role } from "../content/profile";
import { tokenize } from "./retrieval";

export type Block =
  | { type: "text"; text: string }
  | { type: "bio" }
  | { type: "experience"; roleIds?: string[] }
  | { type: "projects"; slugs?: string[]; compact?: boolean }
  | { type: "skills" }
  | { type: "education" }
  | { type: "achievements" }
  | { type: "contact" }
  | { type: "offers"; ids?: string[] }
  | { type: "chips"; items: string[] };

type Intent = {
  id: string;
  /** "!word" marks a strong topic term; multi-word entries are phrases. */
  keywords: string[];
  priority: number; // tie-breaker: higher wins
  respond: (q: string) => Block[];
};

export type MatchResult = { intentId: string; blocks: Block[]; confidence: number } | null;

const firstName = profile.firstName;
const CURRENT_YEAR = new Date().getFullYear();

// ---------------------------------------------------------------------------
// Date helpers — roles carry "Aug 2019" / "Present" strings.
// ---------------------------------------------------------------------------
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function parseDate(s: string): { y: number; m: number } {
  if (/present/i.test(s)) {
    const now = new Date();
    return { y: now.getFullYear(), m: now.getMonth() + 1 };
  }
  const [mon, yr] = s.split(/\s+/);
  return { y: Number(yr), m: MONTHS.indexOf(mon.slice(0, 3).toLowerCase()) + 1 || 1 };
}

function roleSpan(r: Role) {
  return { start: parseDate(r.start), end: parseDate(r.end) };
}

function rolesInYear(year: number): Role[] {
  return roles.filter((r) => {
    const { start, end } = roleSpan(r);
    return start.y <= year && end.y >= year;
  });
}

function monthsBetween(a: { y: number; m: number }, b: { y: number; m: number }) {
  return (b.y - a.y) * 12 + (b.m - a.m);
}

function humanDuration(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} year${y > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} month${m > 1 ? "s" : ""}`);
  return parts.join(" and ") || "under a month";
}

/** Find a role mentioned anywhere in the question (by company or alias). */
function roleInQuestion(q: string): Role | undefined {
  const hits = roles
    .map((r) => {
      const names = [r.company.toLowerCase(), r.company.split(" ")[0].toLowerCase(), ...r.aliases.filter((a) => a.length > 3)];
      const hit = names.find((n) => new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(q));
      return hit ? { r, len: hit.length } : null;
    })
    .filter((x): x is { r: Role; len: number } => Boolean(x))
    .sort((a, b) => b.len - a.len); // prefer the most specific mention
  return hits[0]?.r;
}

const followUps = (extra: string[] = []): Block => ({ type: "chips", items: [...extra, "Walk me through your career", "How can I reach you?"].slice(0, 4) });

// ---------------------------------------------------------------------------
// Stage 1: structured questions
// ---------------------------------------------------------------------------
function structured(q: string): MatchResult {
  // Years: "in 2019", "during 2021", "'19", "2019-2021"
  const yearMatches = [...q.matchAll(/\b(20[0-3]\d)\b|'(\d\d)\b/g)].map((m) => (m[1] ? Number(m[1]) : 2000 + Number(m[2])));
  if (yearMatches.length) {
    const year = yearMatches[0];
    if (year > CURRENT_YEAR) {
      return { intentId: "year:future", confidence: 5, blocks: [{ type: "text", text: `${year} hasn't happened yet — but here's what ${firstName} is doing right now.` }, { type: "experience", roleIds: ["m3m"] }, followUps()] };
    }
    const active = rolesInYear(year);
    if (active.length === 0) {
      const first = roles[roles.length - 1];
      return {
        intentId: "year:none",
        confidence: 5,
        blocks: [
          { type: "text", text: year < parseDate(first.start).y ? `In ${year} ${firstName} was still studying — he did his B.Tech in Mechanical Engineering at VNIT Nagpur (2009–2013) and started his first job at General Motors in Aug 2013.` : `I don't have a role recorded for ${year}.` },
          { type: "education" },
          followUps(),
        ],
      };
    }
    // Education overlaps too (IIMA 2025–26)
    const iima = year >= 2025 && year <= 2026;
    const names = active.map((r) => `${r.company} (${r.title})`).join(" and ");
    return {
      intentId: `year:${year}`,
      confidence: 5,
      blocks: [
        { type: "text", text: `In ${year} ${firstName} was at ${names}${iima ? ", alongside the one-year MBA (PGPX) at IIM Ahmedabad" : ""}.` },
        { type: "experience", roleIds: active.map((r) => r.id) },
        ...(iima ? [{ type: "education" } as Block] : []),
        followUps(active.map((r) => `What did he do at ${r.company}?`)),
      ],
    };
  }

  const mentioned = roleInQuestion(q);

  // Duration: "how long at X", "how many years at X", "tenure"
  if (/\b(how long|how many (years|months)|tenure|duration)\b/.test(q)) {
    if (mentioned) {
      const { start, end } = roleSpan(mentioned);
      const months = monthsBetween(start, end);
      return {
        intentId: `duration:${mentioned.id}`,
        confidence: 5,
        blocks: [
          { type: "text", text: `${firstName} was at ${mentioned.company} for ${humanDuration(months)} — ${mentioned.start} to ${mentioned.end}.` },
          { type: "experience", roleIds: [mentioned.id] },
          followUps(),
        ],
      };
    }
    if (/\b(career|working|experience|total|overall)\b/.test(q)) {
      const first = roles[roles.length - 1];
      const months = monthsBetween(parseDate(first.start), parseDate("Present"));
      return {
        intentId: "duration:career",
        confidence: 5,
        blocks: [{ type: "text", text: `${firstName} has been working for about ${humanDuration(months)} — since ${first.start}, starting at ${first.company}.` }, { type: "experience" }, followUps()],
      };
    }
  }

  // Ordering: "before X", "after X", "prior to X", "next after X"
  const rel = q.match(/\b(before|prior to|after|following|next after)\b/);
  if (rel && mentioned) {
    const idx = roles.findIndex((r) => r.id === mentioned.id); // roles are newest-first
    const before = /before|prior/.test(rel[1]);
    const target = before ? roles[idx + 1] : roles[idx - 1];
    if (!target) {
      return {
        intentId: `order:${mentioned.id}`,
        confidence: 5,
        blocks: [{ type: "text", text: before ? `${mentioned.company} was ${firstName}'s first job after his B.Tech at VNIT Nagpur.` : `${mentioned.company} is ${firstName}'s current role.` }, { type: "experience", roleIds: [mentioned.id] }, followUps()],
      };
    }
    return {
      intentId: `order:${mentioned.id}:${before ? "before" : "after"}`,
      confidence: 5,
      blocks: [
        { type: "text", text: `${before ? "Before" : "After"} ${mentioned.company}, ${firstName} was at ${target.company} as ${target.title} (${target.start} – ${target.end}).` },
        { type: "experience", roleIds: [target.id] },
        followUps([`How long was he at ${target.company}?`]),
      ],
    };
  }

  // First / latest job
  if (/\b(first|earliest|started (his|your) career|begin|beginning)\b/.test(q) && /\b(job|role|company|career|work)/.test(q)) {
    const first = roles[roles.length - 1];
    return { intentId: "order:first", confidence: 5, blocks: [{ type: "text", text: `${firstName}'s first job was at ${first.company} — ${first.title}, ${first.start} to ${first.end}, straight after his B.Tech from VNIT Nagpur.` }, { type: "experience", roleIds: [first.id] }, followUps(["What came after General Motors?"])] };
  }
  if (/\b(latest|most recent|last|newest|current|present)\b/.test(q) && /\b(job|role|company|position|employer)/.test(q)) {
    return { intentId: "order:latest", confidence: 5, blocks: [{ type: "text", text: `${firstName}'s current role is ${roles[0].title} at ${roles[0].company} (since ${roles[0].start}).` }, { type: "experience", roleIds: ["m3m"] }, followUps(["What did he do before M3M?"])] };
  }

  // "Where does he work" / "who does he work for" with no year → current role
  if (/\b(where|who)\b.*\b(work|working|employed|employer)\b/.test(q) && !/\b(before|after|previously|earlier|past)\b/.test(q)) {
    return { intentId: "current:where", confidence: 4, blocks: [{ type: "text", text: `${firstName} works at ${roles[0].company} in ${roles[0].location} as ${roles[0].title}.` }, { type: "experience", roleIds: ["m3m"] }, followUps(["Where did he work before?"])] };
  }
  if (/\b(where|who)\b.*\b(work|working|employed)\b.*\b(before|previously|earlier|past)\b/.test(q) || /\b(previous|past|earlier) (employers|companies|roles|jobs)\b/.test(q)) {
    return { intentId: "experience:past", confidence: 4, blocks: [{ type: "text", text: `Before M3M, ${firstName} spent four years at PharmEasy, and earlier worked at Medtrail, his own startup TOIKIT, OYO Rooms and General Motors.` }, { type: "experience", roleIds: roles.slice(1).map((r) => r.id) }, followUps()] };
  }

  return null;
}

// ---------------------------------------------------------------------------
// Stage 2: keyword intents
// ---------------------------------------------------------------------------
const intents: Intent[] = [
  {
    id: "greeting",
    priority: 0,
    keywords: ["hi", "hello", "hey", "hola", "namaste", "good morning", "good evening", "yo", "sup"],
    respond: () => [
      { type: "text", text: `Hey! I'm ${firstName}'s portfolio assistant. Ask me about his career, the AI work he's doing now, specific companies, or how to reach him.` },
      { type: "chips", items: suggestions.home },
    ],
  },
  {
    id: "bio",
    priority: 1,
    keywords: ["!who are you", "!who is chirag", "!who is he", "!about you", "!about chirag", "!about him", "!yourself", "!introduce", "!introduction", "!bio", "!background", "summary", "overview", "!what do you do", "!what does he do", "!tell me about chirag"],
    respond: () => [{ type: "bio" }, { type: "chips", items: suggestions.home.slice(1) }],
  },
  {
    id: "current",
    priority: 3,
    keywords: ["!currently", "!current role", "!right now", "!these days", "!working on", "!m3m", "!management office", "!ai transformation", "!nowadays", "!at the moment"],
    respond: () => [
      { type: "text", text: `Right now ${firstName} is Business Transformation Lead in M3M's Management Office, where he leads enterprise GenAI adoption and builds AI decision tools.` },
      { type: "experience", roleIds: ["m3m"] },
      { type: "projects", slugs: ["enterprise-genai-m3m", "ai-land-deal-engine", "ai-voice-agent"], compact: true },
      { type: "chips", items: ["Tell me about the land-deal engine", "What did he do before M3M?", "How can I reach you?"] },
    ],
  },
  {
    id: "ai",
    priority: 2,
    keywords: ["!ai", "!genai", "!generative", "!llm", "!llms", "!claude", "!gpt", "!machine learning", "!ml", "!automation", "!artificial intelligence", "!ai projects", "!ai work", "!agents", "!agent", "!voice agent", "!prompt engineering", "!chatgpt"],
    respond: () => [
      { type: "text", text: `AI runs through most of ${firstName}'s recent work — from AI-backed prescription digitisation at Medtrail to leading enterprise GenAI adoption at M3M. Here are the AI projects:` },
      { type: "projects", slugs: projects.filter((p) => p.category === "AI").map((p) => p.slug) },
      { type: "chips", items: ["How did he roll out Claude at M3M?", "Tell me about the land-deal engine", "What are his key skills?"] },
    ],
  },
  {
    id: "experience",
    priority: 1,
    keywords: ["!career", "!experience", "!work history", "!journey", "!resume", "!cv", "!walk me through", "!career path", "!professional background", "!worked", "!companies", "!roles", "!timeline", "!jobs", "!employment", "!employers", "!trajectory", "!career summary"],
    respond: () => [
      { type: "text", text: `Here's ${firstName}'s career — 12+ years from after-sales at General Motors to founding a D2C brand, running an ₹80Cr+ monthly P&L, an MBA at IIM Ahmedabad, and now leading AI transformation at M3M.` },
      { type: "experience" },
      { type: "education" },
      { type: "text", text: "If any of this is relevant to what you're building, the quickest next step is a call." },
      { type: "contact" },
      { type: "chips", items: suggestions.about },
    ],
  },
  {
    id: "projects",
    priority: 1,
    keywords: ["!projects", "!project", "!portfolio", "!case study", "!case studies", "!show me your work", "!show me his work", "!past work", "!what has he built", "!what have you built", "!examples of work", "!another project", "!other projects", "!more projects", "!accomplishments"],
    respond: () => [
      { type: "text", text: `Here's a gallery of the work ${firstName} has led. Click any card to dive deeper.` },
      { type: "projects" },
      { type: "chips", items: suggestions.projects },
    ],
  },
  {
    id: "side",
    priority: 3,
    keywords: ["!side project", "!side projects", "!hobby", "!hobbies", "!weekend", "!personal project", "!flatwalkie", "!walkie", "!android", "!for fun", "!outside work"],
    respond: () => [
      { type: "text", text: `Outside work ${firstName} likes building things end to end — here's the latest one.` },
      { type: "projects", slugs: ["flatwalkie"] },
      { type: "chips", items: ["Show me his AI projects", "What is he working on at M3M?"] },
    ],
  },
  {
    id: "skills",
    priority: 2,
    keywords: ["!skills", "!skill", "!strengths", "!good at", "!expertise", "!tools", "!toolbox", "!tech stack", "!capabilities", "!competencies", "!what can he do", "!what is he good at", "!superpower", "!specialise", "!specialize"],
    respond: () => [
      { type: "text", text: `${firstName}'s toolkit sits at the intersection of business, operations and AI:` },
      { type: "skills" },
      { type: "chips", items: ["Show me his AI projects", "Walk me through his career", "How can I reach you?"] },
    ],
  },
  {
    id: "education",
    priority: 2,
    keywords: ["!education", "!study", "!studied", "!college", "!university", "!degree", "!mba", "!pgpx", "!iim", "!iima", "!ahmedabad", "!nit", "!vnit", "!nagpur", "!school", "!academic", "!scholarship", "!qualification", "!qualifications", "!engineering", "!b.tech", "!btech", "!graduate", "!alma mater"],
    respond: () => [
      { type: "text", text: `${firstName} did a one-year MBA (PGPX) at IIM Ahmedabad in 2025–26, graduating in the top 5% with the Academic Merit Award and Exit Scholarship, after a B.Tech in Mechanical Engineering from VNIT Nagpur (2009–2013).` },
      { type: "education" },
      { type: "chips", items: ["What are his key skills?", "Walk me through his career"] },
    ],
  },
  {
    id: "achievements",
    priority: 2,
    keywords: ["!awards", "!award", "!achievements", "!achievement", "!recognition", "!recognitions", "!proud of", "!highlights", "!honours", "!honors", "!president's award", "!accolades"],
    respond: () => [{ type: "achievements" }, { type: "chips", items: ["Walk me through his career", "Show me his projects"] }],
  },
  {
    id: "offers",
    priority: 3,
    keywords: ["!consult", "!consulting", "!consultancy", "!consultant", "!advisory", "!advise", "!advisor", "!services", "!service", "!offer", "!offers", "!work with you", "!work with him", "!work together", "!help my", "!help us", "!help our", "!help me", "!engage", "!engagement", "!fractional", "!how can you help", "!what do you offer", "!what can you do for", "!topmate", "!book a call", "!book a session", "!book", "!session", "!rates", "!pricing", "!price", "!charges", "!fees", "!cost of", ...offers.flatMap((o) => o.aliases.map((a) => `!${a}`))],
    respond: (q) => {
      const hit = offers.find((o) => o.aliases.some((a) => q.includes(a)));
      const blocks: Block[] = [
        { type: "text", text: hit ? `Yes — that's exactly the kind of work ${firstName} takes on. Here's how it usually runs:` : `${firstName} works with leadership teams and founders in four ways. Pick the one closest to your situation — every one starts with a call on Topmate.` },
        { type: "offers", ids: hit ? [hit.id] : undefined },
        { type: "chips", items: hit ? ["What else do you offer?", "Show me the proof behind this", "How can I reach you?"] : ["Show me your AI projects", "Walk me through your career", "How can I reach you?"] },
      ];
      return blocks;
    },
  },
  {
    id: "open-to",
    priority: 3,
    keywords: ["!open to", "!opportunities", "!opportunity", "!looking for", "!job change", "!new role", "!available for", "!hiring him", "!recruit", "!notice period", "!relocat", "!remote", "!full time", "!full-time", "!join us", "!join our", "!interested in a role", "!considering roles", "!ctc", "!expected salary"],
    respond: () => [{ type: "text", text: profile.openTo }, { type: "contact" }],
  },
  {
    id: "contact",
    priority: 2,
    keywords: ["!contact", "!reach", "!email", "!e-mail", "!mail", "!linkedin", "!connect", "!hire", "!hiring", "!get in touch", "!talk to", "!call", "!phone", "!number", "!meet", "!coffee", "!available", "!where is he based", "!where are you based", "!location", "!based", "!gurgaon", "!which city"],
    respond: () => [
      { type: "text", text: `Easiest is to book a call on Topmate, or drop a note on LinkedIn or email — ${firstName} is based in ${profile.location}.` },
      { type: "contact" },
    ],
  },
  {
    id: "resume",
    priority: 3,
    keywords: ["!download resume", "!download cv", "!download his resume", "!download your resume", "!pdf", "!resume download", "!download", "!send resume", "!copy of your resume", "!copy of his resume", "!latest resume"],
    respond: () => [
      { type: "text", text: `There's no PDF to download — this site *is* ${firstName}'s CV, kept current. Everything a resume would tell you is here: career, projects with numbers, education. And unlike a PDF, you can ask it questions — or just talk to him.` },
      { type: "experience" },
      { type: "contact" },
      { type: "chips", items: ["Walk me through his career", "How can you help my company?", "How do I book a call?"] },
    ],
  },
  {
    id: "thanks",
    priority: 0,
    keywords: ["thanks", "thank you", "great", "awesome", "cool", "nice", "ok", "okay", "bye", "goodbye", "perfect"],
    respond: () => [
      { type: "text", text: "Glad that helped! Anything else you'd like to know?" },
      { type: "chips", items: ["How can I reach you?", "Show me his projects"] },
    ],
  },
];

// Company- and project-specific intents are generated from the content so the
// data file stays the single place to edit. Company names and project aliases are strong.
for (const r of roles) {
  intents.push({
    id: `role:${r.id}`,
    priority: 4,
    keywords: [`!${r.company.toLowerCase()}`, `!${r.company.split(" ")[0].toLowerCase()}`, ...r.aliases.map((a) => (a.length > 4 ? `!${a}` : a))],
    respond: () => {
      const related = projects.filter((p) => p.company.toLowerCase().includes(r.company.split(" ")[0].toLowerCase())).map((p) => p.slug);
      const blocks: Block[] = [
        { type: "text", text: `${r.company} — ${r.title}, ${r.start} to ${r.end}. ${r.summary}` },
        { type: "experience", roleIds: [r.id] },
      ];
      if (related.length) blocks.push({ type: "text", text: "Related projects:" }, { type: "projects", slugs: related, compact: true });
      blocks.push({ type: "chips", items: [`How long was he at ${r.company}?`, `What did he do before ${r.company}?`, "How can I reach you?"] });
      return blocks;
    },
  });
}
for (const p of projects) {
  intents.push({
    id: `project:${p.slug}`,
    priority: 5,
    keywords: [...p.aliases.map((a) => `!${a}`), `!${p.title.toLowerCase()}`],
    respond: () => [
      { type: "text", text: `${p.title} — ${p.tagline.toLowerCase()}.` },
      { type: "projects", slugs: [p.slug] },
      { type: "text", text: `${p.summary}` },
      { type: "chips", items: suggestions.afterProject },
    ],
  });
}

const fold = (w: string) => (w.endsWith("s") && w.length > 4 ? w.slice(0, -1) : w);
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function scoreIntent(intent: Intent, q: string, qTokens: Set<string>): { score: number; strong: boolean } {
  let score = 0;
  let strong = false;
  const seen = new Set<string>();
  for (let kw of intent.keywords) {
    const isStrong = kw.startsWith("!");
    if (isStrong) kw = kw.slice(1);
    if (kw.includes(" ")) {
      if (new RegExp(`\\b${esc(kw)}`).test(q)) {
        score += isStrong ? 4 : 3;
        strong ||= isStrong;
      }
    } else {
      const f = fold(kw);
      if (seen.has(f)) continue; // "project" and "projects" count once
      seen.add(f);
      if (qTokens.has(kw) || qTokens.has(f)) {
        score += isStrong ? 3 : 1;
        strong ||= isStrong;
      } else if (kw.length > 5 && q.includes(kw)) {
        score += isStrong ? 2 : 0.75; // prefix of a longer word, e.g. "relocat" in "relocating"
        strong ||= isStrong;
      }
    }
  }
  return { score, strong };
}

/** Returns the best-matching scripted response, or null when the question is unrecognised. */
export function matchIntent(question: string): MatchResult {
  const q = question
    .toLowerCase()
    .replace(/[-–—_/]+/g, " ")
    .replace(/[?!.,;:"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!q) return null;

  // Opinions, motivations and hypotheticals need a real answer, not a card — leave them to the AI.
  const OPEN_ENDED =
    /\b(why|how (do|does|did|would|should) (you|he|chirag) (think|approach|handle|deal|feel|see|decide|manage|lead)|what (do|does|would) (you|he|chirag) think|opinion|philosophy|advice|would (you|he|chirag)|should (he|you|chirag)|salary|compensation|expectation|weakness|leave|left|quit|fired|regret|lesson|learn)\b/;
  if (OPEN_ENDED.test(q) && !/^(hi|hello|hey|thanks)/.test(q)) return null;

  const s = structured(q);
  if (s) return s;

  const qTokens = new Set(tokenize(q).concat(q.split(" ")));
  let best: { intent: Intent; score: number; strong: boolean } | null = null;
  for (const intent of intents) {
    const { score, strong } = scoreIntent(intent, q, qTokens);
    if (score <= 0) continue;
    if (!best || score > best.score || (score === best.score && intent.priority > best.intent.priority)) best = { intent, score, strong };
  }
  if (!best) return null;

  // Short inputs may match on a single generic word ("awards", "thanks"). Anything
  // longer must hit a strong, specific term — otherwise let the AI fallback handle it.
  const words = q.split(" ").length;
  const ok = words <= 3 ? best.score >= 1 : best.strong && best.score >= (words > 10 ? 4 : 2);
  if (!ok) return null;
  return { intentId: best.intent.id, blocks: best.intent.respond(q), confidence: best.score };
}
