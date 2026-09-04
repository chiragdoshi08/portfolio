import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 pt-16 text-center">
      <p className="font-display text-6xl text-muted">404</p>
      <h1 className="mt-3 text-xl font-semibold">That page doesn't exist</h1>
      <p className="mt-2 text-muted">Head back home, or ask the chat anything about Chirag's work.</p>
      <Link to="/" className="mt-6 inline-flex rounded-xl bg-fg px-4 py-2 text-sm font-medium text-bg">
        Back to home
      </Link>
    </div>
  );
}
