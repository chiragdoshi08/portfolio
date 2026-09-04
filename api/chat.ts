// Vercel serverless function: answers free-form questions about Chirag using
// Claude, grounded strictly in the site's own content (a small BM25 retrieval
// over src/content/profile.ts). Designed for near-zero running cost:
//   - only called when the client-side intent matcher has no scripted answer
//   - short, capped outputs (max_tokens 400)
//   - cached system prompt
//   - per-IP and per-instance daily rate limits
// Set ANTHROPIC_API_KEY in the Vercel project to enable. Without it the
// endpoint returns 503 and the site falls back to local retrieval.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import Anthropic from "@anthropic-ai/sdk";
import { profile } from "../src/content/profile";
import { buildChunks, retrieve } from "../src/lib/retrieval";

const MODEL = process.env.CLAUDE_MODEL ?? "claude-haiku-4-5";
const MAX_QUESTION_CHARS = 400;
const PER_IP_LIMIT = 15; // requests per window
const WINDOW_MS = 10 * 60 * 1000;
const DAILY_CAP = Number(process.env.CHAT_DAILY_CAP ?? 300); // per warm instance; hard ceiling on spend

// Best-effort in-memory limits (reset on cold start — fine for a portfolio).
const ipHits = new Map<string, number[]>();
let dayKey = new Date().toISOString().slice(0, 10);
let dayCount = 0;

function rateLimited(ip: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    dayCount = 0;
  }
  if (dayCount >= DAILY_CAP) return true;
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= PER_IP_LIMIT) return true;
  hits.push(now);
  ipHits.set(ip, hits);
  dayCount++;
  return false;
}

// The full knowledge base is small (~8 KB) so we include all of it in the cached
// system prompt and use retrieval only to point the model at the most relevant parts.
const KNOWLEDGE = buildChunks()
  .map((c) => `## ${c.title}\n${c.text}`)
  .join("\n\n");

const SYSTEM = `You are the assistant on ${profile.name}'s personal portfolio website. Visitors are usually recruiters, hiring managers, founders or former colleagues.

Answer questions about ${profile.firstName} using ONLY the knowledge base below. Refer to him in the third person by first name. Be warm, specific and concise: 2–5 sentences, plain text, no markdown headings or bullet lists. Quote concrete numbers from the knowledge base when relevant. If the knowledge base doesn't cover something, say so briefly and suggest what you can answer instead (career, projects, AI work, skills, education, contact). Never invent facts, roles, dates or numbers. Politely decline anything unrelated to ${profile.firstName}'s professional profile.

For contact, point to ${profile.email} and ${profile.linkedin}.

# Knowledge base
${KNOWLEDGE}`;

let client: Anthropic | null = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: "AI chat is not configured" });
  }

  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  if (!question) return res.status(400).json({ error: "Missing question" });
  if (question.length > MAX_QUESTION_CHARS) return res.status(413).json({ error: "Question too long" });

  const ip = (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return res.status(429).json({ error: "Too many requests — please try again in a few minutes." });

  const hits = retrieve(question, 3);
  const focus = hits.length ? `Most relevant sections: ${hits.map((h) => h.title).join("; ")}.` : "";

  client ??= new Anthropic();
  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 400,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: `${focus}\n\nVisitor question: ${question}` }],
    });

    if (response.stop_reason === "refusal") {
      return res.status(200).json({ answer: "I can't help with that one — but I'm happy to talk about Chirag's work, background or how to reach him." });
    }
    const answer = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    const related = hits.filter((h) => h.id.startsWith("project:")).map((h) => h.id.replace("project:", "")).slice(0, 2);
    res.setHeader("cache-control", "no-store");
    return res.status(200).json({ answer, related });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: "The assistant is busy — please try again shortly." });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      return res.status(503).json({ error: "AI chat is misconfigured" });
    }
    console.error("chat error", error);
    return res.status(502).json({ error: "Upstream error" });
  }
}
