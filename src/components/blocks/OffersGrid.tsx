import { CalendarDays, Check } from "lucide-react";
import { offers, profile, type Offer } from "../../content/profile";

export function topmateUrl(o: Offer) {
  return o.topmatePath ? `${profile.topmate.replace(/\/$/, "")}/${o.topmatePath.replace(/^\//, "")}` : profile.topmate;
}

export default function OffersGrid({ ids, columns = 1 }: { ids?: string[]; columns?: 1 | 2 }) {
  const list = ids ? offers.filter((o) => ids.includes(o.id)) : offers;
  return (
    <ul className={`grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {list.map((o) => (
        <li key={o.id} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-card">
          <h3 className="text-[15px] font-semibold leading-5">{o.title}</h3>
          <p className="mt-1.5 text-sm leading-5 text-muted">{o.who}</p>
          <ul className="mt-3 space-y-1.5">
            {o.what.map((w) => (
              <li key={w} className="flex gap-2 text-sm leading-5">
                <Check size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">
            <span className="font-medium text-fg/80">Format:</span> {o.format}
          </p>
          <p className="mt-1 text-xs text-muted">
            <span className="font-medium text-fg/80">Proof:</span> {o.proof}
          </p>
          <a
            href={topmateUrl(o)}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-fg px-3.5 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            <CalendarDays size={15} aria-hidden="true" /> Book on Topmate
          </a>
        </li>
      ))}
    </ul>
  );
}
