import styled from "styled-components";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
}
export function Button(props: ButtonProps) {
  return (
    <StyledButton onClick={props.onClick} type={props.type}>
      {props.text}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  border: 1px solid lightgray;
  background: white;
  
  width: 100%;
  
  padding: 10px 15px;
  border-radius: 10px;
  
  &:focus {
    outline: none;
  }
  
  &:hover {
    cursor: pointer;
  }
`;
