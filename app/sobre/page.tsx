import type { Metadata } from 'next';
import { PublicationAbout } from '../publication';

export const metadata: Metadata = {
  title: 'Sobre mim — Inference Notes',
  description: 'Adriano: estatística, machine learning e um caderno de ideias para testar.',
};

export default function AboutPage() { return <PublicationAbout locale="pt"/>; }
