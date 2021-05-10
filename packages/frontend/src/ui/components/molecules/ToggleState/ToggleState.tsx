import styled from 'styled-components';
import { Icon, Text } from '../../atoms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ToggleStateProps {
  name: string;
  icon: IconProp;
  onToggle: () => void;
}
export function ToggleState(props: ToggleStateProps) {
  return (
    <Container>
      <Text header>{props.name}</Text>
      <Icon icon={props.icon} onClick={props.onToggle} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 10px 10px;
`;
