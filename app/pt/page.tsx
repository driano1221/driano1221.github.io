import type { Metadata } from 'next';
import { KindleReader } from '../kindle/reader';

export const metadata: Metadata = {
  title: 'Em 1994, dois estatísticos tentaram prever o futuro das redes neurais',
  description:
    'Uma leitura interativa sobre a relação entre estatística e redes neurais, a partir de um artigo de 1994.',
};

export default function PortugueseExperience() {
  return <KindleReader locale="pt" />;
}
