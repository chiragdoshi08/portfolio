// Tiny BM25 retriever over the profile content. Pure TypeScript with no browser
// or Node dependencies so it can run both in the SPA and in the serverless function.

import { achievements, education, offers, profile, projects, roles, skills } from "../content/profile";

export type Chunk = { id: string; title: string; text: string };

const STOP = new Set(
  "a an the and or of to in on at for with by from as is are was were be been being this that these those it its his he him i me my you your we our they them their what which who whom how when where why do does did done can could would should will about tell show give walk through some any more much many into over under than then there here also very just".split(
    " ",
  ),
);

export function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[₹$€£]/g, " ")
    .replace(/[-–—_/]+/g, " ") // hyphenated terms match their parts ("land-deal" → "land deal")
    .replace(/[^a-z0-9+&%.\s]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.\-]+|[.\-]+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map((t) => (t.endsWith("s") && t.length > 4 ? t.slice(0, -1) : t)); // light plural folding
}

export function buildChunks(): Chunk[] {
  const chunks: Chunk[] = [];
  chunks.push({
    id: "bio",
    title: "About Chirag",
    text: `${profile.name}. ${profile.headline}. ${profile.subheadline}. ${profile.summary} ${profile.currently} Based in ${profile.location}. Focus areas: ${profile.focusAreas.join(", ")}.`,
  });
  for (const r of roles) {
    chunks.push({
      id: `role:${r.id}`,
      title: `${r.title} at ${r.company} (${r.start} – ${r.end})`,
      text: `${r.company}. ${r.title}. ${r.location}. ${r.start} to ${r.end}. ${r.summary} ${r.bullets.join(" ")} Also known as: ${r.aliases.join(", ")}.`,
    });
  }
  for (const p of projects) {
    chunks.push({
      id: `project:${p.slug}`,
      title: p.title,
      text: `${p.title}. ${p.tagline}. ${p.company}, ${p.period}. ${p.category}. ${p.summary} Problem: ${p.problem} Approach: ${p.approach.join(" ")} Outcome: ${p.outcome.join(" ")} Metrics: ${p.metrics.map((m) => `${m.label} ${m.value}`).join("; ")}. Also known as: ${p.aliases.join(", ")}.`,
    });
  }
  for (const o of offers) {
    chunks.push({
      id: `offer:${o.id}`,
      title: `How Chirag can help: ${o.title}`,
      text: `${o.title}. For: ${o.who} Includes: ${o.what.join("; ")}. Format: ${o.format}. Proof: ${o.proof} Book via Topmate at ${profile.topmate}. Pricing and availability are on Topmate, not on this site. Also known as: ${o.aliases.join(", ")}.`,
    });
  }
  chunks.push({
    id: "availability",
    title: "Availability and opportunities",
    text: `${profile.openTo} Chirag is based in ${profile.location}.`,
  });
  chunks.push({
    id: "skills",
    title: "Skills",
    text: `Business skills: ${skills.business.join(", ")}. AI skills: ${skills.ai.join(", ")}. Product skills: ${skills.product.join(", ")}. Tools: ${skills.tools.join(", ")}.`,
  });
  chunks.push({
    id: "education",
    title: "Education",
    text: education.map((e) => `${e.degree}, ${e.school}, ${e.years}. ${e.note}.`).join(" "),
  });
  chunks.push({ id: "achievements", title: "Achievements and awards", text: achievements.join(". ") });
  chunks.push({
    id: "contact",
    title: "Contact",
    text: `Email ${profile.email}. LinkedIn ${profile.linkedin}. Location ${profile.location}. There is no CV download; the site itself is the up-to-date profile, and the best next step is a call on Topmate.${profile.showPhone ? ` Phone ${profile.phone}.` : ""}`,
  });
  return chunks;
}

type Index = {
  chunks: Chunk[];
  docTokens: string[][];
  df: Map<string, number>;
  avgLen: number;
};

let cached: Index | null = null;

function index(): Index {
  if (cached) return cached;
  const chunks = buildChunks();
  const docTokens = chunks.map((c) => tokenize(`${c.title} ${c.text}`));
  const df = new Map<string, number>();
  for (const toks of docTokens) for (const t of new Set(toks)) df.set(t, (df.get(t) ?? 0) + 1);
  const avgLen = docTokens.reduce((a, t) => a + t.length, 0) / Math.max(1, docTokens.length);
  cached = { chunks, docTokens, df, avgLen };
  return cached;
}

/** BM25 (k1=1.5, b=0.75). Returns the top-k chunks with a positive score. */
export function retrieve(query: string, k = 4): Array<Chunk & { score: number }> {
  const { chunks, docTokens, df, avgLen } = index();
  const q = tokenize(query);
  if (q.length === 0) return [];
  const N = chunks.length;
  const k1 = 1.5;
  const b = 0.75;
  const scored = chunks.map((c, i) => {
    const toks = docTokens[i];
    const tf = new Map<string, number>();
    for (const t of toks) tf.set(t, (tf.get(t) ?? 0) + 1);
    let score = 0;
    for (const term of q) {
      const f = tf.get(term);
      if (!f) continue;
      const n = df.get(term) ?? 0;
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
      score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * toks.length) / avgLen)));
    }
    return { ...c, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b2) => b2.score - a.score)
    .slice(0, k);
}
