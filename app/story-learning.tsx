'use client';

import { useMemo, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { classify, decisionSegment, trainFisher, trainPerceptron } from '@/lib/learning.mjs';
import data from '@/lib/story-data.json';
import { useCompactChart } from './story-generalization';

export function StoryLearning({ locale }: { locale:'pt'|'en' }) {
  const t=(pt:string,en:string)=>locale==='pt'?pt:en;
  const [method,setMethod]=useState<'fisher'|'perceptron'>('fisher');
  const [correction,setCorrection]=useState(0);
  const [selected,setSelected]=useState(0);
  const [answer,setAnswer]=useState<boolean|null>(null);
  const compact=useCompactChart();
  const models=useMemo(()=>{
    const points=data.iris.map(row=>row.point), labels=data.iris.map(row=>row.label);
    return {fisher:trainFisher(points,labels),perceptron:trainPerceptron(points,labels)};
  },[]);
  const history=models.perceptron.history;
  const model=method==='fisher'?models.fisher:correction===0?{weights:[0,0],bias:0}:history[correction-1];
  const segment=decisionSegment(model,6,2);
  const sample=data.iris[selected];
  const prediction=classify(model,sample.point)===-1?'setosa':'versicolor';
  const correct=data.iris.filter(row=>classify(model,row.point)===row.label).length;
  const W=compact?360:560,H=compact?300:360;
  const x=(v:number)=>40+v/6*(W-64), y=(v:number)=>H-44-v/2*(H-84);
  const goToCorrection=(next:number)=>{setCorrection(next);if(next>0)setSelected(history[next-1].point);};
  const fmt=(n:number)=>n.toLocaleString(locale==='pt'?'pt-BR':'en',{maximumFractionDigits:2});
  return <section id="learning" className="story-section" aria-labelledby="learn-title">
    <div className="story-prose">
      <p className="r-kicker">{t('De onde vêm as conexões?','Where do the connections come from?')}</p>
      <h2 id="learn-title">{t('Duas maneiras de separar as mesmas flores','Two ways to separate the same flowers')}</h2>
      <p>{t('Para ver como uma regra pode ser obtida dos dados, vamos usar flores de duas espécies do conjunto Iris. De cada flor, conhecemos a espécie e duas medidas da pétala: comprimento e largura. Essas informações permitem ajustar uma regra de classificação, ou seja, uma forma de escolher a espécie a partir das medidas.','To see how a rule can be fitted from data, we’ll use flowers from two species in the Iris dataset. For each flower, we know its species and two petal measurements: length and width. We can use this information to fit a classification rule, a way of choosing the species from its measurements.')}</p>
      <p>{t('Essa comparação retoma uma das ligações discutidas no artigo: a análise discriminante de Fisher e o perceptron podem usar uma soma ponderada para decidir entre dois grupos. No gráfico, isso aparece como uma linha que separa setosa de versicolor. Os métodos chegam a essa linha por procedimentos diferentes, que você pode comparar abaixo. Cada ponto representa uma das 20 flores selecionadas para a demonstração.','This comparison returns to a connection discussed in the paper: Fisher’s discriminant analysis and the perceptron can use a weighted sum to choose between two groups. On the chart, this appears as a line separating setosa from versicolor. The methods find that line through different procedures, which you can compare below. Each point represents one of the 20 flowers selected for this demonstration.')}</p>
    </div>
    <div className="story-lab learning-lab">
      <div className="story-toolbar" aria-label={t('Método de aprendizagem','Learning method')}>
        <button aria-pressed={method==='fisher'} onClick={()=>setMethod('fisher')}>Fisher <span>{t('olha os grupos','looks at the groups')}</span></button>
        <button aria-pressed={method==='perceptron'} onClick={()=>setMethod('perceptron')}>Perceptron <span>{t('corrige erros','corrects errors')}</span></button>
      </div>
      <div className="learning-layout">
        <figure className="flower-chart">
          <div className="chart-caption">{t('Largura da pétala (cm)','Petal width (cm)')}</div>
          <svg viewBox={`0 0 ${W} ${H}`} aria-labelledby="flower-title">
            <title id="flower-title">{t('20 flores: círculos setosa, triângulos versicolor. A linha mostra a decisão do método selecionado.','20 flowers: setosa circles and versicolor triangles. The line shows the selected method’s decision.')}</title>
            {[0,1,2].map(v=><g key={v}><line x1="40" y1={y(v)} x2={W-24} y2={y(v)} className="story-grid"/><text x="26" y={y(v)+5} textAnchor="end">{v}</text></g>)}
            {[0,2,4,6].map(v=><text key={v} x={x(v)} y={H-14} textAnchor="middle">{v}</text>)}
            {segment.length===2&&<line x1={x(segment[0][0])} y1={y(segment[0][1])} x2={x(segment[1][0])} y2={y(segment[1][1])} className="learn-boundary"/>}
            {data.iris.map((row,i)=><g key={row.index} className={row.label===-1?'species-a':'species-b'}>
              {row.label===-1?<circle cx={x(row.point[0])} cy={y(row.point[1])} r="6"/>:<path d={`M${x(row.point[0])},${y(row.point[1])-7}l7,13h-14z`}/>}
              {i===selected&&<circle cx={x(row.point[0])} cy={y(row.point[1])} r="13" className="sample-ring"/>}
            </g>)}
            {method==='fisher'&&[models.fisher.commonMean,models.fisher.spamMean].map((mean,i)=><g key={i} transform={`translate(${x(mean[0])} ${y(mean[1])})`} className="mean-cross"><path d="M-10 0H10M0-10V10"/></g>)}
          </svg>
          <figcaption>{t('Comprimento da pétala (cm)','Petal length (cm)')}</figcaption>
          <div className="story-legend"><span className="legend-a">● setosa</span><span className="legend-b">▲ versicolor</span>{method==='fisher'&&<span>+ {t('centros dos grupos','group centers')}</span>}</div>
        </figure>
        <div className="learning-explanation" aria-live="polite">
          <p className="r-kicker">{method==='fisher'?t('O conjunto primeiro','The whole dataset first'):t('Um erro de cada vez','One mistake at a time')}</p>
          <h3>{method==='fisher'?t('Onde estão os grupos?','Where are the groups?'):correction===0?t('Ainda não há uma linha.','There is no line yet.'):t('A regra acabou de mudar.','The rule just changed.')}</h3>
          <p>{method==='fisher'?t('Fisher compara os centros das espécies e a dispersão das medidas dentro de cada grupo. Dessa comparação sai a direção usada para separá-las. Os sinais + marcam os centros, não flores extras.','Fisher compares the species’ centers and how measurements vary within each group. That comparison produces a direction to separate them. The + signs mark centers, not extra flowers.'):t('O perceptron começa com pesos iguais a zero. Quando classifica uma flor incorretamente ou fica exatamente no limite, ajusta os pesos. Avance pelas correções para ver a decisão mudar.','The perceptron starts with zero weights. When it misclassifies a flower or lands exactly on the boundary, it adjusts the weights. Step through the corrections to see the decision change.')}</p>
          {method==='perceptron'&&<div className="training-controls"><p id="correction-label">{t('Correções realizadas','Corrections made')}: <strong>{correction} / {history.length}</strong></p><Slider min={0} max={history.length} step={1} value={[correction]} aria-labelledby="correction-label" onValueChange={v=>goToCorrection(Array.isArray(v)?v[0]:v)}/><button onClick={()=>goToCorrection(Math.min(history.length,correction+1))} disabled={correction===history.length}>{t('Próxima correção','Next correction')} →</button><button onClick={()=>goToCorrection(history.length)}>{t('Ver onde chega','See the final rule')}</button></div>}
          <p className="learning-score"><strong>{correct} / 20</strong> {t('flores de treino classificadas corretamente. Isso ainda não mede o resultado em flores novas.','training flowers classified correctly. This does not yet measure performance on new flowers.')}</p>
        </div>
      </div>
      <div className="sample-inspector">
        <div><label id="flower-label">{t('Inspecione uma flor','Inspect a flower')} · {selected+1}/20</label><Slider min={0} max={19} step={1} value={[selected]} aria-labelledby="flower-label" onValueChange={v=>setSelected(Array.isArray(v)?v[0]:v)}/></div>
        <p aria-live="polite">{fmt(sample.point[0])} × {fmt(sample.point[1])} cm<br/>{t('Espécie real','Actual species')}: <strong>{sample.label===-1?'setosa':'versicolor'}</strong> · {t('Resposta','Prediction')}: <strong>{prediction}</strong></p>
      </div>
      <details className="story-details"><summary>{t('O cálculo e os dados','The calculation and the data')}</summary><p>{t('A regra soma comprimento × peso 1, largura × peso 2 e um ajuste inicial. Se o total é positivo ou zero, escolhe versicolor; se é negativo, setosa. É a mesma estrutura de um neurônio com limiar. Isso não torna os algoritmos de aprendizagem iguais.','The rule adds length × weight 1, width × weight 2 and a starting offset. A positive or zero total selects versicolor; a negative total selects setosa. This is the same structure as a threshold neuron. That does not make the learning algorithms identical.')}</p><p className="numeric-rule">{fmt(model.weights[0])} × {fmt(sample.point[0])} + {fmt(model.weights[1])} × {fmt(sample.point[1])} + ({fmt(model.bias)}) = {fmt(model.weights[0]*sample.point[0]+model.weights[1]*sample.point[1]+model.bias)}</p><p>{t('Usamos as linhas 0, 5, …, 95 do Iris: 10 setosa e 10 versicolor. São dados reais, mas este recorte é uma demonstração de mecanismos, não um benchmark. Fisher usa a dispersão conjunta e o ponto médio entre as médias projetadas; o perceptron percorre os dados na ordem indicada.','We use rows 0, 5, …, 95 of Iris: 10 setosa and 10 versicolor. These are real data, but this subset demonstrates mechanisms, not a benchmark. Fisher uses pooled within-group scatter and the midpoint of projected means; the perceptron visits the observations in the stated order.')} <a href={data.sources.iris} target="_blank" rel="noreferrer">Iris ↗</a></p></details>
    </div>
    <div className="story-prose story-check"><h3>{t('Se as linhas forem parecidas, os métodos aprenderam do mesmo jeito?','If the lines look alike, did the methods learn in the same way?')}</h3><div className="story-actions"><button aria-pressed={answer===true} onClick={()=>setAnswer(true)}>{t('Sim','Yes')}</button><button aria-pressed={answer===false} onClick={()=>setAnswer(false)}>{t('Não','No')}</button></div>{answer!==null&&<p aria-live="polite">{answer?t('A aparência não basta. Um método usa a distribuição dos grupos; o outro vai corrigindo decisões erradas.','Appearance is not enough. One method uses the groups’ distribution; the other corrects mistaken decisions.'):t('Isso. Os dois métodos podem usar uma linha para classificar as flores, mas Fisher a obtém comparando os grupos e o perceptron a ajusta a partir das correções. Linhas parecidas não significam processos de aprendizagem iguais.','Exactly. Both methods can use a line to classify the flowers, but Fisher fits it by comparing the groups and the perceptron adjusts it through corrections. Similar lines do not imply identical learning procedures.')}</p>}</div>
  </section>;
}
