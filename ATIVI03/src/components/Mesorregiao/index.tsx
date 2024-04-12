import Block from "../Block";
import Item from "../Item";
import Title from "../Title";
import Carregando from "../Carregando";
import { MesoProps } from "../../types";
import useIbge from "../../hooks/useIbge";

export default function Mesorregiao() {
  const { mesorregioes, loadingMesos } = useIbge();

  const itens = mesorregioes.map((mesos: MesoProps) => (
    <Item key={mesos.id} onClick={() => console.log(mesos.uf, mesos.nome)}>
      {mesos.nome}
    </Item>
  ));

  return (
    <Block>
      <Title>Mesorregiões</Title>
      {loadingMesos ? <Carregando /> : itens }
    </Block>
  );
}
