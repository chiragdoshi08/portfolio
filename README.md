# Chirag Doshi — personal website

An editorial portfolio with an interactive profile, consulting offers, case studies and a small experiments lab. Built with React, TypeScript and Vite; deployed to GitHub Pages at **https://chiragdoshi.com**.

## Pages

- `/` — personal homepage, selected work, services and an entry into the conversation.
- `/work` — searchable, filterable project and case-study collection.
- `/project/:slug` — individual case studies.
- `/about` — narrative story, career, education, recognition and toolkit.
- `/consulting` — service finder and individual Topmate booking links.
- `/chat` — curated answers and local retrieval over the shared profile.
- `/lab` — interactive workflow-time estimator and experiment collection.
- `/desktop` — desktop windows and a working terminal.

Existing `/classic` and `/projects` URLs continue to work, with canonical URLs pointing to `/` and `/work`. Trailing slashes are supported.

## Develop and verify

Use Node 22 or later. Dependencies are locked in `package-lock.json`.

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run lint
npm run build
node scripts/check-build.mjs
npm run preview
```

The regression suite checks career queries, retrieval, service cards, terminal commands, static-host behaviour and estimator arithmetic. The build check verifies rendered pages, internal links, image/script assets, metadata and the 404 page.

## Content

`src/content/profile.ts` supplies the professional profile, roles, projects, offers, narrative chapters, mottos, skills and credentials. Both chat and terminal use the same material. Images are in `public/images/`.

To add a case study, add a `Project` to `projects` with a unique slug, summary, challenge, approach, outcomes and clearly labelled metrics. The build automatically generates its HTML and adds its canonical URL to the output sitemap. The public source sitemap should also be kept current.

The September 2026 content review used the Business/Strategy/Operations and Product Management master profiles in the supplied Drive folder. Retail GMV is ₹80 lakh; ₹4Cr+ belongs to the separate Health Partner Network. The user reconfirmed **300+ GenAI users at M3M**. The previously approved M3M role title remains in place.

There is no downloadable CV. Topmate is the primary booking destination; pricing stays on Topmate. Phone visibility remains disabled.

## Chat architecture

1. Structured questions and keyword intents resolve locally.
2. Unmatched questions use local BM25 retrieval by default, including offers, availability, story and mottos.
3. The optional model fallback only runs when `VITE_ENABLE_AI_FALLBACK=true` and a host actually runs `api/chat.ts`. It is disabled on GitHub Pages. Server-side credentials must never use a `VITE_` prefix.

`api/chat.ts` is retained for a future server-capable host. Its in-memory rate limits reset on cold starts and are not a global spending cap.

## Static rendering and deployment

`npm run build` builds the client then runs `scripts/prerender.mjs`. The prerenderer uses React to generate complete route HTML, unique titles, descriptions, canonical URLs, social metadata, `404.html` and the sitemap. This gives GitHub Pages real route directories and readable page content before JavaScript loads. React mounts the interactive application on load.

Pushing `main` triggers `.github/workflows/deploy.yml`, which runs type checks, regression tests, lint, the build and the generated-site checks before deploying. Local edits alone do not update the public website.

Before publishing, review the local site on desktop and mobile, in both themes, and test chat, project filters, booking links and the terminal. The Lab estimate is arithmetic, explicitly labelled as an illustration; prototype targets must remain distinct from achieved results.
