// @ts-check
import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {load} from 'cheerio';

const build = path.resolve('build');
const origin = 'https://agent-layer.dev';

/**
 * Return the HTML files emitted by the production build.
 * @param {string} directory
 * @returns {string[]}
 */
function htmlFiles(directory) {
  return readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : file.endsWith('.html') ? [file] : [];
  });
}

/**
 * Resolve a same-origin URL to the static file served by GitHub Pages.
 * @param {URL} url
 * @returns {string | null}
 */
function builtFile(url) {
  const file = path.join(build, decodeURIComponent(url.pathname));
  if (existsSync(file) && statSync(file).isFile()) return file;
  if (existsSync(path.join(file, 'index.html'))) return path.join(file, 'index.html');
  return null;
}

test('published pages reference existing local images, scripts, styles, and frames', () => {
  assert.ok(existsSync(build), 'Run npm run build before checking the published site');
  const missing = new Set();
  for (const file of htmlFiles(build)) {
    const pageURL = new URL(path.relative(build, file).replaceAll(path.sep, '/'), origin);
    const $ = load(readFileSync(file, 'utf8'));
    $('img[src], script[src], iframe[src], link[rel="stylesheet"], link[rel*="icon"], meta[property="og:image"]').each((_, element) => {
      const source = $(element).attr('src') ?? $(element).attr('href') ?? $(element).attr('content');
      if (!source) return;
      const url = new URL(source, pageURL);
      if (url.origin === origin && !builtFile(url)) missing.add(`${url.pathname} (from ${pageURL.pathname})`);
    });
  }
  assert.deepEqual([...missing], [], 'Missing published assets');
});

test('the homepage provides a real Grok logo and direct product navigation', () => {
  const $ = load(readFileSync(path.join(build, 'index.html'), 'utf8'));
  const logo = $('.clients-grid img[alt="Grok"]');
  assert.equal(logo.length, 1, 'Grok must have a logo image alongside the other clients');
  const source = logo.attr('src');
  assert.ok(source, 'Grok logo must have a source');
  assert.ok(builtFile(new URL(source, origin)), 'Grok logo must be published');
  for (const route of ['/docs/agent-dispatch', '/deltaselect']) {
    assert.ok($(`nav a[href="${route}"]`).length, `${route} must be reachable from the main navigation`);
    assert.ok($(`footer a[href="${route}"]`).length, `${route} must be reachable from the footer`);
    assert.ok(builtFile(new URL(route, origin)), `${route} must be published`);
  }
});
