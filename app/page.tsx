import type { Metadata } from 'next';
import { KindleHome } from './kindle/home';

export const metadata: Metadata = {
  title: 'Adriano Pires Cunha',
  description: 'Blog e projetos de Adriano Pires Cunha sobre estatística e machine learning.',
};

export default function Home() {
  return <KindleHome locale="pt" />;
}
