import type { Metadata } from 'next';
import { KindleMoths } from '../kindle/moths';

export const metadata: Metadata = {
  title: '15 mil mariposas de papel | Adriano Pires Cunha',
  description: 'Uma reanálise com curvas de sobrevivência do experimento global da Science com mariposas de papel em 21 bosques.',
};

export default function MothsPostPage() { return <KindleMoths locale="pt"/>; }
