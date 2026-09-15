import type { Metadata } from 'next';
import { PublicationHome } from '../../publication';

export const metadata: Metadata = {
  title: 'Adriano Pires Cunha',
  description: 'Adriano Pires Cunha’s blog and projects on statistics and machine learning.',
};

export default function EnglishHome() {
  return <PublicationHome locale="en" />;
}
