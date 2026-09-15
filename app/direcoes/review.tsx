'use client';

import { useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import Image from 'next/image';
import { Slider } from '@/components/ui/slider';
import { PublicationHeader, notebookHome } from '../publication';

type Style = 'editorial' | 'exploration' | 'archive';
type Locale = 'pt' | 'en';
const DOI = 'https://doi.org/10.1214/ss/1177010638';
const styles: Style[] = ['editorial', 'exploration', 'archive'];
const subscribeToUrl = (callback: () => void) => {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
};
const readUrl = () => window.location.search;
const serverUrl = () => '';

const copy = {
  pt: {
    review: 'Direção escolhida: 2', names: ['Ensaio editorial', 'Exploração visual', 'Artigo anotado'],
    preview: 'Exploração visual: direção aprovada. Prévia em aperfeiçoamento.',
    brand: 'Redes neurais, vistas de perto', source: 'Cheng & Titterington · Statistical Science',
    title: 'Em 1994, dois estatísticos tentaram prever o futuro das redes neurais.', end: 'O que eles acertaram?',
    deck: 'O curioso é que várias perguntas continuam familiares. Como escolher uma rede? Como saber se ela aprendeu? E quanto disso a estatística já conhecia?',
    paper: 'Ler o artigo original', cover: 'Primeira página de Neural Networks: A Review from a Statistical Perspective, de 1994',
    coverCaption: 'O ponto de partida: um artigo de 1994.',
    hook: 'Começa com uma conta pequena.',
    prose: 'O artigo tem um exemplo quase engraçado: uma rede neural que escolhe o maior de dois números. Parece trabalho demais para uma coisa tão simples. Justamente por isso dá para abrir a rede e acompanhar tudo o que acontece lá dentro.',
    demoTitle: 'Qual dos dois é maior?', demoDeck: 'Escolha dois números. Depois siga o caminho até a resposta.',
    figure: 'A partir da figura 3 · p. 8', first: 'Primeiro número', second: 'Segundo número',
    swap: 'Trocar os números', equal: 'E se forem iguais?', steps: ['Os números', 'O que cada parte faz', 'A resposta'],
    choose: 'Cada número alimenta três contas: duas diferenças e uma soma. As conexões já foram escolhidas para isso. Por enquanto, estamos vendo uma rede calcular, antes de falar em aprender.',
    calculate: 'Um caminho calcula quanto o primeiro passa do segundo. O outro faz o contrário. Se a diferença for negativa, ela vira zero. O caminho do meio guarda a soma dos dois.',
    answer: 'No fim, a rede soma esses três resultados e divide por dois. O que sobra é exatamente o maior número. Mude os valores e veja a conta se refazer.',
    input: 'ENTRADAS', process: 'CONTAS NO CAMINHO', output: 'MAIOR NÚMERO',
    positive: 'negativo vira 0', sum: 'somar os dois', halve: 'somar e dividir por 2', result: 'Resultado',
    read: 'Siga a conta', original: 'No artigo, em 1994', today: 'A mesma ideia, aberta',
    scanAlt: 'Figura 3 original: rede para encontrar o maior de dois números positivos, página 8 do artigo',
    annotation: 'As letras parecem complicadas. Mas cada nó só faz uma conta pequena. Na versão interativa, as letras ganham valores que você pode mudar.',
    change: 'Mexa nos controles e acompanhe os valores.',
    takeaway: 'Uma rede pode ser uma conta que ganhou caminhos.',
    closing: 'Aqui, as conexões foram definidas à mão. Isso mostra como a rede calcula, mas deixa a pergunta mais interessante em aberto: de onde vêm essas conexões quando não sabemos a resposta?',
    qualifier: 'Adaptação do caminho que calcula o máximo na figura 3. Agrupamos a + b em um nó para deixar a conta visível; na figura original, esses termos vão direto à saída. Os dois indicadores auxiliares foram omitidos. A rede deste exemplo não está sendo treinada.',
    note: 'Por que essa figura?', noteBody: 'Ela deixa a mecânica visível antes de introduzir aprendizado. Não é uma demonstração de que toda rede se resume a uma regressão.',
    leftDetail: 'Fica só com a parte positiva de a − b.', middleDetail: 'Guarda a + b, para usar na última conta.', rightDetail: 'Fica só com a parte positiva de b − a.',
    sourceLabel: 'Fonte e adaptação', conclusion: 'E o aprendizado?', back: 'Voltar à abertura',
  },
  en: {
    review: 'Selected direction: 2', names: ['Editorial essay', 'Visual exploration', 'Annotated paper'],
    preview: 'Visual exploration: approved direction. Preview in refinement.',
    brand: 'A closer look at neural networks', source: 'Cheng & Titterington · Statistical Science',
    title: 'In 1994, two statisticians tried to predict the future of neural networks.', end: 'What did they get right?',
    deck: 'The curious thing is how familiar their questions still sound. How do you choose a network? How do you know it learned anything? And how much of this did statistics already know?',
    paper: 'Read the original paper', cover: 'First page of Neural Networks: A Review from a Statistical Perspective, published in 1994',
    coverCaption: 'The starting point: a paper from 1994.',
    hook: 'It starts with a small calculation.',
    prose: 'The paper has an almost funny example: a neural network that picks the larger of two numbers. That feels like a lot of machinery for a tiny task. Which is exactly why we can open it up and follow everything going on inside.',
    demoTitle: 'Which one is larger?', demoDeck: 'Choose two numbers. Then follow their path to the answer.',
    figure: 'Adapted from figure 3 · p. 8', first: 'First number', second: 'Second number',
    swap: 'Swap the numbers', equal: 'What if they are equal?', steps: ['The inputs', 'What each part does', 'The answer'],
    choose: 'Each number feeds three calculations: two differences and one sum. The connections have already been chosen for this task. For now, we are watching a network compute, before talking about learning.',
    calculate: 'One path calculates how much the first number exceeds the second. The other does the reverse. A negative difference becomes zero. The middle path keeps the sum of both numbers.',
    answer: 'Finally, the network adds those three results and divides by two. What remains is exactly the larger number. Change the inputs and watch the calculation update.',
    input: 'INPUTS', process: 'ALONG THE WAY', output: 'LARGER NUMBER',
    positive: 'negative becomes 0', sum: 'add both numbers', halve: 'add and divide by 2', result: 'Result',
    read: 'Follow the calculation', original: 'In the paper, in 1994', today: 'The same idea, opened up',
    scanAlt: 'Original figure 3: a network that finds the larger of two positive numbers, page 8 of the paper',
    annotation: 'The symbols look complicated. But each node just performs a small calculation. In the interactive version, the symbols become values you can change.',
    change: 'Move the controls and follow the values.',
    takeaway: 'A network can be a calculation with paths.',
    closing: 'Here, the connections were set by hand. That shows how the network computes, but leaves the more interesting question open: where do those connections come from when we do not know the answer?',
    qualifier: 'Adapted from the maximum-computing path in figure 3. We group a + b into a node to make the calculation visible; in the original, those terms go directly to the output. The two auxiliary indicators are omitted. This example is not training a network.',
    note: 'Why this figure?', noteBody: 'It makes the mechanics visible before introducing learning. It does not demonstrate that every network reduces to a regression.',
    leftDetail: 'Keeps only the positive part of a − b.', middleDetail: 'Keeps a + b for the final calculation.', rightDetail: 'Keeps only the positive part of b − a.',
    sourceLabel: 'Source and adaptation', conclusion: 'What about learning?', back: 'Back to the opening',
  },
};

export function DesignReview({ siteLocale, onLocaleChange, children }: { siteLocale?: Locale; onLocaleChange?: (locale: Locale) => void; children?: ReactNode }) {
  const query = new URLSearchParams(useSyncExternalStore(subscribeToUrl, readUrl, serverUrl));
  const requested = query.get('style') as Style;
  const style: Style = siteLocale ? 'exploration' : styles.includes(requested) ? requested : 'exploration';
  const locale: Locale = siteLocale ?? (query.get('lang') === 'en' ? 'en' : 'pt');
  useEffect(() => { document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'; }, [locale]);
  const [a, setA] = useState(7);
  const [b, setB] = useState(3);
  const [step, setStep] = useState(2);
  const [focused, setFocused] = useState(-1);
  const text = copy[locale];
  function changeStyle(next: Style) {
    setFocused(-1);
    history.replaceState(null, '', `?style=${next}&lang=${locale}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function changeLocale(next: Locale) {
    if (siteLocale && onLocaleChange) { onLocaleChange(next); return; }
    history.replaceState(null, '', `?style=${style}&lang=${next}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  const left = Math.max(0, a-b);
  const right = Math.max(0, b-a);
  const result = (left + a + b + right) / 2;

  return <div className={`design-review r-${style}${siteLocale ? ' r-story' : ''}`} lang={locale === 'pt' ? 'pt-BR' : 'en'}>
    {siteLocale ? <><a className="publication-skip" href="#review-top">{locale==='pt'?'Pular para o artigo':'Skip to the article'}</a><PublicationHeader locale={locale} onLocaleChange={changeLocale}/></> : <nav className="r-switcher" aria-label={text.review}>
      <span className="r-switcher-label">{text.review}</span>
      <div className="r-options">{styles.map((value, i) => <button key={value} onClick={() => changeStyle(value)} aria-pressed={style === value}><span>{i+1}</span>{text.names[i]}</button>)}</div>
      <div className="r-languages">{(['pt','en'] as Locale[]).map(value => <button key={value} onClick={() => changeLocale(value)} aria-pressed={locale === value}>{value.toUpperCase()}</button>)}</div>
    </nav>}

    <main className="r-main" id="review-top">
      {siteLocale ? <div className="publication-article-back"><a href={notebookHome(locale)}>← &nbsp; {locale==='pt'?'Todos os textos':'All posts'}</a></div> : <header className="r-masthead"><span>{text.brand}</span><span>1994 — 2026</span></header>}
      <section className="r-hero" aria-labelledby="r-title">
        <div className="r-hero-copy">
          <p className="r-kicker">{text.source}</p>
          <h1 id="r-title">{text.title} <em>{text.end}</em></h1>
          <p className="r-deck">{text.deck}</p>
          <a className="r-source-link" href={DOI} target="_blank" rel="noreferrer">{text.paper} <span aria-hidden="true">↗</span></a>
        </div>
        <figure className="r-paper">
          <a href={DOI} target="_blank" rel="noreferrer"><Image src="/article-page-01.png" alt={text.cover} width={1150} height={1539} priority /></a>
          <figcaption>{text.coverCaption}<br /><a href={DOI} target="_blank" rel="noreferrer">{text.paper} ↗</a></figcaption>
        </figure>
      </section>

      {siteLocale && <nav className="publication-contents" aria-label={locale==='pt'?'Neste artigo':'In this article'}><span>{locale==='pt'?'Neste artigo':'In this article'}</span><a href="#review-demo">{locale==='pt'?'As contas':'The calculations'}</a><a href="#learning">{locale==='pt'?'O aprendizado':'Learning'}</a><a href="#generalization">{locale==='pt'?'O teste':'Testing'}</a><a href="#judgments">{locale==='pt'?'O que ficou':'What held up'}</a><a href="#memory">{locale==='pt'?'A memória':'Memory'}</a><a href="#evidence">{locale==='pt'?'As fontes':'Sources'}</a></nav>}
      <section className="r-reading" aria-labelledby="r-hook">
        <div className="r-reading-main"><h2 id="r-hook">{text.hook}</h2><p>{text.prose}</p></div>
        <aside><span>FIG. 3</span><p>{text.noteBody}</p></aside>
      </section>

      <section className="r-experiment" id="review-demo" aria-labelledby="r-demo-title">
        <header className="r-demo-header"><div><p className="r-kicker">{text.figure}</p><h2 id="r-demo-title">{text.demoTitle}</h2><p>{text.demoDeck}</p></div><span className="r-live-dot" aria-hidden="true" /></header>
        <div className="r-experiment-body">
          {style === 'archive' && <aside className="r-original"><p className="r-small-heading">{text.original}</p><Image src="/figure-03-original.png" alt={text.scanAlt} width={1010} height={565} loading="eager" /><p>{text.annotation}</p><a href={DOI} target="_blank" rel="noreferrer">Cheng &amp; Titterington, p. 8 ↗</a></aside>}
          <div className="r-live">
            {style === 'archive' && <p className="r-small-heading">{text.today}</p>}
            <div className="r-inputs">
              {[{label:text.first, value:a, set:setA, letter:'a'}, {label:text.second,value:b,set:setB,letter:'b'}].map((input,i) => <div key={input.letter} className={`r-input r-input-${input.letter}`}>
                <label id={`number-label-${i}`}><span>{input.label}</span><span className="r-input-letter">{input.letter}</span></label>
                <output>{input.value}</output>
                <Slider value={[input.value]} min={0} max={10} step={1} aria-labelledby={`number-label-${i}`} onValueChange={value => input.set(typeof value === 'number' ? value : value[0])} />
              </div>)}
              <div className="r-input-actions"><button onClick={()=>{setA(b);setB(a)}}>{text.swap} ↔</button><button onClick={()=>setB(a)}>{text.equal}</button></div>
            </div>

            <div className="r-network" data-step={step}>
              <div className="r-network-desktop"><Network a={a} b={b} style={style} locale={locale} step={step} focused={focused} /></div>
              <div className="r-network-mobile"><Network a={a} b={b} style={style} locale={locale} step={step} focused={focused} mobile /></div>
            </div>

            <div className="r-calculation" aria-live="polite"><span>{text.result}</span><div><span className="r-expression">({left} + {a+b} + {right}) ÷ 2 = </span><strong>{result}</strong></div></div>
            <div className="r-step-controls" aria-label={text.read}>{text.steps.map((label,i)=><button key={label} aria-pressed={step===i} onClick={()=>{setStep(i);setFocused(-1)}}><span>{i+1}</span>{label}</button>)}</div>
            <p className="r-step-explanation" aria-live="polite">{[text.choose,text.calculate,text.answer][step]}</p>
            {step===1 && <div className="r-path-controls">{[text.leftDetail,text.middleDetail,text.rightDetail].map((label,i)=><button key={label} aria-pressed={focused===i} onClick={()=>setFocused(focused===i ? -1 : i)}>{label}</button>)}</div>}
          </div>
        </div>
        <details className="r-source-note"><summary>{text.sourceLabel}</summary><p>{text.qualifier} <a href={DOI} target="_blank" rel="noreferrer">{text.paper} ↗</a></p></details>
      </section>

      <section className="r-ending"><p className="r-kicker">{text.conclusion}</p><h2>{text.takeaway}</h2><p>{text.closing}</p></section>
      {children}
      <footer className="r-footer"><span>{siteLocale ? (locale==='pt'?'Adriano · Estatística e machine learning':'Adriano · Statistics and machine learning') : text.preview}</span><a href="#review-top">{text.back} ↑</a></footer>
    </main>
  </div>;
}

export function Network({ a,b,style,locale,step,focused,mobile=false }: {a:number;b:number;style:Style;locale:Locale;step:number;focused:number;mobile?:boolean}) {
  const text=copy[locale];
  const left=Math.max(0,a-b), right=Math.max(0,b-a), result=(left+a+b+right)/2;
  const tall=mobile || style!=='editorial';
  const marker=`r-arrow-${style}-${mobile?'mobile':'desktop'}`;
  const nodeClass=(group:number)=>`r-node ${step===group ? 'is-focus' : ''}`;
  const edges = mobile ? [
    ['M 90 85 C 90 130 62 143 62 190','a',0], ['M 270 85 C 270 143 62 130 62 190','b',0],
    ['M 90 85 C 90 138 180 135 180 190','a',1], ['M 270 85 C 270 138 180 135 180 190','b',1],
    ['M 90 85 C 90 143 298 130 298 190','a',2], ['M 270 85 C 270 130 298 143 298 190','b',2],
    ['M 62 248 C 62 327 180 300 180 362','a',0], ['M 180 248 L 180 362','sum',1], ['M 298 248 C 298 327 180 300 180 362','b',2],
  ] : tall ? [
    ['M 165 81 C 165 135 85 145 85 203','a',0], ['M 395 81 C 395 142 85 140 85 203','b',0],
    ['M 165 81 C 165 140 280 140 280 203','a',1], ['M 395 81 C 395 140 280 140 280 203','b',1],
    ['M 165 81 C 165 142 475 140 475 203','a',2], ['M 395 81 C 395 135 475 145 475 203','b',2],
    ['M 85 261 C 85 335 280 304 280 379','a',0], ['M 280 261 L 280 379','sum',1], ['M 475 261 C 475 335 280 304 280 379','b',2],
  ] : [
    ['M 143 140 C 250 140 275 81 363 81','a',0], ['M 143 340 C 260 340 280 81 363 81','b',0],
    ['M 143 140 C 245 140 265 240 363 240','a',1], ['M 143 340 C 245 340 265 240 363 240','b',1],
    ['M 143 140 C 260 140 280 399 363 399','a',2], ['M 143 340 C 250 340 275 399 363 399','b',2],
    ['M 477 81 C 615 81 595 240 686 240','a',0], ['M 477 240 L 686 240','sum',1], ['M 477 399 C 615 399 595 240 686 240','b',2],
  ];
  const centers=mobile ? [[62,219],[180,219],[298,219]] : tall ? [[85,232],[280,232],[475,232]] : [[420,81],[420,240],[420,399]];
  // SVG stays a live vector diagram; replacing it with an img would remove its data-driven nodes.
  // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
  return <svg viewBox={mobile?'0 0 360 480':tall ? '0 0 560 500' : '0 -20 840 510'} role="img" aria-label={`${text.demoTitle} ${a}, ${b}. ${text.result}: ${result}.`}>
    <title>{text.demoTitle}</title><desc>{text.calculate} {text.answer}</desc>
    <defs>{['a','b','sum'].map(color=><marker key={color} id={`${marker}-${color}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={`var(--r-${color==='sum'?'accent':color})`} /></marker>)}</defs>
    {!tall && <g className="r-svg-label"><text x="100" y="-5" textAnchor="middle">{text.input}</text><text x="420" y="-5" textAnchor="middle">{text.process}</text><text x="745" y="-5" textAnchor="middle">{text.output}</text></g>}
    <g className={`r-wires ${step===0 ? 'is-muted' : ''}`}>{edges.map(([d,color,path],i)=><path key={i} d={d as string} markerEnd={`url(#${marker}-${color})`} className={`r-wire r-wire-${color} ${focused>=0 && focused!==path ? 'is-faint':''}`} />)}</g>
    {[a,b].map((n,i)=>{const x=mobile?(i===0?90:270):tall ? (i===0 ? 165:395):100; const y=mobile?56:tall?52:(i===0?140:340);return <g key={i} className={`${nodeClass(0)} r-number-${i}`}><circle cx={x} cy={y} r={tall?29:43}/><text x={x} y={y+2} className="r-svg-number">{n}</text><text x={x} y={y+(tall?-39:73)} className="r-svg-symbol">{i===0?'a':'b'}</text></g>})}
    {[left,a+b,right].map((n,i)=>{const [x,y]=centers[i];return <g key={i} className={`${nodeClass(1)} r-operation r-operation-${i} ${focused>=0&&focused!==i?'is-faint':''} ${focused===i?'is-highlighted':''}`}>
      <rect x={x-(mobile?45:57)} y={y-29} width={mobile?90:114} height="58" rx={style==='exploration'?29:5}/><text x={x} y={y+2} className="r-svg-number">{n}</text>
      <rect x={x-43} y={y-62} width="86" height="25" className="r-label-mask" />
      <text x={x} y={y-44} className="r-svg-formula">{i===0?`${a} − ${b}`:i===1?`${a} + ${b}`:`${b} − ${a}`}</text>
      <rect x={x-(mobile?52:80)} y={y+37} width={mobile?104:160} height={mobile?44:24} className="r-label-mask" />
      {mobile ? <text x={x} y={y+53} className="r-svg-description"><tspan x={x}>{i===1?(locale==='pt'?'somar':'add both'):(locale==='pt'?'negativo':'negative')}</tspan><tspan x={x} dy="17">{i===1?(locale==='pt'?'os dois':'numbers'):(locale==='pt'?'vira 0':'becomes 0')}</tspan></text> : <text x={x} y={y+52} className="r-svg-description">{i===1?text.sum:text.positive}</text>}
    </g>})}
    <g className={`${nodeClass(2)} r-result-node`}><circle cx={mobile?180:tall?280:745} cy={mobile?400:tall?417:240} r={tall?38:59}/><text x={mobile?180:tall?280:745} y={(mobile?400:tall?417:240)+3} className="r-svg-number">{result}</text><text x={mobile?180:tall?280:745} y={mobile?463:tall?481:328} className="r-svg-description">{text.halve}</text></g>
  </svg>;
}
