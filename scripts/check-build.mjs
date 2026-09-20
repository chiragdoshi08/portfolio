import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
const sitemap=await readFile('dist/sitemap.xml','utf8');
const routes=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
let links=0;
for(const route of [...routes,'/classic','/projects']) {
  const html=await readFile(path.join('dist',route,'index.html'),'utf8');
  assert.match(html,/<h1[^>]*>.+?<\/h1>/s,`${route}: no rendered heading`);
  assert.match(html,/<link rel="canonical" href="https:\/\/chiragdoshi.com\//,`${route}: no canonical URL`);
  for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^"]*"/g)) {
    const target=match[1];
    const file=path.extname(target)?path.join('dist',target):path.join('dist',target,'index.html');
    await access(file).catch(()=>{throw Error(`Broken link or asset: ${route} → ${target}`);});
    links++;
  }
}
const retail=await readFile('dist/project/pharmeasy-foco-retail/index.html','utf8');
assert.ok(retail.includes('₹80L') && retail.includes('₹80 lakh'), 'Retail correction missing from static HTML');
const site=await readFile('dist/project/conversational-portfolio/index.html','utf8');
assert.ok(site.includes('This website, built to answer back') && site.includes('og:type" content="article'), 'Case-study metadata missing');
const notFound=await readFile('dist/404.html','utf8');
assert.ok(notFound.includes('noindex, follow'), '404 must not be indexed');
console.log(`Verified ${routes.length+2} rendered pages, ${links} internal links/assets, case-study metadata and 404.`);
