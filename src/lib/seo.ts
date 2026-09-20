import { profile, projects } from "../content/profile";
import { normalizePath } from "./modes";
export const pageMeta: Record<string, {
  title: string;
  description: string;
}> = {
  "/": { title: "Chirag Doshi — Operator, Builder & AI Advisor", description: "I build businesses. Now I build with AI. Explore Chirag Doshi’s work, career stories and practical advisory services in AI, operations and growth." },
  "/work": { title: "Work & Case Studies — Chirag Doshi", description: "Business launches, operational turnarounds and tools built with AI. Explore the problems, decisions and outcomes behind Chirag Doshi’s work." },
  "/about": { title: "My Story — Chirag Doshi", description: "From General Motors and OYO to healthcare at scale, IIM Ahmedabad and AI transformation at M3M. The person and experience behind the work." },
  "/chat": { title: "Ask About My Work — Chirag Doshi", description: "A profile that answers back. Ask about Chirag Doshi’s career, AI projects, operating experience and consulting services." },
  "/consulting": { title: "Work With Me — Chirag Doshi", description: "Practical advisory conversations about enterprise AI adoption, workflow automation, operations, P&L and MBA or career mentoring. Book on Topmate." },
  "/lab": { title: "The Lab — Chirag Doshi", description: "Try an interactive workflow-time estimator, explore a conversational portfolio and open a working terminal. Small experiments from the workbench." },
  "/desktop": { title: "Interactive Desktop — Chirag Doshi", description: "Explore Chirag Doshi’s profile through draggable windows and a working terminal. One profile, another way to explore." },
};
export function getPageMeta(rawPath: string) {
  let path = normalizePath(rawPath);
  if (path === "/classic")
    path = "/";
  if (path === "/projects")
    path = "/work";
  const project = projects.find(p => path === `/project/${p.slug}`);
  const meta = project ? { title: `${project.title} — ${profile.name}`, description: project.tagline } : pageMeta[path];
  return { ...(meta ?? { title: "Page Not Found — Chirag Doshi", description: "This page could not be found. Explore Chirag’s work, story or interactive profile." }), canonical: profile.siteUrl + path, found: !!meta, type: project ? "article" : "website" };
}
