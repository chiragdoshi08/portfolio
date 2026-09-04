import { Mail, MapPin, Download, Phone } from "lucide-react";
import { profile } from "../../content/profile";
import { LinkedInIcon } from "../icons";

const btn = "inline-flex items-center gap-2 rounded-xl border border-line bg-bg px-3.5 py-2 text-sm font-medium transition-colors hover:bg-surface-2";

export default function ContactCard() {
  return (
    <div className="rounded-2xl rounded-tl-md bg-surface p-5 shadow-card">
      <div className="flex flex-wrap gap-2">
        <a href={`mailto:${profile.email}?subject=Hello%20Chirag`} className={`${btn} !bg-accent !text-accent-fg !border-transparent hover:opacity-90`}>
          <Mail size={16} aria-hidden="true" /> {profile.email}
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className={btn}>
          <LinkedInIcon size={16} aria-hidden="true" /> {profile.linkedinHandle}
        </a>
        {profile.showPhone && (
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className={btn}>
            <Phone size={16} aria-hidden="true" /> {profile.phone}
          </a>
        )}
        <a href={profile.resumeUrl} download className={btn}>
          <Download size={16} aria-hidden="true" /> Resume (PDF)
        </a>
      </div>
      <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
        <MapPin size={14} aria-hidden="true" /> {profile.location} · usually replies within a day
      </p>
    </div>
  );
}
