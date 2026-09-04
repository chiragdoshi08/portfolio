import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { useChat, type ThreadKey } from "../store/chat";
import { profile } from "../content/profile";

export function threadForPath(pathname: string): ThreadKey | null {
  if (pathname === "/") return "home";
  if (pathname === "/projects") return "projects";
  if (pathname === "/about") return "about";
  return null;
}

export default function Composer() {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { ask, busy } = useChat();

  // Keyboard shortcut: "/" focuses the composer (unless already typing somewhere)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        ref.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function submit() {
    const q = value.trim();
    if (!q || busy) return;
    setValue("");
    const key = threadForPath(pathname);
    if (key) {
      void ask(key, q);
    } else {
      // On a project page (or 404) the conversation continues on the home thread.
      navigate(`/?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 md:left-[4.25rem]">
      <div className="mx-auto w-full max-w-3xl px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="pointer-events-auto flex items-end gap-2 rounded-2xl border border-line bg-surface p-2 shadow-card"
        >
          <label htmlFor="composer" className="sr-only">
            Ask a question about {profile.firstName}
          </label>
          <textarea
            id="composer"
            ref={ref}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            rows={1}
            maxLength={400}
            placeholder={`Ask anything about ${profile.firstName}'s work…`}
            className="max-h-32 min-h-[2.5rem] flex-1 resize-none bg-transparent px-2 py-2 text-[15px] leading-6 text-fg placeholder:text-muted focus:outline-none"
          />
          <button
            type="submit"
            disabled={!value.trim() || busy}
            aria-label="Send message"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fg text-bg transition-opacity disabled:opacity-30"
          >
            <Send size={17} aria-hidden="true" />
          </button>
        </form>
        <p className="pointer-events-auto mt-1.5 text-center text-[11px] text-muted">
          Answers come from {profile.firstName}'s CV and project notes · press <kbd className="rounded border border-line px-1">/</kbd> to type
        </p>
      </div>
    </div>
  );
}
