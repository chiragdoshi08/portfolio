import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, Download, Mail, MessageSquare } from "lucide-react";
import { achievements, education, glance, profile, projects, suggestions } from "../content/profile";
import OffersGrid from "../components/blocks/OffersGrid";
import ProjectGrid from "../components/blocks/ProjectGrid";
import ExperienceTimeline from "../components/blocks/ExperienceTimeline";
import SkillsCloud from "../components/blocks/SkillsCloud";
import { LinkedInIcon } from "../components/icons";

const featured = projects.filter((p) => p.featured).map((p) => p.slug);

function Section({ id, eyebrow, title, children, aside }: { id: string; eyebrow: string; title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-t border-line py-14 sm:py-16">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
          <h2 id={`${id}-title`} className="font-display mt-2 text-3xl leading-tight sm:text-4xl">
            {title}
          </h2>
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}

export default function Classic() {
  const reduce = useReducedMotion();
  const fade = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay, ease: "easeOut" as const },
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.p {...fade(0)} className="text-xs font-semibold uppercase tracking-wider text-accent">
            {profile.headline}
          </motion.p>
          <motion.h1 {...fade(0.05)} className="font-display mt-4 text-[2.4rem] leading-[1.05] sm:text-6xl">
            {profile.offerHeadline}
          </motion.h1>
          <motion.p {...fade(0.1)} className="mt-6 max-w-2xl text-lg leading-8 text-fg/85">
            {profile.offerSub}
          </motion.p>
          <motion.div {...fade(0.15)} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={profile.topmate}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90"
            >
              <CalendarDays size={16} aria-hidden="true" /> Book a call
            </a>
            <a href="#offers" className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-medium hover:bg-surface-2">
              How I can help <ArrowRight size={15} aria-hidden="true" />
            </a>
            <Link to="/chat" className="inline-flex h-11 items-center gap-2 px-2 text-sm font-medium text-muted hover:text-fg">
              <MessageSquare size={15} aria-hidden="true" /> or just ask
            </Link>
          </motion.div>
        </div>
        <motion.figure {...fade(0.1)} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <img
            src={profile.aboutPhoto}
            alt={`${profile.name} outdoors`}
            width={900}
            height={1200}
            className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-card ring-1 ring-line"
            loading="eager"
          />
          <figcaption className="absolute bottom-4 left-4 right-4 rounded-2xl border border-line bg-surface/90 p-3 text-sm backdrop-blur">
            <span className="font-semibold">{profile.name}</span>
            <span className="text-muted"> · {profile.location} · currently at M3M, ex-PharmEasy, IIM Ahmedabad PGPX</span>
          </figcaption>
        </motion.figure>
      </section>

      {/* At a glance */}
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-5">
        {glance.map((g) => (
          <div key={g.label} className="bg-surface p-4 sm:p-5">
            <dd className="font-display text-2xl leading-tight text-accent sm:text-3xl">{g.value}</dd>
            <dt className="mt-1 text-xs leading-4 text-muted">{g.label}</dt>
          </div>
        ))}
      </dl>

      <Section id="offers" eyebrow="How I can help" title="Four ways we can work together" aside={<p className="max-w-sm text-sm text-muted">Every engagement starts with a call. Availability and pricing live on Topmate.</p>}>
        <OffersGrid columns={2} />
      </Section>

      <Section
        id="work"
        eyebrow="Selected work"
        title="The proof behind the offers"
        aside={
          <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            All {projects.length} projects <ArrowRight size={14} aria-hidden="true" />
          </Link>
        }
      >
        <ProjectGrid slugs={featured} />
      </Section>

      <Section id="career" eyebrow="Career" title="Twelve years, six chapters" aside={<p className="max-w-sm text-sm text-muted">From after-sales at General Motors to leading AI transformation. Tap a role to expand it.</p>}>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ExperienceTimeline />
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Education</h3>
              <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
                {education.map((e) => (
                  <li key={e.degree} className="p-4">
                    <p className="text-[15px] font-semibold leading-5">{e.school}</p>
                    <p className="text-sm text-fg/85">
                      {e.degree} · {e.years}
                    </p>
                    <p className="mt-1 text-sm text-muted">{e.note}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Recognition</h3>
              <ul className="mt-3 space-y-2 rounded-2xl border border-line bg-surface p-4 text-sm leading-6">
                {achievements.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section id="skills" eyebrow="Toolkit" title="Business, operations and AI — in one head">
        <SkillsCloud />
      </Section>

      <Section id="ask" eyebrow="Prefer a conversation?" title="Ask the site anything about my work" aside={<p className="max-w-sm text-sm text-muted">Same content, answered as cards. Dates, companies, projects — or something I haven't thought of.</p>}>
        <div className="flex flex-wrap gap-2">
          {suggestions.home.map((q) => (
            <Link key={q} to={`/chat?q=${encodeURIComponent(q)}`} className="rounded-full border border-line bg-surface px-4 py-2 text-sm hover:bg-surface-2">
              {q}
            </Link>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Let's talk">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <p className="max-w-xl text-lg leading-8 text-fg/85">
            The fastest way is a call on Topmate. For anything else — a question, an introduction, a note about something I wrote — LinkedIn and email both reach me within a day.
          </p>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <a href={profile.topmate} target="_blank" rel="noreferrer noopener" className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-accent-fg hover:opacity-90">
              <CalendarDays size={16} aria-hidden="true" /> Book a call
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-medium hover:bg-surface-2">
              <LinkedInIcon size={16} aria-hidden="true" /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-medium hover:bg-surface-2">
              <Mail size={16} aria-hidden="true" /> Email
            </a>
            <a href={profile.resumeUrl} download className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-medium hover:bg-surface-2">
              <Download size={16} aria-hidden="true" /> Profile (PDF)
            </a>
          </div>
        </div>
      </Section>

      <footer className="flex flex-col items-start justify-between gap-2 border-t border-line py-8 text-xs text-muted sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p>One profile, three interfaces — switch views in the top bar.</p>
      </footer>
    </div>
  );
}
