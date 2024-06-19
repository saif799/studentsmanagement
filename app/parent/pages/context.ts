import { createContext } from "react";
import { parentshipType, studentToSelectType } from "../(tabs)";


export const ChildrenContext = createContext<studentToSelectType[] | undefined>(undefined);
export const StudentsToSelectContext = createContext<studentToSelectType[] | undefined>(undefined);