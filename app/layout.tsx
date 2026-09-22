import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Inter, Literata, Newsreader } from 'next/font/google';
import './globals.css';

const editorial = Newsreader({
  variable: '--font-editorial',
  subsets: ['latin'],
  display: 'swap',
});

const interfaceFont = IBM_Plex_Sans({
  variable: '--font-interface',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const dataFont = IBM_Plex_Mono({
  variable: '--font-data',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

const literata = Literata({
  variable: '--font-literata',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Adriano Pires Cunha',
  description:
    'Blog e projetos sobre estatística e machine learning.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${editorial.variable} ${interfaceFont.variable} ${dataFont.variable} ${literata.variable} ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
