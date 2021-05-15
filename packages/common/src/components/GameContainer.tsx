import React from 'react';
import styled from 'styled-components';

interface GameContainerProps {
  children: React.ReactNode;
  id: string;
}

export function GameContainer(props: GameContainerProps) {
  return <Container id={props.id}>{props.children}</Container>;
}

const Container = styled.div`
  width: 800px;
  height: 600px;
  position: relative;

  /* canvas {
    cursor: url(http://www.rw-designer.com/cursor-view/138936.png), default;
  } */
`;
