// Editorial adaptation of research/ARTICLE_EVIDENCE_INVENTORY.md (E01–E17).
// Page numbers below are the journal's printed pages, not PDF viewer indices.
type Bilingual = [string, string];
type Category = 'observation' | 'question' | 'warning' | 'recommendation';
export const paper = 'https://doi.org/10.1214/ss/1177010638';
export const categories: Record<Category, Bilingual> = {
  observation: ['Observação', 'Observation'], question: ['Pergunta', 'Question'],
  warning: ['Alerta', 'Warning'], recommendation: ['Recomendação', 'Recommendation'],
};
export const confidence = {
  veryHigh: ['Muito alta', 'Very high'], high: ['Alta', 'High'],
  mediumHigh: ['Média-alta', 'Medium-high'], medium: ['Média', 'Medium'],
};
export const sources: Record<string, [string, string]> = {
  ntk: ['Jacot et al. · 2018', 'https://proceedings.neurips.cc/paper/2018/hash/5a4be1fa34e62bb8a6ec6b91d2462f5a-Abstract.html'],
  alexnet: ['AlexNet · 2012', 'https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html'],
  transformer: ['Transformer · 2017', 'https://arxiv.org/abs/1706.03762'],
  trees: ['Grinsztajn et al. · 2022', 'https://proceedings.neurips.cc/paper_files/paper/2022/file/0378c7692da36807bdec87ab043cdadc-Paper-Datasets_and_Benchmarks.pdf'],
  tabpfn: ['TabPFN · 2025', 'https://www.nature.com/articles/s41586-024-08328-6'],
  automl: ['Auto-WEKA 2.0 · 2017', 'https://www.jmlr.org/papers/v18/16-261.html'],
  nas: ['Li & Talwalkar · 2020', 'https://proceedings.mlr.press/v115/li20c.html'],
  dropout: ['Dropout · 2014', 'https://www.jmlr.org/papers/v15/srivastava14a.html'],
  descent: ['Belkin et al. · 2019', 'https://doi.org/10.1073/pnas.1903070116'],
  generalization: ['Zhang et al. · 2017', 'https://openreview.net/forum?id=Sy8gdB9xx'],
  brits: ['BRITS · 2018', 'https://proceedings.neurips.cc/paper_files/paper/2018/hash/734e6bfcd358e25ac1db0a4241b95651-Abstract.html'],
  miwae: ['MIWAE · 2019', 'https://proceedings.mlr.press/v97/mattei19a.html'],
  sanity: ['Adebayo et al. · 2018', 'https://proceedings.neurips.cc/paper/2018/hash/294a8ed24b1ad22ec2e7efea049b8737-Abstract.html'],
  rudin: ['Rudin · 2019', 'https://www.nature.com/articles/s42256-019-0048-x'],
  vae: ['Kingma & Welling · 2013', 'https://arxiv.org/abs/1312.6114'],
  ensembles: ['Deep Ensembles · 2017', 'https://proceedings.neurips.cc/paper_files/paper/2017/hash/9ef2ed4b7fd2c810847ffa5fa85bce38-Abstract.html'],
  hopfield: ['Ramsauer et al. · 2021', 'https://openreview.net/forum?id=tL89RnzIiCd'],
  nobel: ['Nobel · 2024', 'https://www.nobelprize.org/prizes/physics/2024/press-release/'],
  clustering: ['Xie et al. · 2016', 'https://proceedings.mlr.press/v48/xieb16.html'],
  experts: ['Expert Choice · 2022', 'https://proceedings.neurips.cc/paper_files/paper/2022/hash/2f00ecd787b432c1d36f3de9800728eb-Abstract-Conference.html'],
};
type Evidence = {
  id: string; title: Bilingual; pages: string; category: Category[];
  original: Bilingual; outcome: Bilingual; caveat: Bilingual;
  confidence: keyof typeof confidence; sources: string[];
};
export const evidence: Evidence[] = [
  {
    id:'E01', title:['Estatística escrita como rede','Statistics expressed as networks'], pages:'4–6, 26', category:['observation'], confidence:'high', sources:['ntk'],
    original:['O artigo relaciona redes a regressão, discriminação, componentes principais, densidades e agrupamentos.','The paper connects networks to regression, discrimination, principal components, densities and clustering.'],
    outcome:['A ponte ganhou novas formas. O neural tangent kernel permite analisar redes muito largas por ferramentas de métodos de kernel.','The bridge took new forms. The neural tangent kernel allows very wide networks to be analyzed using kernel-method tools.'],
    caveat:['A equivalência depende do regime estudado. Não significa que toda rede moderna seja, na prática, um modelo simples com outro nome.','The equivalence depends on the regime studied. It does not mean that every modern network is, in practice, a simple model under a different name.'],
  },
  {
    id:'E02', title:['Fisher e perceptron','Fisher and the perceptron'], pages:'4, 15', category:['observation','question'], confidence:'veryHigh', sources:[],
    original:['Ambos podem decidir pelo sinal de uma soma ponderada. Os dados determinam os pesos por procedimentos diferentes.','Both can decide from the sign of a weighted sum. The data determine their weights through different procedures.'],
    outcome:['A comparação das flores torna essa distinção visível: a forma da decisão é parecida, mas o processo de aprendizagem não é o mesmo.','The flower comparison makes the distinction visible: the decision has a similar form, but the learning process is different.'],
    caveat:['Essa relação já estava no artigo. Não é uma descoberta posterior; tampouco exige que as duas linhas coincidam.','This relationship was already in the paper. It is not a later discovery, nor does it require the two lines to coincide.'],
  },
  {
    id:'E03', title:['Representar não é aprender','Representing is not learning'], pages:'16–19', category:['observation','warning','question'], confidence:'high', sources:['alexnet','transformer','ntk'],
    original:['Uma rede multicamada pode representar funções muito variadas. Isso não garante treinamento fácil nem boas respostas em dados novos.','A multilayer network can represent a wide range of functions. That guarantees neither easy training nor good answers on new data.'],
    outcome:['Visão e linguagem mostraram a força dessas redes. Mas capacidade de representação, otimização e generalização continuam sendo problemas distintos.','Vision and language demonstrated the power of these networks. Representation, optimization and generalization nevertheless remain distinct problems.'],
    caveat:['Um teorema de aproximação não informa sozinho quantos dados, unidades ou recursos serão necessários para aprender uma solução útil.','An approximation theorem alone does not tell us how much data, how many units or how much computation are needed to learn a useful solution.'],
  },
  {
    id:'E04', title:['Simples ou complexo?','Simple or complex?'], pages:'5, 17–18, 26', category:['question','warning','recommendation'], confidence:'high', sources:['trees','tabpfn'],
    original:['Quando uma rede específica e complicada justifica seu custo frente a um método estatístico mais geral?','When does a specialized, complicated network justify its cost over a more general statistical method?'],
    outcome:['Comparações com árvores e, depois, TabPFN mostram que o resultado muda com o domínio, a escala e o protocolo. Não apareceu um vencedor universal.','Comparisons involving trees and, later, TabPFN show that results change with domain, scale and protocol. No universal winner emerged.'],
    caveat:['Um benchmark vale para as condições testadas. Não resolve de uma vez a comparação entre todas as redes e todos os métodos estatísticos.','A benchmark applies to the conditions tested. It does not settle the comparison between all networks and all statistical methods.'],
  },
  {
    id:'E05', title:['O futuro da retropropagação','The future of backpropagation'], pages:'17, 19, 26', category:['question','warning'], confidence:'veryHigh', sources:['alexnet','transformer'],
    original:['O método era popular, mas considerado lento. Os autores perguntam se ele ainda teria lugar.','The method was popular but considered slow. The authors ask whether it would still have a place.'],
    outcome:['A prática respondeu sim: redes como AlexNet e Transformer usam gradientes calculados por retropropagação. Computação e técnicas de treinamento ampliaram o que era viável.','Practice answered yes: networks such as AlexNet and Transformer use gradients computed by backpropagation. Computing and training techniques expanded what was feasible.'],
    caveat:['Sucesso na engenharia não demonstra que o cérebro aprenda pela mesma regra. A pergunta biológica continua separada.','Engineering success does not demonstrate that the brain learns by the same rule. The biological question remains separate.'],
  },
  {
    id:'E06', title:['Como escolher uma rede','How to choose a network'], pages:'5, 20–21, 26', category:['question','recommendation'], confidence:'high', sources:['automl','nas'],
    original:['Escolher arquitetura também é escolher modelo. O artigo discute validação e critérios sistemáticos para essa escolha.','Choosing an architecture is also model selection. The paper discusses validation and systematic selection criteria.'],
    outcome:['AutoML e busca de arquiteturas automatizaram parte do trabalho de escolher algoritmos e configurações.','AutoML and architecture search automated parts of choosing algorithms and configurations.'],
    caveat:['A busca depende das opções permitidas, do orçamento e da avaliação. Automatizar a busca não elimina julgamento nem problemas de reprodutibilidade.','Search depends on the allowed choices, budget and evaluation. Automating it removes neither judgment nor reproducibility problems.'],
  },
  {
    id:'E07', title:['Regularização e sobreajuste','Regularization and overfitting'], pages:'20–21, 26', category:['warning','observation','question'], confidence:'high', sources:['dropout','descent'],
    original:['Uma rede flexível pode ajustar particularidades do treino e falhar em casos novos. O artigo recomenda validação e penalização de pesos.','A flexible network can fit training quirks and fail on new cases. The paper recommends validation and weight penalties.'],
    outcome:['As ferramentas de regularização cresceram. Double descent mostrou também regimes em que o erro de teste volta a cair depois da interpolação.','Regularization tools expanded. Double descent also revealed regimes where test error falls again past interpolation.'],
    caveat:['A segunda descida amplia a narrativa clássica; não torna o sobreajuste irrelevante nem dispensa avaliação em dados novos.','The second descent expands the classical account; it makes overfitting neither irrelevant nor testing on new data unnecessary.'],
  },
  {
    id:'E08', title:['Por que funciona em dados novos?','Why does it work on new data?'], pages:'21, 26', category:['question'], confidence:'high', sources:['generalization','ntk','descent'],
    original:['Limites teóricos podiam exigir amostras enormes. Como explicar e orientar a generalização de redes reais?','Theoretical bounds could require enormous samples. How could we explain and guide generalization in real networks?'],
    outcome:['Experimentos com rótulos aleatórios expuseram limites de explicações simples. Novas teorias explicam regimes específicos, não uma regra única para todos os casos.','Experiments with random labels exposed limits of simple explanations. New theories explain specific regimes, rather than one rule for every case.'],
    caveat:['“Não há uma teoria universal” não significa ausência de progresso. Há resultados importantes, cada um com hipóteses e alcance próprios.','“No universal theory” does not mean no progress. Important results exist, each with its own assumptions and scope.'],
  },
  {
    id:'E09', title:['Quando faltam dados','When data are missing'], pages:'26', category:['question'], confidence:'high', sources:['brits','miwae'],
    original:['Redes úteis no cotidiano conseguiriam lidar com valores ausentes?','Could networks useful in everyday work handle missing values?'],
    outcome:['Métodos como BRITS e MIWAE aprenderam a lidar com ausência e imputação em cenários definidos. A possibilidade técnica foi demonstrada.','Methods such as BRITS and MIWAE learned to handle missingness and imputation in defined settings. Technical feasibility was demonstrated.'],
    caveat:['Por que o dado falta importa. Uma técnica de preenchimento não elimina hipóteses sobre o mecanismo de ausência nem garante incerteza confiável.','Why data are missing matters. A filling-in technique does not remove assumptions about missingness or guarantee reliable uncertainty.'],
  },
  {
    id:'E10', title:['Entender uma previsão','Understanding a prediction'], pages:'18, 26', category:['warning','question'], confidence:'high', sources:['sanity','rudin'],
    original:['A importância de interpretar a rede depende da aplicação. Acertar pode não ser suficiente.','The importance of interpreting a network depends on the application. Accuracy may not be enough.'],
    outcome:['A interpretação virou uma área extensa. Testes mostraram que algumas explicações visualmente convincentes não refletem adequadamente o modelo.','Interpretation became a substantial field. Tests showed that some visually persuasive explanations do not adequately reflect the model.'],
    caveat:['Uma explicação pode ajudar a investigar uma previsão sem demonstrar sua causa. Convencimento visual não é prova de fidelidade.','An explanation may help investigate a prediction without establishing its cause. Visual persuasiveness is not proof of faithfulness.'],
  },
  {
    id:'E11', title:['Probabilidade, Bayes e incerteza','Probability, Bayes and uncertainty'], pages:'5–6, 21–22, 26', category:['observation','recommendation'], confidence:'high', sources:['vae','ensembles'],
    original:['O artigo já descreve redes em estruturas probabilísticas, inferência bayesiana e métodos de Monte Carlo, com seus custos.','The paper already describes networks within probabilistic frameworks, Bayesian inference and Monte Carlo methods, along with their costs.'],
    outcome:['Modelos como VAEs e métodos como deep ensembles ampliaram a conexão entre redes, modelagem probabilística e estimativa de incerteza.','Models such as VAEs and methods such as deep ensembles expanded the connection between networks, probabilistic modeling and uncertainty estimation.'],
    caveat:['Deep ensembles não são automaticamente inferência bayesiana exata. Aproximação e mudança de distribuição continuam afetando a confiança nas respostas.','Deep ensembles are not automatically exact Bayesian inference. Approximation and distribution shift still affect confidence in predictions.'],
  },
  {
    id:'E12', title:['Hopfield e física estatística','Hopfield and statistical physics'], pages:'22–24, 26', category:['observation'], confidence:'veryHigh', sources:['hopfield','nobel'],
    original:['Energia, atratores, Gibbs e máquinas de Boltzmann conectavam redes à física. O artigo revisa trabalhos anteriores.','Energy, attractors, Gibbs distributions and Boltzmann machines connected networks to physics. The paper reviews earlier work.'],
    outcome:['Redes de Hopfield modernas foram relacionadas à atenção. O Nobel de Física de 2024 reconheceu trabalhos fundacionais de Hopfield e Hinton.','Modern Hopfield networks were related to attention. The 2024 Nobel Prize in Physics recognized foundational work by Hopfield and Hinton.'],
    caveat:['A ponte antecede 1994. Apresentá-la aos estatísticos não foi descobrir essa relação nem prever o Nobel.','The bridge predates 1994. Introducing it to statisticians was neither discovering the relationship nor predicting the Nobel Prize.'],
  },
  {
    id:'E13', title:['Agrupar e aprender representações','Clustering and learning representations'], pages:'24–26', category:['observation','question'], confidence:'mediumHigh', sources:['clustering'],
    original:['Aprendizagem competitiva se relaciona a k-means, misturas e quantização vetorial: maneiras de organizar exemplos semelhantes.','Competitive learning relates to k-means, mixtures and vector quantization: ways to organize similar examples.'],
    outcome:['Deep Embedded Clustering combina aprendizagem da representação com formação de grupos. A rede pode aprender o espaço em que a proximidade é medida.','Deep Embedded Clustering combines representation learning with group formation. The network can learn the space in which proximity is measured.'],
    caveat:['A ligação original com k-means já era conhecida. Representações aprendidas acrescentam possibilidades, não uma garantia de grupos significativos.','The original connection to k-means was already known. Learned representations add possibilities, not a guarantee of meaningful groups.'],
  },
  {
    id:'E14', title:['Combinar métodos','Combining methods'], pages:'6, 26', category:['recommendation','observation'], confidence:'medium', sources:['experts'],
    original:['Os autores descrevem sistemas híbridos e recomendam combinar abordagens para problemas complexos.','The authors describe hybrid systems and recommend combining approaches for complex problems.'],
    outcome:['Sistemas com especialistas roteados ilustram uma continuidade conceitual: partes do trabalho podem ser encaminhadas a componentes diferentes.','Systems with routed experts illustrate a conceptual continuity: parts of a task can be directed to different components.'],
    caveat:['“Híbrido” cobre muitas coisas. Mixture of experts não é a mesma arquitetura discutida em 1994; a conexão aqui é interpretativa, não identidade técnica.','“Hybrid” covers many things. Mixture of experts is not the same architecture discussed in 1994; the connection here is interpretive, not technical identity.'],
  },
  {
    id:'E15', title:['Muitas variáveis, poucos dados','Many variables, little data'], pages:'19, 21, 25–26', category:['warning'], confidence:'mediumHigh', sources:['alexnet','trees','tabpfn'],
    original:['Teoremas podem exigir unidades ou amostras demais quando cresce o número de características. A viabilidade prática não vem de graça.','Theorems may require too many units or samples as the number of features grows. Practical feasibility does not come for free.'],
    outcome:['Redes exploram estrutura e representações para trabalhar em alta dimensão. Resultados continuam dependendo do dado e das suposições da arquitetura.','Networks exploit structure and representations to work in high dimensions. Results still depend on the data and the architecture’s assumptions.'],
    caveat:['Explorar estrutura pode aliviar o problema. Não elimina limites estatísticos gerais nem garante sucesso com qualquer conjunto de muitas variáveis.','Exploiting structure can alleviate the problem. It does not eliminate general statistical limits or guarantee success on every many-variable dataset.'],
  },
  {
    id:'E16', title:['Ser útil sem explicar todo o processo','Being useful without modeling the whole process'], pages:'26', category:['question'], confidence:'mediumHigh', sources:['alexnet','transformer'],
    original:['Uma rede sem modelo probabilístico explícito do processo gerador dos dados teria utilidade prática?','Could a network without an explicit probabilistic model of the data-generating process be useful in practice?'],
    outcome:['Visão e linguagem demonstraram utilidade preditiva sem exigir uma descrição completa de como cada dado foi gerado.','Vision and language demonstrated predictive usefulness without requiring a complete description of how every observation was generated.'],
    caveat:['“Sem modelo” é ambíguo: redes são modelos paramétricos, e muitas perdas têm interpretação probabilística. Não se deve transportar a expressão literalmente entre épocas.','“Model-free” is ambiguous: networks are parametric models, and many losses have probabilistic interpretations. The phrase should not be carried literally across eras.'],
  },
  {
    id:'E17', title:['Criticar sem descartar','Criticizing without dismissing'], pages:'26', category:['recommendation'], confidence:'high', sources:['ntk','ensembles','descent'],
    original:['Estatísticos deveriam reconhecer ideias reaproveitadas, comparar métodos com rigor e permanecer abertos a problemas novos.','Statisticians should recognize reused ideas, compare methods rigorously and remain open to new problems.'],
    outcome:['Kernels, incerteza e teoria da generalização são exemplos do vocabulário compartilhado que cresceu nessa interface.','Kernels, uncertainty and generalization theory illustrate the shared vocabulary that grew at this interface.'],
    caveat:['Essa é uma recomendação, não uma previsão testável como um número. A avaliação é uma síntese histórica nossa, não um placar objetivo de acertos.','This is a recommendation, not a prediction testable like a number. The assessment is our historical synthesis, not an objective scoreboard.'],
  },
];
