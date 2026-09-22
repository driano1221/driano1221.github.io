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
    deck: 'Uma leitura interativa sobre a relação entre estatística e redes neurais, a partir de um artigo de 1994.',
    paper: 'Ler o artigo original', cover: 'Primeira página de Neural Networks: A Review from a Statistical Perspective, de 1994',
    coverCaption: 'O ponto de partida: um artigo de 1994.',
    hook: 'Uma rede que encontra o maior número',
    prose: 'Antes de acompanhar o aprendizado, vale entender como os números percorrem uma rede. Cheng e Titterington apresentam um exemplo em que as conexões foram definidas para encontrar o maior de dois valores. A tarefa é simples, mas permite conferir cada etapa do cálculo e entender o que os círculos e as setas representam.',
    demoTitle: 'Qual dos dois é maior?', demoDeck: 'Os valores passam por duas subtrações e uma soma. Acompanhe como os resultados de cada caminho se combinam na saída.',
    figure: 'A partir da figura 3 · p. 8', first: 'Primeiro número', second: 'Segundo número',
    swap: 'Trocar os números', equal: 'Deixar os números iguais', steps: ['Os números', 'O que cada parte faz', 'A resposta'],
    choose: 'Cada entrada participa de três contas. Nas diferenças, a ordem dos números é invertida de um caminho para o outro; no caminho central, os dois são somados. As conexões indicam quais valores chegam a cada operação.',
    calculate: 'Um caminho calcula quanto o primeiro passa do segundo. O outro faz o contrário. Se a diferença for negativa, ela vira zero. O caminho do meio guarda a soma dos dois.',
    answer: 'A saída soma os três resultados e divide por dois. Com 7 e 3, por exemplo, a conta é (4 + 10 + 0) / 2 = 7. Ao trocar as entradas, os resultados das diferenças mudam de caminho, mas o maior número continua sendo o mesmo.',
    input: 'ENTRADAS', process: 'CONTAS NO CAMINHO', output: 'MAIOR NÚMERO',
    positive: 'negativo vira 0', sum: 'somar os dois', halve: 'somar e dividir por 2', result: 'Resultado',
    read: 'Siga a conta', original: 'No artigo, em 1994', today: 'A mesma ideia, aberta',
    scanAlt: 'Figura 3 original: rede para encontrar o maior de dois números positivos, página 8 do artigo',
    annotation: 'As letras parecem complicadas. Mas cada nó só faz uma conta pequena. Na versão interativa, as letras ganham valores que você pode mudar.',
    change: 'Mexa nos controles e acompanhe os valores.',
    takeaway: 'Quando as conexões precisam ser aprendidas',
    closing: 'Mudar os números altera a resposta, mas não as regras desta rede. Ela encontra o maior valor porque as operações foram escolhidas para isso. Em tarefas como reconhecer uma espécie de flor, nem sempre sabemos definir uma regra tão diretamente. Podemos, então, usar exemplos para ajustar os pesos das conexões, que determinam a contribuição de cada entrada para a resposta.',
    qualifier: 'Adaptação do caminho que calcula o máximo na figura 3. Agrupamos a + b em um nó para deixar a conta visível; na figura original, esses termos vão direto à saída. Os dois indicadores auxiliares foram omitidos. A rede deste exemplo não está sendo treinada.',
    note: 'Por que essa figura?', noteBody: 'Ela deixa a mecânica visível antes de introduzir aprendizado. Não é uma demonstração de que toda rede se resume a uma regressão.',
    leftDetail: 'Fica só com a parte positiva de a − b.', middleDetail: 'Guarda a + b, para usar na última conta.', rightDetail: 'Fica só com a parte positiva de b − a.',
    sourceLabel: 'Fonte e adaptação', conclusion: 'Do cálculo ao aprendizado', back: 'Voltar à abertura',
  },
  en: {
    review: 'Selected direction: 2', names: ['Editorial essay', 'Visual exploration', 'Annotated paper'],
    preview: 'Visual exploration: approved direction. Preview in refinement.',
    brand: 'A closer look at neural networks', source: 'Cheng & Titterington · Statistical Science',
    title: 'In 1994, two statisticians tried to predict the future of neural networks.', end: 'What did they get right?',
    deck: 'An interactive reading of a 1994 paper exploring the relationship between statistics and neural networks.',
    paper: 'Read the original paper', cover: 'First page of Neural Networks: A Review from a Statistical Perspective, published in 1994',
    coverCaption: 'The starting point: a paper from 1994.',
    hook: 'A network that finds the larger number',
    prose: 'Before looking at learning, it helps to understand how numbers move through a network. Cheng and Titterington present an example with connections chosen to find the larger of two values. The task is simple, but it lets us check each calculation and understand what the circles and arrows represent.',
    demoTitle: 'Which one is larger?', demoDeck: 'The inputs feed into two subtractions and one addition. Follow how the results of each path are combined at the output.',
    figure: 'Adapted from figure 3 · p. 8', first: 'First number', second: 'Second number',
    swap: 'Swap the numbers', equal: 'Make the numbers equal', steps: ['The inputs', 'What each part does', 'The answer'],
    choose: 'Each input contributes to three calculations. The subtraction paths use the numbers in opposite orders, while the middle path adds them. The connections show which values reach each operation.',
    calculate: 'One path calculates how much the first number exceeds the second. The other does the reverse. A negative difference becomes zero. The middle path keeps the sum of both numbers.',
    answer: 'The output adds the three results and divides by two. With 7 and 3, for example, the calculation is (4 + 10 + 0) / 2 = 7. Swapping the inputs moves the subtraction results to opposite paths, but the larger number stays the same.',
    input: 'INPUTS', process: 'ALONG THE WAY', output: 'LARGER NUMBER',
    positive: 'negative becomes 0', sum: 'add both numbers', halve: 'add and divide by 2', result: 'Result',
    read: 'Follow the calculation', original: 'In the paper, in 1994', today: 'The same idea, opened up',
    scanAlt: 'Original figure 3: a network that finds the larger of two positive numbers, page 8 of the paper',
    annotation: 'The symbols look complicated. But each node just performs a small calculation. In the interactive version, the symbols become values you can change.',
    change: 'Move the controls and follow the values.',
    takeaway: 'When the connections need to be learned',
    closing: 'Changing the inputs changes the answer, but not this network’s rules. It finds the larger value because the operations were chosen for that purpose. For a task such as identifying a flower species, we may not know how to specify a rule so directly. We can instead use examples to adjust the connection weights, which determine how much each input contributes to the answer.',
    qualifier: 'Adapted from the maximum-computing path in figure 3. We group a + b into a node to make the calculation visible; in the original, those terms go directly to the output. The two auxiliary indicators are omitted. This example is not training a network.',
    note: 'Why this figure?', noteBody: 'It makes the mechanics visible before introducing learning. It does not demonstrate that every network reduces to a regression.',
    leftDetail: 'Keeps only the positive part of a − b.', middleDetail: 'Keeps a + b for the final calculation.', rightDetail: 'Keeps only the positive part of b − a.',
    sourceLabel: 'Source and adaptation', conclusion: 'From calculation to learning', back: 'Back to the opening',
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
      {siteLocale ? <div className="publication-article-back"><a href={notebookHome(locale)}>← &nbsp; {locale==='pt'?'Voltar ao blog':'Back to the blog'}</a></div> : <header className="r-masthead"><span>{text.brand}</span><span>1994 — 2026</span></header>}
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

      {siteLocale && <div className="story-prose publication-opening">
        <p>{locale === 'pt'
          ? 'Em 1994, as redes neurais já estavam sendo estudadas para reconhecer escrita à mão, processar fala e fazer previsões. Embora a inspiração viesse do cérebro, muitas aplicações envolviam problemas familiares à estatística: usar observações para encontrar padrões e estimar uma resposta. Essa proximidade é o ponto de partida do artigo de Bing Cheng e D. M. Titterington que vamos acompanhar aqui.'
          : 'In 1994, neural networks were already being studied for handwriting recognition, speech processing and forecasting. Although they were inspired by the brain, many applications involved problems familiar to statisticians: using observations to find patterns and estimate an answer. This overlap is the starting point of the paper by Bing Cheng and D. M. Titterington that we’ll follow here.'}</p>
        <p>{locale === 'pt'
          ? 'Nos anos anteriores, pesquisas sobre treinamento já mostravam como ajustar as conexões de uma rede a partir dos erros que ela cometia. Um trabalho de Rumelhart, Hinton e Williams, publicado em 1986, descrevia como esse processo permitia que as camadas internas passassem a representar características úteis para a tarefa. Não era preciso definir à mão cada cálculo intermediário, como faremos no primeiro exemplo desta postagem.'
          : 'Research in the preceding years had already shown how to adjust a network’s connections using its errors. A 1986 paper by Rumelhart, Hinton and Williams described how this process allowed internal layers to represent useful features of a task. Each intermediate calculation no longer had to be specified by hand, as it will be in our first example.'} <a href="https://doi.org/10.1038/323533a0" target="_blank" rel="noreferrer">Rumelhart, Hinton &amp; Williams, 1986 ↗</a></p>
        <p>{locale === 'pt'
          ? 'Para quem vinha da estatística, isso trazia tanto possibilidades quanto perguntas. Como escolher uma rede adequada ao problema? Como avaliar se ela funcionava com dados novos? E quando valia a pena usar uma rede em vez de um método mais simples? Cheng e Titterington organizaram essa discussão aproximando as arquiteturas e os métodos de treinamento de conceitos como regressão, classificação e agrupamento. A intenção era ajudar pesquisadores dessas áreas a reconhecer o que tinham em comum.'
          : 'For someone coming from statistics, this raised both possibilities and questions. How should a network be chosen for a particular problem? How could its performance on new data be assessed? And when was a network worth using instead of a simpler method? Cheng and Titterington organized this discussion by relating architectures and training methods to concepts such as regression, classification and clustering. Their aim was to help researchers in these fields recognize their shared ground.'}</p>
        <p>{locale === 'pt'
          ? 'Voltar ao artigo hoje permite acompanhar essa relação antes dos desenvolvimentos que vieram depois. Algumas ideias continuam úteis para entender as redes; outras precisam ser lidas considerando o que se sabia naquele momento. Ao longo da postagem, vamos reconstruir alguns exemplos e acompanhar o que aconteceu com as questões levantadas pelos autores, começando pelas contas e avançando até o aprendizado.'
          : 'Returning to the paper lets us examine this relationship before the developments that followed. Some ideas remain useful for understanding networks; others need to be read in the context of what was known at the time. We’ll reconstruct several examples and follow what happened to the questions the authors raised, starting with calculations and moving on to learning.'}</p>
      </div>}
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
      <footer className="r-footer"><span>{siteLocale ? (locale==='pt'?'Adriano Pires Cunha':'Adriano Pires Cunha') : text.preview}</span><a href="#review-top">{text.back} ↑</a></footer>
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
