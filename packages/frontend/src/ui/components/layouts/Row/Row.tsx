import React from 'react';
import styled from 'styled-components';
import { BreakPoints } from '../../../theme';

interface RowProps {
  children: React.ReactNode;
}
export function Row(props: RowProps) {
  return <StyledRow>{props.children}</StyledRow>;
}

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;

  @media (max-width: ${BreakPoints.MD}) {
    flex-direction: column;
  }
`;
