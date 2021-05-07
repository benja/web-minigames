import styled from 'styled-components';
import { User } from '@wmg/shared';
import { Text } from '../../atoms';
import Avatar from 'react-avatar';

interface AvatarRowProps {
  users: User[];
  showName?: boolean;
}
export function AvatarRow(props: AvatarRowProps) {
  return (
    <Container>
      {props.users.map(user => (
        <UserItem key={`user-${user.username}-${user.id}`}>
          <Avatar name={user.username ? user.username.split(/(?=[A-Z])/).join(' ') : ''} size="35" round="5px" />
          {props.showName && <Text>{user.username}</Text>}
        </UserItem>
      ))}
    </Container>
  );
}

const UserItem = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  > div {
    width: fit-content;

    margin-bottom: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;

  > div {
    margin-right: 30px;
  }
  padding: 20px;
`;
