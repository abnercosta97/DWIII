import Block from "../../components/Block";
import Item from "../../components/Item";
import Title from "../../components/Title";
import { useContext } from "react";
import { ctx } from "../../contexts/Contexto";
import Carregando from "../Carregando";

export default function Regiao() {
  const { regioes, loadUfs } = useContext(ctx);

  const itens = regioes.map((regiao: any) => (
    <Item key={regiao.id} onClick={() => console.log(regiao.id)}>
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
