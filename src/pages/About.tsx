import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { achievements, education, mottos, profile, storyChapters } from "../content/profile";
import { ContactBanner } from "../components/Editorial";
import ExperienceTimeline from "../components/blocks/ExperienceTimeline";
import SkillsCloud from "../components/blocks/SkillsCloud";
export default function About() {
  return <div className="page-width">
    <header className="page-intro about-intro">
      <div>
        <p className="eyebrow">THE PERSON BEHIND THE WORK</p>
        <h1>A career in chapters.<br />
          <em>A habit of building.</em>
        </h1>
        <p>I’m Chirag. An engineer by education, an operator by experience, and a builder by curiosity.</p>
        <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer noopener">Connect on LinkedIn <ArrowUpRight size={17} />
        </a>
      </div>
      <img src={profile.avatar} alt="Portrait of Chirag Doshi" width={512} height={512} />
    </header>
    <section className="story-chapters" aria-label="My story">{storyChapters.map((c, i) => <article key={c.title}>
      <div>
        <span className="chapter-index">0{i + 1}</span>
        <p className="eyebrow">{c.years}</p>
      </div>
      <div>
        <h2>{c.title}</h2>
        <p>{c.text}</p>
      </div>
    </article>)}</section>
    <section className="motto-section">
      <p className="eyebrow">THREE LINES I COME BACK TO</p>
      <div>{mottos.map(m => <figure key={m.text}>
        <blockquote>“{m.text}”</blockquote>
        <figcaption>{m.source}</figcaption>
      </figure>)}</div>
    </section>
    <section id="career" className="section-space">
      <p className="eyebrow">THE FULL PICTURE</p>
      <h2 className="section-title">Experience, in detail.</h2>
      <div className="career-detail">
        <ExperienceTimeline />
        <aside>
          <img className="career-photo" src={profile.iimaPhoto} alt="Chirag reading at IIM Ahmedabad" width={900} height={1200} loading="lazy" />{education.map(e => <div className="education-note" key={e.school}>
            <span className="eyebrow">{e.years}</span>
            <h3>{e.school}</h3>
            <p>{e.degree}</p>
            <p>{e.note}</p>
          </div>)}</aside>
      </div>
    </section>
    <section className="credentials-section">
      <div>
        <p className="eyebrow">RECOGNITION</p>
        <ul>{achievements.map(a => <li key={a}>{a}</li>)}</ul>
      </div>
      <div>
        <p className="eyebrow">THE TOOLKIT</p>
        <SkillsCloud />
      </div>
    </section>
    <div className="about-cta">
      <p>There’s more detail in the work.</p>
      <Link className="text-link" to="/work">Explore the case studies <ArrowUpRight size={18} />
      </Link>
    </div>
    <ContactBanner />
  </div>;
}
