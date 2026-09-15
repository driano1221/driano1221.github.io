'use client';

import { useEffect } from 'react';
import './publication.css';

type Locale = 'pt' | 'en';
export const notebookHome = (locale: Locale) => locale === 'pt' ? '/' : '/en/home';
export const notebookAbout = (locale: Locale) => locale === 'pt' ? '/sobre' : '/en/about';

export function PublicationHeader({ locale, page = 'home', onLocaleChange }: { locale: Locale; page?: 'home' | 'about'; onLocaleChange?: (locale: Locale) => void }) {
  const home = notebookHome(locale);
  return <header className={`publication-header${onLocaleChange ? ' story-nav' : ''}`}>
    <div><a href={home} className="publication-brand">Inference Notes</a><p className="publication-tagline">{locale === 'pt' ? 'Estatística, IA e a busca por pensar melhor.' : 'Statistics, AI, and the pursuit of clearer thinking.'}</p></div>
    <nav aria-label={locale === 'pt' ? 'Navegação principal' : 'Main navigation'}>
      <a href={home}>{locale === 'pt' ? 'Textos' : 'Essays'}</a>
      <a href={`/${locale}`}>{locale === 'pt' ? 'Projeto' : 'Project'}</a>
      <a href={notebookAbout(locale)} aria-current={page === 'about' ? 'page' : undefined}>{locale === 'pt' ? 'Sobre mim' : 'About me'}</a>
      <div className="publication-languages">{(['pt','en'] as const).map(value => onLocaleChange
        ? <button key={value} lang={value === 'pt' ? 'pt-BR' : 'en'} aria-pressed={locale === value} onClick={() => onLocaleChange(value)}>{value.toUpperCase()}</button>
        : <a key={value} href={page === 'about' ? notebookAbout(value) : notebookHome(value)} lang={value === 'pt' ? 'pt-BR' : 'en'} aria-current={locale === value ? 'page' : undefined}>{value.toUpperCase()}</a>)}</div>
    </nav>
  </header>;
}

export function PublicationHome({ locale }: { locale: Locale }) {
  const t = (pt: string, en: string) => locale === 'pt' ? pt : en;
  useEffect(() => { document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'; }, [locale]);
  return <div className="publication-home">
    <a href="#posts" className="publication-skip">{t('Pular para os textos', 'Skip to the essays')}</a>
    <div className="publication-home-sheet">
      <PublicationHeader locale={locale}/>
      <main>
        <section className="publication-intro"><h1>{t('Melhores perguntas.', 'Better questions.')}<br/>{t('Ideias mais claras.', 'Clearer thinking.')}</h1><div className="publication-rule"/><p>{t('Um caderno pessoal sobre estatística, IA', 'A personal notebook on statistics, AI,')}<br/>{t('e como pensamos num mundo incerto.', 'and how we reason about an uncertain world.')}</p></section>
        <section id="posts" aria-label={t('Textos e projetos', 'Essays and projects')}>
          <ol className="publication-posts"><li><a href={`/${locale}`}>
            <div className="publication-post-date"><time dateTime="2026-09">{t('SET. 2026', 'SEP 2026')}</time><span>{t('Em desenvolvimento', 'Work in progress')}</span></div>
            <div><h2>{t('Redes neurais, vistas de 1994.', 'Neural networks, seen from 1994.')}</h2><p>{t('Dois estatísticos tentaram prever o futuro das redes neurais. O que eles acertaram?', 'Two statisticians tried to predict the future of neural networks. What did they get right?')}</p><span className="publication-post-kind">{t('Leitura de um artigo · experimentos interativos', 'A paper revisited · interactive experiments')}</span></div><span className="publication-arrow" aria-hidden="true">→</span>
          </a></li></ol>
        </section>
      </main>
      <footer className="publication-footer"><span>© 2026 Adriano</span><span>{t('Estatística & machine learning', 'Statistics & machine learning')}</span></footer>
    </div>
  </div>;
}

export function PublicationAbout({ locale }: { locale: Locale }) {
  const t = (pt: string, en: string) => locale === 'pt' ? pt : en;
  useEffect(() => { document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'; }, [locale]);
  return <div className="publication-home">
    <a href="#about" className="publication-skip">{t('Pular para o conteúdo', 'Skip to content')}</a>
    <div className="publication-home-sheet">
      <PublicationHeader locale={locale} page="about"/>
      <main className="publication-about" id="about">
        <h1>{t('Sou Adriano. Venho da estatística.', 'I’m Adriano. My background is in statistics.')}</h1>
        <p>{t('Estou em transição para machine learning. Gosto de abrir as contas, testar ideias e entender onde uma explicação deixa de funcionar.', 'I’m transitioning into machine learning. I like opening up the calculations, testing ideas, and finding where an explanation stops working.')}</p>
        <p>{t('Este caderno é parte disso. Escrevo sobre o que entendi — e sobre o que ainda não entendi. Quando dá, transformo a explicação em algo que você pode mexer e testar também.', 'This notebook is part of that. I write about what I understand — and what I still don’t. Whenever possible, I turn the explanation into something you can change and test yourself.')}</p>
        <nav className="publication-socials" aria-label={t('Perfis profissionais', 'Professional profiles')}>
          <a href="https://github.com/driano1221" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a href="https://www.linkedin.com/in/adriano-pires-cunha/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href="https://rpubs.com/driano12" target="_blank" rel="noreferrer">RPubs <span aria-hidden="true">↗</span></a>
        </nav>
      </main>
      <footer className="publication-footer"><span>© 2026 Adriano</span><a href={notebookHome(locale)}>{t('Voltar aos textos', 'Back to essays')} →</a></footer>
    </div>
  </div>;
}
