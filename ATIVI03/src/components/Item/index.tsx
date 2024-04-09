import styled from "styled-components";

export default function Item({ children, onClick }: React.PropsWithChildren<Props>) {
  return <Sld onClick={onClick}>{children}</Sld>;
}

const Sld = styled.div`
  display: flex;
  margin: 5px 0px;

  cursor: pointer;

  &:hover {
    color: orange;
  }
`;

interface Props {
  onClick?: () => void;
}