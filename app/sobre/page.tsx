import type { Metadata } from 'next';
import { PublicationAbout } from '../publication';

export const metadata: Metadata = {
  title: 'Sobre mim | Adriano Pires Cunha',
  description: 'Adriano Pires Cunha, estatístico em transição para machine learning.',
};

export default function AboutPage() { return <PublicationAbout locale="pt"/>; }
