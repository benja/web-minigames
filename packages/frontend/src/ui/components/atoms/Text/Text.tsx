import React from 'react';
import styled from 'styled-components';

interface TextProps {
  children: string;
  header?: boolean;
}
export function Text(props: TextProps) {
  if (props.header) {
    return <StyledBold>{props.children}</StyledBold>;
  } else {
    return <StyledText>{props.children}</StyledText>;
  }
}

const StyledText = styled.p`
  margin: 0;
  padding: 0;
`;

const StyledBold = styled.b`
  margin: 0;
  padding: 0;
`;
