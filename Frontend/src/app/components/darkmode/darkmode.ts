import { createContext, useContext } from "react";
import { DarkClass } from "./darkclass";

interface Darkmode {
  dark: DarkClass;
}

export const dark: Darkmode = {
  dark: new DarkClass(),
};

export const DarkContext = createContext(dark);

export function useDark() {
  return useContext(DarkContext);
}
