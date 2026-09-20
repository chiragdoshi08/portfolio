import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ChatThread from "../components/ChatThread";
import { assistant, useChat } from "../store/chat";
import { profile, suggestions } from "../content/profile";

export default function Home() {
  const { threads, seed, ask } = useChat();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    seed("home", [
      assistant([
        { type: "bio" },
        { type: "text", text: `This site works like a conversation — ask me anything about ${profile.firstName}'s work, or start with one of these:` },
        { type: "chips", items: suggestions.home },
        { type: "text", text: "Or browse a section:" },
        { type: "chips", items: suggestions.sections },
      ]),
    ]);
  }, [seed]);

  // /?q=... lets other pages (and shared links) pre-ask a question.
  useEffect(() => {
    const q = params.get("q");
    if (q) {
      setParams({}, { replace: true });
      void ask("home", q);
    }
  }, [params, setParams, ask]);

  return <><header className="chat-heading"><p className="eyebrow">A PROFILE THAT ANSWERS BACK</p><h2>What would you like to know?</h2><p>Explore the work, the career, or how we could work together.</p><nav className="view-pills" aria-label="Ways to explore"><Link to="/">Read it</Link><Link className="active" aria-current="page" to="/chat">Ask it</Link><Link to="/desktop">Type it</Link></nav></header><ChatThread messages={threads.home} threadKey="home" heading={`${profile.name} — ${profile.headline}`} /></>;
}
