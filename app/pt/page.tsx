import type { Metadata } from 'next';
import { Experience } from '../experience';

export const metadata: Metadata = {
  title: 'Em 1994, dois estatísticos tentaram prever o futuro das redes neurais',
  description:
    'Por dentro das redes neurais: contas, aprendizado, double descent e as perguntas de um artigo de 1994 que continuam importantes.',
};

export default function PortugueseExperience() {
  return <Experience locale="pt" />;
}
