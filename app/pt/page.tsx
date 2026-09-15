import type { Metadata } from 'next';
import { Experience } from '../experience';

export const metadata: Metadata = {
  title: 'Em 1994, dois estatísticos tentaram prever o futuro das redes neurais',
  description:
    'Uma leitura interativa sobre a relação entre estatística e redes neurais, a partir de um artigo de 1994.',
};

export default function PortugueseExperience() {
  return <Experience locale="pt" />;
}
