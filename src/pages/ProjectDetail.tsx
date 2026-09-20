import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { profile, projects } from "../content/profile";
import { ProjectArt } from "../components/Editorial";
import NotFound from "./NotFound";
export default function ProjectDetail() {
  const { slug } = useParams();
  const idx = projects.findIndex(p => p.slug === slug);
  const project = projects[idx];
  if (!project)
    return <NotFound />;
  const next = projects[(idx + 1) % projects.length];
  return <article className="page-width case-page">
    <Link className="text-link" to="/work">
      <ArrowLeft size={15} /> All work & case studies</Link>
    <header className="page-intro">
      <p className="eyebrow">{project.category} / {project.company}</p>
      <h1>{project.title}</h1>
      <p>{project.tagline}</p>
      <div className="case-facts">
        <span>{project.period}</span>
        <span>By {profile.name}</span>
        <span>{project.period.includes("progress") ? "In progress · targets are not outcomes" : project.company === "Side project" ? "Personal prototype" : "Project notes"}</span>
      </div>
    </header>
    <ProjectArt kind={project.slug} />
    <dl className="case-metrics">{project.metrics.map(m => <div key={m.label}>
      <dd>{m.value}</dd>
      <dt>{m.label}</dt>
    </div>)}</dl>
    <div className="case-body">
      <Section title="The short version">
        <p>{project.summary}</p>
      </Section>
      <Section title="The challenge">
        <p>{project.problem}</p>
      </Section>
      <Section title="The work behind it">
        <ul>{project.approach.map(a => <li key={a}>{a}</li>)}</ul>
      </Section>
      <Section title={project.period.includes("progress") ? "Where it stands" : "What changed"}>
        <ul>{project.outcome.map(o => <li key={o}>{o}</li>)}</ul>
      </Section>
    </div>
    <section className="case-question">
      <h2>Want to explore the details?</h2>
      <div>{[`Tell me about ${project.title}`, `What was Chirag’s role at ${project.company}?`].map(q => <Link key={q} to={`/chat?q=${encodeURIComponent(q)}`}>{q} ↗</Link>)}<Link to="/consulting">Discuss a similar challenge <ArrowUpRight size={14} className="inline" />
      </Link>
      </div>
    </section>
    <nav className="case-next" aria-label="Continue exploring">
      <Link to="/work">
        <span>BACK TO THE COLLECTION</span>All work & case studies</Link>
      <Link to={`/project/${next.slug}`}>
        <span>NEXT STORY ↗</span>{next.title}</Link>
    </nav>
  </article>;
}
function Section({ title, children }: {
  title: string;
  children: ReactNode;
}) {
  return <section>
    <h2>{title}</h2>{children}</section>;
}
