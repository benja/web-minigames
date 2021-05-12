import styled from 'styled-components';
import { Icon, Input } from '../../atoms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IconButtonProps {
  text: string;
  icon: IconProp;
  onClick?: () => void;
  onChange?: (text: string) => void;
  onSubmit?: () => void;
  iconTooltip?: string;
}
export function IconInput(props: IconButtonProps) {
  return (
    <Container
      onSubmit={e => {
        e.preventDefault();
        props.onSubmit();
      }}
    >
      <Input text={props.text} onChange={props.onChange ? props.onChange : () => {}} />
      <IconContainer onClick={props.onClick}>
        <Icon icon={props.icon} tooltip={props.iconTooltip} />
      </IconContainer>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;

  > input {
    border-width: 1px 0 1px 1px;
    border-radius: 5px 0 0 5px;
  }
`;

const IconContainer = styled.div`
  padding: 10px 15px;
  border: 1px solid ${props => props.theme.textPrimary};
  border-width: 1px 1px 1px 0;

  border-radius: 0 5px 5px 0;
`;
