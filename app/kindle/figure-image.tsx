import Image from 'next/image';
import type { Locale } from './theme';

export function FigureImage({ src, alt, width, height, locale, loading = 'lazy' }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  locale: Locale;
  loading?: 'eager' | 'lazy';
}) {
  const hint = locale === 'pt' ? 'Ampliar imagem ↗' : 'Open full-size image ↗';
  return <a className="k-image-link" href={src} target="_blank" rel="noreferrer" aria-label={`${hint}: ${alt}`}>
    <Image src={src} alt={alt} width={width} height={height} loading={loading} unoptimized />
    <span className="k-image-hint" aria-hidden="true">{hint}</span>
  </a>;
}
