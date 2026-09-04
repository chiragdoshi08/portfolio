import { useEffect, type ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircleQuestion } from "lucide-react";
import { profile, projects } from "../content/profile";
import { CategoryBadge } from "../components/blocks/ProjectGrid";

export default function ProjectDetail() {
  const { slug } = useParams();
  const reduce = useReducedMotion();
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];

  useEffect(() => {
    if (project) document.title = `${project.title} — ${profile.name}`;
    window.scrollTo({ top: 0 });
  }, [project]);

  if (!project) return <Navigate to="/projects" replace />;

  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const askUrl = (q: string) => `/?q=${encodeURIComponent(q)}`;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto w-full max-w-3xl px-3 pt-6 sm:px-5"
    >
      <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
        <ArrowLeft size={15} aria-hidden="true" /> All projects
      </Link>

      <header className="mt-5">
        <div className="flex items-center gap-2 text-xs text-muted">
          <CategoryBadge category={project.category} />
          <span>
            {project.company} · {project.period}
          </span>
        </div>
        <h1 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-2 text-lg text-muted">{project.tagline}</p>
      </header>

      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {project.metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-line bg-surface p-4 shadow-card">
            <dd className="font-display text-2xl leading-tight text-accent">{m.value}</dd>
            <dt className="mt-1 text-xs text-muted">{m.label}</dt>
          </div>
        ))}
      </dl>

      <div className="prose-custom mt-8 space-y-8">
        <Section title="TL;DR">
          <p>{project.summary}</p>
        </Section>
        <Section title="The problem">
          <p>{project.problem}</p>
        </Section>
        <Section title="What I did">
          <ul className="list-disc space-y-2 pl-5 marker:text-muted">
            {project.approach.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </Section>
        <Section title="Outcome">
          <ul className="list-disc space-y-2 pl-5 marker:text-muted">
            {project.outcome.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-surface p-4 shadow-card">
        <p className="inline-flex items-center gap-2 text-sm font-medium">
          <MessageCircleQuestion size={16} aria-hidden="true" className="text-accent" /> Ask about this project
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[`What was ${profile.firstName}'s role in "${project.title}"?`, `What did you learn from ${project.title}?`, "How can I reach you?"].map((q) => (
            <Link key={q} to={askUrl(q)} className="rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm hover:bg-surface-2">
              {q}
            </Link>
          ))}
        </div>
      </div>

      <nav aria-label="Other projects" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link to={`/project/${prev.slug}`} className="group rounded-2xl border border-line bg-surface p-4 hover:border-fg/30">
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <ArrowLeft size={13} aria-hidden="true" /> Previous
          </span>
          <span className="mt-1 block text-sm font-medium">{prev.title}</span>
        </Link>
        <Link to={`/project/${next.slug}`} className="group rounded-2xl border border-line bg-surface p-4 text-right hover:border-fg/30">
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            Next <ArrowRight size={13} aria-hidden="true" />
          </span>
          <span className="mt-1 block text-sm font-medium">{next.title}</span>
        </Link>
      </nav>
    </motion.article>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</h2>
      <div className="mt-2 text-[15px] leading-7 text-fg/90">{children}</div>
    </section>
  );
}
