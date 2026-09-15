import type { Metadata } from 'next';
import { NotebookPreview } from './preview';
import './preview.css';

export const metadata: Metadata = {
  title: 'Adriano · Prévia do portfólio',
  description: 'Uma página pessoal e um trecho interativo sobre redes neurais.',
  robots: { index: false, follow: false },
};

export default function NotebookPage() {
  return <NotebookPreview />;
}
