'use client';

import { useEffect } from 'react';
import { KindleFooter, KindleHeader, useKindleTheme } from './chrome';
import { oceanPost } from './ocean';
import { projectList, projectsPage } from './projects';
import type { Locale } from './theme';
import './kindle.css';

export const contactEmail = 'adriano.cunha@ufv.br';

export function KindleHome({ locale }: { locale: Locale }) {
  const t = (pt: string, en: string) => (locale === 'pt' ? pt : en);
  const theme = useKindleTheme();
  const about = locale === 'pt' ? '/sobre' : '/en/about';
  // resultado de cada projeto em uma frase, na ordem de projectList
  const results = [
    t('Com 250 ms de atraso nas ações, o agente perde para jogadas aleatórias: ele tinha aprendido reflexo, não estratégia.',
      'With 250 ms of action latency the agent loses to random play: it had learned reflexes, not strategy.'),
    t('Traduz livros técnicos de EPUB para EPUB sem desmontar tabelas, fórmulas e notas, com cada execução conferida.',
      'Translates technical books from EPUB to EPUB without breaking tables, formulas or notes, checking every run.'),
  ];

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  }, [locale]);

  return (
    <div className="k-home" data-ktheme={theme}>
      <a href="#publicacoes" className="k-skip">{t('Pular para as publicações', 'Skip to posts')}</a>

      <KindleHeader locale={locale} active="home" />

      <main className="k-main k-landing">
        <section className="k-intro" aria-labelledby="intro-name">
          <h1 id="intro-name" className="k-about-title">Adriano Pires Cunha</h1>
          <p className="k-seclabel">{t('Estatístico · Ciência de dados aplicada · Visualização', 'Statistician · Applied data science · Visualisation')}</p>
          <p className="k-about-p">
            {t(
              'Faço análises reproduzíveis, produtos de dados e explicações interativas para perguntas de pesquisa e de gestão. Sou formado em Estatística pela UFOP e faço mestrado em Ciência da Computação na UFV.',
              'I build reproducible analyses, data products and interactive explanations for research and management questions. I studied Statistics at UFOP and I am doing a master’s degree in Computer Science at UFV.',
            )}
          </p>
          <p className="k-intro-links">
            <a href={projectsPage(locale)}>{t('Projetos', 'Projects')}</a>
            <span aria-hidden="true"> · </span>
            <a href={about}>{t('Sobre mim', 'About me')}</a>
            <span aria-hidden="true"> · </span>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </section>

        <section aria-labelledby="projetos-title">
          <h2 className="k-seclabel" id="projetos-title">{t('Projetos', 'Projects')}</h2>
          <div className="k-cards">
            {projectList(locale).map((project, i) => (
              <a key={project.id} className="k-card" href={`${projectsPage(locale)}#${project.id}`}>
                <img src={project.image} width={project.width} height={project.height} alt="" loading="lazy" />
                <span className="k-card-title">{project.title}</span>
                <span className="k-card-text">{results[i]}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="publicacoes" aria-labelledby="blog-title">
          <h2 className="k-seclabel" id="blog-title">{t('Publicações', 'Blog')}</h2>
          <article className="k-post">
            <p className="k-post-date"><time dateTime="2026-09-23">{t('23 de setembro de 2026', '23 September 2026')}</time></p>
            <h3 className="k-post-title"><a href={oceanPost(locale)}>{t('O dia mais quente do oceano desde 1979', 'The ocean’s warmest day since 1979')}</a></h3>
            <p className="k-post-desc">
              {t(
                'Em agosto de 2026 a superfície do mar bateu o recorde da série do ERA5, depois de 97 dias seguidos de recorde para a data. Com os gráficos, o código e a skill que usei para fazê-los.',
                'In August 2026 the sea surface broke the ERA5 series record, after 97 days in a row of record highs for the date. With the charts, the code and the skill I used to make them.',
              )}
            </p>
          </article>
          <article className="k-post">
            <p className="k-post-date"><time dateTime="2026-09">{t('Setembro de 2026', 'September 2026')}</time></p>
            <h3 className="k-post-title"><a href={`/${locale}`}>{t('Redes neurais, vistas de 1994', 'Neural networks, seen from 1994')}</a></h3>
            <p className="k-post-desc">
              {t(
                'Uma leitura interativa sobre a relação entre estatística e redes neurais, a partir de um artigo de 1994.',
                'An interactive reading of a 1994 paper exploring the relationship between statistics and neural networks.',
              )}
            </p>
          </article>
        </section>
      </main>

      <KindleFooter locale={locale} theme={theme} />
    </div>
  );
}
