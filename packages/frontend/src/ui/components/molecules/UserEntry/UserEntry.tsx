import styled from 'styled-components';
import { Text } from '../../atoms';
import { User } from '@wmg/shared';
import Avatar from 'react-avatar';

interface userEntryProps extends User {}
export function UserEntry(props: userEntryProps) {
  return (
    <StyledUser>
      <Avatar name={props.username.split(/(?=[A-Z])/).join(' ')} size="35" round="5px" />
      <Text>{props.username}</Text>
    </StyledUser>
  );
}

const StyledUser = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: fit-content;

  margin-bottom: 10px;

  > div:first-child {
    margin-right: 10px;
  }

  > p {
    margin: auto 0;
  }

  overflow-x: hidden;
`;
