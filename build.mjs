#!/usr/bin/env node
// Static site build: `node build.mjs`
// Renders every page in src/pages.mjs to plain HTML in the repo root (which is
// what Netlify publishes), plus sitemap.xml and robots.txt. No dependencies.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allPages } from './src/pages.mjs';
import { page } from './src/layout.mjs';
import { SITE } from './src/config.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const pages = allPages();
const today = new Date().toISOString().slice(0, 10);

for (const p of pages) {
  const file = join(root, p.out);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(p));
  console.log('  wrote', p.out);
}

const urls = pages
  .filter((p) => !p.noindex)
  .map((p) => `  <url><loc>${SITE.url}${p.path}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n');
writeFileSync(
  join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
writeFileSync(
  join(root, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /book/confirmed/\n\nSitemap: ${SITE.url}/sitemap.xml\n`,
);
console.log(`Built ${pages.length} pages + sitemap.xml + robots.txt`);
