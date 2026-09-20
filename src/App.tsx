import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopBar from "./components/TopBar";
import Composer from "./components/Composer";
import { Footer } from "./components/Editorial";
import { getPageMeta } from "./lib/seo";
import { normalizePath } from "./lib/modes";
export default function App() {
  const { pathname, hash } = useLocation();
  const path = normalizePath(pathname);
  const chat = path === "/chat";
  const desktop = path === "/desktop";
  useEffect(() => {
    const meta = getPageMeta(path);
    document.title = meta.title;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", meta.canonical);
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]'])
      document.querySelector(selector)?.setAttribute("content", meta.description);
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]'])
      document.querySelector(selector)?.setAttribute("content", meta.title);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", meta.canonical);
    document.querySelector('meta[property="og:type"]')?.setAttribute("content", meta.type);
    document.querySelector('meta[name="robots"]')?.setAttribute("content", meta.found ? "index, follow" : "noindex, follow");
    if (hash)
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    else
      window.scrollTo({ top: 0, behavior: "instant" });
  }, [path, hash]);
  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <TopBar />
    <main id="main" tabIndex={-1} className={chat ? "chat-main pb-36" : ""}>
      <Outlet />
    </main>{chat ? <Composer /> : !desktop && <div className="page-width">
      <Footer />
    </div>}</div>;
}
