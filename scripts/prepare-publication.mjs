import { access, copyFile, mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

// Only generated preview entrypoints are removed. Their source and local routes
// stay available for design work; a normal build regenerates the exported files.
const output = resolve(dirname(fileURLToPath(import.meta.url)), '../dist/client');
// Production static exports use document navigation, not Vinext's RSC Link.
const publication = await readFile(resolve(output, '../../app/publication.tsx'), 'utf8');
assert.ok(!publication.includes('next/link'), 'Keep portfolio links native: the static RSC navigation failed in production');
for (const file of ['index.html', 'pt.html', 'en.html', 'en/home.html', 'sobre.html', 'en/about.html', 'oceano.html', 'en/ocean.html', 'mariposas.html', 'en/moths.html', 'projetos.html', 'en/projects.html']) {
  await access(resolve(output, file));
}
// Pages has no application server or rewrite rules. Directory entrypoints also
// make /en/ work alongside /en/home/; retain flat exports for existing links.
for (const route of ['pt', 'en', 'en/home', 'sobre', 'en/about', 'oceano', 'en/ocean', 'mariposas', 'en/moths', 'projetos', 'en/projects']) {
  const directory = resolve(output, route);
  await mkdir(directory, { recursive: true });
  const flat = resolve(output, route + '.html');
  if (route === 'en' || route.startsWith('en/')) {
    const html = await readFile(flat, 'utf8');
    assert.ok(html.includes('<html lang="pt-BR"'), `${route}: expected root language before localization`);
    const english = html.replace('<html lang="pt-BR"', '<html lang="en"');
    await writeFile(flat, english);
    await writeFile(resolve(directory, 'index.html'), english);
  } else {
    await copyFile(flat, resolve(directory, 'index.html'));
  }
}
for (const route of ['caderno', 'direcoes', 'identidades', 'inference']) {
  for (const extension of ['html', 'rsc']) {
    const target = resolve(output, route + '.' + extension);
    assert.equal(dirname(target), output, 'Only generated preview files may be removed');
    await unlink(target).catch(error => { if (error.code !== 'ENOENT') throw error; });
  }
}
const home = await readFile(resolve(output, 'index.html'), 'utf8');
assert.ok(!home.includes('id="about"'), 'Home must not contain the biography');
for (const page of ['pt', 'en']) {
  const html = await readFile(resolve(output, page + '.html'), 'utf8');
  assert.ok(!html.includes('id="author"'), 'Article must not contain the biography');
}
console.log('Public export ready: twelve portfolio pages; four design previews kept local.');
