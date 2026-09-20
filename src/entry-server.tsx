/* eslint-disable react/only-export-components -- Build-only server rendering entry point. */
import { renderToString } from "react-dom/server";
import { StaticRouter, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { projects } from "./content/profile";
import { getPageMeta, pageMeta } from "./lib/seo";
function RouteTree() { return useRoutes(routes); }
export function render(path: string) {
  return renderToString(<StaticRouter location={path}>
    <RouteTree />
  </StaticRouter>);
}
export const pages = [...Object.keys(pageMeta), ...projects.map(p => `/project/${p.slug}`), "/classic", "/projects"];
export { getPageMeta };
