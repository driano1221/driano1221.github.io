# Inference Notes

Adriano's bilingual notebook on statistics and AI, with interactive explanations
of Cheng & Titterington's 1994 paper on neural networks.

**Website:** https://driano1221.github.io/

## Run locally

Use Node.js 22.22.1 and pnpm 11.8.0 (the same versions as the publishing workflow).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The home page is `/`, the article is `/pt`, and the biography is `/sobre`.
English versions are `/en/home`, `/en`, and `/en/about`.

## Verify and publish

```sh
pnpm exec tsc --noEmit
pnpm run check:morph
pnpm run build
```

Pushing `main` runs `.github/workflows/pages.yml`: install the locked dependencies,
check types and calculations, export the six public pages to `dist/client`, then
publish that folder through GitHub Pages. No personal access token or paid
service is needed by the workflow. Configure **Settings → Pages → Source →
GitHub Actions** when reproducing this setup in another repository.

To check the live publication in PowerShell:

```powershell
$env:PUBLICATION_CHECK_ORIGIN = 'https://driano1221.github.io'
node scripts/check-publication.mjs
```

Also test actual menu clicks, the language switch and an experiment in the
published site: HTML checks alone cannot detect a broken client-side control.
For example: home → article → equal inputs → switch language → About → home.

## How it fits together

- `app/publication.tsx` and `app/publication.css`: home, About and shared identity.
- `app/experience.tsx` and `app/story-*.tsx`: article and interactive explanations.
- `lib/`: calculations, learning rules and evidence references.
- `scripts/prepare-publication.mjs`: validates the export, adds directory
  entrypoints for static hosting and excludes design-preview pages.

The website is a static React/Vinext export, with no database or visitor login.
Navigation between pages uses normal HTML links; changing language inside the
article preserves its current interactive state. The original Sites build
configuration is retained for compatibility, but publishing now uses GitHub Pages.
Prototype source is retained for design history, not linked or exported as public
pages. The personal Obsidian vault and project working notes are not part of this
repository.

Historical article figures remain attributed to their original source. Making
this repository public does not relicense third-party material.
