import type { Metadata } from 'next';
import { KindleOcean } from '../../kindle/ocean';

export const metadata: Metadata = {
  title: 'The warmest ocean since 1979 | Adriano Pires Cunha',
  description: 'A test of the skill that makes AI agents follow my design rules, using Copernicus daily sea surface temperature data.',
};

export default function EnglishOceanPostPage() { return <KindleOcean locale="en"/>; }
