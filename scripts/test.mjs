import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true, ws: false, hmr: false }, appType: 'custom' });
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks++; };
try {
  const { matchIntent } = await server.ssrLoadModule('/src/lib/intents.ts');
  const { answer, fallbackBlocks } = await server.ssrLoadModule('/src/lib/chat.ts');
  const { buildChunks, retrieve } = await server.ssrLoadModule('/src/lib/retrieval.ts');
  const { projects, offers, roles } = await server.ssrLoadModule('/src/content/profile.ts');
  const { runCommand } = await server.ssrLoadModule('/src/lib/terminal.ts');
  const { estimateHours } = await server.ssrLoadModule('/src/lib/estimator.ts');
  const { normalizePath, modeForPath } = await server.ssrLoadModule('/src/lib/modes.ts');

  for (const q of ['What did he do at PharmEasy?', 'Where did he work in 2019?', 'Can you help us with AI adoption?', 'Show me your AI projects', 'How do I book a call?', 'Tell me about this website', 'Tell me your story', 'What are your mottos?']) {
    const result = matchIntent(q);
    check(result?.blocks?.length > 0, `No scripted answer: ${q}`);
  }
  const company = matchIntent('What did he do at PharmEasy?');
  const ids = company.blocks.filter(b => b.type === 'experience').flatMap(b => b.roleIds ?? roles.map(r => r.id));
  check(['pharmeasy-qc','pharmeasy-bh','pharmeasy-docon'].every(id => ids.includes(id)), 'PharmEasy response must include all three roles');
  const year = JSON.stringify(matchIntent('Where did he work in 2019?'));
  check(year.includes('toikit') && year.includes('medtrail'), '2019 must cover both overlapping career chapters');
  const chunks = buildChunks();
  for (const id of ['offer:genai-adoption','availability','story','mottos']) {
    const blocks = fallbackBlocks(chunks.filter(c => c.id === id));
    check(blocks.length >= 3, `Retrieved ${id} has no substantive answer`);
  }
  check(fallbackBlocks(chunks.filter(c => c.id === 'offer:genai-adoption')).some(b => b.type === 'offers'), 'Services should render a booking card');
  check(retrieve('land deal zoning').some(c => c.id === 'project:ai-land-deal-engine'), 'Land deal retrieval failed');
  const oldFetch = globalThis.fetch;
  let requests = 0;
  globalThis.fetch = async () => { requests++; throw Error('Unexpected API request'); };
  try {
    const fallback = await answer('zxqv unsupported topic');
    check(fallback.source === 'fallback', 'Unknown question should fall back');
    check(requests === 0, 'Static deployment must make no chat API requests');
    check(fallback.blocks[0].text.includes('don’t have information'), 'Unknown topic must not invent an answer');
  } finally { globalThis.fetch = oldFetch; }
  check(new Set(projects.map(p=>p.slug)).size === projects.length, 'Duplicate project slugs');
  check(projects.find(p=>p.slug==='pharmeasy-foco-retail').metrics.some(m=>m.value==='₹80L'), 'Retail GMV regression');
  check(offers.every(o=>/^\d+$/.test(o.topmatePath)), 'Missing service deep link');
  const ctx = {openWindow(){},clear(){},toggleTheme(){},navigate(){}};
  for(const cmd of ['help','experience pharmeasy','projects --tag ai','story','mottos']) check((await runCommand(cmd,ctx)).length > 0, `Terminal command failed: ${cmd}`);
  const estimate = estimateHours(30,5,10,50);
  check(estimate.baseline === 25 && estimate.saved === 12.5 && estimate.remaining === 12.5, 'Estimator baseline calculation failed');
  check(estimateHours(30,5,10,0).saved === 0, 'Zero improvement must save zero hours');
  check(normalizePath('/chat/') === '/chat' && modeForPath('/chat/') === 'chat', 'Trailing-slash route regression');
  check(modeForPath('/') === 'classic' && modeForPath('/project/ai-land-deal-engine') === 'classic', 'Editorial route classification failed');
  console.log(`${checks} regression checks passed.`);
} finally { await server.close(); }
