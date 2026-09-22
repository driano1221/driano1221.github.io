'use client';

import { useEffect, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { ThemeSwatches, useKindleTheme } from './chrome';
import type { Locale } from './theme';
import './reader.css';

const ZOOM_KEY = 'kindle-zoom';
const zoomListeners = new Set<() => void>();
function subscribeZoom(listener: () => void) {
  zoomListeners.add(listener);
  return () => { zoomListeners.delete(listener); };
}
function getZoomSnapshot(): number {
  const saved = Number(localStorage.getItem(ZOOM_KEY));
  return [0.9, 1, 1.15, 1.3].includes(saved) ? saved : 1;
}
function getServerZoom(): number {
  return 1;
}
function setStoredZoom(value: number) {
  localStorage.setItem(ZOOM_KEY, String(value));
  zoomListeners.forEach(listener => listener());
}

export function KindleReader({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = (pt: string, en: string) => (locale === 'pt' ? pt : en);
  const theme = useKindleTheme();
  const zoom = useSyncExternalStore(subscribeZoom, getZoomSnapshot, getServerZoom);
  const [panelOpen, setPanelOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [words, setWords] = useState(0);

  // tema escolhido vira atributo global: remapeia os tokens do artigo
  useEffect(() => {
    document.documentElement.dataset.ktheme = theme;
  }, [theme]);

  // contagem de palavras do texto (para localização e minutos restantes)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const story = document.querySelector('.publication-story');
      if (story) setWords((story.textContent ?? '').trim().split(/\s+/).length);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      });
    };
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const locations = Math.max(1, Math.ceil(words / 25));
  const location = Math.max(1, Math.ceil(locations * progress));
  const minutes = Math.max(1, Math.ceil((words * (1 - progress)) / 220));
  const pct = Math.round(progress * 100);

  return (
    <div className="k-reader" style={{ '--k-zoom': zoom } as CSSProperties}>
      {children}

      {panelOpen && (
        <dialog className="k-aa-panel" open aria-label={t('Configurações de exibição', 'Display settings')}>
          <h2>
            {t('Configurações de exibição', 'Display settings')}
            <button type="button" onClick={() => setPanelOpen(false)} aria-label={t('Fechar', 'Close')}>✕</button>
          </h2>
          <div className="k-aa-row">
            <span className="k-aa-lab">{t('Tema', 'Theme')}</span>
            <ThemeSwatches locale={locale} theme={theme} />
          </div>
          <div className="k-aa-row">
            <span className="k-aa-lab">{t('Tamanho', 'Size')}</span>
            <span className="k-seg">
              <button type="button" aria-pressed={zoom === 0.9} onClick={() => setStoredZoom(0.9)} aria-label={t('Menor', 'Smaller')}>A−</button>
              <button type="button" aria-pressed={zoom === 1} onClick={() => setStoredZoom(1)}>Aa</button>
              <button type="button" aria-pressed={zoom === 1.15} onClick={() => setStoredZoom(1.15)} aria-label={t('Maior', 'Larger')}>A+</button>
              <button type="button" aria-pressed={zoom === 1.3} onClick={() => setStoredZoom(1.3)} aria-label={t('Máximo', 'Largest')}>A++</button>
            </span>
          </div>
        </dialog>
      )}

      <button
        type="button"
        className="k-aa-fab"
        aria-expanded={panelOpen}
        aria-label={t('Configurações de exibição', 'Display settings')}
        onClick={() => setPanelOpen(open => !open)}
      >
        Aa
      </button>

      <div className="k-progress" aria-hidden="true">
        <div className="track"><div className="fill" style={{ width: `${pct}%` }} /></div>
        <div className="meta">
          <span>{t('Localização', 'Location')} {location} {t('de', 'of')} {locations}</span>
          <span>{pct}% · ~{minutes} {t('min restantes', 'min left')}</span>
        </div>
      </div>
    </div>
  );
}
