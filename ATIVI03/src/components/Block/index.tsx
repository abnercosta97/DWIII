import styled from "styled-components";

export default function Block({ children }: any) {
  return <Sld>{children}</Sld>;
}

const Sld = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  width: 250px;
  margin: 0px 10px;
  padding: 0px 10px;
`;
