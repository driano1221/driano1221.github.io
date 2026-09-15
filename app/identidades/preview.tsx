'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Slider } from '@/components/ui/slider';
import { Network } from '../direcoes/review';

const directions = [
  { id: 'intervalo', name: ['Intervalo', 'Interval'], idea: ['Uma publicação pessoal sobre incerteza. Serifas, datas na margem e um pequeno intervalo como assinatura.', 'A personal publication about uncertainty. Serifs, dates in the margin, and a small interval as a signature.'], risk: ['Mais estatístico e autoral; o futurismo aparece nos detalhes, não no impacto.', 'More statistical and personal; its futuristic side lives in the details.'], refs: [['Distill', 'https://distill.pub/'], ['Andreas Writing', 'https://beza1e1.tuxen.de/blog_en.html']] },
  { id: 'latente', name: ['Espaço latente', 'Latent space'], idea: ['Precisão geométrica, azul ultramarino e conexões mínimas. A aproximação mais direta de um laboratório de IA.', 'Geometric precision, ultramarine, and minimal connections. Closest to an AI research lab.'], risk: ['Mais contemporâneo; pode parecer institucional se a escrita perder sua personalidade.', 'More contemporary; can feel institutional if the writing loses its personality.'], refs: [['Transformer Circuits', 'https://transformer-circuits.pub/'], ['Colah', 'https://colah.github.io/']] },
  { id: 'registro', name: ['Registro experimental', 'Experiment log'], idea: ['Um caderno computacional: índice lateral, datas monoespaçadas e cada texto tratado como uma observação.', 'A computational notebook: a side index, monospaced dates, and each essay treated as an observation.'], risk: ['É o mais técnico. A estrutura precisa continuar convidativa para quem não programa.', 'The most technical option. Its structure must still welcome non-programmers.'], refs: [['Statistical Thinking', 'https://www.fharrell.com/'], ['Transformer Circuits', 'https://transformer-circuits.pub/']] },
  { id: 'margem', name: ['Notas à margem', 'Margin notes'], idea: ['Um ensaio com anotações: papel claro, serifas expressivas e pequenos comentários laterais.', 'An annotated essay: light paper, expressive serifs, and small notes in the margin.'], risk: ['O mais pessoal e literário; o lado IA fica principalmente nas demonstrações.', 'The most personal and literary; AI is expressed mostly through the demonstrations.'], refs: [['Gwern', 'https://gwern.net/'], ['Andreas Writing', 'https://beza1e1.tuxen.de/blog_en.html']] },
  { id: 'sinal', name: ['Sinal noturno', 'Night signal'], idea: ['Grafite, tipografia clara e um sinal ciano discreto. Uma leitura noturna, sem neon ou decoração de dashboard.', 'Graphite, clear typography, and a restrained cyan signal. Night reading without neon or dashboard decoration.'], risk: ['O mais futurista. É uma alternativa inteira escura, não um painel preto dentro de uma página branca.', 'The most futuristic. A fully dark alternative, not a black panel inside a white page.'], refs: [['Distill', 'https://distill.pub/'], ['Gwern', 'https://gwern.net/']] },
];

// Layout samples, not claims of independently published posts or publication dates.
const posts = [
  { date: '2026-09-14', title: ['O que dois estatísticos viram nas redes neurais em 1994?', 'What did two statisticians see in neural networks in 1994?'], description: ['Voltei ao artigo. Algumas perguntas continuam surpreendentemente atuais.', 'I went back to the paper. Some questions still feel surprisingly current.'], tag: ['Redes neurais', 'Neural networks'] },
  { date: '2026-09-09', title: ['Acertar o treino não encerra a conversa.', 'Getting the training data right is not the end of the story.'], description: ['Uma curva de erro, uma surpresa e o problema de decorar os exemplos.', 'An error curve, a surprise, and the problem of memorizing examples.'], tag: ['Generalização', 'Generalization'] },
  { date: '2026-09-08', title: ['Uma memória também pode lembrar errado.', 'A memory can also remember the wrong thing.'], description: ['O que uma pequena rede de Hopfield consegue recuperar — e o que não consegue.', 'What a small Hopfield network can recover — and what it cannot.'], tag: ['Memória', 'Memory'] },
];
const subscribe = (callback: () => void) => { window.addEventListener('popstate', callback); return () => window.removeEventListener('popstate', callback); };
const snapshot = () => window.location.search;
const serverSnapshot = () => '';

function Mark({ variant }: { variant: string }) {
  if (variant === 'intervalo') return <span className="id-mark id-interval" aria-hidden="true"><span /><i /><span /></span>;
  if (variant === 'latente') return <span className="id-mark id-latent" aria-hidden="true">a<span>·</span></span>;
  if (variant === 'registro') return <span className="id-mark id-log" aria-hidden="true">[a]</span>;
  if (variant === 'margem') return <span className="id-mark id-margin-mark" aria-hidden="true">a*</span>;
  return <span className="id-mark id-signal" aria-hidden="true">a<span>_</span></span>;
}

export function IdentityPreview() {
  const query = new URLSearchParams(useSyncExternalStore(subscribe, snapshot, serverSnapshot));
  const direction = directions.find(d => d.id === query.get('opcao')) ?? directions[0];
  const locale = query.get('lang') === 'en' ? 'en' : 'pt';
  const lang = locale === 'en' ? 1 : 0;
  const view = ['home', 'article'].includes(query.get('view') ?? '') ? query.get('view')! : 'pair';
  const selected = Math.trunc(Math.min(2, Math.max(0, Number(query.get('post')) || 0)));
  const post = posts[selected];
  const t = (pt: string, en: string) => locale === 'pt' ? pt : en;
  const [a, setA] = useState(7), [b, setB] = useState(3), [focus, setFocus] = useState(-1);
  const left = Math.max(0, a-b), right = Math.max(0, b-a), result = (left+a+b+right)/2;
  useEffect(() => { document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'; document.title = `${direction.name[lang]} · Adriano`; }, [locale, direction, lang]);
  function change(values: Record<string, string>, top = true) {
    const next = new URLSearchParams(window.location.search);
    Object.entries(values).forEach(([key, value]) => next.set(key, value));
    history.pushState(null, '', `?${next}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    if (top) window.scrollTo({ top: 0, behavior: 'instant' });
  }
  const date = (value: string) => new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).formatToParts(new Date(`${value}T12:00:00Z`)).filter(part => part.type !== 'literal').map(part => part.value).join(' ');

  return <div className={`identity-stage theme-${direction.id}`}>
    <a className="id-skip" href="#id-preview">{t('Pular para a proposta', 'Skip to the proposal')}</a>
    <div className="id-workbench">
      <nav aria-label={t('Cinco identidades', 'Five identities')} className="id-options">{directions.map((item, index) => <a key={item.id} href={`?opcao=${item.id}&lang=${locale}&view=${view}`} aria-current={direction.id === item.id ? 'page' : undefined} onClick={event => { event.preventDefault(); change({opcao:item.id}); }}><span>0{index+1}</span>{item.name[lang]}</a>)}</nav>
      <div className="id-brief"><p>{direction.idea[lang]}</p><details><summary>{t('Referências e ressalva', 'References and trade-off')}</summary><p>{direction.risk[lang]}</p><p>{t('Referências consultadas; a combinação visual é uma proposta própria.', 'Consulted references; the visual combination is an original proposal.')}</p>{direction.refs.map(([name,url])=><a key={url} href={url} target="_blank" rel="noreferrer">{name}</a>)}</details></div>
      <div className="id-controls"><div>{[['pair',t('Comparar as duas páginas','Compare both pages')],['home',t('Só início','Home only')],['article',t('Só artigo','Article only')]].map(([key,label])=><button key={key} aria-pressed={view===key} onClick={()=>change({view:key})}>{label}</button>)}</div><div><button aria-pressed={locale==='pt'} onClick={()=>change({lang:'pt'},false)}>PT</button><button aria-pressed={locale==='en'} onClick={()=>change({lang:'en'},false)}>EN</button></div></div>
      <p className="id-sample-note">{t('Amostras de composição: posts e datas ilustrativos, baseados em três temas do projeto real. Nada foi publicado ou substituído.', 'Layout samples: illustrative posts and dates based on three topics from the real project. Nothing has been published or replaced.')}</p>
    </div>

    <main id="id-preview" className={`id-spread id-view-${view}`}>
      <section className="id-sheet id-home" hidden={view==='article'} aria-labelledby="id-name">
        <div className="id-page-label">{t('Página inicial', 'Home page')}</div>
        <div className="id-home-layout">
          <header className="id-masthead"><Mark variant={direction.id}/><div><h1 id="id-name">{direction.id==='latente'?'adriano':'Adriano'}</h1><p className="id-discipline">{t('Estatística / machine learning','Statistics / machine learning')}</p></div></header>
          <div className="id-home-content"><p className="id-bio">{t('Sou estatístico. Aqui reúno experimentos, leituras e coisas que precisei desenhar para entender.', 'I’m a statistician. Here I collect experiments, readings, and things I had to draw to understand.')}</p>
            <div className="id-list-heading"><h2>{t('Textos & experimentos','Writing & experiments')}</h2><span>2026</span></div>
            <ol className="id-posts">{posts.map((item,index)=><li key={item.date}>
              <span className="id-post-index" aria-hidden="true">0{index+1}</span><time dateTime={item.date}>{date(item.date)}</time>
              <div><a href={`?opcao=${direction.id}&view=article&post=${index}&lang=${locale}`} onClick={event=>{event.preventDefault();change({view:'article',post:String(index)});}}>{item.title[lang]}</a><p>{item.description[lang]}</p><span className="id-tag">{item.tag[lang]}</span></div>
            </li>)}</ol>
            <footer className="id-home-foot"><span>{t('Adriano · caderno aberto','Adriano · open notebook')}</span><Link href="/caderno">{t('Comparar com a versão anterior','Compare with the previous version')}</Link></footer>
          </div>
        </div>
      </section>

      <article className="id-sheet id-essay" hidden={view==='home'} aria-labelledby="id-title">
        <div className="id-page-label">{t('Página aberta', 'Open article')}</div>
        <nav className="id-reading-nav" aria-label={t('Voltar ao início', 'Back to home')}><a href={`?opcao=${direction.id}&view=home&lang=${locale}`} onClick={event=>{event.preventDefault();change({view:'home'});}}><Mark variant={direction.id}/>Adriano</a><span>{post.tag[lang]}</span></nav>
        <header className="id-essay-head"><p className="id-article-meta"><time dateTime={post.date}>{date(post.date)}</time><span>{t('Nota de leitura','Reading note')}</span></p><h1 id="id-title">{post.title[lang]}</h1><p className="id-deck">{selected===0?t('Em 1994, Cheng e Titterington olharam para as redes pela lente da estatística. O que eles acertaram?', 'In 1994, Cheng and Titterington looked at neural networks through the lens of statistics. What did they get right?'):post.description[lang]}</p></header>
        <div className="id-essay-body"><aside className="id-margin-note"><span>{selected===0?'1994':selected===1?'01':'1982'}</span><p>{selected===0?t('Um artigo antigo. Uma pergunta que não ficou velha.', 'An old paper. A question that did not grow old.'):t('Uma observação não encerra a questão.', 'One observation does not settle the question.')}</p></aside>
          <div className="id-prose">
            {selected===0?<><p>{t('O artigo começa aproximando uma regressão de um neurônio. Mais adiante, mostra uma rede que escolhe o maior de dois números. Parece trabalho demais para uma conta tão pequena. Justamente por isso vale abrir o desenho.', 'The paper starts by connecting a regression to a neuron. Later, it shows a network that picks the larger of two numbers. That feels like too much machinery for such a small calculation. Which is exactly why it is worth opening up.')}</p>
              <h2>{t('Dá para seguir cada conta.', 'We can follow every calculation.')}</h2><p>{t('Escolha os números. Os caminhos fazem duas diferenças e uma soma. Nas diferenças, qualquer resultado negativo vira zero.', 'Choose the numbers. The paths compute two differences and a sum. Any negative difference becomes zero.')}</p>
              <figure className="id-demo"><figcaption>{t('Qual dos dois é maior?', 'Which one is larger?')}<span>{t('Adaptação da figura 3 · p. 8', 'Adapted from figure 3 · p. 8')}</span></figcaption>
                <div className="nb-inputs">{[{key:'a',value:a,set:setA},{key:'b',value:b,set:setB}].map(input=><div key={input.key}><div className="nb-input-label"><label id={`id-number-${input.key}`}>{t('Número','Number')} <i>{input.key}</i></label><output>{input.value}</output></div><Slider min={0} max={10} step={1} value={[input.value]} aria-labelledby={`id-number-${input.key}`} onValueChange={value=>input.set(Array.isArray(value)?value[0]:value)}/></div>)}</div>
                <div className="nb-small-actions"><button onClick={()=>{setA(b);setB(a);}}>{t('Trocar os números','Swap the numbers')}</button><button onClick={()=>setB(a)}>{t('Deixar iguais','Make them equal')}</button></div>
                <div className="nb-network"><div className="nb-wide-network"><Network a={a} b={b} style="exploration" locale={locale} step={2} focused={focus}/></div><div className="nb-small-network"><Network a={a} b={b} style="exploration" locale={locale} step={2} focused={focus} mobile/></div></div>
                <div className="nb-paths" aria-label={t('Destacar um caminho','Highlight a path')}>{['a − b','a + b','b − a'].map((label,index)=><button key={label} aria-pressed={focus===index} onClick={()=>setFocus(index===focus?-1:index)}>{label}</button>)}</div><p className="nb-result" aria-live="polite">({left} + {a+b} + {right}) ÷ 2 = <strong>{result}</strong></p>
              </figure>
              <p>{t('A rede soma os três resultados e divide por dois. Sobra o maior número. Mas repare: alguém escolheu essas conexões à mão. Calcular não é a mesma coisa que aprender.', 'The network adds the three results and divides by two. That leaves the larger number. But notice: someone chose these connections by hand. Computing is not the same as learning.')}</p>
              <details className="id-source"><summary>{t('Fonte e limites da adaptação','Source and adaptation limits')}</summary><p>{t('Agrupamos a + b em um nó; na figura original, esses termos vão direto à saída. Omitimos dois indicadores auxiliares. Não há treinamento neste exemplo.', 'We grouped a + b into one node; in the original figure those terms go straight to the output. Two auxiliary indicators are omitted. There is no training in this example.')}</p><a href="https://doi.org/10.1214/ss/1177010638" target="_blank" rel="noreferrer">Cheng &amp; Titterington (1994)</a></details>
            </>:selected===1?<><h2>{t('E quando chegam exemplos novos?','What happens when new examples arrive?')}</h2><p>{t('Um modelo pode acertar todas as respostas que viu durante o treino. Isso, sozinho, não mostra como ele vai se sair diante de dados novos.', 'A model can get every answer it saw during training right. That alone does not tell us how it will perform on new data.')}</p><p>{t('No experimento do projeto, usamos imagens de dígitos escritos à mão e separamos treino e teste. Aumentar a largura do modelo primeiro melhora, depois piora e finalmente volta a melhorar o resultado de teste. Essa segunda descida não é uma promessa para todo problema.', 'In this project’s experiment, we use handwritten digits and separate training from test data. Increasing the model width first improves, then worsens, and finally improves test performance again. That second descent is not a promise for every problem.')}</p></>:<><h2>{t('Recuperar não garante acertar.','Recovery does not guarantee correctness.')}</h2><p>{t('Numa rede de Hopfield, podemos guardar um padrão e começar a partir de uma cópia danificada. As unidades mudam de estado até a rede se estabilizar.', 'In a Hopfield network, we can store a pattern and start from a damaged copy. The units change state until the network settles.')}</p><p>{t('Com pouco ruído, o padrão pode reaparecer. Com mais ruído, a rede também pode se estabilizar numa resposta errada. Diminuir a energia não prova que a memória recuperada é a certa.', 'With a little noise, the pattern may reappear. With more noise, the network may also settle on a wrong answer. Lower energy does not prove that the recovered memory is correct.')}</p></>}
            <p className="id-continue"><a href={`/${locale}#${selected===0?'learning':selected===1?'generalization':'judgments'}`}>{t('Explorar no artigo completo','Explore in the full article')}</a></p>
          </div>
        </div>
        <footer className="id-essay-foot">{t('Leitura e adaptação: Adriano. Prévia visual, não publicação.', 'Reading and adaptation: Adriano. Visual preview, not a publication.')}</footer>
      </article>
    </main>
  </div>;
}
