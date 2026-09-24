'use client';

import { useEffect } from 'react';
import { KindleFooter, KindleHeader, useKindleTheme } from './chrome';
import { oceanPost } from './ocean';
import type { Locale } from './theme';
import './kindle.css';

export const contactEmail = 'adriano.cunha@ufv.br';

// A home é só o blog: projetos e apresentação ficam nas páginas Projetos e Sobre.
export function KindleHome({ locale }: { locale: Locale }) {
  const t = (pt: string, en: string) => (locale === 'pt' ? pt : en);
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
          <h2 className="k-post-title"><a href={oceanPost(locale)}>{t('O dia mais quente do oceano desde 1979', 'The ocean’s warmest day since 1979')}</a></h2>
          <p className="k-post-desc">
            {t(
              'Em agosto de 2026 a superfície do mar bateu o recorde da série do ERA5, depois de 97 dias seguidos de recorde para a data. Com os gráficos, o código e a skill que usei para fazê-los.',
              'In August 2026 the sea surface broke the ERA5 series record, after 97 days in a row of record highs for the date. With the charts, the code and the skill I used to make them.',
            )}
          </p>
        </article>
        <article className="k-post">
          <p className="k-post-date"><time dateTime="2026-09">{t('Setembro de 2026', 'September 2026')}</time></p>
          <h2 className="k-post-title"><a href={`/${locale}`}>{t('Redes neurais, vistas de 1994', 'Neural networks, seen from 1994')}</a></h2>
          <p className="k-post-desc">
            {t(
              'Uma leitura interativa sobre a relação entre estatística e redes neurais, a partir de um artigo de 1994.',
              'An interactive reading of a 1994 paper exploring the relationship between statistics and neural networks.',
            )}
          </p>
        </article>
      </main>

      <KindleFooter />
    </div>
  );
}
