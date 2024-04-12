import styled from "styled-components";
import Regiao from "../../components/Regiao";
import Estado from "../../components/Estado";
import Mesorregiao from "../../components/Mesorregiao";

export default function Principal() {
  return (
    <WrapperSld>
      <Regiao />
      <Estado />
      <Mesorregiao />
    </WrapperSld>
  );
}

const WrapperSld = styled.div`
  display: flex;
`;
