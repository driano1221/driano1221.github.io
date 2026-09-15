import type { Metadata } from 'next';
import { PublicationAbout } from '../../publication';

export const metadata: Metadata = {
  title: 'About me | Adriano Pires Cunha',
  description: 'Adriano Pires Cunha, a statistician moving into machine learning.',
};

export default function AboutPage() { return <PublicationAbout locale="en"/>; }
