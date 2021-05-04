import styled from "styled-components";
import { User } from "@wmg/shared";
import { Avatar, Text } from "../../atoms";

interface AvatarRowProps {
  users: User[];
  showName?: boolean;
}
export function AvatarRow(props: AvatarRowProps) {
  console.log(props.users)
  return (
    <Container>
      {props.users.map(user =>
        <UserItem>
          <Avatar image={user.image} />
          {props.showName && <Text>{user.username}</Text>}
        </UserItem>
      )}
    </Container>
  )
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
