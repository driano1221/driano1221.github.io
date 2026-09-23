'use client';

import { useEffect, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { ThemeSwatches, useKindleTheme } from './chrome';
import { Experience } from '../experience';
import type { Locale } from './theme';
import './kindle.css';
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

export function KindleReader({ locale }: { locale: Locale }) {
  const [readerLocale, setReaderLocale] = useState(locale);
  const t = (pt: string, en: string) => (readerLocale === 'pt' ? pt : en);
  const theme = useKindleTheme();
  const zoom = useSyncExternalStore(subscribeZoom, getZoomSnapshot, getServerZoom);
  const [panelOpen, setPanelOpen] = useState(false);

  // tema escolhido vira atributo global: remapeia os tokens do artigo
  useEffect(() => {
    document.documentElement.dataset.ktheme = theme;
  }, [theme]);

  return (
    <div className="k-reader" style={{ '--k-zoom': zoom } as CSSProperties}>
      <Experience locale={locale} onLocaleChange={setReaderLocale} />

      {panelOpen && (
        <dialog className="k-aa-panel" open aria-label={t('Configurações de exibição', 'Display settings')}>
          <h2>
            {t('Configurações de exibição', 'Display settings')}
            <button type="button" onClick={() => setPanelOpen(false)} aria-label={t('Fechar', 'Close')}>✕</button>
          </h2>
          <div className="k-aa-row">
            <span className="k-aa-lab">{t('Tema', 'Theme')}</span>
            <ThemeSwatches locale={readerLocale} theme={theme} />
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
    </div>
  );
}
