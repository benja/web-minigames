import styled from "styled-components";
import { Avatar } from "../../atoms/Avatar";
import { Text } from "../../atoms";
import { User } from "@wmg/shared";

interface userEntryProps extends User {}
export function UserEntry(props: userEntryProps) {
  return (
    <StyledUser>
      <Avatar image={props.image} />
      <Text>{props.username}</Text>
    </StyledUser>
  )
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
