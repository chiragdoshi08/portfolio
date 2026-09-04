import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Composer from "./components/Composer";
import { profile } from "./content/profile";

const TITLES: Record<string, string> = {
  "/": `${profile.name} — ${profile.headline}`,
  "/projects": `Projects — ${profile.name}`,
  "/about": `About — ${profile.name}`,
};

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const t = TITLES[pathname];
    if (t) document.title = t;
  }, [pathname]);

  return (
    <div className="flex h-full min-h-dvh w-full bg-bg text-fg">
      <Sidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main id="main" className="flex-1 pb-36 md:pb-32">
          <Outlet />
        </main>
        <Composer />
      </div>
    </div>
  );
}
