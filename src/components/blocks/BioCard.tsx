import { MapPin } from "lucide-react";
import { profile } from "../../content/profile";

export default function BioCard() {
  return (
    <article className="overflow-hidden rounded-2xl rounded-tl-md bg-surface shadow-card">
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:p-6">
        <img src={profile.avatar} alt={`Portrait of ${profile.name}`} width={96} height={96} className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-1 ring-line sm:h-24 sm:w-24" />
        <div className="min-w-0">
          <p className="font-display text-2xl leading-tight sm:text-[1.75rem]">{profile.intro}</p>
          <p className="mt-2 text-sm font-medium text-accent">
            {profile.headline} · {profile.subheadline}
          </p>
          <p className="mt-3 text-[15px] leading-6 text-fg/90">{profile.summary}</p>
          <p className="mt-3 text-[15px] leading-6 text-muted">{profile.currently}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2.5 py-1 text-xs text-muted">
              <MapPin size={12} aria-hidden="true" /> {profile.location}
            </span>
            {profile.focusAreas.map((f) => (
              <span key={f} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
