import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { projects } from "../content/profile";
import { WorkCard, ContactBanner } from "../components/Editorial";
const filters = ["All", "AI", "Growth", "Operations", "Product", "Entrepreneurship", "Side project"];
export default function Projects() {
  const [params, setParams] = useSearchParams();
  const category = filters.includes(params.get("category") ?? "") ? params.get("category")! : "All";
  const query = params.get("q") ?? "";
  function update(key: string, value: string) {
    const next = new URLSearchParams(params); if (value && value !== "All")
      next.set(key, value);
    else
      next.delete(key); setParams(next, { replace: true });
  }
  const filtered = projects.filter(p => (category === "All" || p.category === category) && `${p.title} ${p.company} ${p.tagline} ${p.aliases.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="page-width">
    <header className="page-intro">
      <p className="eyebrow">THE WORK / CASE STUDIES & BUILDS</p>
      <h1>From the operating seat.<br />
        <em>And the workbench.</em>
      </h1>
      <p>Business launches, operational turnarounds and tools built with AI. The problems, the decisions and the results behind the work.</p>
    </header>
    <div className="work-controls">
      <div className="filter-list" role="group" aria-label="Filter projects by category">{filters.map(f => <button key={f} aria-pressed={category === f} onClick={() => update("category", f)}>{f === "Side project" ? "Experiments" : f}</button>)}</div>
      <label className="work-search">
        <Search size={17} />
        <span className="sr-only">Search projects</span>
        <input value={query} onChange={e => update("q", e.target.value)} placeholder="Find a project…" />
      </label>
    </div>
    <p className="result-count" role="status">{filtered.length} {filtered.length === 1 ? "story" : "stories"} to explore</p>
    <div className="work-grid work-all">{filtered.map(p => <WorkCard key={p.slug} project={p} />)}</div>{!filtered.length && <div className="empty-state">
      <h2>No projects match that search.</h2>
      <p>Try a company, a topic, or start again.</p>
      <button className="button button-dark" onClick={() => setParams({})}>Show all projects</button>
    </div>}<ContactBanner />
  </div>;
}
