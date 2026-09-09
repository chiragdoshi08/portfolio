// A tiny shell over the same content + intent engine that powers the chat.
// Commands map to blocks; blocks are flattened to text lines for the terminal.

import { achievements, education, offers, profile, projects, roles, skills } from "../content/profile";
import { answer } from "./chat";
import type { Block } from "./intents";
import { topmateUrl } from "../components/blocks/OffersGrid";

export type TermLine = { kind: "in" | "out" | "muted" | "link" | "title"; text: string; href?: string };

export const COMMANDS: Array<[string, string]> = [
  ["help", "list commands"],
  ["whoami", "who Chirag is, in a paragraph"],
  ["experience [company]", "career timeline, or one role"],
  ["projects [--tag ai|growth|ops|product]", "what he has led"],
  ["open <window|slug>", "open a window (career, skills, contact…) or a project"],
  ["offers", "how he works with clients"],
  ["skills", "toolkit"],
  ["education", "IIM A, VNIT"],
  ["awards", "recognition"],
  ["contact", "email, LinkedIn, Topmate"],
  ["book", "book a call on Topmate"],
  ["theme", "toggle dark mode"],
  ["clear", "clear the screen"],
  ["<anything else>", "ask a question, e.g. where did he work in 2019"],
];

export function blocksToLines(blocks: Block[]): TermLine[] {
  const out: TermLine[] = [];
  for (const b of blocks) {
    switch (b.type) {
      case "text":
        out.push({ kind: "out", text: b.text });
        break;
      case "bio":
        out.push({ kind: "title", text: `${profile.name} — ${profile.headline}` }, { kind: "out", text: profile.summary }, { kind: "muted", text: profile.currently });
        break;
      case "experience": {
        const list = b.roleIds ? roles.filter((r) => b.roleIds!.includes(r.id)) : roles;
        for (const r of list) {
          out.push({ kind: "title", text: `${r.start} – ${r.end}  ${r.company} — ${r.title}` });
          for (const bl of list.length === 1 ? r.bullets : r.bullets.slice(0, 2)) out.push({ kind: "out", text: `  • ${bl}` });
        }
        break;
      }
      case "projects": {
        const list = b.slugs ? projects.filter((p) => b.slugs!.includes(p.slug)) : projects;
        for (const p of list) out.push({ kind: "link", text: `${p.title} — ${p.tagline}`, href: `/project/${p.slug}` }, { kind: "muted", text: `  ${p.company} · ${p.period} · ${p.metrics.map((m) => `${m.value} ${m.label}`).join(" · ")}` });
        break;
      }
      case "offers": {
        const list = b.ids ? offers.filter((o) => b.ids!.includes(o.id)) : offers;
        for (const o of list) out.push({ kind: "title", text: o.title }, { kind: "out", text: `  ${o.who}` }, { kind: "muted", text: `  Format: ${o.format}` }, { kind: "link", text: `  → book "${o.topmateService}" on Topmate`, href: topmateUrl(o) });
        break;
      }
      case "skills":
        out.push({ kind: "out", text: `Business: ${skills.business.join(", ")}` }, { kind: "out", text: `AI: ${skills.ai.join(", ")}` }, { kind: "out", text: `Product: ${skills.product.join(", ")}` }, { kind: "muted", text: `Tools: ${skills.tools.join(", ")}` });
        break;
      case "education":
        for (const e of education) out.push({ kind: "title", text: `${e.years}  ${e.school}` }, { kind: "out", text: `  ${e.degree} — ${e.note}` });
        break;
      case "achievements":
        for (const a of achievements) out.push({ kind: "out", text: `  ★ ${a}` });
        break;
      case "contact":
        out.push({ kind: "link", text: `Topmate  ${profile.topmate}`, href: profile.topmate }, { kind: "link", text: `Email    ${profile.email}`, href: `mailto:${profile.email}` }, { kind: "link", text: `LinkedIn ${profile.linkedin}`, href: profile.linkedin }, { kind: "muted", text: `Location ${profile.location}` });
        break;
      case "chips":
        out.push({ kind: "muted", text: `try: ${b.items.map((i) => `"${i}"`).join("  ")}` });
        break;
    }
  }
  return out;
}

export type TermContext = { openWindow: (id: string) => void; clear: () => void; toggleTheme: () => void; navigate: (to: string) => void };

export async function runCommand(raw: string, ctx: TermContext): Promise<TermLine[]> {
  const input = raw.trim();
  if (!input) return [];
  const [cmd, ...rest] = input.split(/\s+/);
  const arg = rest.join(" ").toLowerCase();
  const c = cmd.toLowerCase();

  switch (c) {
    case "help":
    case "?":
      return COMMANDS.map(([k, d]) => ({ kind: "out", text: `${k.padEnd(38)} ${d}` }));
    case "clear":
      ctx.clear();
      return [];
    case "theme":
      ctx.toggleTheme();
      return [{ kind: "muted", text: "theme toggled" }];
    case "whoami":
    case "about":
      return blocksToLines([{ type: "bio" }]);
    case "experience":
    case "career":
    case "exp": {
      const role = arg ? roles.find((r) => r.company.toLowerCase().includes(arg) || r.aliases.some((a) => arg.includes(a))) : undefined;
      return blocksToLines([{ type: "experience", roleIds: role ? [role.id] : undefined }]);
    }
    case "projects":
    case "ls": {
      const tag = arg.match(/--tag\s+(\w+)/)?.[1] ?? arg.replace("--tag", "").trim();
      const map: Record<string, string> = { ai: "AI", growth: "Growth", ops: "Operations", operations: "Operations", product: "Product", side: "Side project" };
      const cat = map[tag];
      const slugs = cat ? projects.filter((p) => p.category === cat).map((p) => p.slug) : undefined;
      return blocksToLines([{ type: "projects", slugs }]);
    }
    case "open": {
      if (["readme", "career", "projects", "terminal", "book", "skills", "credentials", "contact", "photo"].includes(arg)) {
        ctx.openWindow(arg);
        return [{ kind: "muted", text: `opened ${arg}` }];
      }
      const p = projects.find((x) => x.slug === arg || x.aliases.some((a) => arg.includes(a)) || x.title.toLowerCase().includes(arg));
      if (p) {
        ctx.navigate(`/project/${p.slug}`);
        return [{ kind: "muted", text: `opening ${p.title}…` }];
      }
      return [{ kind: "out", text: `open: nothing called "${arg}". Try: open readme | career | projects | book | skills | credentials | contact | photo, or a project slug.` }];
    }
    case "offers":
    case "services":
      return blocksToLines([{ type: "offers" }]);
    case "skills":
      return blocksToLines([{ type: "skills" }]);
    case "education":
    case "edu":
      return blocksToLines([{ type: "education" }]);
    case "awards":
    case "achievements":
      return blocksToLines([{ type: "achievements" }]);
    case "contact":
      return blocksToLines([{ type: "contact" }]);
    case "book":
      window.open(profile.topmate, "_blank", "noopener");
      return [{ kind: "link", text: `opening Topmate → ${profile.topmate}`, href: profile.topmate }];
    case "resume":
    case "cv":
      return [
        { kind: "out", text: `No PDF here — this site is ${profile.firstName}'s CV, kept current. Try: experience · projects · offers · book` },
        ...blocksToLines([{ type: "contact" }]),
      ];
    case "sudo":
      return [{ kind: "out", text: "Nice try. Chirag is the only root here." }];
    default: {
      const res = await answer(input);
      const lines = blocksToLines(res.blocks);
      if (res.source === "ai") lines.push({ kind: "muted", text: "— answered by Claude, grounded in this profile" });
      return lines;
    }
  }
}
