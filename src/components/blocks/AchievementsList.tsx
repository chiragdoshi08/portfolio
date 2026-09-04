import { Trophy } from "lucide-react";
import { achievements } from "../../content/profile";

export default function AchievementsList() {
  return (
    <ul className="space-y-2 rounded-2xl rounded-tl-md bg-surface p-4 shadow-card">
      {achievements.map((a) => (
        <li key={a} className="flex gap-3 text-sm leading-6">
          <Trophy size={16} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
          <span>{a}</span>
        </li>
      ))}
    </ul>
  );
}
