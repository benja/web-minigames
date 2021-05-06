import styled from "styled-components";
import { Text } from "../../atoms";
import React from "react";

interface CardProps {
  header?: string;
  subHeader?: string;

  children: React.ReactNode;

  onClick?: () => void;
}
export function Card(props: CardProps) {
  return (
    <StyledCard onClick={props.onClick}>
      <CardHeaderContent>
        {props.header && <Text header>{props.header}</Text>}
        {props.subHeader && <Text>{props.subHeader}</Text>}
      </CardHeaderContent>
      <CardContent>
        {props.children}
      </CardContent>
    </StyledCard>
  )
}

const CardContent = styled.div`
  padding: 5px 0;
`;

const CardHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  
  width: 100%;
  height: fit-content;
`;

const StyledCard = styled.div`
  padding: 15px;
  
  position: relative;
  border-radius: 10px;

  box-shadow: 0 0 8px 0 rgba(0,0,0,0.19);
  
  height: 100%;
  width: 100%;
  
  margin: 10px 0;
  
  display: flex;
  flex-direction: column;
  
  user-select: none;
  
  transition: 0.1s ease-in-out;
  &:active {
    transform: ${props => props.onClick && 'scale(0.98)'};
  }
  &:hover {
    cursor: ${props => props.onClick && 'pointer'};
  }
`;
