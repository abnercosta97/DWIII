import styled from "styled-components";
import Block from "../../components/Block";
import Title from "../../components/Title";
import Regiao from "../../components/Regiao";

export default function Principal() {
  return (
    <WrapperSld>
      <Regiao />
      <Block>
        <Title>Estados</Title>
      </Block>
      <Block>
        <Title>Mesorregiões</Title>
      </Block>
    </WrapperSld>
  );
}

const WrapperSld = styled.div`
  display: flex;
`;
