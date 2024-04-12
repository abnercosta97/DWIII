import Block from "../Block";
import Item from "../Item";
import Title from "../Title";
import Carregando from "../Carregando";
import { UfProps } from "../../types";
import useIbge from "../../hooks/useIbge";

export default function Estado() {
  const { ufs, loadingUfs, loadMesos } = useIbge();

  const itens = ufs.map((uf: UfProps) => (
    <Item key={uf.id} onClick={() => loadMesos(uf.sigla)}>
      {uf.nome}
    </Item>
  ));

  return (
    <Block>
      <Title>Estados</Title>
      {loadingUfs ? <Carregando />: itens }
    </Block>
  );
}
