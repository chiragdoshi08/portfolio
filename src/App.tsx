import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Composer from "./components/Composer";
import { profile } from "./content/profile";
import { modeForPath } from "./lib/modes";

const TITLES: Record<string, string> = {
  "/": `${profile.name} — ${profile.headline}`,
  "/classic": `${profile.name} — ${profile.headline}`,
  "/chat": `Ask ${profile.firstName} — ${profile.name}`,
  "/desktop": `${profile.name} — Desktop`,
  "/projects": `Projects — ${profile.name}`,
  "/about": `About — ${profile.name}`,
};

export default function App() {
  const { pathname } = useLocation();
  const mode = modeForPath(pathname);

  useEffect(() => {
    const t = TITLES[pathname];
    if (t) document.title = t;
  }, [pathname]);

  // The landing page is a full-screen chooser: no top bar or rail until a view is picked.
  if (mode === "landing") {
    return (
      <div className="min-h-dvh w-full bg-bg text-fg">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-dvh w-full bg-bg text-fg">
      {mode === "chat" && <Sidebar />}
      <div className="relative flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main id="main" className={`flex-1 ${mode === "chat" ? "pb-36 md:pb-32" : ""}`}>
          <Outlet />
        </main>
        {mode === "chat" && <Composer />}
      </div>
    </div>
  );
}
