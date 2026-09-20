import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { offers, profile } from "../content/profile";
import { topmateUrl } from "../lib/offers";
const matchingProjects = ["enterprise-genai-m3m", "ai-land-deal-engine", "pharmeasy-quick-commerce", "/about"];
export default function Consulting() {
  const [need, setNeed] = useState(offers[0].id);
  const selected = offers.find(o => o.id === need)!;
  return <div className="page-width">
    <header className="page-intro">
      <p className="eyebrow">
        <span className="status-dot" /> SELECT ADVISORY WORK · WEEKENDS</p>
      <h1>Bring a real problem.<br />
        <em>Let’s find a way forward.</em>
      </h1>
      <p>Practical conversations about AI, operations and your next chapter. Drawing on the experience of building businesses and running them.</p>
    </header>
    <section className="service-finder">
      <div>
        <p className="eyebrow">FIND YOUR STARTING POINT</p>
        <h2>What are you working on?</h2>
        <label htmlFor="service-need" className="sr-only">Choose your consulting need</label>
        <select id="service-need" value={need} onChange={e => setNeed(e.target.value)}>{offers.map(o => <option key={o.id} value={o.id}>{o.title}</option>)}</select>
      </div>
      <div aria-live="polite">
        <p className="eyebrow">A GOOD FIRST CONVERSATION</p>
        <h3>{selected.topmateService}</h3>
        <p>{selected.format}</p>
        <a className="text-link" href={topmateUrl(selected)} target="_blank" rel="noreferrer noopener">See availability on Topmate <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
    <div className="consulting-list">{offers.map((o, i) => <article id={o.id} key={o.id} className="consulting-offer">
      <div>
        <span className="chapter-index">0{i + 1}</span>
        <h2>{o.title}</h2>
        <p>{o.who}</p>
        <Link className="text-link" to={matchingProjects[i].startsWith("/") ? matchingProjects[i] : `/project/${matchingProjects[i]}`}>The experience behind it <ArrowRight size={16} />
        </Link>
      </div>
      <div>
        <p className="eyebrow">WHAT WE CAN WORK THROUGH</p>
        <ul>{o.what.map(w => <li key={w}>
          <Check size={17} />{w}</li>)}</ul>
        <p className="offer-format">{o.format}</p>
        <a className="button button-dark" href={topmateUrl(o)} target="_blank" rel="noreferrer noopener">Book a session <ArrowUpRight size={17} />
        </a>
      </div>
    </article>)}</div>
    <section className="consulting-close">
      <h2>Just a quick question?</h2>
      <p>Send a Priority DM. Pricing, availability and booking details are on Topmate.</p>
      <a className="text-link" href={profile.topmateDm} target="_blank" rel="noreferrer noopener">Send a Priority DM <ArrowUpRight size={18} />
      </a>
    </section>
  </div>;
}
