import { journey, journeyLine } from "../content/profile";

/**
 * The career as one ribbon of chapters. Replaces the old KPI strip: names and
 * years carry the credibility; the hard numbers live inside the project cards.
 */
export default function JourneyStrip({ compact = false, align = "center" }: { compact?: boolean; align?: "center" | "left" }) {
  return (
    <figure className={align === "center" ? "text-center" : ""}>
      {!compact && <figcaption className="font-display text-lg text-fg/85 sm:text-xl">{journeyLine}</figcaption>}
      <ol className={`relative mt-4 flex flex-wrap gap-y-4 ${align === "center" ? "justify-center" : ""} ${compact ? "gap-x-4" : "gap-x-2 sm:gap-x-0"}`}>
        {journey.map((c, i) => {
          const last = i === journey.length - 1;
          return (
            <li key={c.name} className={`relative flex flex-col items-center ${compact ? "min-w-[4.5rem]" : "min-w-[6rem] flex-1 sm:min-w-0"}`}>
              {/* connector */}
              {!compact && !last && <span aria-hidden="true" className="absolute left-1/2 top-[7px] hidden h-px w-full bg-line sm:block" />}
              <span aria-hidden="true" className={`relative z-10 h-3.5 w-3.5 rounded-full border-2 border-bg ${last ? "bg-accent ring-2 ring-accent/30" : "bg-line"}`} />
              <span className={`mt-2 font-mono text-[10px] tracking-wider ${last ? "text-accent" : "text-muted"}`}>{c.year}</span>
              <span className={`mt-0.5 font-semibold leading-tight ${compact ? "text-xs" : "text-sm"} ${last ? "text-accent" : ""}`}>{c.name}</span>
              <span className={`text-muted ${compact ? "text-[10px]" : "text-xs"}`}>{c.note}</span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
