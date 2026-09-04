import { skills } from "../../content/profile";

const groups: Array<{ label: string; items: string[] }> = [
  { label: "Business & P&L", items: skills.business },
  { label: "AI & transformation", items: skills.ai },
  { label: "Product", items: skills.product },
  { label: "Tools", items: skills.tools },
];

export default function SkillsCloud() {
  return (
    <div className="rounded-2xl rounded-tl-md bg-surface p-5 shadow-card">
      <dl className="space-y-4">
        {groups.map((g) => (
          <div key={g.label}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{g.label}</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="rounded-full border border-line bg-bg px-3 py-1 text-sm">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
