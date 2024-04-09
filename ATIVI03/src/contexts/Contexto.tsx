import { createContext, useEffect, useState } from "react";
import { ContextProps, RegiaoProps, UfProps } from "../types";
import ibge from "../services/Ibge";

export const ctx = createContext({} as ContextProps);

export function Provedor({ children }: any) {
  const [regioes, setRegioes] = useState([] as RegiaoProps[]);
  const [ufs, setUfs] = useState([] as UfProps[]);

  useEffect(() => {
    ibge.getRegioes().then((data) => setRegioes(data));
  },[]);

  const loadUfs = async (id: number) => {
    console.log(id);
    const data = await ibge.getUfPorRegiao(id);
    setUfs(data);
  }

  return <ctx.Provider value={{ regioes, ufs, loadUfs }}>{children}</ctx.Provider>;
}
