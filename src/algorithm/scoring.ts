// Pure scoring functions for compatibility between two preference values.
// No UI / framework dependencies — can be ported to a Node/edge backend as-is.

import type { SleepSchedule, NoisePreference, StudyStyle } from "./types";

export function sleepScore(a: SleepSchedule, b: SleepSchedule): number {
  if (a === b) return 1;
  const order: SleepSchedule[] = ["before11", "11to1", "after1"];
  const diff = Math.abs(order.indexOf(a) - order.indexOf(b));
  return diff === 1 ? 0.5 : 0;
}

export function noiseScore(a: NoisePreference, b: NoisePreference): number {
  if (a === b) return 1;
  if (a === "flexible" || b === "flexible") return 0.8;
  return 0.2;
}

export function studyScore(a: StudyStyle, b: StudyStyle): number {
  if (a === b) return 1;
  if (a === "flexible" || b === "flexible") return 0.7;
  return 0.1;
}

export function cleanlinessScore(a: number, b: number): number {
  return 1 - Math.abs(a - b) / 100;
}

// Weights for the overall compatibility score. Tweak here to tune the algorithm.
export const WEIGHTS = {
  sleep: 0.3,
  study: 0.25,
  noise: 0.2,
  cleanliness: 0.25,
} as const;
