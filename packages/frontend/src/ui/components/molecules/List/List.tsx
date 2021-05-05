import { ReactElement } from "react";
import { ListItem } from "../../atoms";
import styled from "styled-components";

interface ListProps {
  children: ReactElement<typeof ListItem>[] | ReactElement<typeof ListItem>;
}
export function List(props: ListProps) {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
