// The three ways to browse the same content. Classic is the landing view;
// Chat and Desktop are one click away in the top bar.

export type Mode = "classic" | "chat" | "desktop";

export const MODES: Array<{ id: Mode; label: string; path: string; blurb: string }> = [
  { id: "classic", label: "Classic", path: "/", blurb: "A one-page profile you can scan in 30 seconds." },
  { id: "chat", label: "Chat", path: "/chat", blurb: "Ask questions; get answers as cards." },
  { id: "desktop", label: "Desktop", path: "/desktop", blurb: "Windows, a dock and a working terminal." },
];

const CHAT_PATHS = ["/chat", "/projects", "/about"];

export function modeForPath(pathname: string): Mode {
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
