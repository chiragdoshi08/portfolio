import { Download, FileText } from "lucide-react";
import { profile } from "../../content/profile";

export default function ResumeCard() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl rounded-tl-md bg-surface p-4 shadow-card">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <FileText size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="text-[15px] font-semibold leading-5">{profile.name} — CV</p>
          <p className="text-xs text-muted">One page · PDF</p>
        </div>
      </div>
      <a
        href={profile.resumeUrl}
        download
        className="inline-flex items-center gap-2 rounded-xl bg-fg px-3.5 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
      >
        <Download size={16} aria-hidden="true" /> Download
      </a>
    </div>
  );
}
