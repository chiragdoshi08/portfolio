import { useChat, type ThreadKey } from "../../store/chat";

export default function SuggestionChips({ items, threadKey }: { items: string[]; threadKey: ThreadKey }) {
  const { ask, busy } = useChat();
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Suggested questions">
      {items.map((q) => (
        <li key={q}>
          <button
            type="button"
            disabled={busy}
            onClick={() => void ask(threadKey, q)}
            className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-fg/90 transition-colors hover:border-fg/40 hover:bg-surface-2 disabled:opacity-50"
          >
            {q}
          </button>
        </li>
      ))}
    </ul>
  );
}
