import styled from "styled-components";
import React from "react";

interface ImageProps {
  src?: string;
}
export function Image(props: ImageProps) {
  return (
    <StyledImage {...props} onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      // @ts-ignore
      e.target.onError = null;
      // @ts-ignore
      e.target.src = "";
    }} />
  )
}

const StyledImage = styled.img<Pick<ImageProps, 'src'>>`
  height: 100%;
  width: 100%;
  user-select: none;
`;
