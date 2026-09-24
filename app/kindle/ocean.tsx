'use client';

import { useEffect } from 'react';
import { KindleFooter, KindleHeader, useKindleTheme } from './chrome';
import type { Locale } from './theme';
import './kindle.css';

export const oceanPost = (locale: Locale) => locale === 'pt' ? '/oceano' : '/en/ocean';
const repo = 'https://github.com/driano1221/oceano-2026';

// [texto](url) dentro da frase vira link, sem quebrar o parágrafo em pedaços de JSX
const md = (s: string) => s.split(/(\[[^\]]+\]\([^)]+\))/).map((part, i) => {
  const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  return m ? <a key={i} href={m[2]} target="_blank" rel="noreferrer">{m[1]}</a> : part;
});

export function KindleOcean({ locale }: { locale: Locale }) {
  const t = (pt: string, en: string) => locale === 'pt' ? pt : en;
  const img = (name: string) => `/posts/oceano-2026/${locale}/${name}`;   // cada idioma com os próprios gráficos
  const theme = useKindleTheme();
  useEffect(() => { document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'; }, [locale]);

  const stats: [string, string][] = [
    [t('21,11 °C', '21.11°C'), t('em 24 de agosto, a maior média diária desde 1979', 'on 24 August, the highest daily mean since 1979')],
    [t('97 dias', '97 days'), t('seguidos de recorde para a data, de 17 de junho a 21 de setembro', 'in a row of record highs for the date, from 17 June to 21 September')],
    ['85%', t('da área do oceano acima do normal em agosto', 'of the ocean area warmer than normal in August')],
    [t('+1,8', '+1.8'), t('no índice ONI da NOAA, em condições de El Niño', 'on NOAA’s ONI index, in El Niño conditions')],
  ];

  return <div className="k-home" data-ktheme={theme}>
    <a href="#post" className="k-skip">{t('Pular para o texto', 'Skip to the post')}</a>
    <KindleHeader locale={locale} active="home" langHrefs={{ pt: oceanPost('pt'), en: oceanPost('en') }}/>
    <main className="k-main k-article" id="post">
      <p className="k-post-date"><time dateTime="2026-09-23">{t('23 de setembro de 2026', '23 September 2026')}</time></p>
      <h1 className="k-about-title">{t('O dia mais quente do oceano desde 1979', 'The ocean’s warmest day since 1979')}</h1>
      <p className="k-article-deck">{t(
        'Em 24 de agosto de 2026, a média da superfície do mar chegou a 21,11 °C, o maior valor da série diária do ERA5. Os gráficos deste texto foram feitos com uma skill que criei para agentes de IA seguirem minhas regras de design, e o código está aberto.',
        'On 24 August 2026 the mean sea surface temperature reached 21.11°C, the highest value in the daily ERA5 series. The charts in this post were made with a skill I built so that AI agents follow my design rules, and the code is open.',
      )}</p>

      <dl className="k-stats">
        {stats.map(([value, label]) => <div key={value}><dt>{value}</dt><dd>{label}</dd></div>)}
      </dl>

      <figure className="k-wide">
        <img src={img('01_espaguete_web.png')} width={1600} height={1004}
          alt={t('Uma linha por ano de 1979 a 2026 com a temperatura média diária da superfície do mar. A linha de 2026 fica acima de todas desde junho e atinge 21,11 °C em 24 de agosto; a linha tracejada é a média de 1991 a 2020.', 'One line per year from 1979 to 2026 showing daily mean sea surface temperature. The 2026 line sits above all others from June and reaches 21.11°C on 24 August; the dashed line is the 1991 to 2020 average.')}/>
        <figcaption>{t('Cada linha é um ano. A vermelha é 2026, e a tracejada é a média de 1991 a 2020.', 'Each line is a year. The red one is 2026, and the dashed one is the 1991 to 2020 average.')}</figcaption>
      </figure>

      <p>{md(t(
        'A [série do Copernicus](https://pulse.climate.copernicus.eu/) acompanha, dia a dia, a temperatura média da superfície do mar entre 60°S e 60°N, o que cobre quase todo o oceano fora das regiões polares. Em 24 de agosto ela chegou a 21,11 °C. O recorde anterior era de 21,09 °C, em março de 2024, então a diferença é pequena em valor absoluto. O que chama atenção é o caminho até ali: desde 17 de junho, cada dia de 2026 foi o mais quente já registrado para aquela data do calendário, e a sequência continuava aberta em 21 de setembro, último dia disponível quando baixei os dados.',
        'The [Copernicus series](https://pulse.climate.copernicus.eu/) tracks, day by day, the mean sea surface temperature between 60°S and 60°N, which covers almost the whole ocean outside the polar regions. On 24 August it reached 21.11°C. The previous high was 21.09°C, in March 2024, so the gap is small in absolute terms. What stands out is how it got there: since 17 June, every day of 2026 has been the warmest on record for that calendar date, and the streak was still going on 21 September, the last day available when I downloaded the data.',
      ))}</p>
      <p>{md(t(
        'Esse período coincide com uma virada no Pacífico. O [ONI](https://www.cpc.ncep.noaa.gov/data/indices/oni.ascii.txt), índice que a NOAA usa para acompanhar o El Niño, estava em −0,6 no fim de 2025 e chegou a +1,8 entre junho e agosto. O mapa de agosto mostra essa faixa quente no Pacífico equatorial, onde a anomalia média chegou a 2,6 °C, mas mostra também que o calor não ficou só ali: 85% da área do oceano estava acima da média de 1991 a 2020.',
        'That period coincides with a shift in the Pacific. The [ONI](https://www.cpc.ncep.noaa.gov/data/indices/oni.ascii.txt), the index NOAA uses to track El Niño, was at −0.6 at the end of 2025 and reached +1.8 between June and August. The August map shows that warm band in the equatorial Pacific, where the average anomaly reached 2.6°C, but it also shows that the heat was not confined there: 85% of the ocean area was above the 1991 to 2020 average.',
      ))}</p>
      <figure>
        <img src={img('03_mapa.png')} width={1220} height={1525} loading="lazy"
          alt={t('Mapa-múndi da anomalia de temperatura do mar em agosto de 2026. Quase todo o oceano aparece em tons de vermelho, com a faixa mais quente no Pacífico equatorial.', 'World map of sea surface temperature anomaly in August 2026. Almost the whole ocean is shaded red, with the warmest band in the equatorial Pacific.')}/>
        <figcaption>{t('Anomalia de agosto de 2026 em relação a 1991 a 2020, com dados do NOAA OISST.', 'August 2026 anomaly relative to 1991 to 2020, from NOAA OISST data.')}</figcaption>
      </figure>

      <p>{md(t(
        'Décimos de grau parecem pouco, mas aqui eles são a média de quase todo o oceano do planeta. Segundo o [IPCC](https://www.ipcc.ch/report/ar6/wg1/chapter/summary-for-policymakers/), o oceano ficou com cerca de 91% do calor acumulado no sistema climático entre 1971 e 2018, então é nele que o aquecimento aparece de forma mais constante. Água mais quente por mais tempo está associada a ondas de calor marinhas e ao branqueamento de corais.',
        'Tenths of a degree sound small, but here they are the average of almost the entire ocean. According to the [IPCC](https://www.ipcc.ch/report/ar6/wg1/chapter/summary-for-policymakers/), the ocean took up about 91% of the heat accumulated in the climate system between 1971 and 2018, so it is where warming shows up most steadily. Warmer water for longer is associated with marine heatwaves and coral bleaching.',
      ))}</p>
      <p>{t(
        'As faixas abaixo resumem a série com uma cor por ano. Desde 2012, todos os anos ficaram acima da média de 1991 a 2020. Para 2026, a média até setembro está empatada com a de 2024, o ano completo mais quente da série, e os próximos meses vão dizer se ele passa à frente.',
        'The stripes below summarise the series with one colour per year. Since 2012, every year has been above the 1991 to 2020 average. For 2026, the average up to September is level with 2024, the warmest full year in the series, and the coming months will tell whether it moves ahead.',
      )}</p>
      <figure className="k-wide">
        <img src={img('02_stripes_web.png')} width={1600} height={902} loading="lazy"
          alt={t('Faixas coloridas, uma por ano de 1979 a 2026, do azul nos anos 1980 ao vermelho escuro nos anos 2020.', 'Coloured stripes, one per year from 1979 to 2026, going from blue in the 1980s to dark red in the 2020s.')}/>
      </figure>

      <p>{t(
        'Estes gráficos também foram um teste. Quando peço um gráfico a um agente de IA, o resultado costuma sair correto e genérico ao mesmo tempo. As cores, as fontes e o jeito de anotar vêm de um padrão médio, e não das escolhas que já aprovei em outros trabalhos. Essas escolhas estavam anotadas no meu Obsidian, só que nenhum agente lia aquilo antes de começar. Por isso criei a design-vault, uma skill que faz o agente consultar essas regras, perguntar só o que falta, mostrar um rascunho e só então implementar. No fim, ele ainda pergunta se alguma decisão nova merece virar regra.',
        'These charts were also a test. When I ask an AI agent for a chart, the result tends to be correct and generic at the same time. Colours, fonts and the way things get annotated come from an average default rather than from choices I have already approved in other work. Those choices were written down in my Obsidian notes, but no agent read them before starting. So I created design-vault, a skill that makes the agent check those rules, ask only what is missing, show a draft and only then build. At the end it also asks whether any new decision deserves to become a rule.',
      )}</p>
      <p>{t(
        'Para testar, rodei o mesmo pedido em dois agentes, o Claude Code com Opus 5.5 e o ZCode com GLM 5.3 flash. Os dois chegaram aos mesmos números e seguiram boa parte das regras, e duas ideias do ZCode entraram na versão final: a linha tracejada com a média de 1991 a 2020 e mais cuidado ao falar de causa. Os agentes ajudaram muito, mas ainda refinei o código e a estética até ficar do jeito que eu queria — com a minha assinatura. A mesma série também virou uma animação curta, pensada para redes sociais.',
        'To test it, I ran the same request in two agents, Claude Code with Opus 5.5 and ZCode with GLM 5.3 flash. Both reached the same numbers and followed most of the rules, and two of ZCode\'s ideas made it into the final version: the dashed line with the 1991 to 2020 average and more care when talking about causes. The agents helped a lot, but I still refined the code and the aesthetics until it looked the way I wanted — with my signature. The same series also became a short animation, meant for social media.',
      )}</p>
      <figure>
        {/* GIF em vez de vídeo: como imagem, recebe o multiply e o fundo branco vira papel */}
        <img src={img('04_animacao.gif')} width={720} height={900} loading="lazy"
          alt={t('Animação: os anos entram um a um desde 1979, em cinza, e 2026 é desenhado por último, em vermelho, até passar de todos em agosto.', 'Animation: years appear one by one from 1979 in grey, and 2026 is drawn last in red until it rises above all of them in August.')}/>
      </figure>

      <p>{md(t(
        'Para quem quiser conferir os números: os recordes são comparados pelo dia do calendário, sem o 29 de fevereiro, e um dia de 2026 conta como recorde quando supera o maior valor da mesma data entre 1979 e 2025. A sequência de 97 dias é contada de trás para frente a partir de 21 de setembro. As faixas usam a anomalia anual, e não a temperatura, porque 2026 ainda está incompleto e a média absoluta seria puxada pela estação do ano. O mapa compara agosto de 2026 no [NOAA OISST](https://www.ncei.noaa.gov/products/optimum-interpolation-sst) com a média de agosto entre 1991 e 2020, ponderando cada célula pela área. Como conferência, a anomalia de agosto dá +0,74 °C no OISST e +0,64 °C no ERA5, duas fontes independentes contando a mesma história.',
        'For anyone who wants to check the numbers: records are compared by calendar date, leaving out 29 February, and a day in 2026 counts as a record when it beats the highest value for that date between 1979 and 2025. The 97-day streak is counted backwards from 21 September. The stripes use the annual anomaly rather than the temperature, because 2026 is still incomplete and an absolute average would be pulled by the season. The map compares August 2026 in [NOAA OISST](https://www.ncei.noaa.gov/products/optimum-interpolation-sst) with the 1991 to 2020 August average, weighting each cell by its area. As a check, the August anomaly is +0.74°C in OISST and +0.64°C in ERA5, two independent sources telling the same story.',
      ))}</p>
      <p>{md(t(
        `O código em R, os dados usados e os critérios completos estão no repositório [oceano-2026](${repo}), com um script que refaz todos os gráficos em português e em inglês.`,
        `The R code, the data used and the full criteria are in the [oceano-2026 repository](${repo}), with a script that rebuilds every chart in Portuguese and English.`,
      ))}</p>

      <p className="k-article-sources">{t('Fontes', 'Sources')}:{' '}
        <a href="https://pulse.climate.copernicus.eu/" target="_blank" rel="noreferrer">Copernicus Climate Pulse (ERA5)</a>,{' '}
        <a href="https://www.ncei.noaa.gov/products/optimum-interpolation-sst" target="_blank" rel="noreferrer">NOAA OISST v2.1</a>,{' '}
        <a href="https://www.cpc.ncep.noaa.gov/data/indices/oni.ascii.txt" target="_blank" rel="noreferrer">NOAA CPC ONI</a>,{' '}
        <a href="https://www.ipcc.ch/report/ar6/wg1/chapter/summary-for-policymakers/" target="_blank" rel="noreferrer">IPCC AR6 WGI</a>.{' '}
        {t('Dados baixados em 23/09/2026, série até 21/09/2026. Gráficos feitos em R com ggplot2, terra e patchwork.', 'Data downloaded on 23 September 2026, series up to 21 September 2026. Charts made in R with ggplot2, terra and patchwork.')}
      </p>
      <p className="k-article-back"><a href={locale === 'pt' ? '/' : '/en/home'}>{t('← Voltar às publicações', '← Back to the blog')}</a></p>
    </main>
    <KindleFooter />
  </div>;
}
