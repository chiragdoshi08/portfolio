import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { LayoutTemplate, MessageSquare, TerminalSquare, X } from "lucide-react";
import { MODES, modeForPath, rememberMode, type Mode } from "../lib/modes";

const ICONS: Record<Mode, typeof LayoutTemplate> = { classic: LayoutTemplate, chat: MessageSquare, desktop: TerminalSquare };
const VERB: Record<Mode, string> = { classic: "Read it", chat: "Ask it", desktop: "Type it" };
const HINT_KEY = "switcher-hint-seen";

/**
 * The centrepiece of the top bar: three labelled tabs with a sliding highlight.
 * `full` stretches it across the row (used on small screens, where it gets its own line).
 */
export default function ViewSwitcher({ full = false }: { full?: boolean }) {
  const { pathname } = useLocation();
  const active = modeForPath(pathname);
  const reduce = useReducedMotion();
  const [hint, setHint] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(HINT_KEY)) setHint(true);
    } catch {
      /* ignore */
    }
  }, []);

  function dismiss() {
    setHint(false);
    try {
      localStorage.setItem(HINT_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  const current = MODES.find((m) => m.id === active);
  const others = MODES.filter((m) => m.id !== active).map((m) => m.label);
  const layoutId = full ? "view-pill-full" : "view-pill";

  return (
    <div className={`relative ${full ? "w-full" : ""}`}>
      <nav
        aria-label="View mode"
        className={`flex items-stretch gap-1 rounded-2xl border border-line bg-surface p-1 shadow-card ${full ? "w-full" : ""}`}
      >
        {MODES.map((m) => {
          const Icon = ICONS[m.id];
          const isActive = m.id === active;
          return (
            <NavLink
              key={m.id}
              to={m.path}
              onClick={() => {
                rememberMode(m.id);
                if (hint) dismiss();
              }}
              aria-current={isActive ? "page" : undefined}
              title={m.blurb}
              className={`relative flex items-center gap-2.5 rounded-xl px-3 py-1.5 transition-colors sm:px-3.5 ${full ? "flex-1 justify-center" : ""} ${
                isActive ? "text-accent-fg" : "text-fg/75 hover:bg-surface-2 hover:text-fg"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl bg-accent shadow-[0_6px_18px_-8px_var(--accent)]"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${isActive ? "bg-accent-fg/20" : "bg-surface-2"}`}>
                <Icon size={15} aria-hidden="true" />
              </span>
              <span className="relative flex flex-col leading-none">
                <span className="text-[13px] font-semibold">{m.label}</span>
                <span className={`mt-0.5 text-[10px] font-medium uppercase tracking-wider ${isActive ? "text-accent-fg/80" : "text-muted"}`}>{VERB[m.id]}</span>
              </span>
            </NavLink>
          );
        })}
      </nav>

      {hint && current && (
        <div role="status" className="absolute left-1/2 top-full z-40 mt-3 w-72 -translate-x-1/2 rounded-xl border border-line bg-fg p-3 text-xs leading-5 text-bg shadow-card">
          <span aria-hidden="true" className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-line bg-fg" />
          <p>
            <span className="font-semibold">You're in {current.label} view.</span> Same profile, three interfaces — switch to {others[0]} or {others[1]} whenever you like.
          </p>
          <button type="button" onClick={dismiss} className="mt-2 inline-flex items-center gap-1 rounded-md bg-bg/15 px-2 py-1 font-medium hover:bg-bg/25">
            <X size={12} aria-hidden="true" /> Got it
          </button>
        </div>
      )}
    </div>
  );
}
