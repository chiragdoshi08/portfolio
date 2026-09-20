# HANDOFF — chiragdoshi.com

## Website redesign — 20 September 2026

A new redesign supersedes the route and implementation notes below. Chirag requested publishing this checkpoint on 20 September 2026 and parking further design work. This is an interim version; resume improvements when requested. The GitHub Pages workflow records deployment status.

- `/` now opens the editorial homepage. `/classic` remains a compatible alias.
- `/work` (also `/projects`) is a searchable case-study collection; `/about` is a narrative plus full career; `/consulting` has service selection and Topmate deep links; `/lab` includes an illustrative workflow-time estimator. `/chat` and `/desktop` remain available.
- Warm ivory/cobalt design, existing real photos, illustrated project cards, responsive navigation and dark mode.
- Both Drive master profiles and both two-page CV Docs were read. Retail GMV corrected to ₹80 lakh, separate from Health Partner Network’s ₹4Cr+. Organisation size updated to 600+ with context for restructuring to approximately 430.
- Chirag reconfirmed **300+ M3M GenAI users** during the redesign. The previously approved M3M title is retained.
- Narrative chapters and mottos are available to local search and terminal. Added this website as a case study. No invented personal anecdotes or testimonials.
- Static-host chat no longer calls an unavailable API. All retrieval chunk types now render. Optional model fallback requires `VITE_ENABLE_AI_FALLBACK=true` on a server-capable host.
- Production build renders full HTML and metadata for every route and generates a sitemap and 404 page. The workflow must not overwrite rendered pages with copies of the homepage.
- Run `npm run typecheck`, `npm test`, `npm run lint`, `npm run build`, and `node scripts/check-build.mjs`. Browser QA covers mobile and desktop, both themes, chat, search, services and calculator.
- Further personal stories, additional photos, testimonials and future articles can be added as material becomes available.

The original handoff is preserved below as historical context.

---

Last updated: 20 September 2026. Written for whoever picks this up next (Chirag, or a future Claude session). Everything below reflects the repo at commit `ca8a3ed`.

---

## 1. Goal

A personal website for Chirag Doshi that does three jobs at once, in this order of visibility:

1. **Self-branding.** Move Chirag's public identity from "strategy and operations leader" to "operator who builds with AI". The site itself is meant to be the first exhibit: an AI question-answering engine over his own profile, shipped by him.
2. **Selling consultancy.** Route founders, CXOs and MBA aspirants to his Topmate services. Booking is the primary call to action everywhere.
3. **Attracting recruiters, without looking like a job seeker.** The career arc, P&L scale and current role are all present; the site never says "open to work". The chat answers that question with an open-door line (`profile.openTo`).

Audiences, in the words we use: *a founder or CXO*, *a recruiter or hiring leader*, *a peer or reader*.

Reference sites Chirag liked: ankurwarikoo.com (primary inspiration), sahilbloom.com, andrewng.org, huyenchip.com, brittanychiang.com, apurvnagpal.com. Sites reviewed for lessons: gurek.work, infinitigrid.com.

---

## 2. What is live

- **URL:** https://chiragdoshi.com (GitHub Pages, HTTPS enforced, custom domain set in Pages settings).
- **Repo:** https://github.com/chiragdoshi08/portfolio (public). Deploys automatically on every push to `main`.
- **DNS:** domain at Hostinger; A records → GitHub Pages IPs, `www` CNAME → `chiragdoshi08.github.io`. Done 8 Sep 2026.
- **Current live structure:** `/` is a *landing chooser* offering three views. Classic at `/classic`, Chat at `/chat`, Terminal (desktop) at `/desktop`. Also `/projects`, `/project/:slug`, `/about` (the About page is currently a chat-seeded thread, not the narrative page proposed below).

**Two local commits are not yet pushed** (as of this writing): the CV-aligned content (`5834fcd`) and the new Classic hero (`ca8a3ed`). The live site still shows the previous hero. Push with `git push` when Chirag is happy with the hero.

---

## 3. Approved decisions

These were stated or confirmed by Chirag. Do not reopen without asking him.

**Positioning and tone**
- Positioning: *operator who advises*. Currently at M3M, takes select advisory work on weekends (Topmate tagline is "Weekend Consultant").
- Never explicit about job-seeking. "Open to opportunities?" is answered with `profile.openTo`.
- No prices on the site; Topmate shows them.
- Build with AI positioning is the direction; consulting and recruiter appeal follow from it rather than leading.

**Content facts**
- Latest CV is the source of truth: `~/Desktop/Chirag Doshi Profile/Functional CV/Chirag Doshi_IIMA_CV_1.pdf`. Older 2024–25 CVs are pre-MBA and stale.
- PharmEasy is shown as **two roles** (Business Head — Retail, Docon & Health Partners, Sep 2022–Aug 2024; Operations Head — Quick Commerce & Aknamed, Aug 2024–Apr 2025).
- Current role: AI Transformation Lead — Management Office, M3M India, May 2026–present. Headline: *Strategy & Operations Leader*.
- "300+ GenAI users at M3M" stands. Say *GenAI platform*, not the vendor name, in role bullets.
- The Chalo/Zophop role (2018–19, found in documents but on no CV) **stays off the site**. TOIKIT is shown as-is.
- Phone number is stored but hidden (`showPhone: false`). Contact email: chiragdoshi2008@gmail.com. LinkedIn: linkedin.com/in/chiragdoshi08.
- **No CV download anywhere.** The site is the CV. Every "contact" call to action points to Topmate first.

**Structure and behaviour**
- Three views over one content file, and all three must have **identical content** (the terminal is the only extra). View tabs are a centred switcher labelled Read it / Ask it / Type it.
- Topmate deep links, one per offer:
  - GenAI adoption for leadership teams → Practical AI Strategy Session (`2276465`)
  - AI decision tools & workflow automation → Practical AI Strategy Session (`2276465`)
  - Ops & P&L turnaround, 0→1 launches → Operations & Business Strategy Consultation (`2276464`)
  - Career mentoring → MBA Prep & Career Strategy (`2015768`)
  - Priority DM (`2015787`) for quick questions.
- Chat engine must run at near-zero cost: scripted answers first, model only as a fallback. (Chirag's words: "running cost needs to be almost zero".)
- Hosting on GitHub Pages for now. The Claude fallback (`api/chat.ts`) therefore does **not** run in production; the site degrades to local retrieval.
- Vacation photo (`public/images/about.jpg`) is the hero image for now; a proper portrait comes later.
- Domain: chiragdoshi.com (purchased 8 Sep 2026).
- Three mottos are in content with honest attribution (see `mottos` in profile.ts):
  - "Never miss a train, even if you don't have a ticket." — a film line, untraceable.
  - "The answer to every fear is action." — folk wisdom; Carnegie said it longer.
  - "You can't manage what you can't measure." — usually pinned on Drucker; the Drucker Institute says he never said it, and Deming called it a myth.

**Process**
- Chirag prefers to **discuss before building** and wants to understand the architecture (he uses it for interview prep).
- Documents and plans are shared **in the chat**, not as published artifacts.

---

## 4. Suggestions awaiting Chirag's decision

Proposed by Claude, not yet approved. The full structure proposal was shared in chat on 12 Sep 2026.

1. **Home at `/`.** Replace the landing chooser with the Classic page at the root; keep the view switcher in the top bar. *Recommended.*
2. **Identity line.** Current placeholder: *"Thirteen years running businesses. Now teaching them to think."* Alternatives: *"Operator turned AI builder."* / a verb-first line in Apurv Nagpal's style: *"I run things. Build things. And lately, teach businesses to think."* Chirag's call.
3. **Rename the views** Classic / Chat / Terminal → **Home / Ask / Lab**, with paths `/`, `/ask`, `/lab`, `/work` (redirects from old paths). *Recommended.*
4. **Build in public** as the stance: a steady stream of small experiments and lessons, never company data. Needs Chirag's comfort given M3M.
5. **About page** as a first-person narrative in six chapters (Kota and Nagpur → Dealers and hotels → The founder year → Healthcare at scale → The reset at IIMA → Now), plus "Three lines I run on" and "Off duty". Replaces today's chat-seeded `/about`.
6. **"Built with AI" section** on Home with three cards: this site's Ask engine, the land-deal engine, the M3M GenAI rollout. Verb labels (Build · Ship · Lead · Next) borrowed from apurvnagpal.com.
7. Dated eyebrow above the hero ("Working notes · September 2026"), updated monthly.
8. Career ribbon reframed as "the previous life" / "thirteen years of useful miles".
9. Hero photo caption in a handwritten style: "portrait #01 / a better one soon".
10. Work page filters (AI · Growth · Ops · Product) and a Lab "experiments shelf" (deal analyzer, FlatWalkie, voice agent, this site).
11. Deferred until content exists: Writing (needs three posts), Newsletter, Testimonials (from Topmate), model fallback in Ask (needs Vercel or a worker).
12. Offer copy in `offers[]` is Claude's framing of the CV. Chirag should read and correct the wording, formats and "who it's for" lines.
13. A CV-mining gap report (9 Sep) surfaced extra metrics (inventory ratio 3.5→0.6, 19 dark stores, SLA 76→92%, AVP→VP in 10 months) and contradictions (M3M start/title, GenAI users 200 vs 300+). Chirag's picks are pending.

**Material Claude still needs from Chirag** for the About page: why the formula car, why TOIKIT and why it stopped, why the MBA at 33, what weekends look like; a paragraph per motto; two lines per Lab experiment; photo picks.

---

## 5. Completed work (chronological)

1. Reviewed gurek.work; used it as the model for a conversational portfolio.
2. Scaffolded React 19 + Vite 8 + Tailwind v4 + Framer Motion + Zustand + React Router. Installed Node 22 to `~/.local/node` (no Homebrew on the machine).
3. Built the content model (`profile.ts`) from the CVs; 6 roles (7 after the PharmEasy split), 13 projects with metrics and case-study text, skills, education, achievements, offers, mottos, career ribbon.
4. Built the chat engine: structured questions (years, durations, before/after, first/latest), strong-keyword intents, BM25 retrieval, Claude Haiku serverless fallback, local fallback. 55-case intent test.
5. Built three views: Classic one-pager, Chat, Desktop (draggable windows, dock, terminal on the same engine). View switcher with one-time hint. Dark mode, mobile layouts, reduced-motion support.
6. Wired real Topmate services and the chiragdoshi.com domain; generated the OG share image (`scripts/og.html` → `public/og-image.png`).
7. Deployed to GitHub Pages via Actions; SPA fallback via per-route `index.html` and `404.html`; trailing-slash path normalisation.
8. Landing chooser at `/`; new studio headshot as avatar; career ribbon replaces the KPI strip; content parity across views; no CV download.
9. Aligned content with the latest CV; new Classic hero (four-word strip, identity line, Ask/Book buttons); mottos added.

---

## 6. Important files

| Path | What it is |
|---|---|
| `src/content/profile.ts` | **The single source of truth.** Bio, `identity`, `fourWords`, `offerSub`, `openTo`, contact and Topmate links, `mottos`, `journey` (career ribbon), `glance`, `offers`, `roles`, `projects`, `skills`, `education`, `achievements`, `suggestions`. Edit here and every view, the chat and the terminal update. |
| `src/lib/intents.ts` | Chat brain: structured question handlers, keyword intents (`!word` = strong term), open-ended questions routed to the fallback. Company and project intents are generated from `profile.ts`. |
| `src/lib/retrieval.ts` | BM25 index over the profile; used for the local fallback and to focus the model. |
| `src/lib/chat.ts` | Three-tier answer routing: scripted → `/api/chat` → local retrieval. |
| `src/lib/terminal.ts` | Terminal commands; converts answer blocks to text lines. |
| `src/lib/modes.ts` | View definitions, paths, path normalisation. Rename views here. |
| `src/main.tsx` | Routes. |
| `src/App.tsx` | Shell: top bar, chat rail, composer; page titles. |
| `src/pages/Landing.tsx` | Current `/` chooser. |
| `src/pages/Classic.tsx` | The one-pager (hero, ribbon, offers, work, career, skills, contact). |
| `src/pages/Home.tsx`, `Projects.tsx`, `About.tsx` | Chat-seeded threads. |
| `src/pages/Desktop.tsx` | Windows, dock, terminal. |
| `src/pages/ProjectDetail.tsx` | Case-study page. |
| `src/components/TopBar.tsx`, `ViewSwitcher.tsx`, `JourneyStrip.tsx` | Chrome. |
| `src/components/blocks/*` | Answer cards (bio, timeline, projects, offers, contact, …). |
| `src/store/chat.ts`, `theme.ts` | Zustand state. |
| `src/index.css` | Design tokens (light and dark), fonts (Inter body, Fraunces display). |
| `api/chat.ts` | Vercel serverless Claude fallback. Inactive on GitHub Pages. Needs `ANTHROPIC_API_KEY`. |
| `index.html` | Meta, OG/Twitter tags, JSON-LD, font links, theme-init script. |
| `public/images/` | `avatar.jpg` (headshot), `about.jpg` (vacation photo, current hero), `iima-books.jpg`. |
| `public/sitemap.xml`, `robots.txt`, `CNAME`, `og-image.png` | SEO and hosting. |
| `.github/workflows/deploy.yml` | Build, pre-render a shell `index.html` per sitemap route, `404.html`, deploy to Pages. |
| `scripts/og.html` | Template for the share image. |
| `vercel.json`, `tsconfig.api.json`, `.env.example` | Kept for a future move to Vercel (functions, CSP headers). |

Source material outside the repo (read-only): `~/Desktop/Chirag Doshi Profile/` (CVs), `~/Desktop/Pics/Profile Pic/` (photos), `~/Desktop/Projects/` (FlatWalkie, deal-analyzer).

---

## 7. How to run, test and deploy

**Prerequisites.** Node 22 lives in `~/.local/node` and is on PATH via `~/.zshrc`. GitHub CLI (`gh`) is in `~/.local/bin` and logged in.

```sh
cd ~/portfolio
npm install            # first time only
npm run dev            # http://localhost:5173  (chat runs on scripted + local fallback; no model)
npm run typecheck      # app + api
npm run build          # must pass before pushing; the deploy runs the same build
npm run preview        # serve the production build locally
```

**Testing checklist before a push**
1. `npm run typecheck && npm run build` both exit 0.
2. Open `/classic`, `/chat`, `/desktop`, one `/project/<slug>` in the browser; check light and dark (`?theme=dark`), and a phone width.
3. Ask the chat a handful of questions: a company ("what did he do at PharmEasy"), a year ("where did he work in 2019"), an offer ("can you help us with AI adoption"), and something off-script (should return the local fallback, not a wrong card).
4. In the terminal: `help`, `experience pharmeasy`, `projects --tag ai`, `book`.
5. If routes changed, update `public/sitemap.xml` (the deploy pre-renders one shell per sitemap URL).

The intent test script used during development lives outside the repo (session scratchpad). If it is needed again, recreate it as `scripts/test-intents.ts` calling `matchIntent()` from `src/lib/intents.ts` with expected intent ids.

**Deploy**
```sh
git add -A
git commit -m "…"
git push               # GitHub Actions builds and publishes to chiragdoshi.com in ~1–2 min
gh run list --limit 1  # check the workflow
```

**Regenerate the share image** after changing the hero copy:
```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --window-size=1200,630 --screenshot=public/og-image.png "file://$PWD/scripts/og.html"
```

**Enabling the Claude fallback later** requires a host that runs functions. Simplest path: import the repo into Vercel, set `ANTHROPIC_API_KEY`, point DNS at Vercel. `vercel.json` and `api/chat.ts` are already in place. Expected cost at portfolio traffic: well under $1/month (Haiku, 400-token answers, per-IP and daily caps).

---

## 8. Known quirks

- GitHub Pages serves routes as folders, so direct loads arrive with a trailing slash (`/chat/`); `normalizePath()` in `modes.ts` handles it.
- The landing chooser at `/` means the shared/preview link shows a picker, not the profile. This is decision 1 above.
- Headless-Chrome screenshots at narrow widths clip the layout; use an iframe wrapper at 390 px for true mobile renders.
- `git config user.name/email` is set per-repo to Chirag's name and Gmail.
