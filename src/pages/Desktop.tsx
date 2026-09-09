import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, Briefcase, FolderKanban, Terminal as TerminalIcon, CalendarDays, Image as ImageIcon, Sparkles, GraduationCap, Mail, X, Minus, CornerDownLeft } from "lucide-react";
import { glance, offers, profile, projects } from "../content/profile";
import ExperienceTimeline from "../components/blocks/ExperienceTimeline";
import ProjectGrid from "../components/blocks/ProjectGrid";
import OffersGrid from "../components/blocks/OffersGrid";
import SkillsCloud from "../components/blocks/SkillsCloud";
import EducationList from "../components/blocks/EducationList";
import AchievementsList from "../components/blocks/AchievementsList";
import ContactCard from "../components/blocks/ContactCard";
import { useTheme } from "../store/theme";
import { COMMANDS, runCommand, type TermLine } from "../lib/terminal";

type WinId = "readme" | "career" | "projects" | "terminal" | "book" | "skills" | "credentials" | "contact" | "photo";

type WinDef = { id: WinId; title: string; icon: typeof FileText; x: number; y: number; w: number; defaultOpen: boolean };

// Listed in initial z-order (last = on top). Positions are the desktop defaults; users can drag.
const WINDOWS: WinDef[] = [
  { id: "readme", title: "readme.md — start here", icon: FileText, x: 24, y: 24, w: 440, defaultOpen: true },
  { id: "projects", title: "projects/ — what I've led", icon: FolderKanban, x: 500, y: 400, w: 620, defaultOpen: true },
  { id: "terminal", title: `${profile.firstName.toLowerCase()}@portfolio: ~`, icon: TerminalIcon, x: 700, y: 24, w: 520, defaultOpen: true },
  { id: "career", title: "career.log", icon: Briefcase, x: 60, y: 200, w: 560, defaultOpen: false },
  { id: "book", title: "book-a-call — how I can help", icon: CalendarDays, x: 140, y: 100, w: 640, defaultOpen: false },
  { id: "skills", title: "skills.json", icon: Sparkles, x: 220, y: 140, w: 560, defaultOpen: false },
  { id: "credentials", title: "education & recognition", icon: GraduationCap, x: 300, y: 160, w: 520, defaultOpen: false },
  { id: "contact", title: "contact — let's talk", icon: Mail, x: 380, y: 200, w: 520, defaultOpen: false },
  { id: "photo", title: "IMG_2026.jpg", icon: ImageIcon, x: 760, y: 120, w: 340, defaultOpen: false },
];

export default function Desktop() {
  const [open, setOpen] = useState<WinId[]>(() => WINDOWS.filter((w) => w.defaultOpen).map((w) => w.id)); // order = z-order (last on top)
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 900);
  const areaRef = useRef<HTMLDivElement>(null); // windows are confined to this area, which ends above the dock
  const navigate = useNavigate();
  const { toggle } = useTheme();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const focus = useCallback((id: WinId) => setOpen((o) => [...o.filter((x) => x !== id), id]), []);
  const close = useCallback((id: WinId) => setOpen((o) => o.filter((x) => x !== id)), []);
  const toggleWin = useCallback((id: WinId) => setOpen((o) => (o.includes(id) && o[o.length - 1] === id ? o.filter((x) => x !== id) : [...o.filter((x) => x !== id), id])), []);

  const content: Record<WinId, ReactNode> = useMemo(
    () => ({
      readme: <Readme onOpen={focus} />,
      terminal: <Terminal openWindow={(id) => focus(id as WinId)} toggleTheme={toggle} navigate={navigate} />,
      projects: (
        <div className="p-3">
          <p className="mb-3 text-sm text-muted">All {projects.length} projects — click any card for the full story.</p>
          <ProjectGrid compact />
        </div>
      ),
      career: (
        <div className="p-2">
          <ExperienceTimeline />
        </div>
      ),
      book: (
        <div className="p-3">
          <p className="mb-3 text-sm text-muted">Four ways we can work together. Availability and pricing live on Topmate.</p>
          <OffersGrid columns={2} />
        </div>
      ),
      skills: (
        <div className="p-3">
          <SkillsCloud />
        </div>
      ),
      credentials: (
        <div className="space-y-3 p-3">
          <EducationList />
          <AchievementsList />
        </div>
      ),
      contact: (
        <div className="p-3">
          <ContactCard />
        </div>
      ),
      photo: (
        <figure className="p-2">
          <img src={profile.aboutPhoto} alt={`${profile.name} outdoors`} className="aspect-[3/4] w-full rounded-xl object-cover object-top" width={900} height={1200} loading="lazy" />
          <figcaption className="mt-2 text-xs text-muted">Off duty. {profile.location}-based, travels for mountains.</figcaption>
        </figure>
      ),
    }),
    [focus, navigate, toggle],
  );

  return (
    <div className="desktop-bg relative min-h-[calc(100dvh-4rem)] overflow-hidden">
      <h1 className="sr-only">
        {profile.name} — desktop view
      </h1>

      {isMobile ? (
        // Phones: windows stack as cards — dragging tiny windows on a touch screen is a bad time.
        <div className="mx-auto flex max-w-2xl flex-col gap-4 px-3 py-4 pb-28">
          {WINDOWS.filter((w) => open.includes(w.id)).map((w) => (
            <WindowChrome key={w.id} def={w} onClose={() => close(w.id)} onFocus={() => focus(w.id)}>
              {content[w.id]}
            </WindowChrome>
          ))}
        </div>
      ) : (
        // Desktop: the area stops 6rem above the viewport bottom, leaving the dock its own lane.
        <div ref={areaRef} className="relative h-[calc(100dvh-4rem-6rem)] overflow-hidden">
          {WINDOWS.filter((w) => open.includes(w.id)).map((w) => (
            <motion.div
              key={w.id}
              drag
              dragMomentum={false}
              dragElastic={0}
              dragConstraints={areaRef}
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onPointerDown={() => focus(w.id)}
              style={{
                position: "absolute",
                left: w.x,
                top: w.y,
                width: w.w,
                zIndex: 10 + open.indexOf(w.id),
                // Never taller than the space below the window's top edge — content scrolls inside instead.
                maxHeight: `calc(100dvh - 4rem - 6rem - ${w.y}px)`,
              }}
              className="flex max-w-[calc(100vw-2rem)] flex-col"
            >
              <WindowChrome def={w} onClose={() => close(w.id)} onFocus={() => focus(w.id)} active={open[open.length - 1] === w.id}>
                {content[w.id]}
              </WindowChrome>
            </motion.div>
          ))}
        </div>
      )}

      {/* Dock */}
      <nav aria-label="Windows" className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3">
        <ul className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-2xl border border-line bg-surface/90 p-1.5 shadow-card backdrop-blur sm:gap-1">
          {WINDOWS.map((w) => {
            const Icon = w.icon;
            const isOpen = open.includes(w.id);
            return (
              <li key={w.id} className="relative">
                <button
                  type="button"
                  onClick={() => toggleWin(w.id)}
                  aria-label={`${isOpen ? "Focus or hide" : "Open"} ${w.title}`}
                  aria-pressed={isOpen}
                  title={w.title}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors sm:h-11 sm:w-11 ${isOpen ? "bg-surface-2 text-fg" : "text-fg/70 hover:bg-surface-2"}`}
                >
                  <Icon size={20} aria-hidden="true" />
                </button>
                {isOpen && <span aria-hidden="true" className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />}
              </li>
            );
          })}
          <li className="mx-1 hidden h-6 w-px bg-line sm:block" role="separator" />
          <li className="hidden sm:block">
            <a href={profile.topmate} target="_blank" rel="noreferrer noopener" className="flex h-11 items-center gap-2 rounded-xl bg-accent px-3 text-sm font-medium text-accent-fg hover:opacity-90">
              <CalendarDays size={16} aria-hidden="true" /> <span className="hidden sm:inline">Book a call</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function WindowChrome({ def, children, onClose, onFocus, active }: { def: WinDef; children: ReactNode; onClose: () => void; onFocus: () => void; active?: boolean }) {
  return (
    <section
      aria-label={def.title}
      onFocus={onFocus}
      className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border bg-surface shadow-card ${active ? "border-fg/30" : "border-line"}`}
    >
      <header className="flex h-10 shrink-0 cursor-grab items-center gap-2 border-b border-line bg-surface-2 px-3 active:cursor-grabbing">
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={onClose} aria-label={`Close ${def.title}`} className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57]">
            <X size={8} className="opacity-0 group-hover:opacity-100" aria-hidden="true" />
          </button>
          <button type="button" onClick={onClose} aria-label={`Minimise ${def.title}`} className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e]">
            <Minus size={8} className="opacity-0 group-hover:opacity-100" aria-hidden="true" />
          </button>
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <p className="flex-1 truncate text-center font-mono text-xs text-muted">{def.title}</p>
        <span aria-hidden="true" className="w-12" />
      </header>
      <div className="min-h-0 overflow-auto">{children}</div>
    </section>
  );
}

function Readme({ onOpen }: { onOpen: (id: WinId) => void }) {
  return (
    <div className="p-5">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">welcome to {profile.firstName.toLowerCase()}.desktop</p>
      <h2 className="font-display mt-2 text-2xl leading-tight">{profile.offerHeadline}</h2>
      <p className="mt-3 text-sm leading-6 text-fg/85">{profile.offerSub}</p>
      <ul className="mt-4 space-y-1 font-mono text-xs text-muted">
        <li>› open apps from the dock below</li>
        <li>
          › or type <button type="button" onClick={() => onOpen("terminal")} className="text-accent underline-offset-2 hover:underline">help</button> in the terminal
        </li>
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        <a href={profile.topmate} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-xl bg-accent px-3.5 py-2 text-sm font-medium text-accent-fg hover:opacity-90">
          <CalendarDays size={15} aria-hidden="true" /> Book a call
        </a>
        <button type="button" onClick={() => onOpen("book")} className="rounded-xl border border-line bg-bg px-3.5 py-2 text-sm font-medium hover:bg-surface-2">
          See the {offers.length} offers
        </button>
      </div>
      <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-4">
        {glance.map((g) => (
          <div key={g.label}>
            <dd className="font-display text-xl leading-tight text-accent">{g.value}</dd>
            <dt className="mt-0.5 text-[11px] leading-4 text-muted">{g.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Terminal({ openWindow, toggleTheme, navigate }: { openWindow: (id: string) => void; toggleTheme: () => void; navigate: (to: string) => void }) {
  const [lines, setLines] = useState<TermLine[]>([
    { kind: "muted", text: `Type help to see all commands, or ask a question.` },
    { kind: "muted", text: `e.g. experience pharmeasy · projects --tag ai · where did he work in 2019` },
  ]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const paneRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll the terminal pane only — never the page (on phones the windows stack vertically).
  useEffect(() => {
    const el = paneRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  async function submit() {
    const cmd = value.trim();
    if (!cmd || busy) return;
    setValue("");
    setHistory((h) => [cmd, ...h].slice(0, 50));
    setHIdx(-1);
    setLines((l) => [...l, { kind: "in", text: cmd }]);
    setBusy(true);
    const out = await runCommand(cmd, { openWindow, toggleTheme, navigate, clear: () => setLines([]) });
    setLines((l) => [...l, ...out]);
    setBusy(false);
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      void submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIdx + 1, history.length - 1);
      setHIdx(next);
      setValue(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(hIdx - 1, -1);
      setHIdx(next);
      setValue(next === -1 ? "" : history[next]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.map(([c]) => c.split(" ")[0]).find((c) => c.startsWith(value.toLowerCase()) && c !== value);
      if (match) setValue(match + " ");
    }
  }

  return (
    <div className="flex h-72 flex-col bg-[#0e1116] font-mono text-[12.5px] leading-5 text-[#d5dbe3]" onClick={() => inputRef.current?.focus()}>
      <div ref={paneRef} className="flex-1 overflow-auto p-3">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {l.kind === "in" ? (
              <span>
                <span className="text-[#7ee787]">❯</span> {l.text}
              </span>
            ) : l.kind === "link" ? (
              l.href?.startsWith("/") ? (
                <Link to={l.href} className="text-[#79c0ff] underline-offset-2 hover:underline">
                  {l.text}
                </Link>
              ) : (
                <a href={l.href} target="_blank" rel="noreferrer noopener" className="text-[#79c0ff] underline-offset-2 hover:underline">
                  {l.text}
                </a>
              )
            ) : (
              <span className={l.kind === "muted" ? "text-[#8b949e]" : l.kind === "title" ? "font-semibold text-[#ffa657]" : ""}>{l.text}</span>
            )}
          </div>
        ))}
        {busy && <div className="text-[#8b949e]">…</div>}
      </div>
      <label className="flex items-center gap-2 border-t border-white/10 px-3 py-2">
        <span className="text-[#7ee787]" aria-hidden="true">
          ❯
        </span>
        <span className="sr-only">Terminal command</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          disabled={busy}
          autoComplete="off"
          spellCheck={false}
          placeholder="help"
          className="flex-1 bg-transparent text-[#d5dbe3] placeholder:text-[#8b949e]/60 focus:outline-none"
        />
        <CornerDownLeft size={13} className="text-[#8b949e]" aria-hidden="true" />
      </label>
    </div>
  );
}
