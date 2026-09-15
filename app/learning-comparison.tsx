'use client';

import { useMemo, useState } from 'react';

import { Slider } from '@/components/ui/slider';
import {
  decisionSegment,
  trainingSet,
  trainFisher,
  trainPerceptron,
} from '@/lib/learning.mjs';

type Locale = 'pt' | 'en';
type Method = 'fisher' | 'perceptron';

const copy = {
  pt: {
    eyebrow: 'Agora, a diferença',
    title: 'Mesma linha. Mesmo aprendizado?',
    intro:
      'Até aqui, Fisher e um perceptron parecem a mesma máquina. Mas ainda não vimos de onde vieram os pesos.',
    question:
      'Duas máquinas podem desenhar o mesmo tipo de linha e aprender essa linha de maneiras diferentes?',
    stagesLabel: 'Etapas da comparação',
    stages: ['01 Mesmos dados', '02 Como aprendem', '03 Onde chegam'],
    shared: 'Os mesmos 8 exemplos aparecem nos dois lados.',
    fisher: 'Fisher',
    fisherLead: 'observa os grupos',
    perceptron: 'Perceptron',
    perceptronLead: 'corrige os erros',
    fisherStates: [
      'Primeiro, encontra o centro de cada grupo.',
      'Compara a distância entre os centros com a dispersão dentro dos grupos.',
      'Usa essa visão global para calcular a fronteira.',
    ],
    perceptronStates: [
      'Primeiro, começa com uma fronteira provisória.',
      'Quando uma mensagem cai no lado errado, corrige os pesos e tenta novamente.',
      'As correções terminam em outra fronteira possível.',
    ],
    fisherMetric: 'centros + dispersão',
    correction: 'correções após erros',
    common: 'mensagem comum',
    spam: 'spam',
    promo: 'termos promocionais →',
    links: 'links ↑',
    ambiguousTitle: 'Agora, mova uma mensagem difícil.',
    ambiguousBody:
      'A mensagem marcada participa do treino. Os dois métodos recebem a mesma mudança, mas refazem a fronteira seguindo regras diferentes.',
    positions: ['perto do grupo comum', 'entre os grupos', 'perto do grupo spam'],
    positionLabel: 'Posição da mensagem difícil',
    result:
      'Mesmos exemplos. Mesmo tipo de decisão. Caminhos de aprendizagem diferentes — e pesos diferentes.',
    quizLabel: 'Cheque sua leitura',
    quiz: 'Se duas fronteiras terminam quase iguais, isso prova que os modelos aprenderam do mesmo modo?',
    yes: 'Prova',
    no: 'Não prova',
    correct:
      'Isso. A fronteira mostra como decidem; o treinamento mostra como chegaram até ali.',
    incorrect:
      'Ainda não. Fisher usa a distribuição dos grupos; o perceptron corrige exemplos classificados no lado errado.',
    closeStart: 'A forma é a mesma.',
    closeStrong: 'O modo de aprender não.',
    bridge:
      'Saber como um modelo aprende ainda não responde à pergunta mais difícil: ele funcionará em exemplos que nunca viu?',
    didactic:
      'Dados simulados para revelar a diferença entre as regras — não para decidir qual seria o melhor filtro real.',
    plotTitle: 'Mensagens comuns e spam separados por uma fronteira linear',
  },
  en: {
    eyebrow: 'Now, the difference',
    title: 'Same line. Same learning?',
    intro:
      'So far, Fisher and a perceptron look like the same machine. But we have not seen where their weights came from.',
    question:
      'Can two machines draw the same kind of line and learn that line in different ways?',
    stagesLabel: 'Comparison stages',
    stages: ['01 Same data', '02 How they learn', '03 Where they land'],
    shared: 'The same 8 examples appear on both sides.',
    fisher: 'Fisher',
    fisherLead: 'observes the groups',
    perceptron: 'Perceptron',
    perceptronLead: 'corrects errors',
    fisherStates: [
      'First, it finds the center of each group.',
      'It compares the distance between centers with the spread within the groups.',
      'It uses that global view to calculate the boundary.',
    ],
    perceptronStates: [
      'First, it starts with a provisional boundary.',
      'When a message falls on the wrong side, it corrects the weights and tries again.',
      'Those corrections end at another possible boundary.',
    ],
    fisherMetric: 'centers + spread',
    correction: 'error-driven corrections',
    common: 'ordinary message',
    spam: 'spam',
    promo: 'promotional terms →',
    links: 'links ↑',
    ambiguousTitle: 'Now move a difficult message.',
    ambiguousBody:
      'The marked message is part of training. Both methods receive the same change, but rebuild the boundary by following different rules.',
    positions: ['near the ordinary group', 'between the groups', 'near the spam group'],
    positionLabel: 'Position of the difficult message',
    result:
      'Same examples. Same kind of decision. Different learning paths — and different weights.',
    quizLabel: 'Check your reading',
    quiz: 'If two boundaries end up almost alike, does that prove the models learned in the same way?',
    yes: 'It proves it',
    no: 'It does not',
    correct:
      'Exactly. The boundary shows how they decide; training shows how they got there.',
    incorrect:
      'Not yet. Fisher uses the distribution of the groups; the perceptron corrects examples placed on the wrong side.',
    closeStart: 'The form is the same.',
    closeStrong: 'The way it learns is not.',
    bridge:
      'Knowing how a model learns still leaves the harder question unanswered: will it work on examples it has never seen?',
    didactic:
      'Simulated data designed to reveal the difference between the rules — not to decide which would be the best real filter.',
    plotTitle: 'Ordinary messages and spam separated by a linear boundary',
  },
} as const;

export function LearningComparison({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [stage, setStage] = useState(0);
  const [position, setPosition] = useState(1);
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);

  const models = useMemo(() => {
    const data = trainingSet(position);
    return {
      ...data,
      fisher: trainFisher(data.points, data.labels),
      perceptron: trainPerceptron(data.points, data.labels),
    };
  }, [position]);

  return (
    <section className="learning-comparison" aria-labelledby="learning-title">
      <header className="learning-heading">
        <p className="eyebrow">{text.eyebrow}</p>
        <h3 id="learning-title">{text.title}</h3>
        <p>{text.intro}</p>
        <p className="learning-question">{text.question}</p>
      </header>

      <div className="learning-board">
        <div className="learning-board__bar">
          <span>{text.shared}</span>
          <div className="learning-stages" aria-label={text.stagesLabel}>
            {text.stages.map((label, index) => (
              <button
                key={label}
                type="button"
                aria-pressed={stage === index}
                onClick={() => setStage(index)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="method-grid">
          <MethodPanel method="fisher" stage={stage} models={models} text={text} />
          <MethodPanel method="perceptron" stage={stage} models={models} text={text} />
        </div>

        <div className="ambiguous-control">
          <div>
            <h4>{text.ambiguousTitle}</h4>
            <p>{text.ambiguousBody}</p>
          </div>
          <div>
            <div className="control-label" id={`ambiguous-label-${locale}`}>
              <span>{text.positionLabel}</span>
              <output>{text.positions[position]}</output>
            </div>
            <Slider
              className="morph-slider ambiguity-slider"
              min={0}
              max={2}
              step={1}
              value={[position]}
              onValueChange={(values) => {
                setPosition(typeof values === 'number' ? values : (values[0] ?? 1));
                setStage(2);
              }}
              aria-labelledby={`ambiguous-label-${locale}`}
            />
            <div className="position-buttons" aria-label={text.positionLabel}>
              {text.positions.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={position === index}
                  onClick={() => {
                    setPosition(index);
                    setStage(2);
                  }}
                >
                  {index + 1}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="learning-result">{text.result}</p>

      <div className="recovery-check">
        <div>
          <p className="eyebrow">{text.quizLabel}</p>
          <h4>{text.quiz}</h4>
        </div>
        <div>
          <div className="answer-buttons">
            <button type="button" aria-pressed={answer === 'yes'} onClick={() => setAnswer('yes')}>
              {text.yes}
            </button>
            <button type="button" aria-pressed={answer === 'no'} onClick={() => setAnswer('no')}>
              {text.no}
            </button>
          </div>
          <p className="answer-feedback" aria-live="polite">
            {answer === null ? ' ' : answer === 'no' ? text.correct : text.incorrect}
          </p>
        </div>
      </div>

      <footer className="act-one-close">
        <p>
          {text.closeStart} <strong>{text.closeStrong}</strong>
        </p>
        <div>
          <span>{text.didactic}</span>
          <span>{text.bridge}</span>
        </div>
      </footer>
    </section>
  );
}

type LearningText = (typeof copy)[Locale];
type Models = ReturnType<typeof trainingSet> & {
  fisher: ReturnType<typeof trainFisher>;
  perceptron: ReturnType<typeof trainPerceptron>;
};

function MethodPanel({
  method,
  stage,
  models,
  text,
}: {
  method: Method;
  stage: number;
  models: Models;
  text: LearningText;
}) {
  const isFisher = method === 'fisher';
  return (
    <article className={`method-panel method-panel--${method}`}>
      <header>
        <span>0{isFisher ? 1 : 2}</span>
        <div>
          <h4>{isFisher ? text.fisher : text.perceptron}</h4>
          <p>{isFisher ? text.fisherLead : text.perceptronLead}</p>
        </div>
      </header>
      <ComparisonPlot method={method} stage={stage} models={models} text={text} />
      <div className="method-explanation">
        <p>{isFisher ? text.fisherStates[stage] : text.perceptronStates[stage]}</p>
        <span>
          {isFisher
            ? text.fisherMetric
            : `${models.perceptron.history.length} ${text.correction}`}
        </span>
      </div>
    </article>
  );
}

function ComparisonPlot({
  method,
  stage,
  models,
  text,
}: {
  method: Method;
  stage: number;
  models: Models;
  text: LearningText;
}) {
  const x = (value: number) => 48 + (value / 10) * 360;
  const y = (value: number) => 300 - (value / 7) * 240;
  const model = method === 'fisher' ? models.fisher : models.perceptron;
  const finalLine = decisionSegment(model);
  const historyLines = method === 'perceptron'
    ? [0.25, 0.55, 0.8]
        .map((fraction) => models.perceptron.history[Math.floor((models.perceptron.history.length - 1) * fraction)])
        .map((snapshot) => decisionSegment(snapshot))
        .filter((segment) => segment.length === 2)
    : [];

  return (
    <svg viewBox="0 0 460 360" aria-label={`${method}: ${text.plotTitle}`}>
      <g className="comparison-grid">
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <line key={`h${value}`} x1="48" y1={y(value)} x2="408" y2={y(value)} />
        ))}
        {[2, 4, 6, 8].map((value) => (
          <line key={`v${value}`} x1={x(value)} y1="60" x2={x(value)} y2="300" />
        ))}
      </g>
      <line className="comparison-axis" x1="48" y1="300" x2="408" y2="300" />
      <line className="comparison-axis" x1="48" y1="60" x2="48" y2="300" />
      <text className="comparison-axis-label" x="48" y="38">{text.links}</text>
      <text className="comparison-axis-label" x="408" y="330" textAnchor="end">{text.promo}</text>

      {method === 'fisher' && stage >= 1 && (
        <g className="fisher-spread">
          <ellipse cx={x(models.fisher.commonMean[0])} cy={y(models.fisher.commonMean[1])} rx="62" ry="42" />
          <ellipse cx={x(models.fisher.spamMean[0])} cy={y(models.fisher.spamMean[1])} rx="72" ry="50" />
          <line x1={x(models.fisher.commonMean[0])} y1={y(models.fisher.commonMean[1])} x2={x(models.fisher.spamMean[0])} y2={y(models.fisher.spamMean[1])} />
        </g>
      )}

      {method === 'perceptron' && stage >= 1 && historyLines.map((segment, index) => (
        <ModelLine key={index} segment={segment} x={x} y={y} className="perceptron-trace" />
      ))}

      {models.points.map((point, index) => {
        const isSpam = models.labels[index] === 1;
        const isAmbiguous = index === models.points.length - 1;
        return isSpam ? (
          <g key={index}>
            {isAmbiguous && <circle className="ambiguous-ring" cx={x(point[0])} cy={y(point[1])} r="14" />}
            <path className="plot-spam" d={`M${x(point[0])} ${y(point[1]) - 7} l7 14 h-14 z`} />
          </g>
        ) : (
          <circle key={index} className="plot-common" cx={x(point[0])} cy={y(point[1])} r="6" />
        );
      })}

      {method === 'fisher' && (
        <g className={`group-centers ${stage >= 0 ? 'is-visible' : ''}`}>
          <Center x={x(models.fisher.commonMean[0])} y={y(models.fisher.commonMean[1])} />
          <Center x={x(models.fisher.spamMean[0])} y={y(models.fisher.spamMean[1])} />
        </g>
      )}

      {stage === 0 && method === 'perceptron' && (
        <line className="provisional-line" x1={x(5.7)} y1={y(0)} x2={x(5.7)} y2={y(7)} />
      )}
      {stage >= 2 && finalLine.length === 2 && (
        <ModelLine segment={finalLine} x={x} y={y} className={`final-line final-line--${method}`} />
      )}

      <g className="plot-legend" transform="translate(236 344)">
        <circle className="plot-common" cx="0" cy="0" r="5" />
        <text x="11" y="4">{text.common}</text>
        <path className="plot-spam" d="M116 -6 l6 12 h-12 z" />
        <text x="128" y="4">{text.spam}</text>
      </g>
    </svg>
  );
}

function Center({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="8" />
      <line x1="-12" y1="0" x2="12" y2="0" />
      <line x1="0" y1="-12" x2="0" y2="12" />
    </g>
  );
}

function ModelLine({
  segment,
  x,
  y,
  className,
}: {
  segment: number[][];
  x: (value: number) => number;
  y: (value: number) => number;
  className: string;
}) {
  return (
    <line
      className={className}
      x1={x(segment[0][0])}
      y1={y(segment[0][1])}
      x2={x(segment[1][0])}
      y2={y(segment[1][1])}
    />
  );
}
