import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import styled, { useTheme } from 'styled-components';
import { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

interface IconProps extends FontAwesomeIconProps {
  tooltip?: string;
}
export function Icon(props: IconProps) {
  const theme = useTheme();

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <StyledIcon data-tip={props.tooltip} data-for={'wmg'}>
      <FontAwesomeIcon {...props} color={theme.textPrimary} />
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
