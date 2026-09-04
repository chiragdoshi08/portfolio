import { matchIntent, type Block } from "./intents";
import { retrieve } from "./retrieval";
import { suggestions } from "../content/profile";

export type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; blocks: Block[]; pending?: boolean; source?: "scripted" | "ai" | "fallback" };

export const uid = () => Math.random().toString(36).slice(2, 10);

/**
 * Answer a question. Scripted intents answer instantly with no network.
 * Unmatched questions go to /api/chat (Claude, grounded in the same content);
 * if that isn't configured or fails, we fall back to the best-matching content chunks.
 */
export async function answer(question: string): Promise<{ blocks: Block[]; source: "scripted" | "ai" | "fallback" }> {
  const scripted = matchIntent(question);
  if (scripted) return { blocks: scripted.blocks, source: "scripted" };

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 20_000);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ question }),
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (res.ok) {
      const data = (await res.json()) as { answer: string; related?: string[] };
      const blocks: Block[] = [{ type: "text", text: data.answer }];
      if (data.related?.length) blocks.push({ type: "projects", slugs: data.related, compact: true });
      blocks.push({ type: "chips", items: suggestions.home.slice(0, 3) });
      return { blocks, source: "ai" };
    }
  } catch {
    // fall through to local fallback
  }

  const hits = retrieve(question, 3);
  const blocks: Block[] = [];
  if (hits.length) {
    blocks.push({ type: "text", text: "I don't have a scripted answer for that, but here's the closest thing I know:" });
    const projectSlugs = hits.filter((h) => h.id.startsWith("project:")).map((h) => h.id.replace("project:", ""));
    const roleIds = hits.filter((h) => h.id.startsWith("role:")).map((h) => h.id.replace("role:", ""));
    if (projectSlugs.length) blocks.push({ type: "projects", slugs: projectSlugs, compact: true });
    if (roleIds.length) blocks.push({ type: "experience", roleIds });
    for (const h of hits) {
      if (h.id === "skills") blocks.push({ type: "skills" });
      if (h.id === "education") blocks.push({ type: "education" });
      if (h.id === "contact") blocks.push({ type: "contact" });
      if (h.id === "bio") blocks.push({ type: "bio" });
      if (h.id === "achievements") blocks.push({ type: "achievements" });
    }
  } else {
    blocks.push({ type: "text", text: "I can only answer questions about Chirag's work, background and how to reach him. Try one of these:" });
  }
  blocks.push({ type: "chips", items: suggestions.home });
  return { blocks, source: "fallback" };
}
