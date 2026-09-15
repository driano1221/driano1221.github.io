import assert from 'node:assert/strict';

// Run with the local preview already serving: node scripts/check-publication.mjs.
const origin = process.env.PUBLICATION_CHECK_ORIGIN || 'http://localhost:3000';
for (const [path, title, article] of [
  ['/', 'Adriano Pires Cunha', '/pt'],
  ['/en/home', 'Adriano Pires Cunha', '/en'],
]) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.ok(html.includes(title), `${path}: localized home`);
  assert.ok(html.includes('id="blog-title"'), `${path}: blog index`);
  assert.ok(!html.includes('Inference Notes'), `${path}: personal name replaces old brand`);
  assert.ok(!html.includes('publication-intro'), `${path}: no homepage slogan`);
  assert.ok(html.includes(`href="${article}"`), `${path}: real article link`);
  assert.ok(!html.includes('id="about"'), `${path}: no biography on home`);
  assert.ok(html.includes(`href="${path === '/' ? '/sobre' : '/en/about'}"`), `${path}: dedicated about link`);
  assert.ok(!html.includes('provisional name'), `${path}: no sample toolbar`);
}
for (const [path, home] of [['/pt', '/'], ['/en', '/en/home']]) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.ok(html.includes('publication-story'), `${path}: integrated theme`);
  assert.ok(html.includes('publication-opening'), `${path}: historical context precedes examples`);
  assert.ok(html.includes('https://doi.org/10.1038/323533a0'), `${path}: 1986 source retained`);
  assert.ok(html.includes(`href="${home}"`), `${path}: back to localized home`);
  assert.ok(!html.includes('id="author"'), `${path}: no biography inside article`);
  for (const id of ['review-demo', 'learning', 'generalization', 'memory', 'judgments', 'evidence', ...Array.from({length:17}, (_,i)=>`e${String(i+1).padStart(2,'0')}`)]) {
    assert.ok(html.includes(`id="${id}"`), `${path}: preserved section ${id}`);
  }
}
for (const [path, title, translation] of [
  ['/sobre', 'Sou Adriano Pires Cunha', '/en/about'],
  ['/en/about', 'I’m Adriano Pires Cunha', '/sobre'],
]) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.ok(html.includes(title), `${path}: localized biography`);
  assert.ok(html.includes('https://github.com/driano1221'), `${path}: verified GitHub`);
  assert.ok(html.includes('https://www.linkedin.com/in/adriano-pires-cunha/'), `${path}: LinkedIn from personal vault`);
  assert.ok(html.includes('https://rpubs.com/driano12'), `${path}: RPubs from personal vault`);
  assert.ok(html.includes(`href="${translation}"`), `${path}: translate current page`);
}
console.log('Publication: localized homes, dedicated about pages, experiments and 17 evidence entries passed.');
