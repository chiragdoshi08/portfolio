// Client-side "scripted RAG": maps a visitor's question to a set of response
// blocks without any network call. Anything that doesn't match falls back to
// the serverless /api/chat endpoint (see src/lib/chat.ts).

import { profile, projects, roles, suggestions } from "../content/profile";
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
  | { type: "resume" }
  | { type: "chips"; items: string[] };

type Intent = {
  id: string;
  /** Multi-word phrases score higher than single keywords. */
  keywords: string[];
  priority: number; // tie-breaker: higher wins
  respond: (q: string) => Block[];
};

const firstName = profile.firstName;

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
    keywords: ["who", "about you", "about chirag", "yourself", "introduce", "introduction", "bio", "background", "summary", "overview", "who are you", "who is chirag", "what do you do"],
    respond: () => [{ type: "bio" }, { type: "chips", items: suggestions.home.slice(1) }],
  },
  {
    id: "current",
    priority: 3,
    keywords: ["currently", "current role", "right now", "these days", "working on", "!m3m", "management office", "ai transformation", "present"],
    respond: () => [
      { type: "text", text: `Right now ${firstName} is Business Transformation Lead in M3M's Management Office, where he leads enterprise GenAI adoption and builds AI decision tools.` },
      { type: "experience", roleIds: ["m3m"] },
      { type: "projects", slugs: ["enterprise-genai-m3m", "ai-land-deal-engine", "ai-voice-agent"], compact: true },
      { type: "chips", items: ["Tell me about the land-deal engine", "What did you do before M3M?", "How can I reach you?"] },
    ],
  },
  {
    id: "ai",
    priority: 2,
    keywords: ["!ai", "!genai", "generative", "!llm", "!claude", "gpt", "machine learning", "ml", "automation", "artificial intelligence", "!ai projects", "!ai work", "agent", "voice agent", "prompt"],
    respond: () => [
      { type: "text", text: `AI runs through most of ${firstName}'s recent work — from AI-backed prescription digitisation at Medtrail to leading enterprise GenAI adoption at M3M. Here are the AI projects:` },
      { type: "projects", slugs: projects.filter((p) => p.category === "AI").map((p) => p.slug) },
      { type: "chips", items: ["How did you roll out Claude at M3M?", "Tell me about the land-deal engine", "What are your key skills?"] },
    ],
  },
  {
    id: "experience",
    priority: 1,
    keywords: ["career", "experience", "work history", "journey", "resume", "cv", "walk me through", "professional", "worked", "companies", "roles", "timeline", "jobs", "employment", "history"],
    respond: () => [
      { type: "text", text: `Here's ${firstName}'s career — 12+ years from after-sales at General Motors to founding a D2C brand, running an ₹80Cr+ monthly P&L, an MBA at IIM Ahmedabad, and now leading AI transformation at M3M.` },
      { type: "experience" },
      { type: "education" },
      { type: "resume" },
      { type: "chips", items: suggestions.about },
    ],
  },
  {
    id: "projects",
    priority: 1,
    keywords: ["projects", "project", "portfolio", "work", "built", "build", "case study", "case studies", "show me", "examples", "achievements at work", "what have you done", "past work", "another project", "other projects", "more projects"],
    respond: () => [
      { type: "text", text: `Here's a gallery of the work ${firstName} has led. Click any card to dive deeper.` },
      { type: "projects" },
      { type: "chips", items: suggestions.projects },
    ],
  },
  {
    id: "side",
    priority: 3,
    keywords: ["!side project", "!side projects", "hobby", "weekend", "personal project", "!flatwalkie", "walkie", "android", "fun"],
    respond: () => [
      { type: "text", text: `Outside work ${firstName} likes building things end to end — here's the latest one.` },
      { type: "projects", slugs: ["flatwalkie"] },
      { type: "chips", items: ["Show me your AI projects", "What are you working on at M3M?"] },
    ],
  },
  {
    id: "skills",
    priority: 2,
    keywords: ["skills", "skill", "strengths", "good at", "expertise", "tools", "toolbox", "stack", "capabilities", "competencies", "what can you do"],
    respond: () => [
      { type: "text", text: `${firstName}'s toolkit sits at the intersection of business, operations and AI:` },
      { type: "skills" },
      { type: "chips", items: ["Show me your AI projects", "Walk me through your career", "How can I reach you?"] },
    ],
  },
  {
    id: "education",
    priority: 2,
    keywords: ["education", "study", "studied", "college", "university", "degree", "mba", "pgpx", "iim", "iima", "ahmedabad", "nit", "vnit", "nagpur", "school", "academic", "scholarship"],
    respond: () => [
      { type: "text", text: `${firstName} did a one-year MBA (PGPX) at IIM Ahmedabad in 2025–26, graduating in the top 5% with the Academic Merit Award and Exit Scholarship, after a B.Tech in Mechanical Engineering from VNIT Nagpur.` },
      { type: "education" },
      { type: "chips", items: ["What are your key skills?", "Walk me through your career"] },
    ],
  },
  {
    id: "achievements",
    priority: 2,
    keywords: ["awards", "award", "achievements", "recognition", "accomplishments", "proud", "highlights", "won", "president's award"],
    respond: () => [{ type: "achievements" }, { type: "chips", items: ["Walk me through your career", "Show me your projects"] }],
  },
  {
    id: "contact",
    priority: 2,
    keywords: ["contact", "reach", "email", "mail", "linkedin", "connect", "hire", "hiring", "get in touch", "talk", "call", "phone", "meet", "coffee", "available", "open to", "opportunities", "where are you", "location", "based", "gurgaon", "city"],
    respond: () => [
      { type: "text", text: `The easiest way is email or LinkedIn — ${firstName} is based in ${profile.location} and open to conversations about strategy, transformation and AI roles.` },
      { type: "contact" },
    ],
  },
  {
    id: "resume",
    priority: 3,
    keywords: ["download resume", "download cv", "pdf", "resume download", "download", "send resume", "copy of your resume"],
    respond: () => [{ type: "resume" }, { type: "chips", items: ["Walk me through your career", "How can I reach you?"] }],
  },
  {
    id: "thanks",
    priority: 0,
    keywords: ["thanks", "thank you", "great", "awesome", "cool", "nice", "ok", "okay", "bye", "goodbye"],
    respond: () => [
      { type: "text", text: "Glad that helped! Anything else you'd like to know?" },
      { type: "chips", items: ["How can I reach you?", "Show me your projects"] },
    ],
  },
];

// Company- and project-specific intents are generated from the content so the
// data file stays the single place to edit.
for (const r of roles) {
  intents.push({
    id: `role:${r.id}`,
    priority: 4,
    keywords: [`!${r.company.toLowerCase()}`, `!${r.company.split(" ")[0].toLowerCase()}`, ...r.aliases],
    respond: () => {
      const related = projects.filter((p) => p.company.toLowerCase().includes(r.company.split(" ")[0].toLowerCase())).map((p) => p.slug);
      const blocks: Block[] = [
        { type: "text", text: `${r.company} — ${r.title}, ${r.start} to ${r.end}. ${r.summary}` },
        { type: "experience", roleIds: [r.id] },
      ];
      if (related.length) blocks.push({ type: "text", text: "Related projects:" }, { type: "projects", slugs: related, compact: true });
      blocks.push({ type: "chips", items: ["Walk me through your career", "Show me your AI projects", "How can I reach you?"] });
      return blocks;
    },
  });
}
for (const p of projects) {
  intents.push({
    id: `project:${p.slug}`,
    priority: 5,
    keywords: [...p.aliases, p.title.toLowerCase()],
    respond: () => [
      { type: "text", text: `${p.title} — ${p.tagline.toLowerCase()}.` },
      { type: "projects", slugs: [p.slug] },
      { type: "text", text: `${p.summary}` },
      { type: "chips", items: suggestions.afterProject },
    ],
  });
}

// Keyword weights: a leading "!" marks a strong topic word (e.g. "!ai", a company
// name) that should outrank generic filler like "show me" or "projects".
const fold = (w: string) => (w.endsWith("s") && w.length > 4 ? w.slice(0, -1) : w);

function scoreIntent(intent: Intent, q: string, qTokens: Set<string>): number {
  let score = 0;
  const seen = new Set<string>();
  for (let kw of intent.keywords) {
    const strong = kw.startsWith("!");
    if (strong) kw = kw.slice(1);
    if (kw.includes(" ")) {
      if (q.includes(kw)) score += strong ? 4 : 3; // exact phrase
    } else {
      const f = fold(kw);
      if (seen.has(f)) continue; // "project" and "projects" count once
      seen.add(f);
      if (qTokens.has(kw) || qTokens.has(f)) score += strong ? 3 : 1;
      else if (kw.length > 5 && q.includes(kw)) score += 0.75; // substring of a longer word
    }
  }
  return score;
}

export type MatchResult = { intentId: string; blocks: Block[]; confidence: number } | null;

/** Returns the best-matching scripted response, or null when the question is unrecognised. */
export function matchIntent(question: string): MatchResult {
  const q = question.toLowerCase().replace(/[-–—_/]+/g, " ").replace(/\s+/g, " ").trim();
  if (!q) return null;
  const qTokens = new Set(tokenize(q).concat(q.replace(/[?!.,]/g, "").split(" ")));
  let best: { intent: Intent; score: number } | null = null;
  for (const intent of intents) {
    const s = scoreIntent(intent, q, qTokens);
    if (s <= 0) continue;
    if (!best || s > best.score || (s === best.score && intent.priority > best.intent.priority)) best = { intent, score: s };
  }
  if (!best) return null;
  // Short questions match on one word; longer ones should share more signal to count as scripted.
  // Long, open-ended questions ("how do you think about…") deserve the AI fallback unless the match is strong.
  const words = q.split(/\s+/).length;
  const minScore = words <= 8 ? 1 : 4;
  if (best.score < minScore) return null;
  return { intentId: best.intent.id, blocks: best.intent.respond(q), confidence: best.score };
}
