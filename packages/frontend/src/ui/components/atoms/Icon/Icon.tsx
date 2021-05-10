import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

interface IconProps extends FontAwesomeIconProps {
  tooltip?: string;
}
export function Icon(props: IconProps) {
  return (
    <StyledIcon data-tip={props.tooltip}>
      <FontAwesomeIcon {...props} />
    </StyledIcon>
  );
}

const StyledIcon = styled.div`
  transition: 0.2s ease-in-out;

  &:active {
    transform: scale(1.2);
  }

  &:hover {
    cursor: pointer;
  }
`;
