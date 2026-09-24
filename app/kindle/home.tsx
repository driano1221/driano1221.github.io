'use client';

import { useEffect } from 'react';
import { KindleFooter, KindleHeader, useKindleTheme } from './chrome';
import { oceanPost } from './ocean';
import type { Locale } from './theme';
import './kindle.css';

export function KindleHome({ locale }: { locale: Locale }) {
  const t = (pt: string, en: string) => (locale === 'pt' ? pt : en);
  const post = `/${locale}`;
  const theme = useKindleTheme();

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  }, [locale]);

  return (
    <div className="k-home" data-ktheme={theme}>
      <a href="#publicacoes" className="k-skip">{t('Pular para as publicações', 'Skip to posts')}</a>

      <KindleHeader locale={locale} active="home" />

      <main className="k-main" id="publicacoes">
        <h1 className="k-seclabel" id="blog-title">{t('Publicações', 'Blog')}</h1>
        <article className="k-post">
          <p className="k-post-date"><time dateTime="2026-09-23">{t('23 de setembro de 2026', '23 September 2026')}</time></p>
          <h2 className="k-post-title"><a href={oceanPost(locale)}>{t('O oceano mais quente desde 1979, e a skill que usei para desenhá-lo', 'The warmest ocean since 1979, and the skill I used to chart it')}</a></h2>
          <p className="k-post-desc">
            {t(
              'Um teste da skill que faz agentes de IA seguirem minhas regras de design, com os dados diários de temperatura do mar do Copernicus.',
              'A test of the skill that makes AI agents follow my design rules, using Copernicus daily sea surface temperature data.',
            )}
          </p>
        </article>
        <article className="k-post">
          <p className="k-post-date"><time dateTime="2026-09">{t('Setembro de 2026', 'September 2026')}</time></p>
          <h2 className="k-post-title"><a href={post}>{t('Redes neurais, vistas de 1994', 'Neural networks, seen from 1994')}</a></h2>
          <p className="k-post-desc">
            {t(
              'Uma leitura interativa sobre a relação entre estatística e redes neurais, a partir de um artigo de 1994.',
              'An interactive reading of a 1994 paper exploring the relationship between statistics and neural networks.',
            )}
          </p>
          <span className="k-tag">{t('Em desenvolvimento', 'Work in progress')}</span>
        </article>
      </main>

      <KindleFooter locale={locale} theme={theme} />
    </div>
  );
}
