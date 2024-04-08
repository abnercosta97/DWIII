import { createContext, useState } from "react";
import { ContextProps, RegiaoProps } from "../types";

export const ctx = createContext({} as ContextProps);

export function Provedor({ children }: any) {
  const [regioes, setRegioes] = useState([] as RegiaoProps[]);
  setRegioes([
    { id: 5, sigla: "CO", nome: "Centro-Oeste" },
    { id: 2, sigla: "NE", nome: "Nordeste" },
    { id: 1, sigla: "N", nome: "Norte" },
    { id: 3, sigla: "SE", nome: "Sudeste" },
    { id: 4, sigla: "S", nome: "Sul" },
  ]);

  return <ctx.Provider value={{ regioes }}>{children}</ctx.Provider>;
}
