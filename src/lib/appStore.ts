import { create } from "zustand";
import type { UserProfile, MatchResult } from "./matchingData";
import { calculateMatches } from "./matchingData";

interface AppState {
  isLoggedIn: boolean;
  currentUser: string;
  userProfile: Omit<UserProfile, "id" | "name" | "avatar" | "age" | "major" | "about"> | null;
  matches: MatchResult[];
  sentRequests: string[];
  login: (name: string) => void;
  logout: () => void;
  setProfile: (profile: Omit<UserProfile, "id" | "name" | "avatar" | "age" | "major" | "about">) => void;
  sendRequest: (userId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoggedIn: false,
  currentUser: "",
  userProfile: null,
  matches: [],
  sentRequests: [],
  login: (name) => set({ isLoggedIn: true, currentUser: name }),
  logout: () => set({ isLoggedIn: false, currentUser: "", userProfile: null, matches: [], sentRequests: [] }),
  setProfile: (profile) =>
    set({ userProfile: profile, matches: calculateMatches(profile) }),
  sendRequest: (userId) =>
    set((s) => ({ sentRequests: [...s.sentRequests, userId] })),
}));
