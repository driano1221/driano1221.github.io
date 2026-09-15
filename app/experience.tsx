'use client';

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { DesignReview } from './direcoes/review';
import { StoryLearning } from './story-learning';
import { StoryGeneralization } from './story-generalization';
import { StoryHistory } from './story-history';
import { StoryAppendix } from './story-appendix';
import './direcoes/review.css';
import './story.css';
import './publication.css';

export function Experience({ locale: initialLocale }: { locale: 'pt' | 'en' }) {
  const [locale, setLocale] = useState(initialLocale);
  const readingPosition = useRef<{ element: Element; top: number } | null>(null);
  useEffect(() => {
    document.title = locale === 'pt'
      ? 'Em 1994, dois estatísticos tentaram prever o futuro das redes neurais'
      : 'In 1994, two statisticians tried to predict the future of neural networks';
    document.querySelector('meta[name="description"]')?.setAttribute('content', locale === 'pt'
      ? 'Por dentro das redes neurais: contas, aprendizado, double descent e as perguntas de um artigo de 1994 que continuam importantes.'
      : 'Inside neural networks: calculations, learning, double descent and the enduring questions of a paper from 1994.');
  }, [locale]);
  useLayoutEffect(() => {
    const anchor = readingPosition.current;
    if (anchor?.element.isConnected) window.scrollBy({ top: anchor.element.getBoundingClientRect().top - anchor.top, behavior: 'instant' });
    readingPosition.current = null;
  }, [locale]);
  function changeLocale(next: 'pt' | 'en') {
    if (next === locale) return;
    const anchors = Array.from(document.querySelectorAll('main section[id], main h2, main h3, main p, main figure, main details, main .story-lab, main .prediction-pause'));
    const readingTop = (document.querySelector('.story-nav')?.getBoundingClientRect().bottom ?? 64) + 16;
    const element = anchors.filter(node => { const rect = node.getBoundingClientRect(); return rect.height > 0 && rect.top <= readingTop; }).at(-1);
    if (element) readingPosition.current = { element, top: element.getBoundingClientRect().top };
    // Keep the same mounted components: changing language must not restart an experiment.
    window.history.replaceState(window.history.state, '', `/${next}${window.location.search}${window.location.hash}`);
    setLocale(next);
  }
  function followSection(event: MouseEvent<HTMLDivElement>) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
    const hash = link?.getAttribute('href');
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (!target || !hash) return;
    // Locale changes keep React mounted but change the URL. Do not let the router
    // treat a subsequent section link as a new page and reset every experiment.
    event.preventDefault();
    history.pushState(history.state, '', `${location.pathname}${location.search}${hash}`);
    target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
  }
  return <div className="publication-story" onClickCapture={followSection}><DesignReview siteLocale={locale} onLocaleChange={changeLocale}><StoryLearning locale={locale}/><StoryGeneralization locale={locale}/><StoryHistory locale={locale}/><StoryAppendix locale={locale}/></DesignReview></div>;
}
