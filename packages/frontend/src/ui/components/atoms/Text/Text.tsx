import React from 'react';
import styled from 'styled-components';

interface TextProps {
  children: string;
  header?: boolean;
  fontSize?: number;
}
export function Text(props: TextProps) {
  if (props.header) {
    return <StyledBold {...props}>{props.children}</StyledBold>;
  } else {
    return <StyledText {...props}>{props.children}</StyledText>;
  }
}

const StyledText = styled.p<TextProps>`
  margin: 0;
  padding: 0;
  
  font-size: ${props => props.fontSize ?? 16}px;
`;

const StyledBold = styled.b`
  margin: 0;
  padding: 0;
  
  font-size: ${props => props.fontSize ?? 16}px;
`;
