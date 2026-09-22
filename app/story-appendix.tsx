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
        <h2 id="evidence-title">{t('Outros temas do artigo e suas referências', 'Further topics from the paper and their references')}</h2>
        <p>{t('Além dos exemplos que acompanhamos, o artigo discute dados ausentes, incerteza, agrupamentos e combinações de métodos. Os 17 temas abaixo organizam essa leitura: cada item indica a passagem original, uma comparação com trabalhos posteriores e os limites dessa interpretação. As referências permitem seguir os assuntos que mais interessarem.', 'Beyond the examples we’ve followed, the paper discusses missing data, uncertainty, clustering and combinations of methods. The 17 topics below organize this reading: each entry identifies the original passage, a comparison with later work and the limits of that interpretation. The references offer ways to follow up on the topics that interest you.')}</p>
      </div>
      <div className="evidence-reader">
        <div className="evidence-list">
          {evidence.map(item => <details className="evidence-entry" id={item.id.toLowerCase()} key={item.id}>
            <summary><span className="evidence-id">{item.id}</span><span className="evidence-title">{item.title[lang]}</span><span className="evidence-kind">{categories[item.category[0]][lang]}</span><span className="evidence-toggle" aria-hidden="true" /></summary>
            <div className="evidence-body">
              <p className="evidence-meta">{item.category.map(category => categories[category][lang]).join(' / ')}</p>
              <div className="evidence-comparison">
                <div><h3>{t('O que estava em 1994', 'What was there in 1994')}</h3><p>{item.original[lang]}</p></div>
                <div><h3>{t('O que veio depois', 'What followed')}</h3><p>{item.outcome[lang]}</p></div>
              </div>
              <p className="evidence-caveat"><strong>{t('Limites da comparação:', 'Limits of the comparison:')} </strong>{item.caveat[lang]}</p>
              <div className="evidence-foot"><p>{t('Confiança na leitura', 'Confidence in this reading')}: {confidence[item.confidence][lang]}</p><div className="source-links"><a href={paper} target="_blank" rel="noreferrer">{t('Artigo original', 'Original paper')} ↗</a>{item.sources.map(key => <a href={sources[key][1]} key={key} target="_blank" rel="noreferrer">{sources[key][0]} ↗</a>)}</div></div>
            </div>
          </details>)}
        </div>
      </div>
    </section>
  </>;
}
