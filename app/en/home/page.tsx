import type { Metadata } from 'next';
import { KindleHome } from '../../kindle/home';

export const metadata: Metadata = {
  title: 'Adriano Pires Cunha',
  description: 'Adriano Pires Cunha’s blog and projects on statistics and machine learning.',
};

export default function EnglishHome() {
  return <KindleHome locale="en" />;
}
