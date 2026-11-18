// Runs after `vite build`. Boots the built dist/ on a local preview server,
// visits each route in a real headless browser so every hook, effect and
// react-helmet-async tag actually runs, then overwrites that route's
// dist/<route>/index.html with the resulting DOM.
//
// Without this, the SPA ships one static index.html for every URL: a
// crawler or link-preview bot that does not execute JavaScript (most social
// scrapers, some search bots) sees the same generic title/description no
// matter which page it requested. This bakes the real per-page <title>,
// meta description, canonical, OG/Twitter tags and JSON-LD into static HTML
// so those tags are there before any JavaScript runs. The client bundle
// script tag is preserved, so once JS does load, React mounts normally over
// the prerendered markup exactly as it would on an empty <div id="root">.
import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const port = 4173;

// Keep in sync with the <Route> list in src/App.jsx.
const routes = ['/', '/products', '/products/ai-guard', '/about', '/team', '/contact', '/request-demo'];

async function main() {
  const server = await preview({
    root,
    preview: { port, strictPort: true, host: '127.0.0.1' },
    logLevel: 'error',
  });
  const base = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // The 40 MB product-tour video would otherwise stall every page load; the
  // prerendered snapshot only needs the markup, not the media itself.
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.resourceType() === 'media') req.abort();
    else req.continue();
  });

  for (const route of routes) {
    await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
    // react-helmet-async commits its tags from a useEffect, which runs after
    // the initial paint - give React a moment to mount and settle.
    await page.waitForFunction(() => document.title && document.title.length > 0);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const html = await page.content();
    const outDir = route === '/' ? distDir : join(distDir, route.slice(1));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    console.log(`prerendered ${route.padEnd(14)} -> ${join(outDir, 'index.html').replace(root, '.')}`);
  }

  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
