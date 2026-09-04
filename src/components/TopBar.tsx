import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon, Share2, Check, Mail, Home, FolderKanban, FileText } from "lucide-react";
import { useTheme } from "../store/theme";
import { profile } from "../content/profile";

const mobileNav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/about", label: "About", icon: FileText },
];

const iconBtn =
  "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-fg/80 transition-colors hover:bg-surface-2 hover:text-fg";

export default function TopBar() {
  const { dark, toggle } = useTheme();
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    const data = { title: document.title, text: `${profile.name} — ${profile.headline}`, url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* user cancelled */
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-2 px-3 sm:px-5">
        {/* Mobile-only nav (the rail is hidden below md) */}
        <nav aria-label="Primary" className="flex items-center gap-1 md:hidden">
          <NavLink to="/" aria-label={`${profile.name} — home`} className="mr-1">
            <img src={profile.avatar} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover ring-1 ring-line" />
          </NavLink>
          {mobileNav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              aria-label={label}
              className={({ isActive }) =>
                `inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${isActive ? "bg-fg text-bg" : "text-fg/70 hover:bg-surface-2"}`
              }
            >
              <Icon size={18} aria-hidden="true" />
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:block" />

        <div className="flex items-center gap-2">
          <button type="button" onClick={toggle} className={iconBtn} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} aria-pressed={dark}>
            {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
          <button type="button" onClick={share} className={iconBtn} aria-label={copied ? "Link copied" : "Share this page"}>
            {copied ? <Check size={17} aria-hidden="true" /> : <Share2 size={17} aria-hidden="true" />}
          </button>
          <a
            href={`mailto:${profile.email}?subject=Hello%20Chirag`}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-3.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            <Mail size={16} aria-hidden="true" />
            <span>Get in touch</span>
          </a>
        </div>
      </div>
    </header>
  );
}
