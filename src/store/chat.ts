import { create } from "zustand";
import { answer, uid, type ChatMessage } from "../lib/chat";
import type { Block } from "../lib/intents";

export type ThreadKey = "home" | "projects" | "about";

type ChatState = {
  threads: Record<ThreadKey, ChatMessage[]>;
  busy: boolean;
  /** Increments every time the visitor sends a message — the thread scrolls to it. */
  bump: number;
  seed: (key: ThreadKey, messages: ChatMessage[]) => void;
  ask: (key: ThreadKey, question: string) => Promise<void>;
  reset: (key: ThreadKey) => void;
};

export const assistant = (blocks: Block[], source: ChatMessage["role"] extends "assistant" ? never : "scripted" = "scripted"): ChatMessage => ({
  id: uid(),
  role: "assistant",
  blocks,
  source,
});
export const user = (text: string): ChatMessage => ({ id: uid(), role: "user", text });

export const useChat = create<ChatState>((set, get) => ({
  threads: { home: [], projects: [], about: [] },
  busy: false,
  bump: 0,

  seed: (key, messages) => {
    if (get().threads[key].length > 0) return; // already seeded — keep the visitor's history
    set((s) => ({ threads: { ...s.threads, [key]: messages } }));
  },

  reset: (key) => set((s) => ({ threads: { ...s.threads, [key]: [] } })),

  ask: async (key, question) => {
    const q = question.trim();
    if (!q || get().busy) return;
    const pendingId = uid();
    set((s) => ({
      busy: true,
      bump: s.bump + 1,
      threads: {
        ...s.threads,
        [key]: [...s.threads[key], user(q), { id: pendingId, role: "assistant", blocks: [], pending: true }],
      },
    }));
    // A short beat so scripted answers still feel like a reply rather than a page jump.
    const [result] = await Promise.all([answer(q), new Promise((r) => setTimeout(r, 350))]);
    // Bump again once the answer lands: the page is now long enough to anchor the question at the top.
    set((s) => ({
      busy: false,
      bump: s.bump + 1,
      threads: {
        ...s.threads,
        [key]: s.threads[key].map((m) => (m.id === pendingId ? { id: pendingId, role: "assistant", blocks: result.blocks, source: result.source } : m)),
      },
    }));
  },
}));
