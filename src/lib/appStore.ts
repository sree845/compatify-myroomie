import { create } from "zustand";
import type { UserProfile, MatchResult } from "@/algorithm";
import { calculateMatches } from "@/algorithm";

export interface ChatMessage {
  from: "me" | "them";
  text: string;
  time: string;
}

interface AppState {
  isLoggedIn: boolean;
  currentUser: string;
  userProfile: Omit<UserProfile, "id" | "name" | "avatar" | "age" | "major" | "about"> | null;
  matches: MatchResult[];
  sentRequests: string[];
  conversations: Record<string, ChatMessage[]>;
  login: (name: string) => void;
  logout: () => void;
  setProfile: (profile: Omit<UserProfile, "id" | "name" | "avatar" | "age" | "major" | "about">) => void;
  sendRequest: (userId: string) => void;
  sendMessage: (userId: string, text: string) => void;
  receiveMessage: (userId: string, text: string) => void;
}

const nowTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export const useAppStore = create<AppState>((set) => ({
  isLoggedIn: false,
  currentUser: "",
  userProfile: null,
  matches: [],
  sentRequests: [],
  conversations: {},
  login: (name) => set({ isLoggedIn: true, currentUser: name }),
  logout: () =>
    set({
      isLoggedIn: false,
      currentUser: "",
      userProfile: null,
      matches: [],
      sentRequests: [],
      conversations: {},
    }),
  setProfile: (profile) =>
    set({ userProfile: profile, matches: calculateMatches(profile) }),
  sendRequest: (userId) =>
    set((s) => ({ sentRequests: [...s.sentRequests, userId] })),
  sendMessage: (userId, text) =>
    set((s) => ({
      conversations: {
        ...s.conversations,
        [userId]: [
          ...(s.conversations[userId] ?? []),
          { from: "me", text, time: nowTime() },
        ],
      },
    })),
  receiveMessage: (userId, text) =>
    set((s) => ({
      conversations: {
        ...s.conversations,
        [userId]: [
          ...(s.conversations[userId] ?? []),
          { from: "them", text, time: nowTime() },
        ],
      },
    })),
}));
