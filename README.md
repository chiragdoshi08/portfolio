# Chirag Doshi — portfolio

One profile, three interfaces — the same content (`src/content/profile.ts`) rendered three ways, switchable from the top bar:

- **Classic** (`/`, default) — editorial one-pager: offer-led hero, at-a-glance stats, "How I can help" with Topmate booking, selected work, career, contact.
- **Chat** (`/chat`, `/projects`, `/about`) — ask questions, get answers as cards.
- **Desktop** (`/desktop`) — draggable windows, a dock, and a working terminal (`help`, `experience pharmeasy`, `projects --tag ai`, or any question) that runs on the same intent engine.

Built with React 19, Vite, Tailwind v4, Framer Motion and Zustand; deploys to Vercel for free. Consulting/mentoring offers live in `offers` in `profile.ts`; set `profile.topmate` (and per-offer `topmatePath`) to your real Topmate URLs.

## How the chat (and terminal) answer questions — near-zero running cost

1. **Scripted intents (free, instant)** — `src/lib/intents.ts` matches the question against keywords/aliases and returns pre-built blocks. This covers ~95% of what visitors ask.
2. **Claude fallback (optional, cents/month)** — unmatched questions POST to `api/chat.ts`, a Vercel function that asks Claude Haiku 4.5, grounded *only* in the site's content (`src/content/profile.ts`). Short outputs, cached system prompt, per-IP + daily rate limits. Requires `ANTHROPIC_API_KEY`.
3. **Local retrieval fallback (free)** — if the API isn't configured or fails, a tiny BM25 index (`src/lib/retrieval.ts`) surfaces the closest matching cards.

## Editing content

Everything the site says lives in **`src/content/profile.ts`** — bio, roles, projects (with slugs, metrics, problem/approach/outcome), skills, education, contact and suggested questions. The chat intents, pages and the AI system prompt all derive from it.

- Add a project → add an entry to `projects` (the `aliases` array is what the chat matches on) and a `<url>` to `public/sitemap.xml`.
- Replace the resume → overwrite `public/resume/chirag-doshi-cv.pdf`.
- Replace photos → `public/images/avatar.jpg` (square) and `about.jpg`.
- Change the domain → search-and-replace `chiragdoshi.in` in `index.html`, `public/sitemap.xml`, `public/robots.txt`, `src/content/profile.ts`.

## Develop

```sh
npm install
npm run dev          # http://localhost:5173  (AI fallback inactive; scripted + local retrieval work)
npx vercel dev       # runs the /api function locally too (needs ANTHROPIC_API_KEY in .env)
npm run build && npm run preview
npm run typecheck    # includes the api/ function
```

## Deploy (Vercel)

1. Push to GitHub, import the repo at vercel.com → framework auto-detects Vite; `vercel.json` adds SPA rewrites and security headers.
2. (Optional) Project → Settings → Environment Variables → `ANTHROPIC_API_KEY`.
3. Add your domain, then update the canonical/OG URLs (see *Editing content*).

## Regenerating the social image

`scripts/og.html` is the template. Render it at 1200×630 with headless Chrome and save to `public/og-image.png` — see the comment at the top of that file.
