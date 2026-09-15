import type { Metadata } from 'next';
import { Experience } from '../experience';

export const metadata: Metadata = {
  title: 'In 1994, two statisticians tried to predict the future of neural networks',
  description:
    'Inside neural networks: calculations, learning, double descent and the enduring questions of a paper from 1994.',
};

export default function EnglishExperience() {
  return <Experience locale="en" />;
}
