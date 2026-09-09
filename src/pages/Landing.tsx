import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { LayoutTemplate, MessageSquare, TerminalSquare, ArrowRight, CalendarDays } from "lucide-react";
import { MODES, recallMode, rememberMode, type Mode } from "../lib/modes";
import { profile } from "../content/profile";
import JourneyStrip from "../components/JourneyStrip";
import { LinkedInIcon } from "../components/icons";

const ICONS: Record<Mode, typeof LayoutTemplate> = { classic: LayoutTemplate, chat: MessageSquare, desktop: TerminalSquare };

/** First screen: pick how you'd like to browse. Choice is remembered; the top bar lets you switch later. */
export default function Landing() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const last = recallMode();
  const lastMode = MODES.find((m) => m.id === last);

  function choose(mode: Mode) {
    rememberMode(mode);
    navigate(MODES.find((m) => m.id === mode)!.path);
  }

  const fade = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay, ease: "easeOut" as const },
  });

  return (
    <div className="landing-bg flex min-h-dvh flex-col">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-10 sm:px-6">
        <motion.header {...fade(0)} className="flex flex-col items-center text-center">
          <img src={profile.avatar} alt={`Portrait of ${profile.name}`} width={96} height={96} className="h-24 w-24 rounded-full object-cover shadow-card ring-2 ring-surface" />
          <h1 className="font-display mt-5 text-4xl leading-tight sm:text-5xl">{profile.name}</h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-accent">{profile.headline}</p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-fg/85">{profile.offerHeadline}</p>
          <div className="mt-8 w-full max-w-4xl">
            <JourneyStrip />
          </div>
        </motion.header>

        <motion.p {...fade(0.1)} className="mt-12 text-center text-xs font-semibold uppercase tracking-wider text-muted">
          One profile, three ways to read it — how would you like to browse?
        </motion.p>

        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {MODES.map((m, i) => {
            const Icon = ICONS[m.id];
            return (
              <motion.li key={m.id} {...fade(0.15 + i * 0.06)}>
                <button
                  type="button"
                  onClick={() => choose(m.id)}
                  className="group flex h-full w-full flex-col rounded-2xl border border-line bg-surface p-5 text-left shadow-card transition-[transform,border-color] hover:-translate-y-0.5 hover:border-fg/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="mt-4 text-lg font-semibold">{m.label}</span>
                  <span className="mt-1 text-sm text-muted">{m.blurb}</span>
                  <span className="mt-3 flex-1 text-sm leading-6 text-fg/80">{m.detail}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Open {m.label} <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>

        {lastMode && (
          <motion.p {...fade(0.4)} className="mt-6 text-center text-sm text-muted">
            Last time you used{" "}
            <button type="button" onClick={() => choose(lastMode.id)} className="font-medium text-fg underline-offset-2 hover:underline">
              {lastMode.label}
            </button>
            .
          </motion.p>
        )}
      </main>

      <footer className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 pb-8 text-sm text-muted sm:flex-row sm:px-6">
        <p>You can switch views any time from the tabs at the top.</p>
        <div className="flex items-center gap-2">
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3 hover:bg-surface-2">
            <LinkedInIcon size={15} aria-hidden="true" /> LinkedIn
          </a>
          <a href={profile.topmate} target="_blank" rel="noreferrer noopener" className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-3 font-medium text-accent-fg hover:opacity-90">
            <CalendarDays size={15} aria-hidden="true" /> Book a call
          </a>
        </div>
      </footer>
    </div>
  );
}
