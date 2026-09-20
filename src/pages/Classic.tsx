import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, Asterisk, Send, Sparkles } from "lucide-react";
import { journey, profile, projects } from "../content/profile";
import { ContactBanner, SectionHeading, WorkCard } from "../components/Editorial";
const selected = ["ai-land-deal-engine", "pharmeasy-quick-commerce", "conversational-portfolio"];
const services = [
  { title: "Put AI to work.", description: "From finding the right use cases to helping your teams adopt them.", tag: "AI STRATEGY & ADOPTION", id: "genai-adoption", color: "blue" },
  { title: "Build the better way.", description: "Turn a slow, manual process into a tool your team actually uses.", tag: "TOOLS & AUTOMATION", id: "decision-tools", color: "peach" },
  { title: "Make growth work.", description: "Operating models, unit economics and the messy business of scaling.", tag: "OPERATIONS & P&L", id: "ops-turnaround", color: "green" },
  { title: "Find your next chapter.", description: "A thinking partner for your MBA journey or your next career move.", tag: "CAREER & MBA MENTORING", id: "mentoring", color: "yellow" },
];
export default function Classic() {
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();
  return <div className="editorial-page">
    <section className="hero page-width">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> OPERATOR. BUILDER. ADVISOR.</p>
        <p className="hero-intro">Hi, I’m Chirag.</p>
        <h1>I build businesses.<br />Now I build<br />
          <em>with AI.</em>
          <Asterisk className="hero-asterisk" aria-hidden="true" />
        </h1>
        <p className="hero-description">Thirteen years turning complex problems into businesses that work. Today, bringing that same operator’s instinct to AI.</p>
        <div className="hero-actions">
          <Link className="button button-dark" to="/work">Explore my work <ArrowUpRight size={17} />
          </Link>
          <Link className="text-link" to="/consulting">Work with me <ArrowRight size={17} />
          </Link>
        </div>
        <div className="hero-footnote">
          <span /> Currently leading AI transformation at M3M<br />
          <span className="footnote-indent">IIM Ahmedabad PGPX · Gurgaon, India</span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="photo-backing" />
        <figure className="hero-photo">
          <img src={profile.aboutPhoto} alt="Chirag Doshi travelling in the mountains" width={900} height={1200} fetchPriority="high" />
          <figcaption>A little perspective, away from the spreadsheets.</figcaption>
        </figure>
        <div className="photo-note">
          <span>ALWAYS</span>
          <strong>curious.</strong>
          <svg viewBox="0 0 70 36" aria-hidden="true">
            <path d="M2 4 Q20 38 62 17 M48 14 L65 17 L54 30" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <Link to="/about" className="portrait-stamp">
          <span>MORE THAN<br />A JOB TITLE</span>
          <ArrowUpRight size={23} />
        </Link>
      </div>
    </section>
    <div className="career-ribbon page-width">
      <p>A FEW CHAPTERS<br />
        <span>of the journey so far</span>
      </p>
      <div>{journey.map(c => <Link key={c.name} to="/about#career">
        <span>{c.year}</span>
        <strong>{c.name}</strong>
      </Link>)}</div>
    </div>
    <section className="page-width section-space" id="work">
      <SectionHeading number="01" label="SELECTED WORK" title={<>Ideas are good.<br />
        <em>Making them work is better.</em>
      </>}>
        <Link className="text-link" to="/work">All work & case studies <ArrowUpRight size={17} />
        </Link>
      </SectionHeading>
      <div className="work-grid">{selected.map(slug => <WorkCard key={slug} project={projects.find(p => p.slug === slug)!} />)}</div>
    </section>
    <section className="ask-section">
      <div className="page-width ask-layout">
        <div>
          <p className="eyebrow">
            <Sparkles size={15} /> MEET THE INTERACTIVE SIDE</p>
          <h2>Skip the scrolling.<br />
            <em>Ask a good question.</em>
          </h2>
          <p>Explore my work, the decisions behind it, and how we could work together. This little corner of the internet answers back.</p>
          <Link className="text-link" to="/project/conversational-portfolio">How I built this <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="ask-preview">
          <div className="ask-preview-heading">
            <img src={profile.avatar} width={38} height={38} alt="" />
            <div>
              <strong>Ask about Chirag</strong>
              <span>Grounded in my work & project notes</span>
            </div>
            <span className="status-dot" />
          </div>
          <p>Where would you like to start?</p>
          <div className="ask-prompts">{["What have you built with AI?", "How can you help my business?", "Tell me about your career"].map(q => <Link key={q} to={`/chat?q=${encodeURIComponent(q)}`}>{q}<ArrowUpRight size={16} />
          </Link>)}</div>
          <form onSubmit={e => {
            e.preventDefault(); if (question.trim())
              navigate(`/chat?q=${encodeURIComponent(question.trim())}`);
          }}>
            <label className="sr-only" htmlFor="home-question">Ask about Chirag’s work</label>
            <input id="home-question" maxLength={400} value={question} onChange={e => setQuestion(e.target.value)} placeholder="Or ask your own question…" />
            <button aria-label="Ask your question" disabled={!question.trim()}>
              <Send size={18} />
            </button>
          </form>
          <small>Curated answers and profile search. No sign-up needed.</small>
        </div>
      </div>
    </section>
    <section className="page-width section-space" id="offers">
      <SectionHeading number="02" label="WORK WITH ME" title={<>Big-picture thinking.<br />
        <em>Sleeves-rolled-up help.</em>
      </>}>
        <p className="section-aside">Select advisory work on weekends.<br />Built on experience in the operating seat.</p>
      </SectionHeading>
      <div className="service-grid">{services.map((s, i) => <Link key={s.id} to={`/consulting#${s.id}`} className={`service-card tint-${s.color}`}>
        <span className="service-number">0{i + 1}<ArrowUpRight size={20} />
        </span>
        <h3>{s.title}</h3>
        <p>{s.description}</p>
        <span className="eyebrow">{s.tag}</span>
      </Link>)}</div>
    </section>
    <section className="page-width story-teaser">
      <div className="story-photo">
        <img src={profile.iimaPhoto} alt="Chirag at IIM Ahmedabad with a stack of course books" width={900} height={1200} loading="lazy" />
        <span>THE LEARNING NEVER STOPS.</span>
      </div>
      <div>
        <p className="eyebrow">03 <span>THE PERSON BEHIND THE WORK</span>
        </p>
        <h2>Many chapters.<br />
          <em>One curious mind.</em>
        </h2>
        <p>From dealer networks at General Motors to a founder’s first product. From scaling healthcare businesses to a year back in the classroom at IIM Ahmedabad.</p>
        <p>Today, those experiences come together in how I approach AI: understand the business, build the tool, and make it useful.</p>
        <Link className="text-link" to="/about">A little more about me <ArrowRight size={18} />
        </Link>
      </div>
    </section>
    <section className="page-width lab-invitation">
      <div>
        <p className="eyebrow">FOR THE CURIOUS</p>
        <h3>A few things from the workbench.</h3>
        <p>Small experiments, useful tools and a terminal you can actually type into.</p>
      </div>
      <Link className="button button-outline" to="/lab">Step into the lab <ArrowUpRight size={18} />
      </Link>
      <ArrowDown className="lab-decoration" aria-hidden="true" />
    </section>
    <div className="page-width">
      <ContactBanner />
    </div>
  </div>;
}
