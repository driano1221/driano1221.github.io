'use client';

import { useEffect, useRef } from 'react';
import type { Locale } from './theme';

// Reações e comentários via giscus: ficam nas Discussions deste repositório (site estático, sem servidor).
// O leitor entra com a conta do GitHub para reagir ou comentar.
const giscus = {
  repo: 'driano1221/driano1221.github.io',
  repoId: 'R_kgDOUcMDdw',
  category: 'Announcements',          // só o giscus e o dono abrem discussões nessa categoria
  categoryId: 'DIC_kwDOUcMDd84DG6rv',
};

// post: nome fixo da conversa, igual em português e inglês, para as duas páginas somarem as mesmas reações
export function KindleComments({ locale, post }: { locale: Locale; post: string }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const s = document.createElement('script');
    const attrs: Record<string, string> = {
      src: 'https://giscus.app/client.js',
      'data-repo': giscus.repo,
      'data-repo-id': giscus.repoId,
      'data-category': giscus.category,
      'data-category-id': giscus.categoryId,
      'data-mapping': 'specific',
      'data-term': post,
      'data-strict': '1',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      // tema com as cores do papel; fora do site publicado o giscus não alcança o CSS, então usa o claro
      'data-theme': location.hostname === 'driano1221.github.io' ? `${location.origin}/giscus-papel.css` : 'light',
      'data-lang': locale === 'pt' ? 'pt' : 'en',
      'data-loading': 'lazy',
      crossorigin: 'anonymous',
    };
    for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
    s.async = true;
    el.replaceChildren(s);
    return () => el.replaceChildren();
  }, [locale, post]);

  return <section className="k-comments" aria-label={locale === 'pt' ? 'Reações e comentários' : 'Reactions and comments'}>
    <h2 className="k-comments-title">{locale === 'pt' ? 'Gostou? Deixe uma reação ou um comentário' : 'Enjoyed it? Leave a reaction or a comment'}</h2>
    <p className="k-comments-note">{locale === 'pt'
      ? 'As reações e os comentários usam a sua conta do GitHub.'
      : 'Reactions and comments use your GitHub account.'}</p>
    <div ref={box}/>
  </section>;
}
