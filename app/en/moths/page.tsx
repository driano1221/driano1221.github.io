import type { Metadata } from 'next';
import { KindleMoths } from '../../kindle/moths';

export const metadata: Metadata = {
  title: '15,000 paper moths | Adriano Pires Cunha',
  description: 'A survival-curve reanalysis of the global Science experiment with paper moths in 21 woods.',
};

export default function EnglishMothsPostPage() { return <KindleMoths locale="en"/>; }
