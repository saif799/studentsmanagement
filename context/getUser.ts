import { create } from "zustand";

type Usertype = {
  role: "parent" | "admin" | "student";
  username: string;
} | null;

interface userState {
  user: Usertype;
  setUser: (childData: Usertype) => void;
}

export const useUser = create<userState>()((set) => ({
  user: null,
  setUser: (userInstance) => set(() => ({ user: userInstance })),
}));
