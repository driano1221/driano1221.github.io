export const COMMON_MESSAGES = [
  [1.1, 1.0],
  [2.0, 1.6],
  [3.0, 0.8],
  [4.0, 2.5],
];

export const FIXED_SPAM_MESSAGES = [
  [6.4, 4.0],
  [7.6, 5.6],
  [8.8, 4.8],
];

export const AMBIGUOUS_POSITIONS = [2.4, 3.2, 4.0];

export function trainingSet(position = 1) {
  const ambiguous = [5, AMBIGUOUS_POSITIONS[position]];
  return {
    points: [...COMMON_MESSAGES, ...FIXED_SPAM_MESSAGES, ambiguous],
    labels: [-1, -1, -1, -1, 1, 1, 1, 1],
    ambiguous,
  };
}

function mean(points) {
  return points
    .reduce((sum, [x, y]) => [sum[0] + x, sum[1] + y], [0, 0])
    .map((value) => value / points.length);
}

export function trainFisher(points, labels) {
  const common = points.filter((_, index) => labels[index] === -1);
  const spam = points.filter((_, index) => labels[index] === 1);
  const commonMean = mean(common);
  const spamMean = mean(spam);
  let s00 = 0;
  let s01 = 0;
  let s11 = 0;

  for (const [index, group] of [common, spam].entries()) {
    const center = index === 0 ? commonMean : spamMean;
    for (const [x, y] of group) {
      const dx = x - center[0];
      const dy = y - center[1];
      s00 += dx * dx;
      s01 += dx * dy;
      s11 += dy * dy;
    }
  }

  const determinant = s00 * s11 - s01 * s01;
  const delta = [spamMean[0] - commonMean[0], spamMean[1] - commonMean[1]];
  const weights = [
    (s11 * delta[0] - s01 * delta[1]) / determinant,
    (-s01 * delta[0] + s00 * delta[1]) / determinant,
  ];
  const bias =
    -0.5 *
    (weights[0] * (commonMean[0] + spamMean[0]) +
      weights[1] * (commonMean[1] + spamMean[1]));

  return { weights, bias, commonMean, spamMean };
}

export function trainPerceptron(points, labels, maxEpochs = 100) {
  const weights = [0, 0];
  let bias = 0;
  const history = [];

  for (let epoch = 0; epoch < maxEpochs; epoch += 1) {
    let corrections = 0;
    for (let index = 0; index < points.length; index += 1) {
      const [x, y] = points[index];
      const label = labels[index];
      if (label * (weights[0] * x + weights[1] * y + bias) <= 0) {
        weights[0] += label * x;
        weights[1] += label * y;
        bias += label;
        history.push({ weights: [...weights], bias, point: index });
        corrections += 1;
      }
    }
    if (corrections === 0) break;
  }

  return { weights, bias, history };
}

export function classify(model, point) {
  return model.weights[0] * point[0] + model.weights[1] * point[1] + model.bias >= 0
    ? 1
    : -1;
}

export function decisionSegment(model, xMax = 10, yMax = 7) {
  const [wx, wy] = model.weights;
  const candidates = [];
  if (Math.abs(wy) > 1e-9) {
    candidates.push([0, -model.bias / wy], [xMax, -(wx * xMax + model.bias) / wy]);
  }
  if (Math.abs(wx) > 1e-9) {
    candidates.push([-model.bias / wx, 0], [-(wy * yMax + model.bias) / wx, yMax]);
  }

  const inside = candidates.filter(
    ([x, y]) => x >= -1e-9 && x <= xMax + 1e-9 && y >= -1e-9 && y <= yMax + 1e-9,
  );
  const unique = inside.filter(
    (point, index) =>
      inside.findIndex(
        (other) => Math.abs(point[0] - other[0]) < 1e-8 && Math.abs(point[1] - other[1]) < 1e-8,
      ) === index,
  );
  return unique.slice(0, 2);
}
