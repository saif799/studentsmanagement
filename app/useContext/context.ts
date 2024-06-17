import { createContext } from "react";

export type studentType = {
  id: string;
  fname: string;
  name: string;
};

export const StudentTableContext = createContext<studentType[]>([
  {
    id: "200435056185",
    fname: "Fouad",
    name: "Mehdi",
  },
]);
