import type { Metadata } from 'next';
import { Experience } from '../experience';
import { KindleReader } from '../kindle/reader';

export const metadata: Metadata = {
  title: 'In 1994, two statisticians tried to predict the future of neural networks',
  description:
    'An interactive reading of a 1994 paper exploring the relationship between statistics and neural networks.',
};

export default function EnglishExperience() {
  return (
    <KindleReader locale="en">
      <Experience locale="en" />
    </KindleReader>
  );
}
