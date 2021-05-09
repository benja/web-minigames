import styled from 'styled-components';

interface InputProps {
  text: string;
  type?: 'text';
  placeholder?: string;
  onChange?: (text: string) => void;
}
export function Input(props: InputProps) {
  return (
    <StyledInput type={props.type || 'text'} onChange={e => props.onChange(e.target.value)} value={props.text} placeholder={props.placeholder} />
  )
}

const StyledInput = styled.input`
  width: 100%;
  font-size: 14px;
        
  padding: 10px 15px;
  outline: none;
  border: 1px solid lightgray;
`;
