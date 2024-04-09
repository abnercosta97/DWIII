import Block from "../../components/Block";
import Item from "../../components/Item";
import Title from "../../components/Title";
import Carregando from "../Carregando";
import { RegiaoProps } from "../../types";
import useIbge from "../../hooks/useIbge";

export default function Regiao() {
  const { regioes, loadUfs } = useIbge();

  const itens = regioes.map((regiao: RegiaoProps) => (
    <Item key={regiao.id} onClick={() => loadUfs(regiao.id)}>
      {regiao.nome}
    </Item>
  ));

  return (
    <Block>
      <Title>Regiões</Title>
      {regioes.length !== 0 ? itens : <Carregando />}
    </Block>
  );
}
