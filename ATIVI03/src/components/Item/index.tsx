import styled from "styled-components";

export default function Item({ children }: any) {
  return <Sld>{children}</Sld>;
}

const Sld = styled.div`
  display: flex;
  margin: 5px 0px;

  cursor: pointer;

  &:hover {
    color: orange;
  }
`;
