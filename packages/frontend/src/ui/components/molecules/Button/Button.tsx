import styled from "styled-components";
import { Text } from "../../atoms";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}
export function Button(props: ButtonProps) {
  return (
    <StyledButton onClick={props.onClick}>
      <Text>{props.text}</Text>
    </StyledButton>
  )
}

const StyledButton = styled.div`
  border: none;
  background: gray;
  
  width: fit-content;
  
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  
  &:hover {
    cursor: pointer;
  }
`;
