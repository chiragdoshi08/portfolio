import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ChatMessage } from "../lib/chat";
import { profile } from "../content/profile";
import BlockView from "./blocks/BlockView";
import { useChat, type ThreadKey } from "../store/chat";

type Props = { messages: ChatMessage[]; threadKey: ThreadKey; heading: string };

export default function ChatThread({ messages, threadKey, heading }: Props) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const bump = useChat((s) => s.bump);
  const seenBump = useRef(bump);

  // Scroll only when the visitor sends something (never on the seeded intro), and
  // anchor their bubble near the top so a long answer reads downward from there.
  useEffect(() => {
    if (bump === seenBump.current) return;
    seenBump.current = bump;
    const bubbles = listRef.current?.querySelectorAll<HTMLElement>("[data-role='user']");
    bubbles?.[bubbles.length - 1]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [bump, reduce]);

  return (
    <section aria-label={heading} className="mx-auto w-full max-w-3xl px-3 pt-6 sm:px-5">
      <h1 className="sr-only">{heading}</h1>
      <ol ref={listRef} className="flex flex-col gap-5" aria-live="polite" aria-relevant="additions">
        {messages.map((m) => (
          <motion.li
            key={m.id}
            data-role={m.role}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={m.role === "user" ? "flex scroll-mt-20 justify-end" : "flex gap-3"}
          >
            {m.role === "user" ? (
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-user-bubble px-4 py-2.5 text-[15px] leading-6 text-user-bubble-fg">{m.text}</p>
            ) : (
              <>
                <img src={profile.avatar} alt="" width={28} height={28} className="mt-1 h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-line" />
                <div className="min-w-0 flex-1 space-y-3">
                  {m.pending ? (
                    <div className="inline-flex items-center gap-1 rounded-2xl rounded-tl-md bg-surface px-4 py-3 shadow-card" aria-label="Typing">
                      <span className="dot h-1.5 w-1.5 rounded-full bg-muted" />
                      <span className="dot h-1.5 w-1.5 rounded-full bg-muted" />
                      <span className="dot h-1.5 w-1.5 rounded-full bg-muted" />
                    </div>
                  ) : (
                    m.blocks.map((b, i) => <BlockView key={i} block={b} threadKey={threadKey} />)
                  )}
                </div>
              </>
            )}
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
