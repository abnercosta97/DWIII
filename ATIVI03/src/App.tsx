import styled from "styled-components";
import Block from "./components/Block";
import Title from "./components/Title";
import Item from "./components/Item";

export default function App() {
  return (
    <WrapperSld>
      <Block>
        <Title>Regiões</Title>
        <Item>Centro-oeste</Item>
        <Item>Nordeste</Item>
      </Block>
      <Block>
        <Title>Estados</Title>
      </Block>
      <Block>
        <Title>Mesorregiões</Title>
      </Block>
    </WrapperSld>
  )
}

const WrapperSld = styled.div`
  display: flex;
`
