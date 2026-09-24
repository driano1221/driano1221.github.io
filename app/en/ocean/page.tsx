import type { Metadata } from 'next';
import { OceanPost } from '../../ocean-post';

export const metadata: Metadata = {
  title: 'The warmest ocean since 1979 | Adriano Pires Cunha',
  description: 'A test of the skill that makes AI agents follow my design rules, using Copernicus daily sea surface temperature data.',
};

export default function EnglishOceanPostPage() { return <OceanPost locale="en"/>; }
