import styled from "styled-components";
import React from "react";

interface ListItemProps {
  children: React.ReactNode;
}
export function ListItem(props: ListItemProps) {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  
  width: 100%;
  
  margin-bottom: 20px;
`;
