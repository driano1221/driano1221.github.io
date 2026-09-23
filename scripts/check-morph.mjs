import assert from 'node:assert/strict';

import { getMorphStage, morphOpacity } from '../lib/morph.mjs';
import {
  classify,
  decisionSegment,
  trainingSet,
  trainFisher,
  trainPerceptron,
} from '../lib/learning.mjs';
import { damage, memory, recover } from '../lib/hopfield.mjs';

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

for (const count of [8, 16]) {
  const input = damage(count);
  assert.equal(input.filter((pixel, index) => pixel !== memory[index]).length, count);
  const frames = recover(input);
  assert.deepEqual(frames.at(-1).state, memory);
  assert.ok(frames.every((frame, index) => index === 0 || frame.energy <= frames[index - 1].energy + 1e-9));
}
assert.equal(damage(16).filter(pixel => pixel > 0).length, memory.filter(pixel => pixel > 0).length);

console.log('Interactive calculations and Hopfield recovery are consistent.');
