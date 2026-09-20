import type { RouteObject } from "react-router-dom";
import App from "./App";
import Classic from "./pages/Classic";
import Home from "./pages/Home";
import Desktop from "./pages/Desktop";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Lab from "./pages/Lab";
import Consulting from "./pages/Consulting";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Classic /> },
      { path: "classic", element: <Classic /> },
      { path: "chat", element: <Home /> },
      { path: "desktop", element: <Desktop /> },
      { path: "projects", element: <Projects /> },
      { path: "work", element: <Projects /> },
      { path: "lab", element: <Lab /> },
      { path: "consulting", element: <Consulting /> },
      { path: "project/:slug", element: <ProjectDetail /> },
      { path: "about", element: <About /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
