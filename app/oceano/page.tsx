import type { Metadata } from 'next';
import { KindleOcean } from '../kindle/ocean';

export const metadata: Metadata = {
  title: 'O oceano mais quente desde 1979 | Adriano Pires Cunha',
  description: 'Um teste da skill que faz agentes de IA seguirem minhas regras de design, com os dados diários de temperatura do mar do Copernicus.',
};

export default function OceanPostPage() { return <KindleOcean locale="pt"/>; }
