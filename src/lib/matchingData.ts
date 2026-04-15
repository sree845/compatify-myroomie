export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  age: number;
  major: string;
  about: string;
  sleepSchedule: "before11" | "11to1" | "after1";
  cleanliness: number;
  noisePreference: "quiet" | "moderate" | "flexible";
  studyStyle: "earlyBird" | "nightOwl" | "flexible";
}

export const sleepLabels: Record<string, string> = {
  before11: "Before 11 PM",
  "11to1": "11 PM – 1 AM",
  after1: "After 1 AM",
};

export const noiseLabels: Record<string, string> = {
  quiet: "Quiet",
  moderate: "Moderate",
  flexible: "Flexible",
};

export const studyLabels: Record<string, string> = {
  earlyBird: "Early Bird",
  nightOwl: "Night Owl",
  flexible: "Flexible",
};

export const sampleUsers: UserProfile[] = [
  {
    id: "1", name: "Alex Chen", avatar: "🧑‍💻", age: 20, major: "Computer Science",
    about: "Love coding late at night. Big fan of lo-fi music and clean spaces.",
    sleepSchedule: "after1", cleanliness: 85, noisePreference: "moderate", studyStyle: "nightOwl",
  },
  {
    id: "2", name: "Jordan Smith", avatar: "🎨", age: 19, major: "Fine Arts",
    about: "Early riser who loves painting and morning runs. Neat freak!",
    sleepSchedule: "before11", cleanliness: 95, noisePreference: "quiet", studyStyle: "earlyBird",
  },
  {
    id: "3", name: "Sam Patel", avatar: "📚", age: 21, major: "Biology",
    about: "Flexible with most things. I just need a chill roommate.",
    sleepSchedule: "11to1", cleanliness: 60, noisePreference: "flexible", studyStyle: "flexible",
  },
  {
    id: "4", name: "Riley Johnson", avatar: "🎮", age: 20, major: "Game Design",
    about: "Gamer and night owl. I keep my area tidy but common spaces... not so much.",
    sleepSchedule: "after1", cleanliness: 45, noisePreference: "moderate", studyStyle: "nightOwl",
  },
  {
    id: "5", name: "Morgan Lee", avatar: "🏋️", age: 22, major: "Kinesiology",
    about: "Up at 5 AM for the gym. I like things quiet and organized.",
    sleepSchedule: "before11", cleanliness: 90, noisePreference: "quiet", studyStyle: "earlyBird",
  },
  {
    id: "6", name: "Casey Williams", avatar: "🎵", age: 19, major: "Music",
    about: "I play guitar and sing. Flexible schedule, moderate tidiness.",
    sleepSchedule: "11to1", cleanliness: 55, noisePreference: "moderate", studyStyle: "flexible",
  },
  {
    id: "7", name: "Taylor Kim", avatar: "🔬", age: 21, major: "Chemistry",
    about: "Lab work keeps me busy. I appreciate a quiet, clean environment.",
    sleepSchedule: "11to1", cleanliness: 80, noisePreference: "quiet", studyStyle: "nightOwl",
  },
  {
    id: "8", name: "Avery Davis", avatar: "📖", age: 20, major: "English Lit",
    about: "Bookworm who loves tea and cozy vibes. Very adaptable!",
    sleepSchedule: "before11", cleanliness: 70, noisePreference: "flexible", studyStyle: "earlyBird",
  },
];

export interface MatchResult {
  user: UserProfile;
  score: number;
  reasons: string[];
}

function sleepScore(a: string, b: string): number {
  if (a === b) return 1;
  const order = ["before11", "11to1", "after1"];
  const diff = Math.abs(order.indexOf(a) - order.indexOf(b));
  return diff === 1 ? 0.5 : 0;
}

function noiseScore(a: string, b: string): number {
  if (a === b) return 1;
  if (a === "flexible" || b === "flexible") return 0.8;
  return 0.2;
}

function studyScore(a: string, b: string): number {
  if (a === b) return 1;
  if (a === "flexible" || b === "flexible") return 0.7;
  return 0.1;
}

function cleanlinessScore(a: number, b: number): number {
  return 1 - Math.abs(a - b) / 100;
}

export function calculateMatches(profile: Omit<UserProfile, "id" | "name" | "avatar" | "age" | "major" | "about">): MatchResult[] {
  return sampleUsers
    .map((user) => {
      const sleep = sleepScore(profile.sleepSchedule, user.sleepSchedule);
      const study = studyScore(profile.studyStyle, user.studyStyle);
      const noise = noiseScore(profile.noisePreference, user.noisePreference);
      const clean = cleanlinessScore(profile.cleanliness, user.cleanliness);

      const score = Math.round((sleep * 0.3 + study * 0.25 + noise * 0.2 + clean * 0.25) * 100);

      const reasons: string[] = [];
      if (sleep === 1) reasons.push(`Both sleep ${sleepLabels[user.sleepSchedule].toLowerCase()}`);
      if (study === 1) reasons.push(`Both are ${studyLabels[user.studyStyle].toLowerCase()}s`);
      if (noise >= 0.8) reasons.push("Similar noise preferences");
      if (clean >= 0.8) reasons.push("Similar cleanliness standards");

      return { user, score, reasons };
    })
    .sort((a, b) => b.score - a.score);
}
