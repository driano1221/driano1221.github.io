'use client';

import { useEffect } from 'react';
import { KindleFooter, KindleHeader, useKindleTheme } from './chrome';
import type { Locale } from './theme';
import './kindle.css';

const base = '/posts/oceano-2026';
export const oceanPost = (locale: Locale) => locale === 'pt' ? '/oceano' : '/en/ocean';

export function KindleOcean({ locale }: { locale: Locale }) {
  const t = (pt: string, en: string) => locale === 'pt' ? pt : en;
  const theme = useKindleTheme();
  useEffect(() => { document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'; }, [locale]);
  return <div className="k-home" data-ktheme={theme}>
    <a href="#post" className="k-skip">{t('Pular para o texto', 'Skip to the post')}</a>
    <KindleHeader locale={locale} active="home" langHrefs={{ pt: oceanPost('pt'), en: oceanPost('en') }}/>
    <main className="k-main k-article" id="post">
        <p className="k-post-date"><time dateTime="2026-09-23">{t('23 de setembro de 2026', '23 September 2026')}</time></p>
        <h1 className="k-about-title">{t('O oceano mais quente desde 1979, e a skill que usei para desenhá-lo', 'The warmest ocean since 1979, and the skill I used to chart it')}</h1>

        <p>{t(
          'Quando peço um gráfico a um agente de IA, o resultado costuma sair correto e genérico ao mesmo tempo. As cores, as fontes e o jeito de anotar vêm de um padrão médio, e não das escolhas que já aprovei em outros trabalhos. Essas escolhas estavam anotadas no meu Obsidian, só que nenhum agente lia aquilo antes de começar. Por isso criei a design-vault, uma skill que faz o agente consultar essas regras, perguntar só o que falta, mostrar um rascunho e só então implementar. No fim, ele ainda pergunta se alguma decisão nova merece virar regra.',
          'When I ask an AI agent for a chart, the result tends to be correct and generic at the same time. Colours, fonts and the way things get annotated come from an average default rather than from choices I have already approved in other work. Those choices were written down in my Obsidian notes, but no agent read them before starting. So I created design-vault, a skill that makes the agent check those rules, ask only what is missing, show a draft and only then build. At the end it also asks whether any new decision deserves to become a rule.',
        )}</p>

        <p>{t(
          'Para testar, usei a série diária de temperatura da superfície do mar do Copernicus Climate Pulse, calculada a partir da reanálise ERA5 para a faixa entre 60°S e 60°N desde 1979. Rodei o mesmo pedido em dois agentes, o Claude Code com Opus 5.5 e o ZCode com GLM 5.3 flash. Os dois chegaram aos mesmos números e seguiram boa parte das regras, e duas ideias do ZCode entraram na versão final: a linha tracejada com a média de 1991 a 2020 e mais cuidado ao falar de causa.',
          'To test it, I used the daily sea surface temperature series from Copernicus Climate Pulse, computed from the ERA5 reanalysis for the band between 60°S and 60°N since 1979. I ran the same request in two agents, Claude Code with Opus 5.5 and ZCode with GLM 5.3 flash. Both reached the same numbers and followed most of the rules, and two of ZCode’s ideas made it into the final version: the dashed line with the 1991 to 2020 average and more care when talking about causes.',
        )}</p>

        <figure>
          <img src={`${base}/01_espaguete.png`} width={1220} height={1525} loading="lazy"
            alt={t('Uma linha por ano de 1979 a 2026 com a temperatura diária média da superfície do mar. A linha de 2026 aparece acima de todas desde junho e atinge 21,11 °C em 24 de agosto.', 'One line per year from 1979 to 2026 showing daily mean sea surface temperature. The 2026 line sits above all others from June and reaches 21.11°C on 24 August.')}/>
          <figcaption>{t('Cada linha é um ano. A vermelha é 2026.', 'Each line is a year. The red one is 2026.')}</figcaption>
        </figure>

        <p>{t(
          'O que os dados mostram é bem direto. Em 24 de agosto de 2026, a média da superfície do oceano chegou a 21,11 °C, o maior valor diário da série. O recorde anterior era de 21,09 °C, em março de 2024. Desde 17 de junho, todo dia de 2026 foi o mais quente já registrado para aquela data, 97 dias seguidos até 21 de setembro. Esse período coincide com uma mudança no Pacífico: o índice ONI da NOAA saiu de −0,6 no fim de 2025 para +1,8 entre junho e agosto, já em condições de El Niño.',
          'What the data show is fairly direct. On 24 August 2026 the mean ocean surface reached 21.11°C, the highest daily value in the series. The previous high was 21.09°C, in March 2024. Since 17 June, every day of 2026 has been the warmest on record for its date, 97 days in a row up to 21 September. That period coincides with a change in the Pacific: NOAA’s ONI index went from −0.6 at the end of 2025 to +1.8 between June and August, well into El Niño conditions.',
        )}</p>

        <figure>
          <img src={`${base}/03_mapa.png`} width={1220} height={1525} loading="lazy"
            alt={t('Mapa-múndi da anomalia de temperatura do mar em agosto de 2026. Quase todo o oceano aparece em tons de vermelho, com a faixa mais quente no Pacífico equatorial.', 'World map of sea surface temperature anomaly in August 2026. Almost the whole ocean is shaded red, with the warmest band in the equatorial Pacific.')}/>
          <figcaption>{t('Em agosto, 85% da área do oceano entre 60°S e 60°N estava acima da média de 1991 a 2020 (dados NOAA OISST).', 'In August, 85% of the ocean area between 60°S and 60°N was above the 1991 to 2020 average (NOAA OISST data).')}</figcaption>
        </figure>

        <p>{t(
          'Décimos de grau parecem pouco, mas aqui eles são a média de quase todo o oceano do planeta. Segundo o IPCC, o oceano ficou com cerca de 91% do calor acumulado no sistema climático entre 1971 e 2018, então é nele que o aquecimento aparece de forma mais constante. Água mais quente por mais tempo está associada a ondas de calor marinhas e ao branqueamento de corais. Para 2026 como um todo, a média até setembro está empatada com a de 2024, o ano completo mais quente da série, e os próximos meses vão dizer se ele passa à frente.',
          'Tenths of a degree sound small, but here they are the average of almost the entire ocean. According to the IPCC, the ocean took up about 91% of the heat accumulated in the climate system between 1971 and 2018, so it is where warming shows up most steadily. Warmer water for longer is associated with marine heatwaves and coral bleaching. For 2026 as a whole, the average up to September is level with 2024, the warmest full year in the series, and the coming months will tell whether it moves ahead.',
        )}</p>

        <figure>
          <img src={`${base}/02_stripes.png`} width={1220} height={1525} loading="lazy"
            alt={t('Faixas coloridas, uma por ano de 1979 a 2026, do azul nos anos 1980 ao vermelho escuro nos anos 2020.', 'Coloured stripes, one per year from 1979 to 2026, going from blue in the 1980s to dark red in the 2020s.')}/>
          <figcaption>{t('Uma faixa por ano, comparada com a média de 1991 a 2020. O oceano está acima dela todo ano desde 2012.', 'One stripe per year, compared with the 1991 to 2020 average. The ocean has been above it every year since 2012.')}</figcaption>
        </figure>

        <figure>
          <video src={`${base}/04_animacao.mp4`} width={1080} height={1350} controls muted loop playsInline preload="metadata"
            aria-label={t('Animação: os anos entram um a um desde 1979 e 2026 é desenhado por último.', 'Animation: years appear one by one from 1979 and 2026 is drawn last.')}/>
          <figcaption>{t('A mesma série em 12 segundos.', 'The same series in 12 seconds.')}</figcaption>
        </figure>

        <p className="k-article-sources">{t('Fontes', 'Sources')}:{' '}
          <a href="https://pulse.climate.copernicus.eu/" target="_blank" rel="noreferrer">Copernicus Climate Pulse (ERA5)</a>,{' '}
          <a href="https://www.ncei.noaa.gov/products/optimum-interpolation-sst" target="_blank" rel="noreferrer">NOAA OISST v2.1</a>,{' '}
          <a href="https://www.cpc.ncep.noaa.gov/data/indices/oni.ascii.txt" target="_blank" rel="noreferrer">NOAA CPC ONI</a>,{' '}
          <a href="https://www.ipcc.ch/report/ar6/wg1/chapter/summary-for-policymakers/" target="_blank" rel="noreferrer">IPCC AR6 WGI</a>.{' '}
          {t('Dados baixados em 23/09/2026, série até 21/09/2026. Gráficos feitos em R com ggplot2, terra e patchwork.', 'Data downloaded on 23 September 2026, series up to 21 September 2026. Charts made in R with ggplot2, terra and patchwork.')}
        </p>
        <p className="k-article-back"><a href={locale === 'pt' ? '/' : '/en/home'}>{t('← Voltar às publicações', '← Back to the blog')}</a></p>
    </main>
    <KindleFooter locale={locale} theme={theme}/>
  </div>;
}
