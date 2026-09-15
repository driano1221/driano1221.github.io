import { useEffect } from 'react';
import { categories, confidence, evidence, paper, sources } from '@/lib/evidence';

export function StoryAppendix({ locale }: { locale: 'pt' | 'en' }) {
  useEffect(() => {
    function openLinkedEntry() {
      const id = window.location.hash.slice(1);
      if (!/^e(0[1-9]|1[0-7])$/.test(id)) return;
      const entry = document.getElementById(id);
      if (entry instanceof HTMLDetailsElement) {
        entry.open = true;
        requestAnimationFrame(() => entry.scrollIntoView({ block: 'start', behavior: 'instant' }));
      }
    }
    openLinkedEntry();
    window.addEventListener('hashchange', openLinkedEntry);
    return () => window.removeEventListener('hashchange', openLinkedEntry);
  }, []);
  const lang = locale === 'pt' ? 0 : 1;
  const t = (pt: string, en: string) => locale === 'pt' ? pt : en;
  return <>
    <section className="story-section evidence-section" id="evidence" aria-labelledby="evidence-title">
      <div className="story-prose">
        <p className="r-kicker">{t('Para continuar a leitura', 'For a closer reading')}</p>
        <h2 id="evidence-title">{t('Cinco perguntas não esgotam o artigo.', 'Five questions do not exhaust the paper.')}</h2>
        <p>{t('Há mais ali: dados ausentes, incerteza, agrupamentos, maneiras de combinar métodos. Este é o mapa dos 17 temas que catalogamos. Abra uma linha para confrontar a passagem de 1994 com o que veio depois.', 'There is more: missing data, uncertainty, clustering, ways to combine methods. This is the map of the 17 themes we catalogued. Open a row to compare the 1994 passage with what followed.')}</p>
      </div>
      <div className="evidence-reader">
        <details className="evidence-method">
          <summary>{t('Como ler este mapa', 'How to read this map')}</summary>
          <p>{t('Observação descreve algo já conhecido. Pergunta deixa uma questão em aberto. Alerta aponta um risco. Recomendação propõe um caminho. Uma passagem pode fazer mais de uma dessas coisas. Não reclassificamos perguntas como previsões para aumentar uma contagem de acertos.', 'An observation describes something already known. A question leaves an issue open. A warning identifies a risk. A recommendation suggests a direction. A passage may do more than one of these things. We do not relabel questions as predictions to inflate a success count.')}</p>
          <p>{t('Os textos abaixo são paráfrases, não citações literais. As páginas são as impressas no periódico; podem diferir da numeração do leitor de PDF. A confiança expressa nossa segurança na leitura histórica e na comparação, não a probabilidade de um resultado futuro.', 'The texts below are paraphrases, not direct quotations. Page numbers are those printed in the journal; they may differ from your PDF viewer. Confidence expresses our confidence in the historical reading and comparison, not the probability of a future outcome.')}</p>
          <p>{t('A pesquisa cobre o artigo principal, sem atribuir aos autores os comentários e a réplica publicados à parte. As referências posteriores são uma seleção, não uma revisão sistemática de toda a literatura. O mapa cobre os 17 temas do inventário, não cada frase ou figura do artigo.', 'The research covers the main paper, without attributing separately published comments and the reply to its authors. Later references are a selection, not a systematic review of all literature. The map covers the inventory’s 17 themes, not every sentence or figure in the paper.')}</p>
          <a href={paper} target="_blank" rel="noreferrer">Cheng &amp; Titterington · 1994 ↗</a>
        </details>
        <div className="evidence-list">
          {evidence.map(item => <details className="evidence-entry" id={item.id.toLowerCase()} key={item.id}>
            <summary><span className="evidence-id">{item.id}</span><span className="evidence-title">{item.title[lang]}</span><span className="evidence-kind">{categories[item.category[0]][lang]}</span><span className="evidence-toggle" aria-hidden="true" /></summary>
            <div className="evidence-body">
              <p className="evidence-meta">{t('Páginas impressas', 'Printed pages')} {item.pages} <span aria-hidden="true">·</span> {item.category.map(category => categories[category][lang]).join(' / ')}</p>
              <div className="evidence-comparison">
                <div><h3>{t('O que estava em 1994', 'What was there in 1994')}</h3><p>{item.original[lang]}</p></div>
                <div><h3>{t('O que veio depois', 'What followed')}</h3><p>{item.outcome[lang]}</p></div>
              </div>
              <p className="evidence-caveat"><strong>{t('Onde essa leitura para.', 'Where this reading stops.')} </strong>{item.caveat[lang]}</p>
              <div className="evidence-foot"><p>{t('Confiança na leitura', 'Confidence in this reading')}: {confidence[item.confidence][lang]}</p><div className="source-links"><a href={paper} target="_blank" rel="noreferrer">{t('Artigo original', 'Original paper')} ↗</a>{item.sources.map(key => <a href={sources[key][1]} key={key} target="_blank" rel="noreferrer">{sources[key][0]} ↗</a>)}</div></div>
            </div>
          </details>)}
        </div>
      </div>
    </section>
  </>;
}
