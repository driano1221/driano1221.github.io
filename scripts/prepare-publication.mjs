import { access, copyFile, mkdir, readFile, unlink } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

// Only generated preview entrypoints are removed. Their source and local routes
// stay available for design work; a normal build regenerates the exported files.
const output = resolve(dirname(fileURLToPath(import.meta.url)), '../dist/client');
// Production static exports use document navigation, not Vinext's RSC Link.
const publication = await readFile(resolve(output, '../../app/publication.tsx'), 'utf8');
assert.ok(!publication.includes('next/link'), 'Keep portfolio links native: the static RSC navigation failed in production');
for (const file of ['index.html', 'pt.html', 'en.html', 'en/home.html', 'sobre.html', 'en/about.html']) {
  await access(resolve(output, file));
}
// Pages has no application server or rewrite rules. Directory entrypoints also
// make /en/ work alongside /en/home/; retain flat exports for existing links.
for (const route of ['pt', 'en', 'en/home', 'sobre', 'en/about']) {
  const directory = resolve(output, route);
  await mkdir(directory, { recursive: true });
  await copyFile(resolve(output, route + '.html'), resolve(directory, 'index.html'));
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
console.log('Public export ready: six portfolio pages; four design previews kept local.');
