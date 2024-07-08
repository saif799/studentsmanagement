import { create } from "zustand";

interface signUpModalState {
  isOpen: boolean;
  change: () => void;
}

export const useSignupModal = create<signUpModalState>()((set) => ({
  isOpen: false,
  change: () => set((state) => ({ isOpen: !state.isOpen })),
}));
