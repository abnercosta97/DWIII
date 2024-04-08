import styled from "styled-components";

export default function Title({ children }: any) {
  return <Sld>{children}</Sld>;
}

const Sld = styled.h3`
  text-align: center;
  width: 100%;
`;
