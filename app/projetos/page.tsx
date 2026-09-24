import type { Metadata } from 'next';
import { KindleProjects } from '../kindle/projects';

export const metadata: Metadata = {
  title: 'Projetos | Adriano Pires Cunha',
  description: 'Ferramentas e experimentos com código aberto de Adriano Pires Cunha.',
};

export default function ProjectsPage() { return <KindleProjects locale="pt"/>; }
