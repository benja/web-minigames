import styled from "styled-components";

interface AvatarProps {
  image?: string;
  active?: boolean;
}
export function Avatar(props: AvatarProps) {
  return (
    <Wrapper active={props.active}>
      <StyledAvatar src={props.image} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  
  background: red;

  border-radius: 50%;

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
