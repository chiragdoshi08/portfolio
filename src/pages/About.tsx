import { useEffect } from "react";
import ChatThread from "../components/ChatThread";
import { assistant, useChat, user } from "../store/chat";
import { profile, suggestions } from "../content/profile";

export default function About() {
  const { threads, seed } = useChat();

  useEffect(() => {
    seed("about", [
      user("Walk me through your career?"),
      assistant([
        { type: "bio" },
        { type: "text", text: "How I work with clients:" },
        { type: "offers" },
        { type: "text", text: "Here's the career in order — most recent first. Tap any role to expand it." },
        { type: "experience" },
        { type: "text", text: "Education:" },
        { type: "education" },
        { type: "text", text: "A few things I'm proud of:" },
        { type: "achievements" },
        { type: "text", text: "Toolkit:" },
        { type: "skills" },
        { type: "text", text: "If any of this is relevant to what you're building, the quickest next step is a call." },
        { type: "contact" },
        { type: "chips", items: suggestions.about },
      ]),
    ]);
  }, [seed]);

  return <ChatThread messages={threads.about} threadKey="about" heading={`About — ${profile.name}`} />;
}
