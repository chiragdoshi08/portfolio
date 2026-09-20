import { matchIntent, type Block } from "./intents";
import { retrieve, type Chunk } from "./retrieval";
import { profile, projects, suggestions } from "../content/profile";

export type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; blocks: Block[]; pending?: boolean; source?: "scripted" | "ai" | "fallback" };
export const uid = () => Math.random().toString(36).slice(2, 10);

/** Render every indexed content type, including services, availability and story. */
export function fallbackBlocks(hits: Chunk[]): Block[] {
  const blocks: Block[] = [];
  if (hits.length) {
    blocks.push({ type: "text", text: "Here are the closest matches in Chirag’s profile and project notes:" });
    for (const h of hits) {
      if (h.id.startsWith("project:")) blocks.push({ type: "projects", slugs: [h.id.slice(8)], compact: true });
      else if (h.id.startsWith("role:")) blocks.push({ type: "experience", roleIds: [h.id.slice(5)] });
      else if (h.id.startsWith("offer:")) blocks.push({ type: "offers", ids: [h.id.slice(6)] });
      else if (h.id === "availability") blocks.push({ type: "text", text: profile.openTo });
      else if (["skills", "education", "contact", "bio", "achievements"].includes(h.id)) blocks.push({ type: h.id } as Block);
      else blocks.push({ type: "text", text: h.text });
    }
  } else {
    blocks.push({ type: "text", text: "I can answer questions about Chirag’s work, background and how to reach him. I don’t have information on that topic. Try one of these:" });
  }
  blocks.push({ type: "chips", items: suggestions.home });
  return blocks;
}

/** Scripted answers → optional server API → free, local profile retrieval. */
export async function answer(question: string): Promise<{ blocks: Block[]; source: "scripted" | "ai" | "fallback" }> {
  const scripted = matchIntent(question);
  if (scripted) return { blocks: scripted.blocks, source: "scripted" };
  // GitHub Pages cannot run the API. No failed request or timeout on the default deployment.
  if (import.meta.env.VITE_ENABLE_AI_FALLBACK === "true") {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ question }), signal: ctrl.signal });
      if (res.ok) {
        const data = await res.json() as { answer?: unknown; related?: unknown };
        if (typeof data.answer === "string" && data.answer.trim()) {
          const blocks: Block[] = [{ type: "text", text: data.answer }];
          const related = Array.isArray(data.related) ? data.related.filter((s): s is string => typeof s === "string" && projects.some(p => p.slug === s)) : [];
          if (related.length) blocks.push({ type: "projects", slugs: related, compact: true });
          blocks.push({ type: "chips", items: suggestions.home.slice(0, 3) });
          return { blocks, source: "ai" };
        }
      }
    } catch { /* Network errors use the local knowledge base. */ }
    finally { clearTimeout(timer); }
  }
  return { blocks: fallbackBlocks(retrieve(question, 3)), source: "fallback" };
}
