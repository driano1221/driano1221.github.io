'use client';

import { useEffect } from 'react';
import { KindleFooter, KindleHeader, useKindleTheme } from './chrome';
import type { Locale } from './theme';
import './kindle.css';

export const mothsPost = (locale: Locale) => locale === 'pt' ? '/mariposas' : '/en/moths';
const repo = 'https://github.com/driano1221/mariposas-2026';

// [texto](url) dentro da frase vira link, sem quebrar o parágrafo em pedaços de JSX
const md = (s: string) => s.split(/(\[[^\]]+\]\([^)]+\))/).map((part, i) => {
  const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  return m ? <a key={i} href={m[2]} target="_blank" rel="noreferrer">{m[1]}</a> : part;
});

export function KindleMoths({ locale }: { locale: Locale }) {
  const t = (pt: string, en: string) => locale === 'pt' ? pt : en;
  const img = (name: string) => `/posts/mariposas-2026/${locale}/${name}`;   // cada idioma com os próprios gráficos
  const theme = useKindleTheme();
  useEffect(() => { document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'; }, [locale]);

  const stats: [string, string][] = [
    [t('15.018', '15,018'), t('mariposas de papel, cada uma com uma larva viva de isca', 'paper moths, each with a live mealworm as bait')],
    ['21', t('bosques em seis continentes, 8 dias em cada um', 'woods on six continents, 8 days in each')],
    ['49%', t('chegaram inteiras à manhã seguinte, quase igual nas três cores', 'were still intact the next morning, almost the same for all three colours')],
    ['91%', t('sumiram entre o fim da tarde e o amanhecer num bosque da Austrália', 'vanished between late afternoon and dawn in one Australian wood')],
  ];

  return <div className="k-home" data-ktheme={theme}>
    <a href="#post" className="k-skip">{t('Pular para o texto', 'Skip to the post')}</a>
    <KindleHeader locale={locale} active="home" langHrefs={{ pt: mothsPost('pt'), en: mothsPost('en') }}/>
    <main className="k-main k-article" id="post">
      <p className="k-post-date"><time dateTime="2026-10-02">{t('2 de outubro de 2026', '2 October 2026')}</time></p>
      <h1 className="k-about-title">{t('15 mil mariposas de papel', '15,000 paper moths')}</h1>
      <p className="k-article-deck">{t(
        'Em 21 bosques de seis continentes, pesquisadores prenderam mariposas de papel em árvores para descobrir se a cor de alerta protege contra as aves. Refiz a análise com curvas de sobrevivência, conferi os resultados do artigo e encontrei uma noite que não era bem noite.',
        'In 21 woods on six continents, researchers pinned paper moths to trees to find out whether warning colours protect against birds. I redid the analysis with survival curves, checked the paper’s results and found a night that was not quite night.',
      )}</p>

      <dl className="k-stats">
        {stats.map(([value, label]) => <div key={value}><dt>{value}</dt><dd>{label}</dd></div>)}
      </dl>

      <p>{md(t(
        'Muitas lagartas e mariposas venenosas exibem cores fortes, como laranja e preto, e a explicação clássica é que essas cores funcionam como um aviso: a ave que já provou um inseto amargo aprende a evitar os que se parecem com ele. A outra estratégia é passar despercebido, com uma cor parecida com a da casca da árvore. Qual das duas protege mais depende de quem está caçando e de onde, e foi isso que um grupo de 55 pesquisadores tentou medir num [experimento publicado na Science](https://doi.org/10.1126/science.adr7368) em 2025, liderado por Iliana Medina e William Allen.',
        'Many poisonous caterpillars and moths show off strong colours such as orange and black, and the classic explanation is that these colours work as a warning: a bird that has already tasted a bitter insect learns to avoid the ones that look like it. The other strategy is to go unnoticed, with a colour close to that of tree bark. Which of the two protects better depends on who is hunting and where, and that is what a group of 55 researchers set out to measure in an [experiment published in Science](https://doi.org/10.1126/science.adr7368) in 2025, led by Iliana Medina and William Allen.',
      ))}</p>
      <p>{t(
        'O desenho é simples, e o que pesa é a escala. Em cada um dos 21 bosques, a equipe local prendeu nos troncos mariposas de papel impressas em três versões: laranja com listras pretas, como as espécies venenosas; turquesa com listras pretas, um aviso numa cor pouco comum na natureza; e marrom, da cor da casca. Cada mariposa levava uma larva de besouro viva como isca, e a equipe voltava três vezes para olhar: perto do meio-dia, no fim da tarde e no amanhecer seguinte. Se a larva tinha sumido sem deixar vestígio, o ataque era atribuído a uma ave; se havia formigas em volta ou restos de uma aranha, a outro predador.',
        'The design is simple, and what makes it count is the scale. In each of the 21 woods, the local team pinned paper moths to tree trunks, printed in three versions: orange with black stripes, like poisonous species; turquoise with black stripes, a warning in a colour that is rare in nature; and brown, the colour of bark. Each moth carried a live mealworm as bait, and the team came back three times to look: around noon, in the late afternoon and at the next dawn. If the mealworm had vanished without a trace, the attack was put down to a bird; if there were ants around or the remains left by a spider, to another predator.',
      )}</p>

      <figure className="k-wide">
        <img src={img('01_mapa.png')} width={1600} height={1004}
          alt={t('Mapa-múndi pontilhado com uma rosca em cada um dos 21 bosques, dividida entre mariposas levadas por aves, por outros predadores e ainda inteiras. A Holanda tem quase tudo inteiro; o leste da Austrália, quase tudo levado por aves.', 'Dotted world map with a ring on each of the 21 woods, split between moths taken by birds, by other predators and still intact. The Netherlands is almost all intact; eastern Australia is almost all taken by birds.')}/>
        <figcaption>{t('Cada rosca é um bosque: o que tinha acontecido com as mariposas até o amanhecer seguinte.', 'Each ring is a wood: what had happened to its moths by the next dawn.')}</figcaption>
      </figure>

      <p>{t(
        'O mapa já mostra que “as aves” não são uma coisa só. Na Holanda, quase nada sumiu; no leste da Austrália, as aves levaram 91% das mariposas até a manhã seguinte. Na Índia, na Costa Rica e no sul da Austrália, formigas e outros predadores levaram tanto quanto as aves, ou mais.',
        'The map already shows that “the birds” are not one thing. In the Netherlands almost nothing vanished; in eastern Australia, birds took 91% of the moths by the next morning. In India, Costa Rica and southern Australia, ants and other predators took as many as the birds did, or more.',
      )}</p>
      <p>{t(
        'Para quem trabalha com análise de sobrevivência, esse experimento é quase um exemplo de livro. Cada mariposa “sobrevive” até ser levada, e só sabemos que isso aconteceu quando alguém volta para olhar. Por isso a curva de sobrevivência aqui é uma escadinha com três degraus, um por visita: entre um degrau e outro, ninguém estava vendo. As mariposas que sumiram por outros motivos, levadas pelo vento ou pela chuva, contam até a última visita em que foram vistas, que é o que a estatística chama de censura. Juntando os 21 bosques, as três cores descem quase coladas e chegam ao amanhecer com cerca de metade das mariposas inteiras.',
        'For anyone who works with survival analysis, this experiment is close to a textbook example. Each moth “survives” until it is taken, and we only know that happened when someone comes back to look. That is why the survival curve here is a staircase with three steps, one per check: between one step and the next, nobody was watching. Moths that went missing for other reasons, blown away by wind or rain, count until the last check at which they were seen, which is what statisticians call censoring. With the 21 woods together, the three colours come down almost on top of each other and reach dawn with about half of the moths intact.',
      )}</p>

      <figure className="k-wide">
        <img src={img('02_sobrevivencia.png')} width={1600} height={1004} loading="lazy"
          alt={t('Três painéis de curvas em escadinha, uma por cor de mariposa. Nos 21 bosques juntos as três linhas quase se sobrepõem; na República Tcheca a laranja e a turquesa caem mais que a camuflada; na Serra do Japi a laranja resiste mais.', 'Three panels of step curves, one per moth colour. For all 21 woods the three lines almost overlap; in the Czech Republic orange and turquoise drop further than the camouflaged one; in Serra do Japi the orange one holds up best.')}/>
        <figcaption>{t('Porcentagem de mariposas ainda inteiras a cada visita. A faixa com a lua é a noite.', 'Share of moths still intact at each check. The band with the moon is the night.')}</figcaption>
      </figure>

      <p>{t(
        'Só que essa média esconde bosques que puxam para lados opostos. Na República Tcheca, as duas mariposas coloridas sumiram muito mais que a camuflada: ao amanhecer restavam 39% das laranjas e 27% das turquesas, contra 53% das marrons. Na Serra do Japi, em São Paulo, aconteceu o contrário, e a laranja foi a que mais resistiu. A diferença tcheca é grande demais para ser acaso; a da Serra do Japi é menor, e parte dela pode ser. No total dos 21 bosques, as diferenças se compensam, o que bate com a conclusão do próprio artigo de que não existe uma estratégia melhor em todo lugar.',
        'That average, though, hides woods pulling in opposite directions. In the Czech Republic the two colourful moths vanished far more than the camouflaged one: by dawn 39% of the orange ones and 27% of the turquoise ones were left, against 53% of the brown ones. In Serra do Japi, in São Paulo state, the opposite happened, and the orange moth held up best. The Czech gap is too large to be chance; the one in Serra do Japi is smaller, and part of it may be. Across all 21 woods the differences cancel out, which matches the paper’s own conclusion that there is no strategy that wins everywhere.',
      )}</p>
      <p>{t(
        'A mudança mais clara aparece no calendário. Cada bosque recebeu mariposas novas durante oito dias seguidos, e ao longo da semana elas foram durando menos. No primeiro dia, 61% chegaram inteiras ao amanhecer; no oitavo, 39%. Por visita, o risco de uma mariposa ser levada por uma ave dobrou nesse período, de 9 para 18 em cada 100. A explicação mais provável é que as aves foram aprendendo que aquelas árvores tinham comida.',
        'The clearest change shows up in the calendar. Each wood got fresh moths for eight days in a row, and over the week they lasted less and less. On the first day, 61% were still intact at dawn; on the eighth, 39%. Per check, the risk of a moth being taken by a bird doubled over that period, from 9 to 18 in every 100. The most likely explanation is that the birds were learning that those trees had food on them.',
      )}</p>

      <figure className="k-wide">
        <img src={img('03_dias.png')} width={1600} height={1004} loading="lazy"
          alt={t('Oito pequenos gráficos, um por dia do experimento, com a curva do dia em vermelho e a do primeiro dia em cinza. A porcentagem de mariposas inteiras ao amanhecer cai de 61% no primeiro dia para 39% no oitavo.', 'Eight small charts, one per day of the experiment, with that day’s curve in red and the first day’s in grey. The share of moths intact at dawn falls from 61% on day one to 39% on day eight.')}/>
        <figcaption>{t('Cada painel é um dia do experimento; a linha cinza é o primeiro dia, como referência.', 'Each panel is a day of the experiment; the grey line is day one, for reference.')}</figcaption>
      </figure>

      <p>{t(
        'Como todas as larvas eram gostosas, esse aprendizado diz respeito ao lugar, e as cores pouco entram nele. Para ver o que acontece quando a presa é de fato ruim de comer, os autores fizeram um experimento à parte na República Tcheca, com larvas injetadas com uma substância amarga, e ali a predação caiu com o passar dos dias. No experimento principal, o que o artigo destaca como seu maior efeito é a relação entre a cor e a fome do lugar. Nos bosques onde as aves comiam quase todas as larvas oferecidas sem papel, a mariposa laranja começou cerca de 1,5 vez mais atacada que a camuflada e terminou a semana menos atacada que ela. A leitura dos autores é que, onde a competição por comida é grande, as aves arriscam provar a presa colorida.',
        'Since every mealworm was tasty, this learning is about the place, and colour plays little part in it. To see what happens when prey really is bad to eat, the authors ran a separate experiment in the Czech Republic with mealworms injected with a bitter substance, and there predation fell as the days went by. In the main experiment, what the paper highlights as its largest effect is the link between colour and how hungry the place is. In woods where birds ate almost all the mealworms offered without paper, the orange moth started out about 1.5 times as likely to be attacked as the camouflaged one and ended the week less likely. The authors’ reading is that where competition for food is fierce, birds take the risk of tasting colourful prey.',
      )}</p>

      <figure className="k-wide">
        <img src={img('04_predacao.png')} width={1600} height={1004} loading="lazy"
          alt={t('Dois painéis com o risco da mariposa laranja dividido pelo da camuflada, do 1º ao 8º dia. Com pouca predação a linha sobe de 0,8 para 1,4 vez, sempre dentro da margem de incerteza; com muita predação ela cai de 1,5 para 0,7 vez.', 'Two panels with the orange moth’s risk divided by the camouflaged one’s, from day 1 to day 8. With little predation the line rises from 0.8 to 1.4 times, always within the uncertainty band; with heavy predation it falls from 1.5 to 0.7 times.')}/>
        <figcaption>{t('Acima da linha tracejada, a laranja foi mais atacada que a camuflada; abaixo, menos.', 'Above the dashed line, the orange moth was attacked more than the camouflaged one; below it, less.')}</figcaption>
      </figure>

      <p>{t(
        'Refiz esse modelo com os dados e o código que os autores deixaram públicos, e os números da tabela principal batem até a segunda casa decimal. Testei também uma versão que permite que cada dia de cada bosque tenha seu próprio nível de risco, e quase tudo continua igual. O efeito da intensidade de predação é o único que perde um pouco de força: um dos termos passa de p = 0,03 para 0,06. Isso não derruba o resultado, mas mostra que o maior efeito do artigo é também o mais frágil estatisticamente. A mesma versão do modelo mostra outra coisa curiosa: dois dias no mesmo bosque costumam diferir, em risco, cerca de 1,8 vez, quase o mesmo que dois bosques em continentes diferentes (1,7 vez). O clima do dia, um bando que passou, um gavião por perto, tudo isso pesa tanto quanto a geografia.',
        'I refitted that model with the data and code the authors made public, and the numbers in the main table match to the second decimal place. I also tried a version that lets each day in each wood have its own level of risk, and almost everything stays the same. The predation-intensity effect is the only one that loses a little strength: one of its terms goes from p = 0.03 to 0.06. That does not overturn the result, but it shows that the paper’s largest effect is also its most fragile statistically. The same version of the model shows something else worth noting: two days in the same wood typically differ in risk by about 1.8 times, almost as much as two woods on different continents (1.7 times). The weather that day, a flock passing through, a hawk nearby, all of it weighs as much as geography.',
      )}</p>
      <p>{t(
        'As aves também não eram as únicas famintas. Mesmo com uma faixa de fita adesiva em volta de cada tronco para barrar as formigas, elas levaram 2.058 mariposas, e aranhas, vespas, lesmas e outros bichos levaram mais algumas centenas. No artigo, essas mariposas saem da conta, o que faz sentido para uma pergunta sobre aves. Mas o destino de cada mariposa é um só, e isso cria uma armadilha conhecida em análise de sobrevivência, chamada de riscos competitivos: se uma formiga levou a mariposa, a ave não pode mais levá-la, e vice-versa.',
        'Birds were not the only hungry ones either. Even with a band of duct tape around every trunk to keep ants out, ants took 2,058 moths, and spiders, wasps, slugs and other creatures took a few hundred more. In the paper these moths are left out of the count, which makes sense for a question about birds. But each moth has only one fate, and that sets a well-known trap in survival analysis, called competing risks: if an ant took the moth, a bird can no longer take it, and the other way round.',
      )}</p>

      <figure className="k-wide">
        <img src={img('05_destino.png')} width={1600} height={1004} loading="lazy"
          alt={t('Três faixas de cem triângulos, uma por visita. Ao meio-dia, 15 vermelhos (aves) e 7 azuis (outros predadores); no fim da tarde, 22 e 11; depois de uma faixa de noite, ao amanhecer, 35 e 16, com 49 ainda inteiros.', 'Three strips of a hundred triangles, one per check. At noon, 15 red (birds) and 7 blue (other predators); in the late afternoon, 22 and 11; after a night band, at dawn, 35 and 16, with 49 still intact.')}/>
        <figcaption>{t('Cada triângulo é uma mariposa em cada cem; a faixa com a lua é a noite.', 'Each triangle is one moth in a hundred; the band with the moon is the night.')}</figcaption>
      </figure>

      <p>{t(
        'Contando do jeito certo, de cada 100 mariposas, 35 foram levadas por aves até o amanhecer, 16 por outros predadores e 49 continuaram inteiras. O jeito ingênuo, que calcula cada predador como se o outro não existisse, chegaria a 37 levadas por aves e 18 por outros, ou seja, 104 mariposas onde só havia 100. Com riscos tão baixos o erro é pequeno, mas cresce justamente nos bosques onde aves e formigas comem muito ao mesmo tempo. E as formigas não parecem ligar para a cor: o risco de uma laranja ser levada por elas é praticamente o mesmo de uma camuflada (razão de 1,02, com margem de 0,92 a 1,14).',
        'Counted the right way, out of every 100 moths, 35 had been taken by birds by dawn, 16 by other predators and 49 were still intact. The naive way, which works out each predator as if the other did not exist, would give 37 taken by birds and 18 by others, that is, 104 moths where there were only 100. With risks this low the error is small, but it grows precisely in the woods where birds and ants both eat a lot. And ants do not seem to care about colour: the risk of an orange moth being taken by them is practically the same as for a camouflaged one (a ratio of 1.02, with a margin of 0.92 to 1.14).',
      )}</p>
      <p>{t(
        'Os horários das visitas guardam outra parte da história. O artigo trata como noturnos os ataques entre a visita do fim da tarde e a do amanhecer, e os deixa fora da análise principal, porque à noite as aves quase não caçam. É uma escolha razoável, e os autores mostram no material suplementar que os resultados se parecem quando esses ataques entram. Mas, cruzando os horários anotados com o nascer e o pôr do sol de cada lugar, essa “noite” tinha horas de sol em todos os bosques: cerca de uma hora na Holanda, quatro na Costa Rica e dez na Finlândia, onde o experimento foi feito em junho e o sol se punha perto das onze da noite. Os horários de sol anotados pelas equipes batem com o cálculo astronômico, com diferença típica de dois minutos.',
        'The check times hold another part of the story. The paper treats attacks between the late-afternoon check and the dawn check as nocturnal and leaves them out of the main analysis, because birds hardly hunt at night. It is a reasonable choice, and the authors show in the supplementary material that the results look similar when those attacks are included. But matching the recorded times with sunrise and sunset at each site, this “night” had hours of sunlight in every wood: about one hour in the Netherlands, four in Costa Rica and ten in Finland, where the experiment ran in June and the sun set close to eleven at night. The sunrise and sunset times recorded by the teams match the astronomical calculation, with a typical gap of two minutes.',
      )}</p>

      <figure className="k-wide">
        <img src={img('07_noite.png')} width={1600} height={1004} loading="lazy"
          alt={t('Uma barra por bosque, do horário da visita do fim da tarde ao da visita do amanhecer. Trechos amarelos são horas de sol e trechos azul-escuros são escuro; a Finlândia tem 10 horas de sol no intervalo e a Holanda, 1.', 'One bar per wood, from the late-afternoon check to the dawn check. Yellow stretches are hours of sunlight and dark blue stretches are darkness; Finland has 10 hours of sun in the interval and the Netherlands 1.')}/>
        <figcaption>{t('Em amarelo, as horas de sol dentro do intervalo que o estudo trata como noite.', 'In yellow, the hours of sunlight inside the interval the study treats as night.')}</figcaption>
      </figure>

      <p>{t(
        'No ritmo de ataque da tarde de cada bosque, cerca de 430 dos 1.881 ataques de ave desse intervalo teriam acontecido ainda com luz, e ficaram fora da conta. Em alguns bosques acontece o inverso, com ataques demais para as poucas horas de sol. No leste da Austrália, 91% das mariposas que estavam inteiras no fim da tarde tinham sido “levadas por aves” até o amanhecer, e as horas de sol explicam só uma pequena parte disso. Na Nova Zelândia foram metade, e num dos bosques da Índia, 42%.',
        'At each wood’s afternoon attack rate, about 430 of the 1,881 bird attacks in that interval would have happened while it was still light, and they were left out of the count. In some woods the opposite happens, with far too many attacks for the few hours of sun. In eastern Australia, 91% of the moths that were intact in the late afternoon had been “taken by birds” by dawn, and the hours of sunlight explain only a small part of that. In New Zealand it was half, and in one of the Indian woods, 42%.',
      )}</p>

      <figure className="k-wide">
        <img src={img('08_ataques_noite.png')} width={1600} height={1004} loading="lazy"
          alt={t('Uma barra por bosque com a porcentagem de mariposas levadas por “ave” entre o fim da tarde e o amanhecer. O trecho amarelo é o que as horas de sol explicariam; o resto aconteceu no escuro. Austrália (leste) chega a 91%, quase todo no escuro.', 'One bar per wood with the share of moths taken by a “bird” between late afternoon and dawn. The yellow part is what the hours of sunlight would explain; the rest happened in the dark. Australia (east) reaches 91%, almost all of it in the dark.')}/>
        <figcaption>{t('Em amarelo, o que as aves levariam nas horas de sol; o resto aconteceu no escuro.', 'In yellow, what birds would take in the sunny hours; the rest happened in the dark.')}</figcaption>
      </figure>

      <p>{md(t(
        'Como “ave” é decidido por exclusão (a larva sumiu sem deixar vestígio), não dá para saber quem fez esses ataques no escuro. As duas regiões têm mamíferos noturnos que sobem em árvores e comem insetos, como o [gambá-de-cauda-escovada, na Austrália](https://australian.museum/learn/animals/mammals/common-brushtail-possum/), e os [ratos introduzidos, na Nova Zelândia](https://predatorfreenz.org/toolkits/know-your-target-predators/rat/), mas isso é uma hipótese que os dados não permitem testar. O ritmo da tarde também é uma aproximação: aves que comem logo ao clarear explicariam parte do escuro. Vou mandar essas contas aos autores, que conhecem os bosques muito melhor do que uma planilha.',
        'Because “bird” is decided by elimination (the mealworm vanished without a trace), there is no way to know who made these attacks in the dark. Both regions have nocturnal mammals that climb trees and eat insects, such as the [common brushtail possum in Australia](https://australian.museum/learn/animals/mammals/common-brushtail-possum/) and [introduced rats in New Zealand](https://predatorfreenz.org/toolkits/know-your-target-predators/rat/), but that is a hypothesis the data cannot test. The afternoon rate is also an approximation: birds feeding at first light would explain part of the dark share. I will send these numbers to the authors, who know the woods far better than a spreadsheet does.',
      ))}</p>
      <p>{t(
        'Nada disso muda a conclusão do artigo, que se sustenta quando refeito com os mesmos dados. O que a reanálise acrescenta é um jeito de olhar. As curvas de sobrevivência mostram em que momento as mariposas somem, os riscos competitivos lembram que cada mariposa tem um destino só, e os horários das visitas mostram como a hora em que alguém olhou interfere no que foi contado como noite.',
        'None of this changes the paper’s conclusion, which holds when redone with the same data. What the reanalysis adds is a way of looking. Survival curves show when the moths disappear, competing risks are a reminder that each moth has only one fate, and the check times show how the hour at which someone looked shapes what was counted as night.',
      )}</p>
      <p>{t(
        'Os gráficos foram feitos em R com as minhas regras de design, e as mariposas desenhadas seguem o formato dos alvos usados no experimento. Para quem quiser conferir os números: as curvas são de Kaplan–Meier com as três visitas como tempos de evento e as mariposas perdidas como censura. O destino por causa é a incidência acumulada, a versão de Aalen–Johansen para tempo discreto, e o jeito ingênuo é 1 menos Kaplan–Meier para cada causa, com a outra tratada como censura. A razão de risco das formigas vem de um modelo de tempo discreto com efeitos aleatórios de bosque e de dia. A reprodução usa o modelo de Cox misto dos autores, e a variação entre dias vem do mesmo modelo com um efeito aleatório de dia dentro do bosque. As horas de sol vêm da mediana dos oito dias em cada bosque, e o ritmo noturno “explicado pela luz” supõe risco constante ao longo da tarde.',
        'The charts were made in R with my own design rules, and the drawn moths follow the shape of the targets used in the experiment. For anyone who wants to check the numbers: the curves are Kaplan–Meier, with the three checks as event times and lost moths as censored. Fate by cause is the cumulative incidence, the discrete-time version of Aalen–Johansen, and the naive way is 1 minus Kaplan–Meier for each cause, with the other one treated as censoring. The ants’ hazard ratio comes from a discrete-time model with random effects for wood and day. The reproduction uses the authors’ mixed Cox model, and the day-to-day variation comes from the same model with a random effect for day within wood. Hours of sunlight are the median of the eight days in each wood, and the night-time rate “explained by daylight” assumes a constant risk through the afternoon.',
      )}</p>
      <p>{md(t(
        `O código em R e os critérios completos estão no repositório [mariposas-2026](${repo}), com um script que refaz todos os gráficos em português e em inglês.`,
        `The R code and the full criteria are in the [mariposas-2026 repository](${repo}), with a script that rebuilds every chart in Portuguese and English.`,
      ))}</p>

      <p className="k-article-sources">{t('Fontes', 'Sources')}:{' '}
        <a href="https://doi.org/10.1126/science.adr7368" target="_blank" rel="noreferrer">Medina et al. (2025), Science</a>,{' '}
        <a href="https://doi.org/10.5061/dryad.8931zcs0j" target="_blank" rel="noreferrer">{t('dados no Dryad (CC0)', 'data on Dryad (CC0)')}</a>,{' '}
        <a href="https://doi.org/10.5281/zenodo.13699591" target="_blank" rel="noreferrer">{t('código dos autores no Zenodo', 'authors’ code on Zenodo')}</a>.{' '}
        {t('Dados baixados em 02/10/2026. Gráficos feitos em R com ggplot2, sf, survival, coxme e glmmTMB.', 'Data downloaded on 2 October 2026. Charts made in R with ggplot2, sf, survival, coxme and glmmTMB.')}
      </p>
      <p className="k-article-back"><a href={locale === 'pt' ? '/' : '/en/home'}>{t('← Voltar às publicações', '← Back to the blog')}</a></p>
    </main>
    <KindleFooter />
  </div>;
}
