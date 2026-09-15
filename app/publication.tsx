'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import './publication.css';

type Locale = 'pt' | 'en';
export const notebookHome = (locale: Locale) => locale === 'pt' ? '/' : '/en/home';
export const notebookAbout = (locale: Locale) => locale === 'pt' ? '/sobre' : '/en/about';

export function PublicationHeader({ locale, page = 'home', onLocaleChange }: { locale: Locale; page?: 'home' | 'about'; onLocaleChange?: (locale: Locale) => void }) {
  const home = notebookHome(locale);
  return <header className={`publication-header${onLocaleChange ? ' story-nav' : ''}`}>
    <div><Link href={home} className="publication-brand">Inference Notes</Link><p className="publication-tagline">{locale === 'pt' ? 'Estatística, IA e a busca por pensar melhor.' : 'Statistics, AI, and the pursuit of clearer thinking.'}</p></div>
    <nav aria-label={locale === 'pt' ? 'Navegação principal' : 'Main navigation'}>
      <Link href={home}>{locale === 'pt' ? 'Textos' : 'Essays'}</Link>
      <Link href={`/${locale}`}>{locale === 'pt' ? 'Projeto' : 'Project'}</Link>
      <Link href={notebookAbout(locale)} aria-current={page === 'about' ? 'page' : undefined}>{locale === 'pt' ? 'Sobre mim' : 'About me'}</Link>
      <div className="publication-languages">{(['pt','en'] as const).map(value => onLocaleChange
        ? <button key={value} lang={value === 'pt' ? 'pt-BR' : 'en'} aria-pressed={locale === value} onClick={() => onLocaleChange(value)}>{value.toUpperCase()}</button>
        : <Link key={value} href={page === 'about' ? notebookAbout(value) : notebookHome(value)} lang={value === 'pt' ? 'pt-BR' : 'en'} aria-current={locale === value ? 'page' : undefined}>{value.toUpperCase()}</Link>)}</div>
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
          <ol className="publication-posts"><li><Link href={`/${locale}`}>
            <div className="publication-post-date"><time dateTime="2026-09">{t('SET. 2026', 'SEP 2026')}</time><span>{t('Em desenvolvimento', 'Work in progress')}</span></div>
            <div><h2>{t('Redes neurais, vistas de 1994.', 'Neural networks, seen from 1994.')}</h2><p>{t('Dois estatísticos tentaram prever o futuro das redes neurais. O que eles acertaram?', 'Two statisticians tried to predict the future of neural networks. What did they get right?')}</p><span className="publication-post-kind">{t('Leitura de um artigo · experimentos interativos', 'A paper revisited · interactive experiments')}</span></div><span className="publication-arrow" aria-hidden="true">→</span>
          </Link></li></ol>
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
        </nav>
      </main>
      <footer className="publication-footer"><span>© 2026 Adriano</span><Link href={notebookHome(locale)}>{t('Voltar aos textos', 'Back to essays')} →</Link></footer>
    </div>
  </div>;
}
