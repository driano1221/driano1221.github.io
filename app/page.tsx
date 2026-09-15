import type { Metadata } from 'next';
import { PublicationHome } from './publication';

export const metadata: Metadata = {
  title: 'Inference Notes · Adriano',
  description: 'Um caderno pessoal sobre estatística, IA e como pensamos num mundo incerto. Textos e experimentos de Adriano.',
};

export default function Home() {
  return <PublicationHome locale="pt" />;
}
