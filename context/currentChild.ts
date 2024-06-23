import { create } from "zustand";

type childData = {
  id: string;
  username: string;
  familyName: string;
  avatar_url: string;
} | null;

interface currentChildState {
  currentChild: childData;
  change: (childData: childData) => void;
}

export const useCurrentChild = create<currentChildState>()((set) => ({
  currentChild: null,
  change: (childData) => set((state) => ({ currentChild: childData })),
}));
