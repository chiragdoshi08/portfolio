// The three ways to browse the same content. Visitors pick one on the landing
// page ("/"); the switcher in the top bar lets them change at any time.

export type Mode = "classic" | "chat" | "desktop";
export type View = Mode | "landing";

export const MODES: Array<{ id: Mode; label: string; path: string; blurb: string; detail: string }> = [
  {
    id: "classic",
    label: "Classic",
    path: "/classic",
    blurb: "A one-page profile you can scan in 30 seconds.",
    detail: "Offers, selected work, career and contact on a single scrolling page. Best if you're in a hurry.",
  },
  {
    id: "chat",
    label: "Chat",
    path: "/chat",
    blurb: "Ask questions; get answers as cards.",
    detail: "Type “where did he work in 2019” or “how can you help my company” and get answers from Chirag's CV.",
  },
  {
    id: "desktop",
    label: "Terminal",
    path: "/desktop",
    blurb: "Windows, a dock and a working terminal.",
    detail: "A desktop with draggable windows and a command line: try `help`, `experience pharmeasy`, `book`.",
  },
];

const CHAT_PATHS = ["/chat", "/projects", "/about"];

/** GitHub Pages serves routes as folders, so direct loads arrive as "/chat/" — normalise that. */
export function normalizePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function modeForPath(rawPath: string): View {
  const pathname = normalizePath(rawPath);
  if (pathname === "/") return "landing";
  if (pathname === "/desktop") return "desktop";
  if (CHAT_PATHS.includes(pathname) || pathname.startsWith("/project/")) return "chat";
  return "classic";
}

export function rememberMode(mode: Mode) {
  try {
    localStorage.setItem("mode", mode);
  } catch {
    /* ignore */
  }
}

export function recallMode(): Mode | null {
  try {
    const m = localStorage.getItem("mode");
    return MODES.some((x) => x.id === m) ? (m as Mode) : null;
  } catch {
    return null;
  }
}
