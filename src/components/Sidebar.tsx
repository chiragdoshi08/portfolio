import { NavLink } from "react-router-dom";
import { Home, FolderKanban, FileText, Mail } from "lucide-react";
import { profile } from "../content/profile";
import { LinkedInIcon } from "./icons";

const nav = [
  { to: "/chat", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/about", label: "About & career", icon: FileText },
];

const social = [
  { href: profile.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
];

const itemClass = ({ isActive }: { isActive: boolean }) =>
  `group relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
    isActive ? "bg-fg text-bg" : "text-fg/70 hover:bg-surface-2 hover:text-fg"
  }`;

function Tooltip({ label }: { label: string }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-md bg-fg px-2 py-1 text-xs font-medium text-bg opacity-0 shadow-card transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
    >
      {label}
    </span>
  );
}

export default function Sidebar() {
  return (
    <nav aria-label="Primary" className="sticky top-0 hidden h-dvh shrink-0 flex-col items-center gap-2 border-r border-line px-3 py-4 md:flex">
      <NavLink to="/" aria-label={`${profile.name} — home`} className="mb-2 block">
        <img src={profile.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-1 ring-line" />
      </NavLink>

      {nav.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} aria-label={label} className={itemClass}>
          <Icon size={20} aria-hidden="true" />
          <Tooltip label={label} />
        </NavLink>
      ))}

      <div className="my-2 h-px w-6 bg-line" role="separator" />

      {social.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
          aria-label={label}
          className="group relative flex h-11 w-11 items-center justify-center rounded-xl text-fg/70 transition-colors hover:bg-surface-2 hover:text-fg"
        >
          <Icon size={20} aria-hidden="true" />
          <Tooltip label={label} />
        </a>
      ))}
    </nav>
  );
}
