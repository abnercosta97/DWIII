export interface RegiaoProps {
  id: number;
  sigla: string;
  nome: string;
}

export interface UfProps {
  id: number;
  sigla: string;
  nome: string;
  regiao: RegiaoProps;
}

export interface MesoProps {
  id: number;
  nome: string;
  uf: UfProps;
}

export interface ContextProps {
    regioes: RegiaoProps[];
    //ufs: UfProps[];
    //mesos: MesoProps[];
    //setRegioes: (regioes: RegiaoProps[]) => void;
    //setUfs: (ufs: UfProps[]) => void;
    //setMesos: (mesos: MesoProps[]) => void;
    }