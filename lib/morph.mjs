export function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

export function getMorphStage(value) {
  if (value < 28) return 0;
  if (value < 78) return 1;
  return 2;
}

export function morphOpacity(value) {
  const t = clamp01(value / 100);

  return {
    scatter: 1 - clamp01((t - 0.12) / 0.64),
    network: clamp01((t - 0.18) / 0.62),
    labels: clamp01((t - 0.5) / 0.42),
    equation: 1 - clamp01((t - 0.18) / 0.46),
  };
}
