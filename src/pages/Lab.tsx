import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Terminal, Sparkles, Radio } from "lucide-react";
import { estimateHours } from "../lib/estimator";
export default function Lab() {
  const [minutes, setMinutes] = useState(30);
  const [frequency, setFrequency] = useState(5);
  const [people, setPeople] = useState(10);
  const [reduction, setReduction] = useState(50);
  const result = estimateHours(minutes, frequency, people, reduction);
  const controls = [{ label: "Minutes per task", value: minutes, set: setMinutes, min: 5, max: 120, step: 5 }, { label: "Tasks per person / week", value: frequency, set: setFrequency, min: 1, max: 30, step: 1 }, { label: "People doing the task", value: people, set: setPeople, min: 1, max: 100, step: 1 }, { label: "Assumed time reduction", value: reduction, set: setReduction, min: 0, max: 90, step: 5, suffix: "%" }];
  return <div className="page-width">
    <header className="page-intro">
      <p className="eyebrow">THE LAB / ALWAYS A WORK IN PROGRESS</p>
      <h1>Curiosity,<br />
        <em>with a working prototype.</em>
      </h1>
      <p>A place for small experiments, useful questions and things built to learn. Try something. See what changes.</p>
    </header>
    <section className="estimator" aria-labelledby="estimator-title">
      <div className="estimator-controls">
        <p className="eyebrow">01 / TRY A SMALL EXPERIMENT</p>
        <h2 id="estimator-title">What could your team<br />do with that time back?</h2>
        <p>Pick a recurring task. Change the assumptions to explore the weekly capacity an improved workflow could release.</p>{controls.map((c, i) => <label className="range-field" key={c.label} htmlFor={`estimate-${i}`}>
          <span>{c.label}<strong>{c.value}{c.suffix}</strong>
          </span>
          <input id={`estimate-${i}`} type="range" min={c.min} max={c.max} step={c.step} value={c.value} onChange={e => c.set(Number(e.target.value))} />
        </label>)}</div>
      <div className="estimator-result" aria-live="polite" aria-atomic="true">
        <span className="eyebrow">POTENTIAL TIME RELEASED</span>
        <strong>{result.saved.toLocaleString("en-IN", { maximumFractionDigits: 1 })}<span>hours / week</span>
        </strong>
        <div className="estimate-bars">
          <div>
            <span>Today</span>
            <i style={{ width: "100%" }} />
            <b>{result.baseline.toFixed(1)} h</b>
          </div>
          <div>
            <span>With improvement</span>
            <i style={{ width: `${100 - reduction}%` }} />
            <b>{result.remaining.toFixed(1)} h</b>
          </div>
        </div>
        <p>Illustrative estimate, not a measured result. Assumes the same task volume and applies your chosen time reduction. It excludes setup, review and maintenance time.</p>
        <Link className="button button-light" to="/consulting#decision-tools">Explore your workflow <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
    <div className="lab-cards">
      <article>
        <Sparkles size={27} />
        <span className="eyebrow">LIVE / PROFILE SEARCH</span>
        <h2>A website that answers back.</h2>
        <p>Ask about my experience, projects or services. Curated answers and local retrieval, grounded in the profile.</p>
        <Link className="text-link" to="/chat">Start a conversation <ArrowUpRight size={17} />
        </Link>
      </article>
      <article>
        <Terminal size={27} />
        <span className="eyebrow">LIVE / INTERACTIVE DESKTOP</span>
        <h2>For the command-line curious.</h2>
        <p>Draggable windows, a dock and a terminal. Start with <code>help</code> or <code>projects --tag ai</code>.</p>
        <Link className="text-link" to="/desktop">Open the desktop <ArrowUpRight size={17} />
        </Link>
      </article>
      <article>
        <Radio size={27} />
        <span className="eyebrow">PROTOTYPE / ANDROID + NODE.JS</span>
        <h2>FlatWalkie.</h2>
        <p>A push-to-talk experiment for small groups, using private channels and a WebSocket audio relay.</p>
        <Link className="text-link" to="/project/flatwalkie">Read the build notes <ArrowUpRight size={17} />
        </Link>
      </article>
    </div>
    <div className="lab-note">
      <span>Small tools. Real questions.</span>
      <p>This estimator uses simple arithmetic in your browser. Explore the <Link to="/work?category=AI">AI case studies</Link> for the work involving AI systems.</p>
    </div>
  </div>;
}
