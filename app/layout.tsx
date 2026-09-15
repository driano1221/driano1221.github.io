import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from 'next/font/google';
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
        className={`${editorial.variable} ${interfaceFont.variable} ${dataFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
