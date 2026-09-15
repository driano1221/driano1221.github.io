'use client';

import { useEffect, useRef, useState } from 'react';

import { Slider } from '@/components/ui/slider';
import { getMorphStage, morphOpacity } from '@/lib/morph.mjs';

import { LearningComparison } from './learning-comparison';

type Locale = 'pt' | 'en';

const copy = {
  pt: {
    actIndex: 'Ato 1 de 3',
    actName: 'A forma',
    title: 'Redes neurais são estatística com outro desenho?',
    intro:
      'Para começar, esqueça camadas, matrizes e código. Imagine apenas um filtro tentando separar spam de mensagens comuns.',
    labTitle: 'Experimento 01 · a mesma decisão',
    tabs: ['01 Dados', '02 Cálculo', '03 Neurônio'],
    tabsLabel: 'Etapas da transformação',
    meta: '8 mensagens · exemplo didático',
    questionLabel: 'Pergunta',
    question: 'E se a linha e o neurônio forem a mesma decisão?',
    body: 'Duas pistas posicionam cada mensagem: termos promocionais e links. A linha soma essas pistas e escolhe um lado.',
    states: [
      'A linha separa duas categorias usando duas pistas.',
      'Os símbolos estão mudando de posição — o cálculo continua igual.',
      'O desenho mudou. A classificação das mensagens, não.',
    ],
    kickers: [
      'Representação estatística · fronteira linear',
      'O mesmo cálculo · mudando de posição',
      'Representação neural · uma unidade',
    ],
    slider: 'Arraste para mudar o desenho',
    transform: 'Ver como neurônio →',
    back: 'Voltar para a linha ←',
    detail: 'Ver o cálculo por trás',
    detailBody:
      'Se wᵀx + w₀ é positivo, escolhemos spam; se é negativo, mensagem comum. x guarda as pistas, w os pesos e w₀ desloca a fronteira.',
    note: 'A classificação das 8 mensagens não muda',
    nextLabel: 'A distinção que vem a seguir',
    nextStart: 'A forma matemática pode ser a mesma.',
    nextStrong: 'O modo de aprender os pesos, não.',
    axisY: 'links na mensagem ↑',
    axisX: 'termos promocionais →',
    common: '○ mensagem comum',
    spam: '▲ spam',
    boundary: 'fronteira de decisão',
    promo: 'termos promocionais',
    links: 'links na mensagem',
    start: 'ponto de partida',
    input1: 'entrada x₁',
    input2: 'entrada x₂',
    sum: 'soma + limite',
    same: 'mesma decisão',
    mobileSame: 'mesmas entradas · mesmos pesos · mesma resposta',
    mobileCalculation: 'o mesmo cálculo',
    titleSvg: 'A mesma decisão linear desenhada como gráfico e como neurônio',
    descSvg:
      'O controle transforma duas pistas e seus pesos em entradas ligadas a um neurônio; a classificação permanece igual.',
    disclosure:
      'Este é um exemplo didático com dados simulados. Filtros reais usam muito mais informação.',
  },
  en: {
    actIndex: 'Act 1 of 3',
    actName: 'The form',
    title: 'Are neural networks just statistics drawn differently?',
    intro:
      'To begin, forget layers, matrices and code. Imagine only a filter trying to separate spam from ordinary messages.',
    labTitle: 'Experiment 01 · the same decision',
    tabs: ['01 Data', '02 Calculation', '03 Neuron'],
    tabsLabel: 'Transformation stages',
    meta: '8 messages · teaching example',
    questionLabel: 'Question',
    question: 'What if the line and the neuron are the same decision?',
    body: 'Two clues position each message: promotional terms and links. The line adds those clues and chooses a side.',
    states: [
      'The line separates two categories using two clues.',
      'The symbols are changing position — the calculation stays the same.',
      'The drawing changed. The message classification did not.',
    ],
    kickers: [
      'Statistical representation · linear boundary',
      'The same calculation · changing position',
      'Neural representation · one unit',
    ],
    slider: 'Drag to change the drawing',
    transform: 'See it as a neuron →',
    back: 'Return to the line ←',
    detail: 'See the calculation underneath',
    detailBody:
      'If wᵀx + w₀ is positive, we choose spam; if negative, an ordinary message. x stores the clues, w the weights, and w₀ shifts the boundary.',
    note: 'The classification of all 8 messages stays the same',
    nextLabel: 'The distinction that comes next',
    nextStart: 'The mathematical form may be the same.',
    nextStrong: 'The way the weights are learned is not.',
    axisY: 'links in message ↑',
    axisX: 'promotional terms →',
    common: '○ ordinary message',
    spam: '▲ spam',
    boundary: 'decision boundary',
    promo: 'promotional terms',
    links: 'links in message',
    start: 'starting point',
    input1: 'input x₁',
    input2: 'input x₂',
    sum: 'sum + threshold',
    same: 'same decision',
    mobileSame: 'same inputs · same weights · same answer',
    mobileCalculation: 'the same calculation',
    titleSvg: 'The same linear decision drawn as a graph and as a neuron',
    descSvg:
      'The control turns two clues and their weights into inputs connected to a neuron; the classification stays the same.',
    disclosure:
      'This is a teaching example with simulated data. Real filters use much more information.',
  },
} as const;

const targets = {
  w1: [53, -286],
  x1: [-145, -313],
  w2: [-109, -146],
  x2: [-307, -173],
  bias: [-244, -34],
} as const;

function tokenTransform(key: keyof typeof targets, t: number) {
  const [x, y] = targets[key];
  const scale = 1 + 0.08 * t;
  return `translate(${(x * t).toFixed(1)} ${(y * t).toFixed(1)}) scale(${scale.toFixed(3)})`;
}

export function DecisionMorph({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const stage = getMorphStage(progress);
  const t = progress / 100;
  const opacity = morphOpacity(progress);

  useEffect(
    () => () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    },
    [],
  );

  function animateTo(target: number) {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(target);
      return;
    }

    const start = progress;
    const startedAt = performance.now();
    const duration = 900;

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - startedAt) / duration);
      const eased =
        elapsed < 0.5
          ? 4 * elapsed * elapsed * elapsed
          : 1 - Math.pow(-2 * elapsed + 2, 3) / 2;
      setProgress(start + (target - start) * eased);
      if (elapsed < 1) animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);
  }

  return (
    <section className="act-one" id="act-one" aria-labelledby="act-one-title">
      <header className="act-heading">
        <p className="act-heading__index">
          <span>{text.actIndex}</span>
          <span>{text.actName}</span>
        </p>
        <div>
          <h2 id="act-one-title">{text.title}</h2>
          <p className="act-heading__intro">{text.intro}</p>
        </div>
      </header>

      <div className="lab">
        <div className="lab__bar">
          <strong>{text.labTitle}</strong>
          <div className="stage-tabs" aria-label={text.tabsLabel}>
            {[0, 50, 100].map((value, index) => (
              <button
                type="button"
                key={value}
                aria-pressed={stage === index}
                onClick={() => {
                  setProgress(value);
                }}
              >
                {text.tabs[index]}
              </button>
            ))}
          </div>
          <span>{text.meta}</span>
        </div>

        <div className="lab__body">
          <div className="lab__copy">
            <div>
              <p className="eyebrow">{text.questionLabel}</p>
              <h3>{text.question}</h3>
              <p>{text.body}</p>
              <p className="live-conclusion">{text.states[stage]}</p>
            </div>

            <div className="morph-controls">
              <div className="control-label" id={`morph-label-${locale}`}>
                <span>{text.slider}</span>
                <output>{Math.round(progress)}%</output>
              </div>
              <Slider
                className="morph-slider"
                min={0}
                max={100}
                step={1}
                value={[progress]}
                onValueChange={(values) => {
                  if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
                  setProgress(typeof values === 'number' ? values : (values[0] ?? 0));
                }}
                aria-labelledby={`morph-label-${locale}`}
              />
              <button
                className="transform-action"
                type="button"
                onClick={() => animateTo(progress > 75 ? 0 : 100)}
              >
                {progress > 75 ? text.back : text.transform}
              </button>
              <details>
                <summary>{text.detail}</summary>
                <p>
                  {text.detailBody.split('wᵀx + w₀')[0]}
                  <code>wᵀx + w₀</code>
                  {text.detailBody.split('wᵀx + w₀')[1]}
                </p>
              </details>
            </div>
          </div>

          <div className="lab__visual">
            <p className="visual-kicker">{text.kickers[stage]}</p>
            <DesktopMorph text={text} t={t} opacity={opacity} />
            <MobileMorph text={text} t={t} opacity={opacity} />
            <p className="visual-note">{text.note}</p>
          </div>
        </div>
      </div>

      <p className="screen-reader-status" aria-live="polite">
        {text.states[stage]}
      </p>

      <div className="afterword">
        <div className="afterword__label">{text.nextLabel}</div>
        <div className="afterword__copy">
          {text.nextStart} <strong>{text.nextStrong}</strong>
          <small>{text.disclosure}</small>
        </div>
      </div>

      <LearningComparison locale={locale} />
    </section>
  );
}

type MorphCopy = (typeof copy)[Locale];

function DesktopMorph({
  text,
  t,
  opacity,
}: {
  text: MorphCopy;
  t: number;
  opacity: ReturnType<typeof morphOpacity>;
}) {
  return (
    <svg className="morph-viz" viewBox="0 0 920 620" aria-labelledby="desktop-viz-title desktop-viz-desc">
      <title id="desktop-viz-title">{text.titleSvg}</title>
      <desc id="desktop-viz-desc">{text.descSvg}</desc>

      <g style={{ opacity: opacity.scatter }}>
        <line className="gridline" x1="105" y1="150" x2="710" y2="150" />
        <line className="gridline" x1="105" y1="240" x2="710" y2="240" />
        <line className="gridline" x1="105" y1="330" x2="710" y2="330" />
        <line className="axis" x1="105" y1="398" x2="710" y2="398" />
        <line className="axis" x1="105" y1="92" x2="105" y2="398" />
        <text className="muted" x="105" y="72" fontSize="14">{text.axisY}</text>
        <text className="muted" x="710" y="427" fontSize="14" textAnchor="end">{text.axisX}</text>
        <text className="blue" x="146" y="365" fontSize="14">{text.common}</text>
        <text className="red" x="574" y="121" fontSize="14">{text.spam}</text>
        <circle className="common" cx="175" cy="342" r="7" />
        <circle className="common" cx="235" cy="314" r="7" />
        <circle className="common" cx="290" cy="350" r="7" />
        <circle className="common" cx="340" cy="282" r="7" />
        <path className="spam" d="M492 218 l8 15 h-16 z" />
        <path className="spam" d="M566 164 l8 15 h-16 z" />
        <path className="spam" d="M635 196 l8 15 h-16 z" />
        <path className="spam" d="M520 282 l8 15 h-16 z" />
        <line className="boundary" x1="267" y1="112" x2="562" y2="384" style={{ strokeWidth: 4 - 2.2 * t }} />
        <text className="bright mono" x="595" y="354" fontSize="13">{text.boundary}</text>
      </g>

      <g style={{ opacity: opacity.network }}>
        <path className="connector hot" d="M245 205 C350 205 410 260 490 288" />
        <path className="connector hot" d="M245 345 C350 345 410 330 490 312" />
        <path className="connector" d="M245 475 C370 475 423 374 500 333" />
        <path className="connector hot" d="M600 310 C665 310 700 310 750 310" />
        <circle className="node" cx="550" cy="310" r="54" />
        <text className="bright serif" x="550" y="325" textAnchor="middle" fontSize="46">Σ</text>
        <text className="muted mono" x="550" y="387" textAnchor="middle" fontSize="12">{text.sum}</text>
        <circle cx="770" cy="310" r="11" fill="var(--red-soft)" />
        <text className="bright" x="795" y="306" fontSize="16">spam</text>
        <text className="muted" x="795" y="326" fontSize="13">{text.same}</text>
      </g>

      <g>
        <text className="bright mono" x="135" y="522" fontSize="22" style={{ opacity: opacity.equation }}>sign (</text>
        <Token keyName="w1" className="red" x={258} label="w₁" t={t} />
        <Token keyName="x1" className="blue" x={320} label="x₁" t={t} />
        <text className="bright mono" x="390" y="522" fontSize="20" style={{ opacity: opacity.equation }}>+</text>
        <Token keyName="w2" className="red" x={420} label="w₂" t={t} />
        <Token keyName="x2" className="blue" x={482} label="x₂" t={t} />
        <text className="bright mono" x="552" y="522" fontSize="20" style={{ opacity: opacity.equation }}>+</text>
        <Token keyName="bias" className="red" x={582} label="w₀" t={t} />
        <text className="bright mono" x="650" y="522" fontSize="22" style={{ opacity: opacity.equation }}>)</text>
      </g>

      <g style={{ opacity: opacity.labels }}>
        <text className="bright" x="92" y="199" fontSize="15">{text.promo}</text>
        <text className="muted mono" x="92" y="222" fontSize="12">{text.input1}</text>
        <text className="bright" x="92" y="339" fontSize="15">{text.links}</text>
        <text className="muted mono" x="92" y="362" fontSize="12">{text.input2}</text>
        <text className="bright" x="92" y="469" fontSize="15">{text.start}</text>
        <text className="muted mono" x="92" y="492" fontSize="12">bias</text>
        <text className="red mono" x="338" y="193" textAnchor="middle" fontSize="12">w₁</text>
        <text className="red mono" x="338" y="333" textAnchor="middle" fontSize="12">w₂</text>
        <text className="red mono" x="338" y="463" textAnchor="middle" fontSize="12">w₀</text>
      </g>
    </svg>
  );
}

function Token({ keyName, className, x, label, t }: { keyName: keyof typeof targets; className: string; x: number; label: string; t: number }) {
  return (
    <g transform={tokenTransform(keyName, t)}>
      <rect className="token-box" x={x} y="493" width="54" height="42" />
      <text className={`${className} mono`} x={x + 27} y="521" textAnchor="middle" fontSize="20">{label}</text>
    </g>
  );
}

function MobileMorph({ text, t, opacity }: { text: MorphCopy; t: number; opacity: ReturnType<typeof morphOpacity> }) {
  return (
    <svg className="mobile-morph" viewBox="0 0 390 520" aria-labelledby="mobile-viz-title mobile-viz-desc">
      <title id="mobile-viz-title">{text.titleSvg}</title>
      <desc id="mobile-viz-desc">{text.descSvg}</desc>
      <g style={{ opacity: opacity.scatter }} transform={`translate(0 ${(-14 * t).toFixed(1)})`}>
        <line className="gridline" x1="42" y1="126" x2="350" y2="126" />
        <line className="gridline" x1="42" y1="205" x2="350" y2="205" />
        <line className="gridline" x1="42" y1="284" x2="350" y2="284" />
        <line className="axis" x1="42" y1="334" x2="350" y2="334" />
        <line className="axis" x1="42" y1="78" x2="42" y2="334" />
        <text className="muted" x="42" y="58" fontSize="13">links ↑</text>
        <text className="muted" x="350" y="358" fontSize="13" textAnchor="end">{text.axisX}</text>
        <circle className="common" cx="83" cy="284" r="6" /><circle className="common" cx="116" cy="264" r="6" /><circle className="common" cx="145" cy="292" r="6" /><circle className="common" cx="174" cy="243" r="6" />
        <path className="spam" d="M235 188 l7 13 h-14 z" /><path className="spam" d="M270 135 l7 13 h-14 z" /><path className="spam" d="M316 170 l7 13 h-14 z" /><path className="spam" d="M252 235 l7 13 h-14 z" />
        <line className="boundary" x1="134" y1="91" x2="283" y2="322" />
        <text className="bright mono" x="44" y="430" fontSize="19">sign (</text>
        <text className="red mono" x="116" y="430" fontSize="19">w₁</text><text className="blue mono" x="146" y="430" fontSize="19">x₁</text>
        <text className="bright mono" x="177" y="430" fontSize="19">+</text>
        <text className="red mono" x="201" y="430" fontSize="19">w₂</text><text className="blue mono" x="231" y="430" fontSize="19">x₂</text>
        <text className="bright mono" x="262" y="430" fontSize="19">+</text><text className="red mono" x="286" y="430" fontSize="19">w₀</text><text className="bright mono" x="320" y="430" fontSize="19">)</text>
        <text className="muted mono" x="195" y="477" fontSize="11" textAnchor="middle">{text.mobileCalculation}</text>
      </g>
      <g style={{ opacity: opacity.network }} transform={`translate(0 ${(12 * (1 - t)).toFixed(1)})`}>
        <path className="connector hot" d="M135 140 C178 140 195 188 226 208" />
        <path className="connector hot" d="M135 248 C177 248 193 239 222 229" />
        <path className="connector" d="M135 356 C180 356 197 277 228 247" />
        <circle className="node" cx="255" cy="225" r="39" />
        <text className="bright serif" x="255" y="238" textAnchor="middle" fontSize="36">Σ</text>
        <path className="connector hot" d="M294 225 H326" />
        <circle cx="339" cy="225" r="8" fill="var(--red-soft)" />
        <text className="bright" x="313" y="270" fontSize="15">spam</text>
        <g style={{ opacity: opacity.labels }}>
          <text className="bright" x="20" y="130" fontSize="15">{text.promo}</text>
          <text className="muted mono" x="20" y="151" fontSize="12">{text.input1}</text>
          <text className="bright" x="20" y="239" fontSize="15">{text.links}</text>
          <text className="muted mono" x="20" y="260" fontSize="12">{text.input2}</text>
          <text className="bright" x="20" y="348" fontSize="15">{text.start}</text>
          <text className="muted mono" x="20" y="369" fontSize="12">bias</text>
          <text className="red mono" x="168" y="168" fontSize="12">w₁</text>
          <text className="red mono" x="168" y="278" fontSize="12">w₂</text>
          <text className="red mono" x="151" y="344" fontSize="12">w₀</text>
          <text className="muted mono" x="195" y="435" fontSize="11" textAnchor="middle">{text.mobileSame}</text>
        </g>
      </g>
    </svg>
  );
}
