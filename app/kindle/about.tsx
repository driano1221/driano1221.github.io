'use client';

import { useEffect } from 'react';
import { KindleFooter, KindleHeader, useKindleTheme } from './chrome';
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
            'Sou Adriano Pires Cunha, estatístico em transição para machine learning. Tenho interesse na relação entre essas áreas, tanto nas técnicas que compartilham quanto nas diferenças que aparecem quando elas são aplicadas a um problema.',
            'I’m Adriano Pires Cunha, a statistician moving into machine learning. I’m interested in how these fields relate, both in the techniques they share and in the differences that become apparent when they are applied to a problem.',
          )}
        </p>
        <p className="k-about-p">
          {t(
            'O blog reúne leituras e projetos sobre esses assuntos. A ideia é acompanhar o raciocínio por trás dos métodos, com exemplos e referências que ajudem a entender de onde vieram e como são usados.',
            'This blog brings together readings and projects on these topics. The aim is to follow the reasoning behind the methods, using examples and references to understand where they came from and how they are used.',
          )}
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
