'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Slider } from '@/components/ui/slider';
import { Network } from '../direcoes/review';

const DOI = 'https://doi.org/10.1214/ss/1177010638';

export function NotebookPreview() {
  const [locale, setLocale] = useState<'pt' | 'en'>('pt');
  const [view, setView] = useState<'together' | 'home' | 'article'>('together');
  const [a, setA] = useState(7);
  const [b, setB] = useState(3);
  const [focus, setFocus] = useState(-1);
  const t = (pt: string, en: string) => locale === 'pt' ? pt : en;
  const left = Math.max(0, a - b), right = Math.max(0, b - a);
  const result = (left + a + b + right) / 2;
  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
    document.title = locale === 'pt' ? 'Adriano · Prévia do portfólio' : 'Adriano · Portfolio preview';
  }, [locale]);

  function open(next: typeof view) {
    setView(next);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  return <div className="notebook" lang={locale === 'pt' ? 'pt-BR' : 'en'}>
    <a className="nb-skip" href="#nb-content">{t('Pular para o conteúdo', 'Skip to content')}</a>
    <nav className="nb-preview" aria-label={t('Comparar a proposta', 'Compare the proposal')}>
      <span>{t('Prévia para aprovação', 'Preview for approval')}</span>
      <div>{(['together', 'home', 'article'] as const).map((item, i) =>
        <button key={item} aria-pressed={view === item} onClick={() => open(item)}>{[t('Lado a lado', 'Side by side'), t('Página inicial', 'Home'), t('Trecho do artigo', 'Article excerpt')][i]}</button>
      )}</div>
      <div aria-label={t('Idioma', 'Language')}>
        <button lang="pt-BR" aria-pressed={locale === 'pt'} onClick={() => setLocale('pt')}>PT</button>
        <button lang="en" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
      </div>
    </nav>

    <main id="nb-content" className={`nb-pages nb-view-${view}`}>
      <section className="nb-home" aria-labelledby="nb-name" hidden={view === 'article'}>
        <header className="nb-home-header"><h1 id="nb-name">Adriano</h1>
          <p>{t('Estatística, machine learning e algumas perguntas pelo caminho.', 'Statistics, machine learning, and a few questions along the way.')}</p>
        </header>
        <p>{t('Sou estatístico, em transição para machine learning. Este é o lugar onde reúno o que estudo e construo.', 'I’m a statistician moving into machine learning. This is where I collect what I study and build.')}</p>
        <h2>{t('Projetos e textos', 'Projects and writing')}</h2>
        <ol className="nb-index"><li>
          <a href="#nb-article" onClick={event => { event.preventDefault(); open('article'); }}>{t('O que dois estatísticos viram nas redes neurais em 1994?', 'What did two statisticians see in neural networks in 1994?')}</a>
          <span className="nb-meta">{t('Em desenvolvimento · 2026', 'Work in progress · 2026')}</span>
          <p>{t('Voltei ao artigo de Cheng e Titterington. Algumas perguntas envelheceram bem. Outras ganharam respostas bem estranhas. Aqui, dá para mexer nas contas.', 'I went back to Cheng and Titterington’s paper. Some questions aged well. Others got rather strange answers. Here, you can play with the calculations.')}</p>
        </li></ol>
        <footer className="nb-home-footer"><p>{t('Uma pergunta de cada vez.', 'One question at a time.')}</p><span>{t('Português e inglês.', 'Portuguese and English.')}</span></footer>
      </section>

      <article id="nb-article" className="nb-article" aria-labelledby="nb-title" hidden={view === 'home'}>
        <header className="nb-article-header">
          <a className="nb-author" href="#nb-name" onClick={event => { event.preventDefault(); open('home'); }}>Adriano</a>
          <p className="nb-meta">{t('Estatística e machine learning · 2026', 'Statistics and machine learning · 2026')}</p>
          <h1 id="nb-title">{t('Em 1994, dois estatísticos tentaram prever o futuro das redes neurais.', 'In 1994, two statisticians tried to predict the future of neural networks.')} <em>{t('O que eles acertaram?', 'What did they get right?')}</em></h1>
          <p>{t('O curioso é que várias perguntas continuam familiares. Como escolher uma rede? Como saber se ela aprendeu? E quanto disso a estatística já conhecia?', 'The curious thing is how familiar their questions still sound. How do you choose a network? How do you know it learned anything? And how much of this did statistics already know?')}</p>
        </header>
        <figure className="nb-paper">
          <a href={DOI} target="_blank" rel="noreferrer"><Image src="/article-page-01.png" alt={t('Primeira página do artigo de Cheng e Titterington', 'First page of Cheng and Titterington’s paper')} width={1150} height={1539} /></a>
          <figcaption><cite>Neural Networks: A Review from a Statistical Perspective</cite><span>Bing Cheng &amp; D. M. Titterington · 1994</span><a href={DOI} target="_blank" rel="noreferrer">{t('Ler o artigo original', 'Read the original paper')}</a></figcaption>
        </figure>

        <section aria-labelledby="nb-small"><h2 id="nb-small">{t('Começa com uma conta pequena.', 'It starts with a small calculation.')}</h2>
          <p>{t('O artigo tem um exemplo quase engraçado: uma rede neural que escolhe o maior de dois números. Parece trabalho demais para uma coisa tão simples.', 'The paper has an almost funny example: a neural network that picks the larger of two numbers. That feels like a lot of machinery for a tiny task.')}</p>
          <p>{t('Justamente por isso vale olhar. Não precisamos acreditar numa caixa-preta. Dá para acompanhar cada conta até a resposta.', 'That is exactly why it is worth a look. We do not have to trust a black box. We can follow every calculation to the answer.')}</p>

          <figure className="nb-demo" aria-labelledby="nb-demo-title">
            <figcaption id="nb-demo-title">{t('Qual dos dois é maior?', 'Which one is larger?')}<span>{t('Mude os números. A rede refaz a conta.', 'Change the numbers. The network recalculates.')}</span></figcaption>
            <div className="nb-inputs">{[{name: 'a', value: a, set: setA}, {name: 'b', value: b, set: setB}].map(input => <div key={input.name}>
              <div className="nb-input-label"><label id={`nb-${input.name}`}>{t('Número', 'Number')} <i>{input.name}</i></label><output>{input.value}</output></div>
              <Slider value={[input.value]} min={0} max={10} step={1} aria-labelledby={`nb-${input.name}`} onValueChange={value => input.set(Array.isArray(value) ? value[0] : value)} />
            </div>)}</div>
            <div className="nb-small-actions"><button onClick={() => { setA(b); setB(a); }}>{t('Trocar os números', 'Swap the numbers')}</button><button onClick={() => setB(a)}>{t('Deixar iguais', 'Make them equal')}</button></div>
            <div className="nb-network">
              <div className="nb-wide-network"><Network a={a} b={b} style="exploration" locale={locale} step={2} focused={focus} /></div>
              <div className="nb-small-network"><Network a={a} b={b} style="exploration" locale={locale} step={2} focused={focus} mobile /></div>
            </div>
            <div className="nb-paths" aria-label={t('Destacar um caminho', 'Highlight a path')}>{['a − b', 'a + b', 'b − a'].map((path, i) => <button key={path} aria-pressed={focus === i} onClick={() => setFocus(focus === i ? -1 : i)}>{path}</button>)}<span>{t('Toque para seguir um caminho.', 'Tap to follow a path.')}</span></div>
            <p className="nb-result" aria-live="polite">({left} + {a + b} + {right}) ÷ 2 = <strong>{result}</strong></p>
          </figure>

          <p>{t('A rede faz três contas: subtrai um número do outro, soma os dois e faz a subtração no sentido contrário. Nas subtrações, qualquer resultado negativo vira zero.', 'The network does three calculations: subtracts one number from the other, adds them together, and subtracts in the opposite direction. In the subtractions, any negative result becomes zero.')}</p>
          <p>{t('Depois, soma os três resultados e divide por dois. Pronto: fica o maior número. Experimente inverter os valores. O caminho muda, a resposta não.', 'Then it adds the three results and divides by two. That leaves the larger number. Try swapping the values. The path changes; the answer does not.')}</p>
          <details className="nb-source"><summary>{t('O que adaptamos da figura 3', 'What we adapted from figure 3')}</summary><p>{t('Agrupamos a + b em um nó para deixar a conta visível; no desenho original, esses termos vão direto à saída. Omitimos os dois indicadores auxiliares. As conexões foram definidas à mão: esta rede calcula, mas não está aprendendo.', 'We grouped a + b into a node to make the calculation visible; in the original drawing, those terms go straight to the output. We omitted the two auxiliary indicators. The connections were set by hand: this network computes, but it is not learning.')}</p><a href={DOI} target="_blank" rel="noreferrer">Cheng &amp; Titterington · {t('figura 3, p. 8', 'figure 3, p. 8')}</a></details>
          <h2>{t('Calcular não é aprender.', 'Computing is not learning.')}</h2>
          <p>{t('Até aqui, alguém já sabia a resposta e escolheu as conexões certas. A pergunta mais interessante vem depois: como encontrar essas conexões quando só temos exemplos?', 'So far, someone already knew the answer and chose the right connections. The more interesting question comes next: how do we find those connections when all we have are examples?')}</p>
          <p><a href={`/${locale}#learning`}>{t('Continuar no artigo atual', 'Continue in the current article')}</a></p>
        </section>
        <footer className="nb-article-footer">{t('Trecho para validar a nova apresentação. O artigo completo permanece intacto.', 'An excerpt to review the new presentation. The full article remains unchanged.')}</footer>
      </article>
    </main>
  </div>;
}
