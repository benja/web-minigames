import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: React.ReactNode;
}
export function Container(props: ContainerProps) {
  return <StyledContainer>{props.children}</StyledContainer>;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;

  margin: 0 auto;

  width: 70%;
`;
