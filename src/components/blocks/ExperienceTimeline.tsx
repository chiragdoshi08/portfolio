import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { roles } from "../../content/profile";

export default function ExperienceTimeline({ roleIds }: { roleIds?: string[] }) {
  const list = roleIds ? roles.filter((r) => roleIds.includes(r.id)) : roles;
  const single = list.length === 1;
  return (
    <ol className="rounded-2xl rounded-tl-md bg-surface p-2 shadow-card">
      {list.map((r, i) => (
        <Role key={r.id} {...r} defaultOpen={single || i === 0} last={i === list.length - 1} />
      ))}
    </ol>
  );
}

function Role({
  company,
  title,
  location,
  start,
  end,
  summary,
  bullets,
  defaultOpen,
  last,
}: (typeof roles)[number] & { defaultOpen: boolean; last: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <li className={`relative pl-8 ${last ? "" : "pb-1"}`}>
      {/* timeline rail */}
      <span aria-hidden="true" className={`absolute left-[13px] top-5 h-2.5 w-2.5 rounded-full ${end === "Present" ? "bg-accent" : "bg-line"}`} />
      {!last && <span aria-hidden="true" className="absolute left-[17px] top-9 bottom-0 w-px bg-line" />}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-3 rounded-xl px-3 py-3 text-left hover:bg-surface-2"
      >
        <span className="min-w-0">
          <span className="block text-[15px] font-semibold leading-5">{company}</span>
          <span className="block text-sm text-fg/85">{title}</span>
          <span className="block text-xs text-muted">
            {start} – {end} · {location}
          </span>
        </span>
        <ChevronDown size={16} aria-hidden="true" className={`mt-1 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-3 pb-4">
          <p className="text-sm leading-6 text-fg/90">{summary}</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-6 text-fg/85 marker:text-muted">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
