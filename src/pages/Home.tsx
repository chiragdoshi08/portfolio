import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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

  return <ChatThread messages={threads.home} threadKey="home" heading={`${profile.name} — ${profile.headline}`} />;
}
