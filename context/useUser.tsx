import { create } from "zustand";

type Usertype = {
  role: "parent" | "admin" | "student";
  username: string;
} | null;
interface signUpModalState {
  user: Usertype;
  setUser: (user: Usertype | null) => void;
}

export const useUser = create<signUpModalState>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
