import type { Metadata } from 'next';
import { PublicationHome } from '../../publication';

export const metadata: Metadata = {
  title: 'Inference Notes · Adriano',
  description: 'A personal notebook on statistics, AI, and how we reason about an uncertain world. Essays and experiments by Adriano.',
};

export default function EnglishHome() {
  return <PublicationHome locale="en" />;
}
