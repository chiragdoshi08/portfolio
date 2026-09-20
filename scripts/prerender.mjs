import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createServer } from 'vite';
import path from 'node:path';
const server = await createServer({server:{middlewareMode:true,ws:false,hmr:false},appType:'custom'});
const escapeHtml = text => text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
try {
  const { render, pages, getPageMeta } = await server.ssrLoadModule('/src/entry-server.tsx');
  const template = await readFile('dist/index.html','utf8');
  function htmlFor(route) {
    const meta = getPageMeta(route);
    let html = template.replace(/<title>[\s\S]*?<\/title>/,`<title>${escapeHtml(meta.title)}</title>`);
    const values = {description:meta.description,'og:title':meta.title,'og:description':meta.description,'og:url':meta.canonical,'og:type':meta.type,'twitter:title':meta.title,'twitter:description':meta.description};
    for (const [name,value] of Object.entries(values)) html=html.replace(new RegExp(`<meta\\s+(?:name|property)="${name}"\\s+content="[^"]*"\\s*/?>`),`<meta ${name.startsWith('og:')?'property':'name'}="${name}" content="${escapeHtml(value)}" />`);
    html=html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/,`<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`);
    if(!meta.found)html=html.replace('content="index, follow"','content="noindex, follow"');
    return html.replace('<div id="root"></div>',`<div id="root">${render(route)}</div>`);
  }
  for(const route of pages) {
    const directory=path.join('dist',route);
    await mkdir(directory,{recursive:true});
    await writeFile(path.join(directory,'index.html'),htmlFor(route));
  }
  await writeFile('dist/404.html',htmlFor('/404'));
  const urls=pages.filter(p=>p!=='/classic'&&p!=='/projects').map(p=>`  <url><loc>${getPageMeta(p).canonical}</loc></url>`).join('\n');
  await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  console.log(`Pre-rendered ${pages.length} pages, 404 fallback and sitemap.`);
} finally { await server.close(); }
