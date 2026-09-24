'use client';

import { useEffect } from 'react';
import './publication.css';

type Locale = 'pt' | 'en';
export const notebookHome = (locale: Locale) => locale === 'pt' ? '/' : '/en/home';
export const notebookAbout = (locale: Locale) => locale === 'pt' ? '/sobre' : '/en/about';

export function PublicationHeader({ locale, page = 'home', onLocaleChange }: { locale: Locale; page?: 'home' | 'about'; onLocaleChange?: (locale: Locale) => void }) {
  const home = notebookHome(locale);
  return <header className={`publication-header${onLocaleChange ? ' story-nav' : ''}`}>
    <a href={home} className="publication-brand">Adriano Pires Cunha</a>
    <nav aria-label={locale === 'pt' ? 'Navegação principal' : 'Main navigation'}>
      <a href={home} aria-current={page === 'home' || onLocaleChange ? 'page' : undefined}>Blog</a>
      <a href={locale === 'pt' ? '/projetos' : '/en/projects'}>{locale === 'pt' ? 'Projetos' : 'Projects'}</a>
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
    <a href="#posts" className="publication-skip">{t('Pular para o blog', 'Skip to the blog')}</a>
    <div className="publication-home-sheet">
      <PublicationHeader locale={locale}/>
      <main>
        <section id="posts" aria-labelledby="blog-title">
          <h1 id="blog-title">Blog</h1>
          <ol className="publication-posts"><li>
            <div className="publication-post-date"><time dateTime="2026-09">{t('Setembro de 2026', 'September 2026')}</time></div>
            <h2><a href={`/${locale}`}>{t('Redes neurais, vistas de 1994', 'Neural networks, seen from 1994')}</a></h2>
            <p>{t('Uma leitura interativa sobre a relação entre estatística e redes neurais, a partir de um artigo de 1994.', 'An interactive reading of a 1994 paper exploring the relationship between statistics and neural networks.')}</p>
            <span className="publication-post-kind">{t('Em desenvolvimento', 'Work in progress')}</span>
          </li></ol>
        </section>
      </main>
      <footer className="publication-footer"><span>© 2026 Adriano Pires Cunha</span></footer>
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
        <h1>{t('Sobre mim', 'About me')}</h1>
        <p>{t('Sou Adriano Pires Cunha, estatístico em transição para machine learning. Tenho interesse na relação entre essas áreas, tanto nas técnicas que compartilham quanto nas diferenças que aparecem quando elas são aplicadas a um problema.', 'I’m Adriano Pires Cunha, a statistician moving into machine learning. I’m interested in how these fields relate, both in the techniques they share and in the differences that become apparent when they are applied to a problem.')}</p>
        <p>{t('O blog reúne leituras e projetos sobre esses assuntos. A ideia é acompanhar o raciocínio por trás dos métodos, com exemplos e referências que ajudem a entender de onde vieram e como são usados.', 'This blog brings together readings and projects on these topics. The aim is to follow the reasoning behind the methods, using examples and references to understand where they came from and how they are used.')}</p>
        <nav className="publication-socials" aria-label={t('Perfis profissionais', 'Professional profiles')}>
          <a href="https://github.com/driano1221" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a href="https://www.linkedin.com/in/adriano-pires-cunha/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href="https://rpubs.com/driano12" target="_blank" rel="noreferrer">RPubs <span aria-hidden="true">↗</span></a>
        </nav>
      </main>
      <footer className="publication-footer"><span>© 2026 Adriano Pires Cunha</span><a href={notebookHome(locale)}>{t('Voltar ao blog', 'Back to the blog')}</a></footer>
    </div>
  </div>;
}
