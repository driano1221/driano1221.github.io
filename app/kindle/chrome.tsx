'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  SWATCH_BG, THEME_ORDER, getServerTheme, getThemeSnapshot, setStoredTheme, subscribeTheme, themeLabel,
  type Locale, type Theme,
} from './theme';

export function IconHome() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9h13v-9" /></svg>;
}
export function IconWifi() {
  return <svg viewBox="0 0 24 24" className="k-wifi" aria-hidden="true"><path d="M6 8.5a10 10 0 0 1 12 0M8.5 11.5a6.5 6.5 0 0 1 7 0M11 14.5a3 3 0 0 1 2 0" /><circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" /></svg>;
}

export function useKindleTheme(): Theme {
  return useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerTheme);
}

export function KindleClock({ locale }: { locale: Locale }) {
  const [clock, setClock] = useState('');
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString(locale === 'pt' ? 'pt-BR' : 'en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [locale]);
  return <span suppressHydrationWarning>{clock}</span>;
}

export function ThemeSwatches({ locale, theme }: { locale: Locale; theme: Theme }) {
  return (
    <span className="k-themes">
      {THEME_ORDER.map((value) => (
        <button
          key={value}
          type="button"
          className="k-swatch"
          style={{ background: SWATCH_BG[value] }}
          aria-pressed={theme === value}
          aria-label={themeLabel(value, locale)}
          onClick={() => setStoredTheme(value)}
        />
      ))}
    </span>
  );
}

export function KindleHeader({ locale, active, langHrefs }: {
  locale: Locale;
  active: 'home' | 'projects' | 'about' | null;
  /** Sobrescreve os destinos do seletor de idioma (página Sobre aponta para a tradução). */
  langHrefs?: { pt: string; en: string };
}) {
  const t = (pt: string, en: string) => (locale === 'pt' ? pt : en);
  const home = locale === 'pt' ? '/' : '/en/home';
  const projects = `/${locale}`;
  const about = locale === 'pt' ? '/sobre' : '/en/about';
  const ptHref = langHrefs?.pt ?? '/';
  const enHref = langHrefs?.en ?? '/en/home';
  return (
    <header className="k-header">
      <a className="k-brand" href={home}>
        <IconHome />
        Adriano Pires Cunha
      </a>
      <nav className="k-nav" aria-label={t('Navegação principal', 'Main navigation')}>
        <a href={home} aria-current={active === 'home' ? 'page' : undefined}>{t('Início', 'Home')}</a>
        <a href={home}>{t('Blog', 'Blog')}</a>
        <a href={projects} aria-current={active === 'projects' ? 'page' : undefined}>{t('Projetos', 'Projects')}</a>
        <a href={about} aria-current={active === 'about' ? 'page' : undefined}>{t('Sobre', 'About')}</a>
      </nav>
      <div className="k-meta">
        <span className="k-lang">
          <a href={ptHref} lang="pt-BR" aria-current={locale === 'pt' ? 'page' : undefined}><b>PT</b></a>
          <span aria-hidden="true">·</span>
          <a href={enHref} lang="en" aria-current={locale === 'en' ? 'page' : undefined}><b>EN</b></a>
        </span>
        <KindleClock locale={locale} />
        <IconWifi />
      </div>
    </header>
  );
}

export function KindleFooter({ locale, theme }: { locale: Locale; theme: Theme }) {
  return (
    <footer className="k-footer">
      <span>© 2026 Adriano Pires Cunha</span>
      <span className="k-themes-wrap">
        <span>{locale === 'pt' ? 'Tema' : 'Theme'}</span>
        <ThemeSwatches locale={locale} theme={theme} />
      </span>
    </footer>
  );
}
