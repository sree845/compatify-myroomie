// Main matching entry point. Think of this as the "backend handler"
// that takes a user's preferences and returns ranked candidates.

import type { MatchResult, PreferenceInput } from "./types";
import { sampleUsers } from "./sampleUsers";
import { sleepLabels, studyLabels } from "./labels";
import {
  sleepScore,
  studyScore,
  noiseScore,
  cleanlinessScore,
  WEIGHTS,
} from "./scoring";

export function calculateMatches(profile: PreferenceInput): MatchResult[] {
  return sampleUsers
    .map((user) => {
      const sleep = sleepScore(profile.sleepSchedule, user.sleepSchedule);
      const study = studyScore(profile.studyStyle, user.studyStyle);
      const noise = noiseScore(profile.noisePreference, user.noisePreference);
      const clean = cleanlinessScore(profile.cleanliness, user.cleanliness);

      const score = Math.round(
        (sleep * WEIGHTS.sleep +
          study * WEIGHTS.study +
          noise * WEIGHTS.noise +
          clean * WEIGHTS.cleanliness) *
          100,
      );

      const reasons: string[] = [];
      if (sleep === 1) reasons.push(`Both sleep ${sleepLabels[user.sleepSchedule].toLowerCase()}`);
      if (study === 1) reasons.push(`Both are ${studyLabels[user.studyStyle].toLowerCase()}s`);
      if (noise >= 0.8) reasons.push("Similar noise preferences");
      if (clean >= 0.8) reasons.push("Similar cleanliness standards");

      return { user, score, reasons };
    })
    .sort((a, b) => b.score - a.score);
}
