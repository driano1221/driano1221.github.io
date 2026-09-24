import type { Metadata } from 'next';
import { KindleProjects } from '../../kindle/projects';

export const metadata: Metadata = {
  title: 'Projects | Adriano Pires Cunha',
  description: 'Open-source tools and experiments by Adriano Pires Cunha.',
};

export default function EnglishProjectsPage() { return <KindleProjects locale="en"/>; }
