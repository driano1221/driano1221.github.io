export type Locale = 'pt' | 'en';
export type Theme = 'branco' | 'papel' | 'medio' | 'preto';

export const STORAGE_KEY = 'kindle-theme';
export const THEME_ORDER: Theme[] = ['branco', 'papel', 'medio', 'preto'];
export const SWATCH_BG: Record<Theme, string> = {
  branco: '#f7f4ea',
  papel: '#ece3cd',
  medio: '#9c9d98',
  preto: '#111312',
};

const listeners = new Set<() => void>();
export function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
export function getThemeSnapshot(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved && (THEME_ORDER as string[]).includes(saved) ? (saved as Theme) : 'branco';
}
export function getServerTheme(): Theme {
  return 'branco';
}
export function setStoredTheme(value: Theme) {
  localStorage.setItem(STORAGE_KEY, value);
  listeners.forEach(listener => listener());
}
export function themeLabel(value: Theme, locale: Locale) {
  const names = locale === 'pt'
    ? { branco: 'Padrão', papel: 'Papel', medio: 'Médio', preto: 'Preto' }
    : { branco: 'Light', papel: 'Sepia', medio: 'Gray', preto: 'Black' };
  return `${locale === 'pt' ? 'Tema' : 'Theme'} ${names[value]}`;
}
