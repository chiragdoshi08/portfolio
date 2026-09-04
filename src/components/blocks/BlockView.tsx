import type { ReactNode } from "react";
import type { Block } from "../../lib/intents";
import type { ThreadKey } from "../../store/chat";
import BioCard from "./BioCard";
import ExperienceTimeline from "./ExperienceTimeline";
import ProjectGrid from "./ProjectGrid";
import SkillsCloud from "./SkillsCloud";
import EducationList from "./EducationList";
import AchievementsList from "./AchievementsList";
import ContactCard from "./ContactCard";
import ResumeCard from "./ResumeCard";
import OffersGrid from "./OffersGrid";
import SuggestionChips from "./SuggestionChips";

export function Bubble({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl rounded-tl-md bg-surface px-4 py-3 text-[15px] leading-6 shadow-card">{children}</div>;
}

export default function BlockView({ block, threadKey }: { block: Block; threadKey: ThreadKey }) {
  switch (block.type) {
    case "text":
      return (
        <Bubble>
          <p className="whitespace-pre-line">{block.text}</p>
        </Bubble>
      );
    case "bio":
      return <BioCard />;
    case "experience":
      return <ExperienceTimeline roleIds={block.roleIds} />;
    case "projects":
      return <ProjectGrid slugs={block.slugs} compact={block.compact} />;
    case "skills":
      return <SkillsCloud />;
    case "education":
      return <EducationList />;
    case "achievements":
      return <AchievementsList />;
    case "contact":
      return <ContactCard />;
    case "resume":
      return <ResumeCard />;
    case "offers":
      return <OffersGrid ids={block.ids} />;
    case "chips":
      return <SuggestionChips items={block.items} threadKey={threadKey} />;
    default:
      return null;
  }
}
