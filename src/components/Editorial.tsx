import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Command, Layers, Sparkles } from "lucide-react";
import { profile, projects, type Project } from "../content/profile";
export function SectionHeading({ number, label, title, children }: {
  number: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return <div className="section-heading">
    <div>
      <p className="eyebrow">
        <span>{number}</span> {label}</p>
      <h2>{title}</h2>
    </div>{children}</div>;
}
export function ProjectArt({ kind }: {
  kind: string;
}) {
  if (kind === "ai-land-deal-engine")
    return <div className="project-art art-land" aria-hidden="true">
      <div className="art-grid" />
      <span className="art-label">FROM COMPLEXITY TO CLARITY</span>
      <div className="land-stack">
        <div />
        <div />
        <div />
      </div>
      <div className="art-stat">
        <span>Evaluation time</span>
        <strong>2 days <ArrowRight size={24} /> &lt;5 min</strong>
      </div>
      <span className="art-corner">01 / DECISION SYSTEMS</span>
    </div>;
  if (kind === "pharmeasy-quick-commerce")
    return <div className="project-art art-commerce" aria-hidden="true">
      <span className="art-label">AN IDEA. NINETEEN STORES.</span>
      <div className="commerce-path">
        <span>PharmEasy</span>
        <div className="path-line">
          <i />
          <i />
          <i />
        </div>
        <span>Instamart</span>
      </div>
      <div className="commerce-number">0 <span>→</span> 1.2<span>Cr</span>
      </div>
      <span className="art-corner">MONTHLY GMV · IN FOUR MONTHS</span>
    </div>;
  if (kind === "conversational-portfolio")
    return <div className="project-art art-chat" aria-hidden="true">
      <span className="art-label">A PROFILE YOU CAN TALK TO</span>
      <div className="mini-chat">
        <span>What does Chirag build?</span>
        <div>
          <Sparkles size={18} />
          <p>Good question.<br />
            <strong>Let’s start with this website.</strong>
          </p>
        </div>
      </div>
      <span className="art-corner">ASK → EXPLORE → CONNECT</span>
    </div>;
  const project = projects.find(p => p.slug === kind);
  const color = project?.category === "Growth" || project?.category === "Entrepreneurship" ? "peach" : project?.category === "Operations" || kind.includes("medtrail") ? "green" : "blue";
  return <div className={`project-art art-generic art-${color}`} aria-hidden="true">
    <span className="art-label">{project?.category === "Side project" ? "FROM THE WORKBENCH" : project?.company.toUpperCase()}</span>
    <div className="metric-art">
      <strong>{project?.metrics[0]?.value}</strong>
      <span>{project?.metrics[0]?.label}</span>
    </div>
    <div className="orbit">
      <Layers size={45} strokeWidth={1} />
      <i />
      <i />
    </div>
    <span className="art-corner">{project?.period.includes("progress") ? "IN BUILD & PILOT" : project?.category === "Side project" ? "PERSONAL PROTOTYPE" : "THE WORK BEHIND THE NUMBERS"}</span>
  </div>;
}
export function WorkCard({ project, illustrated = true }: {
  project: Project;
  illustrated?: boolean;
}) {
  return <Link className="work-card" to={`/project/${project.slug}`}>
    {illustrated && <ProjectArt kind={project.slug} />}
    <div className="work-card-body">
      <div className="card-meta">
        <span>{project.category}</span>
        <span>{project.period.includes("progress") ? "In progress" : project.company}</span>
        <ArrowUpRight size={18} />
      </div>
      <h3>{project.title}</h3>
      <p>{project.tagline}</p>
      <span className="text-link">Read the story <ArrowRight size={16} />
      </span>
    </div>
  </Link>;
}
export function ContactBanner() {
  return <section className="contact-banner">
    <div>
      <p className="eyebrow">A GOOD CONVERSATION IS A GOOD START</p>
      <h2>Something on your mind?<br />
        <em>Let’s work on it.</em>
      </h2>
      <p>An AI idea, an operating challenge, or your next career chapter.</p>
    </div>
    <a className="button button-light" href={profile.topmate} target="_blank" rel="noreferrer noopener">Book a conversation <ArrowUpRight size={18} />
    </a>
  </section>;
}
export function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <Link to="/" className="wordmark">chirag<span>doshi.</span>
      </Link>
      <p>Business sense. Builder’s curiosity.</p>
      <div>
        <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">LinkedIn <ArrowUpRight size={14} />
        </a>
        <a href={`mailto:${profile.email}`}>Email <ArrowUpRight size={14} />
        </a>
        <Link to="/desktop">
          <Command size={14} /> Try the terminal</Link>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} Chirag Doshi · Gurgaon, India</span>
      <Link to="/project/conversational-portfolio">Built with curiosity. And AI. <ArrowUpRight size={12} />
      </Link>
    </div>
  </footer>;
}
