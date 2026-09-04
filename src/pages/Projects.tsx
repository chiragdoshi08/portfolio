import { useEffect } from "react";
import ChatThread from "../components/ChatThread";
import { assistant, useChat, user } from "../store/chat";
import { profile, suggestions } from "../content/profile";

export default function Projects() {
  const { threads, seed } = useChat();

  useEffect(() => {
    seed("projects", [
      user(`Can you walk me through the work ${profile.firstName} has led?`),
      assistant([
        { type: "text", text: "Here's the full gallery — AI transformation, growth launches, P&L turnarounds and a founder chapter. Click any card for the story behind the numbers." },
        { type: "projects" },
        { type: "chips", items: suggestions.projects },
      ]),
    ]);
  }, [seed]);

  return <ChatThread messages={threads.projects} threadKey="projects" heading={`Projects — ${profile.name}`} />;
}
