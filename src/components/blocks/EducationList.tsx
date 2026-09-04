import { GraduationCap } from "lucide-react";
import { education } from "../../content/profile";

export default function EducationList() {
  return (
    <ul className="divide-y divide-line rounded-2xl rounded-tl-md bg-surface shadow-card">
      {education.map((e) => (
        <li key={e.degree} className="flex gap-3 p-4">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <GraduationCap size={16} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-5">{e.school}</p>
            <p className="text-sm text-fg/85">{e.degree}</p>
            <p className="text-xs text-muted">{e.years}</p>
            <p className="mt-1 text-sm text-muted">{e.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
