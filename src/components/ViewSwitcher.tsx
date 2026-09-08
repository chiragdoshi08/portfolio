import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LayoutTemplate, MessageSquare, TerminalSquare, X } from "lucide-react";
import { MODES, modeForPath, rememberMode, type Mode } from "../lib/modes";

const ICONS: Record<Mode, typeof LayoutTemplate> = { classic: LayoutTemplate, chat: MessageSquare, desktop: TerminalSquare };
const HINT_KEY = "switcher-hint-seen";

/** Segmented control: same content, three interfaces. Shows a one-time hint on first entry. */
export default function ViewSwitcher() {
  const { pathname } = useLocation();
  const active = modeForPath(pathname);
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

  return (
    <div className="relative">
      <nav aria-label="View mode" className="flex items-center rounded-lg border border-line bg-surface p-0.5">
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
              className={`inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors ${
                isActive ? "bg-fg text-bg" : "text-muted hover:bg-surface-2 hover:text-fg"
              }`}
            >
              <Icon size={14} aria-hidden="true" />
              <span className="hidden sm:inline">{m.label}</span>
              <span className="sr-only sm:hidden">{m.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {hint && current && (
        <div
          role="status"
          className="absolute right-0 top-full z-40 mt-3 w-64 rounded-xl border border-line bg-fg p-3 text-xs leading-5 text-bg shadow-card"
        >
          <span aria-hidden="true" className="absolute -top-1.5 right-6 h-3 w-3 rotate-45 border-l border-t border-line bg-fg" />
          <p>
            <span className="font-semibold">You're in {current.label} view.</span> These tabs switch to {others[0]} or {others[1]} at any time — same content, different interface.
          </p>
          <button type="button" onClick={dismiss} className="mt-2 inline-flex items-center gap-1 rounded-md bg-bg/15 px-2 py-1 font-medium hover:bg-bg/25">
            <X size={12} aria-hidden="true" /> Got it
          </button>
        </div>
      )}
    </div>
  );
}
