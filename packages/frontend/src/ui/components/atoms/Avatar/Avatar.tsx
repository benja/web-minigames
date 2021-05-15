import styled from 'styled-components';

interface AvatarProps {
  src?: string;
  active?: boolean;
}

export function Avatar(props: AvatarProps) {
  return (
    <Wrapper active={props.active}>
      <StyledAvatar src={props.src} />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ active?: boolean }>`
  display: flex;

  border: 1px solid ${props => props.theme.backgroundPrimary};
  border-radius: 999px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const StyledAvatar = styled.img`
  width: 35px;
  height: 35px;

  border-radius: 50%;

  user-select: none;
`;
