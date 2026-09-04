import { NavLink, useLocation } from "react-router-dom";
import { LayoutTemplate, MessageSquare, AppWindow } from "lucide-react";
import { MODES, modeForPath, rememberMode, type Mode } from "../lib/modes";

const ICONS: Record<Mode, typeof LayoutTemplate> = { classic: LayoutTemplate, chat: MessageSquare, desktop: AppWindow };

/** Segmented control: same content, three interfaces. */
export default function ViewSwitcher() {
  const { pathname } = useLocation();
  const active = modeForPath(pathname);
  return (
    <nav aria-label="View mode" className="flex items-center rounded-lg border border-line bg-surface p-0.5">
      {MODES.map((m) => {
        const Icon = ICONS[m.id];
        const isActive = m.id === active;
        return (
          <NavLink
            key={m.id}
            to={m.path}
            onClick={() => rememberMode(m.id)}
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
  );
}
