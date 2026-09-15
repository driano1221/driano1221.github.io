'use client';

import { useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';

// Editorial samples for visual approval, not a publication archive.
const posts = [
  { date: '2026-09-14', title: ['A incerteza não é um defeito.', 'Uncertainty is a feature, not a bug.'], subtitle: ['O que muda quando paramos de exigir certeza e começamos a olhar para a evidência.', 'What changes when we stop demanding certainty and start looking at the evidence.'], paragraphs: [
    ['A gente costuma tratar a incerteza como um problema a resolver. Mais dados, um modelo melhor, mais uma rodada de experimentos. Em algum momento, a resposta certa deveria aparecer. Será?', 'We tend to treat uncertainty as a problem to solve. More data, a better model, one more round of experiments. At some point, the right answer should appear. Should it?'],
    ['Pense numa moeda. Antes de lançá-la, você pode achar razoável esperar cara e coroa com a mesma frequência. Depois de dez caras seguidas, vale desconfiar. Não é uma prova de que a moeda está viciada. É evidência que deveria mudar o que você acredita.', 'Think of a coin. Before tossing it, you might reasonably expect heads and tails equally often. After ten heads in a row, you should be suspicious. That does not prove the coin is biased. It is evidence that should change what you believe.'],
    ['A regra de Bayes formaliza essa atualização. θ representa a chance de sair cara; D, os resultados observados. P(θ) descreve nossa incerteza antes dos lançamentos. P(θ | D), depois. Não precisamos sair da dúvida para aprender alguma coisa.', 'Bayes’ rule formalizes that update. θ represents the chance of heads; D, the observed outcomes. P(θ) describes our uncertainty before the tosses. P(θ | D), afterwards. We do not need to eliminate doubt to learn something.'],
    ['O detalhe importante: a conclusão depende também das hipóteses. Os lançamentos foram independentes? A moeda foi escolhida antes do experimento? Dez caras impressionam menos se alguém jogou mil moedas e mostrou só a sequência mais curiosa.', 'The important detail: the conclusion also depends on our assumptions. Were the tosses independent? Was the coin chosen before the experiment? Ten heads are less impressive if someone tossed a thousand coins and only showed the most interesting sequence.'],
    ['Talvez pensar estatisticamente comece aí. Não em falar com mais certeza, mas em saber dizer o que faria você mudar de ideia.', 'Perhaps statistical thinking starts there. Not with sounding more certain, but with knowing what would make you change your mind.'],
  ] },
  { date: '2026-09-09', title: ['Redes neurais, vistas de 1994.', 'Neural networks, seen from 1994.'], subtitle: ['Dois estatísticos, um artigo e perguntas que ainda não envelheceram.', 'Two statisticians, one paper, and questions that have not aged.'], paragraphs: [
    ['Em 1994, Bing Cheng e D. M. Titterington revisaram as redes neurais pela perspectiva da estatística. Relendo o artigo hoje, uma pergunta aparece logo: quanto da novidade estava no método, e quanto estava no jeito de desenhá-lo?', 'In 1994, Bing Cheng and D. M. Titterington reviewed neural networks from a statistical perspective. Reading it today raises a question: how much of the novelty was in the method, and how much was in its representation?'],
    ['Uma soma ponderada pode aparecer como equação ou como um nó recebendo várias conexões. O desenho muda. A conta pode continuar exatamente igual. Isso não torna toda rede uma regressão simples; torna essa primeira conexão mais fácil de enxergar.', 'A weighted sum can appear as an equation or as a node receiving several connections. The drawing changes. The calculation can stay exactly the same. This does not make every network a simple regression; it makes that first connection easier to see.'],
    ['O projeto completo explora essas conexões com exemplos interativos. A ideia é mexer nos números, observar o resultado e só então voltar à notação.', 'The full project explores these connections through interactive examples. The idea is to change the numbers, observe the result, and only then return to the notation.'],
  ] },
  { date: '2026-09-02', title: ['Acertar o treino não encerra a conversa.', 'Getting training right is not the whole story.'], subtitle: ['Decorar os exemplos e aprender algo útil não são a mesma coisa.', 'Memorizing examples and learning something useful are not the same thing.'], paragraphs: [
    ['Imagine estudar para uma prova recebendo as perguntas e as respostas de antemão. Acertar tudo depois seria impressionante? Depende. Se as perguntas forem as mesmas, talvez você só tenha decorado.', 'Imagine studying for an exam with the questions and answers in advance. Would a perfect score be impressive? It depends. If the questions are identical, perhaps you just memorized them.'],
    ['É por isso que separamos dados para avaliar um modelo. Queremos saber o que ele faz com exemplos que não participaram do ajuste. Um erro de treino pequeno, sozinho, não responde essa pergunta.', 'That is why we hold out data to evaluate a model. We want to know what it does with examples that were not used to fit it. A small training error alone cannot answer that question.'],
    ['E aumentar o modelo não produz sempre o mesmo efeito. O comportamento depende dos dados, do ajuste e de como medimos o erro. Melhor olhar o experimento do que confiar numa curva desenhada de memória.', 'And making a model larger does not always have the same effect. The behavior depends on the data, the fitting procedure, and how we measure error. Better to look at the experiment than trust a curve drawn from memory.'],
  ] },
  { date: '2026-08-26', title: ['Uma memória também pode lembrar errado.', 'A memory can also remember the wrong thing.'], subtitle: ['Reconhecer um padrão não significa recuperar o padrão certo.', 'Recognizing a pattern does not mean recovering the right one.'], paragraphs: [
    ['Uma letra incompleta ainda pode parecer uma letra. Nosso cérebro preenche o que falta. Uma pequena rede de Hopfield permite explorar uma versão matemática dessa ideia: partir de um padrão corrompido e atualizar seus pixels.', 'An incomplete letter can still look like a letter. Our brains fill in the gaps. A small Hopfield network lets us explore a mathematical version of this idea: start with a corrupted pattern and update its pixels.'],
    ['A rede pode recuperar uma memória armazenada. Mas também pode parar em outro padrão. Chegar a um estado estável não garante que a resposta seja a que procurávamos.', 'The network may recover a stored memory. But it can also settle into another pattern. Reaching a stable state does not guarantee the answer is the one we wanted.'],
    ['Essa é a parte interessante do experimento: não observar só quando funciona, mas encontrar as condições em que deixa de funcionar.', 'That is the interesting part of the experiment: not just watching it work, but finding the conditions under which it stops working.'],
  ] },
  { date: '2026-08-19', title: ['O que me faria mudar de ideia?', 'What would change my mind?'], subtitle: ['Uma pergunta para fazer antes do próximo experimento.', 'A question to ask before the next experiment.'], paragraphs: [
    ['É fácil encontrar uma explicação depois de ver o resultado. Mais difícil é dizer antes o que esperamos observar — e o que contaria contra a nossa hipótese.', 'It is easy to find an explanation after seeing the result. Harder to say beforehand what we expect to observe — and what would count against our hypothesis.'],
    ['Uma anotação simples já ajuda: o que vou mudar, o que vou medir e que resultado me surpreenderia. Não resolve todos os problemas do experimento. Mas torna mais difícil mudar a história sem perceber.', 'A simple note helps: what I will change, what I will measure, and what result would surprise me. It does not solve every problem with an experiment. But it makes it harder to change the story without noticing.'],
    ['O objetivo não é acertar a previsão. É conseguir aprender alguma coisa quando ela estiver errada.', 'The goal is not to get the prediction right. It is to learn something when it is wrong.'],
  ] },
];
const subscribe = (fn: () => void) => { window.addEventListener('popstate', fn); return () => window.removeEventListener('popstate', fn); };

export function InferencePreview() {
  const query = new URLSearchParams(useSyncExternalStore(subscribe, () => window.location.search, () => ''));
  const lang = query.get('lang') === 'en' ? 1 : 0;
  const locale = lang ? 'en' : 'pt';
  const view = query.get('view') === 'home' ? 'home' : query.get('view') === 'article' ? 'article' : 'pair';
  const selected = Math.trunc(Math.min(posts.length - 1, Math.max(0, Number(query.get('post')) || 0)));
  const post = posts[selected];
  const t = (pt: string, en: string) => lang ? en : pt;
  useEffect(() => { document.documentElement.lang = lang ? 'en' : 'pt-BR'; document.title = 'Inference Notes · prévia'; }, [lang]);
  function change(values: Record<string, string>) {
    const next = new URLSearchParams(window.location.search);
    Object.entries(values).forEach(([key, value]) => next.set(key, value));
    history.pushState(null, '', `?${next}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  const href = (nextView: string, index = selected) => `?view=${nextView}&post=${index}&lang=${locale}`;
  const date = (value: string) => new Intl.DateTimeFormat(lang ? 'en-US' : 'pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).formatToParts(new Date(`${value}T12:00:00Z`)).filter(p => p.type !== 'literal').map(p => p.value).join(' ');
  function header() { return <header className="in-header"><div><a className="in-brand" href={href('home')} onClick={e => { e.preventDefault(); change({view:'home'}); }}>Inference Notes</a><p className="in-tagline">{t('Estatística, IA e a busca por pensar melhor.', 'Statistics, AI, and the pursuit of clearer thinking.')}</p></div><nav aria-label={t('Navegação da página', 'Page navigation')}><a href={href('home')} onClick={e=>{e.preventDefault();change({view:'home'});}}>{t('Textos','Essays')}</a><Link href={`/${locale}`}>{t('Projeto','Project')}</Link><a href={`/${locale}#author`}>{t('Sobre','About')}</a></nav></header>; }
  function footer() { return <footer className="in-footer"><span>© 2026 Inference Notes</span><span>{t('Uma prévia do caderno de Adriano.', 'A preview of Adriano’s notebook.')}</span></footer>; }
  return <div className="in-preview">
    <div className="in-toolbar"><span>{t('Prévia · nome, textos e datas provisórios', 'Preview · provisional name, writing, and dates')}</span><div>{[['pair',t('Lado a lado','Side by side')],['home',t('Início','Home')],['article',t('Artigo','Article')]].map(([key,label])=><button key={key} aria-pressed={view===key} onClick={()=>change({view:key})}>{label}</button>)}<span className="in-lang"><button aria-pressed={!lang} onClick={()=>change({lang:'pt'})}>PT</button><button aria-pressed={!!lang} onClick={()=>change({lang:'en'})}>EN</button></span></div></div>
    <main className={`in-spread in-view-${view}`}>
      <section className="in-paper in-home" hidden={view==='article'} aria-label={t('Página inicial','Home page')}>
        {header()}
        <div className="in-intro"><h1>{t('Melhores perguntas.', 'Better questions.')}<br/>{t('Ideias mais claras.', 'Clearer thinking.')}</h1><div className="in-rule"/><p>{t('Um caderno pessoal sobre estatística, IA', 'A personal notebook on statistics, AI,')}<br/>{t('e como pensamos num mundo incerto.', 'and how we reason about an uncertain world.')}</p></div>
        <ol className="in-posts">{posts.map((item,index)=><li key={item.date}><a href={href('article',index)} onClick={e=>{e.preventDefault();change({view:'article',post:String(index)});}}><time dateTime={item.date}>{date(item.date)}</time><div><h2>{item.title[lang]}</h2><p>{item.subtitle[lang]}</p></div><span className="in-arrow" aria-hidden="true">→</span></a></li>)}</ol>
        {footer()}
      </section>
      <section className="in-paper in-article" hidden={view==='home'} aria-label={t('Página do artigo','Article page')}>
        {header()}
        <a className="in-back" href={href('home')} onClick={e=>{e.preventDefault();change({view:'home'});}}>← &nbsp; {t('Todos os textos','All posts')}</a>
        <article><header className="in-article-heading"><time dateTime={post.date}>{date(post.date)}</time><h1>{post.title[lang]}</h1><p>{post.subtitle[lang]}</p><div className="in-rule"/></header>
          <div className="in-prose">{post.paragraphs.map((paragraph,index)=><div key={index}><p>{paragraph[lang]}</p>{selected===0&&index===1&&<figure className="in-equation" aria-label={t('Regra de Bayes: a posteriori é igual à verossimilhança vezes a priori, dividida pela evidência.', 'Bayes’ rule: posterior equals likelihood times prior divided by evidence.')}><span aria-hidden="true"><i>P</i>(θ | D) = <span className="in-fraction"><span><i>P</i>(D | θ) <i>P</i>(θ)</span><span><i>P</i>(D)</span></span></span><small aria-hidden="true">(1)</small></figure>}</div>)}</div>
          {selected>0&&selected<4&&<p className="in-project-link"><Link href={`/${locale}#${selected===1?'learning':selected===2?'generalization':'judgments'}`}>{t('Abrir o experimento no projeto completo','Open the experiment in the full project')} →</Link></p>}
        </article>
        <nav className="in-pagination" aria-label={t('Outros textos','Other posts')}>{selected>0?<a href={href('article',selected-1)} onClick={e=>{e.preventDefault();change({post:String(selected-1)});}}>← {t('Mais recente','Newer post')}</a>:<span/>}{selected<posts.length-1&&<a href={href('article',selected+1)} onClick={e=>{e.preventDefault();change({post:String(selected+1)});}}>{t('Mais antigo','Older post')} →</a>}</nav>
        {footer()}
      </section>
    </main>
  </div>;
}
