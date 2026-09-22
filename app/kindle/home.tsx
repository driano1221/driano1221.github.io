'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import './kindle.css';

type Locale = 'pt' | 'en';
type Theme = 'branco' | 'papel' | 'medio' | 'preto';

const STORAGE_KEY = 'kindle-theme';
const THEME_ORDER: Theme[] = ['branco', 'papel', 'medio', 'preto'];
const SWATCH_BG: Record<Theme, string> = {
  branco: '#f0f1ec',
  papel: '#ece3cd',
  medio: '#9c9d98',
  preto: '#111312',
};

const themeListeners = new Set<() => void>();
function subscribeTheme(listener: () => void) {
  themeListeners.add(listener);
  return () => { themeListeners.delete(listener); };
}
function getThemeSnapshot(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved && (THEME_ORDER as string[]).includes(saved) ? (saved as Theme) : 'branco';
}
function getServerTheme(): Theme {
  return 'branco';
}
function setStoredTheme(value: Theme) {
  localStorage.setItem(STORAGE_KEY, value);
  themeListeners.forEach((listener) => listener());
}

function IconHome() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9h13v-9" /></svg>;
}
function IconBook() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6.5c-1.8-1.6-4.4-2-8-2v13c3.6 0 6.2.4 8 2 1.8-1.6 4.4-2 8-2v-13c-3.6 0-6.2.4-8 2Z" /><path d="M12 6.5v13" /></svg>;
}
function IconFolder() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="7" width="17" height="13" rx="1.5" /><path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2" /></svg>;
}
function IconPerson() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.6" /><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" /></svg>;
}
function IconWifi() {
  return <svg viewBox="0 0 24 24" className="k-wifi" aria-hidden="true"><path d="M6 8.5a10 10 0 0 1 12 0M8.5 11.5a6.5 6.5 0 0 1 7 0M11 14.5a3 3 0 0 1 2 0" /><circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" /></svg>;
}

export function KindleHome({ locale }: { locale: Locale }) {
  const t = (pt: string, en: string) => (locale === 'pt' ? pt : en);
  const home = locale === 'pt' ? '/' : '/en/home';
  const about = locale === 'pt' ? '/sobre' : '/en/about';
  const projects = `/${locale}`;

  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerTheme);
  const [clock, setClock] = useState('');

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  }, [locale]);

  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString(locale === 'pt' ? 'pt-BR' : 'en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [locale]);

  return (
    <div className="k-home" data-ktheme={theme}>
      <a href="#publicacoes" className="k-skip">{t('Pular para as publicações', 'Skip to posts')}</a>

      <header className="k-status">
        <a className="k-brand" href={home}>
          <IconHome />
          Adriano Pires Cunha
        </a>
        <div className="k-meta">
          <span className="k-lang">
            <a href="/" lang="pt-BR" aria-current={locale === 'pt' ? 'page' : undefined}><b>PT</b></a>
            <span aria-hidden="true">·</span>
            <a href="/en/home" lang="en" aria-current={locale === 'en' ? 'page' : undefined}><b>EN</b></a>
          </span>
          <span suppressHydrationWarning>{clock}</span>
          <IconWifi />
        </div>
      </header>

      <nav className="k-nav" aria-label={t('Navegação principal', 'Main navigation')}>
        <a href={home} aria-current="page"><IconHome />{t('Início', 'Home')}</a>
        <a href={home}><IconBook />{t('Blog', 'Blog')}</a>
        <a href={projects}><IconFolder />{t('Projetos', 'Projects')}</a>
        <a href={about}><IconPerson />{t('Sobre', 'About')}</a>
      </nav>

      <main className="k-main" id="publicacoes">
        <p className="k-seclabel">{t('Publicações', 'Posts')}</p>
        <article className="k-post">
          <p className="k-post-date"><time dateTime="2026-09">{t('Setembro de 2026', 'September 2026')}</time></p>
          <h2 className="k-post-title"><a href={projects}>{t('Redes neurais, vistas de 1994', 'Neural networks, seen from 1994')}</a></h2>
          <p className="k-post-desc">
            {t(
              'Uma leitura interativa sobre a relação entre estatística e redes neurais, a partir de um artigo de 1994.',
              'An interactive reading of a 1994 paper exploring the relationship between statistics and neural networks.',
            )}
          </p>
          <span className="k-tag">{t('Em desenvolvimento', 'Work in progress')}</span>
        </article>
      </main>

      <footer className="k-footer">
        <span>© 2026 Adriano Pires Cunha</span>
        <span className="k-themes">
          <span>{t('Tema', 'Theme')}</span>
          {THEME_ORDER.map((value) => (
            <button
              key={value}
              type="button"
              className="k-swatch"
              style={{ background: SWATCH_BG[value] }}
              aria-pressed={theme === value}
              aria-label={t(
                `Tema ${value === 'branco' ? 'Padrão' : value === 'medio' ? 'Médio' : value}`,
                `Theme ${value === 'branco' ? 'Light' : value === 'medio' ? 'Gray' : value === 'papel' ? 'Sepia' : 'Black'}`,
              )}
              onClick={() => setStoredTheme(value)}
            />
          ))}
        </span>
      </footer>
    </div>
  );
}
