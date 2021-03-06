import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

interface TextProps {
  children: React.ReactNode;
  tooltip?: string;
  header?: boolean;
  fontSize?: number;
  style?: React.CSSProperties;
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
  color: ${props => props.theme.textPrimary};
`;

const StyledBold = styled.b<TextProps>`
  margin: 0;
  padding: 0;

  font-size: ${props => props.fontSize ?? 16}px;
  color: ${props => props.theme.textPrimary};
`;
