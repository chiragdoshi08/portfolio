import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../store/theme";
const links = [{ to: "/work", label: "The work" }, { to: "/about", label: "My story" }, { to: "/chat", label: "Ask me" }, { to: "/lab", label: "The lab" }];
export default function TopBar() {
  const { dark, toggle } = useTheme();
  const { pathname } = useLocation();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  return <header className="site-header">
    <div className="page-width header-row">
      <Link className="header-brand" to="/" aria-label="Chirag Doshi — home">
        <img src="/images/avatar.jpg" alt="" width={40} height={40} />
        <span>Chirag Doshi</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(l => <NavLink key={l.to} to={l.to}>{l.label}</NavLink>)}</nav>
      <div className="header-actions">
        <button className="theme-button" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
        <Link className="button button-dark header-book" to="/consulting">Let’s talk <ArrowUpRight size={15} />
        </Link>
        <button className="menu-button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpenPath(open ? null : pathname)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
      </div>
    </div>{open && <nav id="mobile-navigation" className="mobile-nav page-width" aria-label="Mobile navigation">{links.map(l => <NavLink key={l.to} to={l.to} onClick={() => setOpenPath(null)}>{l.label}<ArrowUpRight size={17} />
    </NavLink>)}<Link to="/desktop" onClick={() => setOpenPath(null)}>Try the terminal<ArrowUpRight size={17} />
      </Link>
    </nav>}</header>;
}
