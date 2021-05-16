import styled from 'styled-components';
import React from 'react';
import { Text } from '../../atoms';

export enum ImageCardSize {
  LARGE = 'large',
  SMALL = 'small',
}
interface ImageCardProps {
  header?: string;
  subHeader?: string;

  src: string;

  children: React.ReactNode;

  onClick?: () => void;

  size?: ImageCardSize;
}
export function ImageCard(props: ImageCardProps) {
  return (
    <StyledCardContainer {...props}>
      <CardHeaderContent>
        {props.header && (
          <Text header fontSize={38}>
            {props.header}
          </Text>
        )}
      </CardHeaderContent>
      <CardContentContainer className={'image-card-content'}>
        <CardContent>
          <Text>Styling</Text>
        </CardContent>
      </CardContentContainer>
      <ImageCardContainer src={props.src} />
    </StyledCardContainer>
  );
}

const CardHeaderContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: fit-content;

  z-index: 1;
`;

const CardContent = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const CardContentContainer = styled.div`
  z-index: 1;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  transition: 0.2s ease-in-out;
  opacity: 1;

  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 32%, rgba(255, 255, 255, 0) 100%);
`;

const ImageCardContainer = styled.div<Pick<ImageCardProps, 'src'>>`
  position: absolute;

  background-image: url('${props => props.src}');
  background-repeat: no-repeat;
  background-size: cover;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  transition: 0.3s ease-in-out;
`;

const StyledCardContainer = styled.div<ImageCardProps>`
  padding: 5px 15px;

  position: relative;

  overflow: hidden;
  border-radius: 10px;

  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.19);

  height: ${props => (props.size === ImageCardSize.LARGE ? 400 : 250)}px;
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
    div:last-child {
      transform: scale(1.05);
    }

    .image-card-content {
      opacity: 1;
    }
  }
`;
