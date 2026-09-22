import type { Metadata } from 'next';
import { KindleAbout } from '../kindle/about';

export const metadata: Metadata = {
  title: 'Sobre mim | Adriano Pires Cunha',
  description: 'Adriano Pires Cunha, estatístico em transição para machine learning.',
};

export default function AboutPage() { return <KindleAbout locale="pt"/>; }
