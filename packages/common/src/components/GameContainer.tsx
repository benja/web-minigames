import React from 'react';
import styled from 'styled-components';

interface GameContainerProps {
  children: React.ReactNode;
  id: string;
}
export function GameContainer(props: GameContainerProps) {
  return (
    <Container id={props.id}>
      {props.children}
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  
  > canvas {
    height: 100%;
    width: 100%;
  }
`;
