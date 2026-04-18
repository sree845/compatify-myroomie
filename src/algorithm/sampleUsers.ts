// Mock candidate dataset. Replace with a DB/API call when moving to a real backend.

import type { UserProfile } from "./types";

export const sampleUsers: UserProfile[] = [
  {
    id: "1", name: "Arjun Chen", avatar: "🧑‍💻", age: 20, major: "Computer Science",
    about: "Love coding late at night. Big fan of lo-fi music and clean spaces.",
    sleepSchedule: "after1", cleanliness: 85, noisePreference: "moderate", studyStyle: "nightOwl",
  },
  {
    id: "2", name: "Priya Smith", avatar: "🎨", age: 19, major: "Fine Arts",
    about: "Early riser who loves painting and morning runs. Neat freak!",
    sleepSchedule: "before11", cleanliness: 95, noisePreference: "quiet", studyStyle: "earlyBird",
  },
  {
    id: "3", name: "Sam Patel", avatar: "📚", age: 21, major: "Biology",
    about: "Flexible with most things. I just need a chill roommate.",
    sleepSchedule: "11to1", cleanliness: 60, noisePreference: "flexible", studyStyle: "flexible",
  },
  {
    id: "4", name: "Rohan Johnson", avatar: "🎮", age: 20, major: "Game Design",
    about: "Gamer and night owl. I keep my area tidy but common spaces... not so much.",
    sleepSchedule: "after1", cleanliness: 45, noisePreference: "moderate", studyStyle: "nightOwl",
  },
  {
    id: "5", name: "Meera Lee", avatar: "🏋️", age: 22, major: "Kinesiology",
    about: "Up at 5 AM for the gym. I like things quiet and organized.",
    sleepSchedule: "before11", cleanliness: 90, noisePreference: "quiet", studyStyle: "earlyBird",
  },
  {
    id: "6", name: "Kavya Williams", avatar: "🎵", age: 19, major: "Music",
    about: "I play guitar and sing. Flexible schedule, moderate tidiness.",
    sleepSchedule: "11to1", cleanliness: 55, noisePreference: "moderate", studyStyle: "flexible",
  },
  {
    id: "7", name: "Tara Kim", avatar: "🔬", age: 21, major: "Chemistry",
    about: "Lab work keeps me busy. I appreciate a quiet, clean environment.",
    sleepSchedule: "11to1", cleanliness: 80, noisePreference: "quiet", studyStyle: "nightOwl",
  },
  {
    id: "8", name: "Aanya Davis", avatar: "📖", age: 20, major: "English Lit",
    about: "Bookworm who loves tea and cozy vibes. Very adaptable!",
    sleepSchedule: "before11", cleanliness: 70, noisePreference: "flexible", studyStyle: "earlyBird",
  },
];
