import styled from "styled-components";
import React from "react";

type ColumnWidth = 1 | 2 | 3;
interface ColumnProps {
  widthFlex: ColumnWidth;
  children: React.ReactNode;
}
export function Column(props: ColumnProps) {
  return (
    <StyledColumn width={props.widthFlex}>
      {props.children}
    </StyledColumn>
  )
}

const StyledColumn = styled.div<{ width: ColumnWidth }>`
  display: flex;
  flex-direction: column;
  
  flex: ${props => props.width};
  
  height: 100%;
  padding: 10px;
  
  position: relative;
`;
