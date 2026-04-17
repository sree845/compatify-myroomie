// Shared types for the matching algorithm module.
// Kept separate from UI code so this can later be moved to a real backend.

export type SleepSchedule = "before11" | "11to1" | "after1";
export type NoisePreference = "quiet" | "moderate" | "flexible";
export type StudyStyle = "earlyBird" | "nightOwl" | "flexible";

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  age: number;
  major: string;
  about: string;
  sleepSchedule: SleepSchedule;
  cleanliness: number;
  noisePreference: NoisePreference;
  studyStyle: StudyStyle;
}

export type PreferenceInput = Pick<
  UserProfile,
  "sleepSchedule" | "cleanliness" | "noisePreference" | "studyStyle"
>;

export interface MatchResult {
  user: UserProfile;
  score: number;
  reasons: string[];
}
