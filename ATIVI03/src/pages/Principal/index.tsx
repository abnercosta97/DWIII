import styled from "styled-components";
import Block from "../../components/Block";
import Title from "../../components/Title";
import Regiao from "../../components/Regiao";
import Estado from "../../components/Estado";

export default function Principal() {
  return (
    <WrapperSld>
      <Regiao />
      <Estado />
      <Block>
        <Title>Mesorregiões</Title>
      </Block>
    </WrapperSld>
  );
}

const WrapperSld = styled.div`
  display: flex;
`;
