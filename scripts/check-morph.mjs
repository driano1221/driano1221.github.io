import assert from 'node:assert/strict';

import { getMorphStage, morphOpacity } from '../lib/morph.mjs';
import {
  classify,
  decisionSegment,
  trainingSet,
  trainFisher,
  trainPerceptron,
} from '../lib/learning.mjs';

assert.equal(getMorphStage(0), 0);
assert.equal(getMorphStage(50), 1);
assert.equal(getMorphStage(100), 2);
assert.deepEqual(morphOpacity(0), {
  scatter: 1,
  network: 0,
  labels: 0,
  equation: 1,
});
assert.equal(morphOpacity(100).scatter, 0);
assert.equal(morphOpacity(100).network, 1);
assert.equal(morphOpacity(100).labels, 1);

for (const position of [0, 1, 2]) {
  const { points, labels } = trainingSet(position);
  const fisher = trainFisher(points, labels);
  const perceptron = trainPerceptron(points, labels);
  assert.equal(points.every((point, index) => classify(fisher, point) === labels[index]), true);
  assert.equal(points.every((point, index) => classify(perceptron, point) === labels[index]), true);
  assert.equal(decisionSegment(fisher).length, 2);
  assert.equal(decisionSegment(perceptron).length, 2);
}

console.log('Act 1 transformations and learning routes are consistent.');
