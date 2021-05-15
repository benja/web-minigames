import styled from 'styled-components';
import { User } from '@wmg/shared';
import { Text } from '../../atoms';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { keyframes } from 'styled-components';

interface AvatarRowProps {
  users: User[];
  showName?: boolean;
}
export function AvatarRow(props: AvatarRowProps) {
  return (
    <Container>
      {props.users.map(user => (
        <UserContainer key={`user-${user.username}-${user.id}`}>
          {user.username ? (
            <UserItem>
              <Avatar src={`https://avatars.dicebear.com/api/human/${user.username}.svg`} />

              {props.showName && <Text>{user.username}</Text>}
            </UserItem>
          ) : (
            <UserItem>
              <EmptyBox />

              <Text>searching..</Text>
            </UserItem>
          )}
        </UserContainer>
      ))}
    </Container>
  );
}

const UserItem = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  > div {
    margin-bottom: 10px;
  }
`;

const UserContainer = styled.div`
  margin-right: 25px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;

  > div {
    align-items: center;
  }
  padding: 20px;
`;

const Bounce = keyframes`
  0% { transform: translateY(0px); }
  25% { transform: translateY(-3px); }
  50% { transform: translateY(3px); }
  75% { transform: translateY(-3px); }
  100% { transform: translateY(0px); }
`;

const EmptyBox = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 999px;

  background: red;
  animation: ${Bounce} 10s infinite;
`;
