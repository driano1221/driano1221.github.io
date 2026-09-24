'use client';

import { useEffect } from 'react';
import { KindleFooter, KindleHeader, useKindleTheme } from './chrome';
import { contactEmail } from './home';
import type { Locale } from './theme';
import './kindle.css';

export function KindleAbout({ locale }: { locale: Locale }) {
  const t = (pt: string, en: string) => (locale === 'pt' ? pt : en);
  const theme = useKindleTheme();

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  }, [locale]);

  return (
    <div className="k-home" data-ktheme={theme}>
      <a href="#about" className="k-skip">{t('Pular para o conteúdo', 'Skip to content')}</a>

      <KindleHeader locale={locale} active="about" langHrefs={{ pt: '/sobre', en: '/en/about' }} />

      <main className="k-main k-about" id="about">
        <p className="k-seclabel">{t('O autor', 'About the author')}</p>
        <h1 className="k-about-title">{t('Sobre mim', 'About me')}</h1>
        <p className="k-about-p">
          {t(
            'Sou Adriano Pires Cunha, estatístico formado pela UFOP e mestrando em Ciência da Computação na UFV. Trabalho com dados em pesquisa e em projetos aplicados, e sou assistente de pesquisa no Ipea, onde estudo os consórcios públicos intermunicipais.',
            'I’m Adriano Pires Cunha, a statistician who studied at UFOP and a master’s student in Computer Science at UFV. I work with data in research and applied projects, and I am a research assistant at Ipea, where I study inter-municipal public consortia in Brazil.',
          )}
        </p>
        <p className="k-about-p">
          {t(
            'O que mais me interessa é a relação entre a estatística e o machine learning, tanto nas técnicas que as duas compartilham quanto nas diferenças que aparecem quando elas encontram um problema real. No dia a dia isso vira análise reproduzível, visualização e ferramentas que ajudam a responder perguntas de pesquisa e de gestão.',
            'What interests me most is the relationship between statistics and machine learning, both in the techniques they share and in the differences that show up when they meet a real problem. Day to day, that becomes reproducible analysis, visualisation and tools that help answer research and management questions.',
          )}
        </p>
        <p className="k-about-p">
          {t(
            'O blog reúne leituras e análises, e a página de projetos mostra o que construí, com código e dados abertos sempre que possível. Para falar comigo, escreva para ',
            'The blog collects readings and analyses, and the projects page shows what I have built, with open code and data whenever possible. To get in touch, write to ',
          )}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
        <nav className="k-about-links" aria-label={t('Perfis profissionais', 'Professional profiles')}>
          <a href="https://github.com/driano1221" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a href="https://www.linkedin.com/in/adriano-pires-cunha/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href="https://rpubs.com/driano12" target="_blank" rel="noreferrer">RPubs <span aria-hidden="true">↗</span></a>
        </nav>
      </main>

      <KindleFooter locale={locale} theme={theme} />
    </div>
  );
}
