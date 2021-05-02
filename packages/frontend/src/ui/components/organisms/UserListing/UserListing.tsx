import { User } from '@wmg/shared';
import styled from 'styled-components';
import { UserEntry } from '../../molecules';
import { Card } from '../../layouts';

interface UserListingProps {
  users: User[];
}
export function UserListing(props: UserListingProps) {
  return (
    <Card header={'Lobby members'} subHeader={'People in your lobby'}>
      <Container>
        {props.users.map((u, index) => (
          <UserEntry {...u} key={`user-${u.username}-index-${index}`} />
        ))}
      </Container>
    </Card>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 5px;
`;
