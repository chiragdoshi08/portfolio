import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "../../content/profile";

const CATEGORY_STYLE: Record<Project["category"], string> = {
  AI: "bg-accent-soft text-accent",
  Growth: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  Operations: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
  Product: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200",
  Entrepreneurship: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
  "Side project": "bg-surface-2 text-muted",
};

export function CategoryBadge({ category }: { category: Project["category"] }) {
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${CATEGORY_STYLE[category]}`}>{category}</span>;
}

export default function ProjectGrid({ slugs, compact }: { slugs?: string[]; compact?: boolean }) {
  const list = slugs ? slugs.map((s) => projects.find((p) => p.slug === s)).filter((p): p is Project => Boolean(p)) : projects;
  if (list.length === 0) return null;
  return (
    <ul className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
      {list.map((p) => (
        <li key={p.slug}>
          <Link
            to={`/project/${p.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-4 shadow-card transition-[transform,border-color] hover:-translate-y-0.5 hover:border-fg/30"
          >
            <div className="flex items-start justify-between gap-2">
              <CategoryBadge category={p.category} />
              <ArrowUpRight size={16} aria-hidden="true" className="text-muted transition-colors group-hover:text-fg" />
            </div>
            <h3 className="mt-3 text-[15px] font-semibold leading-5">{p.title}</h3>
            <p className="mt-1 text-sm leading-5 text-muted">{p.tagline}</p>
            <p className="mt-2 text-xs text-muted">
              {p.company} · {p.period}
            </p>
            {!compact && (
              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3">
                {p.metrics.map((m) => (
                  <div key={m.label} className="min-w-0">
                    <dd className={`font-display leading-tight text-accent ${m.value.length > 9 ? "text-sm" : "text-lg"}`}>
                      {m.value}
                    </dd>
                    <dt className="mt-0.5 text-[11px] leading-4 text-muted">{m.label}</dt>
                  </div>
                ))}
              </dl>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
