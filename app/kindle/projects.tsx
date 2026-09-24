'use client';

import { useEffect } from 'react';
import { KindleFooter, KindleHeader, useKindleTheme } from './chrome';
import type { Locale } from './theme';
import './kindle.css';

export const projectsPage = (locale: Locale) => locale === 'pt' ? '/projetos' : '/en/projects';

type Project = {
  id: string; title: string; image: string; width: number; height: number; alt: string;
  paragraphs: string[]; links: [string, string][];
};

export function projectList(locale: Locale): Project[] {
  const t = (pt: string, en: string) => locale === 'pt' ? pt : en;
  return [
    {
      id: 'space-cadet-rl',
      title: t('Um agente de reforço no Pinball do Windows', 'A reinforcement learning agent in Windows Pinball'),
      image: '/projetos/space-cadet.jpg', width: 900, height: 675,
      alt: t('Duas imagens da mesa do pinball, uma por flipper, com a posição da bola a cada vez que o agente aciona o flipper. Os pontos se espalham pela mesa inteira; só os poucos pontos verdes, junto aos flippers, são tacadas que acertam a bola.', 'Two views of the pinball table, one per flipper, showing where the ball was each time the agent pressed the flipper. The dots spread across the whole table; only the few green dots, next to the flippers, are presses that hit the ball.'),
      paragraphs: [
        t('Queria saber o que um agente de aprendizado por reforço realmente aprende quando joga 3D Pinball Space Cadet. Em vez de ler a tela, instrumentei a versão descompilada do jogo em C++: ganchos no laço de física expõem a posição e a velocidade da bola, o placar e os contadores de cada evento, e uma ligação com pybind11 leva esse estado para um ambiente Gymnasium, treinado com PPO. A física roda até 941 vezes mais rápido que o tempo real.',
          'I wanted to know what a reinforcement learning agent actually learns when it plays 3D Pinball Space Cadet. Instead of reading the screen, I instrumented the decompiled C++ game: hooks in the physics loop expose the ball’s position and velocity, the score and per-event counters, and a pybind11 binding carries that state into a Gymnasium environment trained with PPO. The physics runs up to 941 times faster than real time.'),
        t('O agente chega a uma pontuação mediana de 2,6 milhões, 4,3 vezes a de uma política aleatória. Mas quando as ações passam a ter 250 ms de atraso, algo próximo do tempo de reação humano, ele cai para 0,62 vez essa mesma política aleatória. A vantagem dele era controle reativo em alta frequência, não estratégia. Chegar a isso passou por uma dúzia de experimentos que falharam, todos registrados, com uma configuração por experimento e os dados exatos por trás de cada figura do artigo de 13 páginas.',
          'The agent reaches a median score of 2.6 million, 4.3 times that of a random policy. But once its actions carry 250 ms of latency, close to a human reaction time, it drops to 0.62 times that same random policy. Its edge was high-frequency reactive control, not strategy. Getting there took a dozen failed experiments, all recorded, with one configuration per experiment and the exact data behind every figure in the 13-page article.'),
      ],
      links: [
        [t('Artigo', 'Article'), 'https://driano1221.github.io/space-cadet-rl/'],
        [t('Código', 'Code'), 'https://github.com/driano1221/space-cadet-rl'],
      ],
    },
    {
      id: 'oficina-traducao',
      title: t('Oficina de Tradução Editorial', 'Editorial Translation Workshop'),
      image: '/projetos/oficina.jpg', width: 900, height: 834,
      alt: t('Original em inglês e tradução para o português lado a lado, com a tabela, a equação e a nota preservadas.', 'English original and Portuguese translation side by side, with the table, equation and note preserved.'),
      paragraphs: [
        t('Precisava estudar livros técnicos em português sem que a tradução transformasse notas em parágrafos soltos, perdesse legendas ou desmontasse tabelas e fórmulas. Fiz um aplicativo local para Windows que traduz PDF e EPUB para o português brasileiro. No caminho mais fiel, EPUB para EPUB, ele troca o texto dentro do próprio pacote do livro e mantém a estrutura original. PDF para PDF funciona como modo de estudo, sem prometer a mesma diagramação.',
          'I needed to study technical books in Portuguese without the translation turning notes into loose paragraphs, losing captions or breaking tables and formulas. I built a local Windows app that translates PDF and EPUB into Brazilian Portuguese. In its most faithful path, EPUB to EPUB, it replaces the text inside the book’s own package and keeps the original structure. PDF to PDF works as a study mode, without promising the same layout.'),
        t('No teste com um livro aberto de estatística, uma seção inteira passou pelo aplicativo: 119 elementos traduzidos, duas tabelas e 12 fórmulas, com valores, imagens, identificadores e links internos conferidos contra o original. O equivalente em custo de API ficou registrado em US$ 0,79 para esse trecho, junto com um relatório de validação da execução. Um minilivro sintético, com dados fictícios, serve para testar o pipeline.',
          'In a test with an open statistics textbook, a full section went through the app: 119 translated elements, two tables and 12 formulas, with values, images, identifiers and internal links checked against the original. The API-equivalent cost was recorded at US$0.79 for that section, along with a validation report for the run. A synthetic mini-book with fictional data is used to test the pipeline.'),
      ],
      links: [[t('Código e exemplos', 'Code and examples'), 'https://github.com/driano1221/oficina-traducao-editorial']],
    },
  ];
}

export function KindleProjects({ locale }: { locale: Locale }) {
  const t = (pt: string, en: string) => locale === 'pt' ? pt : en;
  const theme = useKindleTheme();
  useEffect(() => { document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'; }, [locale]);

  return <div className="k-home" data-ktheme={theme}>
    <a href="#projetos" className="k-skip">{t('Pular para os projetos', 'Skip to projects')}</a>
    <KindleHeader locale={locale} active="projects" langHrefs={{ pt: projectsPage('pt'), en: projectsPage('en') }}/>
    <main className="k-main k-article" id="projetos">
      <p className="k-seclabel">{t('Projetos', 'Projects')}</p>
      <h1 className="k-about-title">{t('O que construí', 'What I have built')}</h1>
      <p className="k-article-deck">{t(
        'Ferramentas e experimentos com código aberto, cada um com os dados e as verificações que sustentam o que está escrito aqui. Os textos mais longos, com análises e leituras, ficam no blog.',
        'Tools and experiments with open code, each with the data and checks behind what is written here. Longer pieces, with analyses and readings, are on the blog.',
      )}</p>
      {projectList(locale).map(project => <article key={project.id} id={project.id} className="k-project">
        <h2 className="k-post-title">{project.title}</h2>
        <figure>
          <img src={project.image} width={project.width} height={project.height} loading="lazy" alt={project.alt}/>
        </figure>
        {project.paragraphs.map(text => <p key={text.slice(0, 24)}>{text}</p>)}
        <p className="k-project-links">{project.links.map(([label, href], i) => <span key={href}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          <a href={href} target="_blank" rel="noreferrer">{label} <span aria-hidden="true">↗</span></a>
        </span>)}</p>
      </article>)}
    </main>
    <KindleFooter locale={locale} theme={theme}/>
  </div>;
}
