import React from 'react';
import styled from 'styled-components';
import { Streak } from './Streak';

interface UserProps {
  drawer?: boolean;
  correct?: boolean;
  position: number;
  streak?: number;
  points?: number;
  roundPoints?: number;
  user: {
    id: string;
    username: string;
  };
}

export function User(props: UserProps) {
  return (
    <Container drawer={props.drawer} correct={props.correct}>
      <Left>
        <Avatar src={`https://avatars.dicebear.com/api/human/${props.user.username}.svg`}>
          <Position>{props.position}</Position>
        </Avatar>
        <Details>
          <Name>{props.user.username}</Name>
          {props.points && (
            <Points>
              {props.points} points {props.roundPoints && <span>+ {props.roundPoints}</span>}
            </Points>
          )}
        </Details>
      </Left>
      {props.streak && <Streak number={props.streak} alt={!!props.drawer} />}
    </Container>
  );
}

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.div<{ src: string }>`
  width: 35px;
  height: 35px;
  border-radius: 5px;

  position: relative;
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Position = styled.p`
  position: absolute;
  bottom: -5px;
  width: fit-content;
  padding: 0 5px;
  margin: 0 auto;
  left: 0;
  right: 0;
  border-radius: 3px;

  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  font-size: 10px;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3px;
`;

const Name = styled.p`
  font-size: 14.5px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
`;

const Points = styled.p`
  font-size: 13px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;

  span {
    font-size: 12px;
    font-weight: inherit;
    font-family: inherit;
  }
`;

const Container = styled.div<{ drawer?: boolean; correct?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }

  ${Points} {
    color: ${props => (props.drawer ? 'white' : '#0797ff')};
    span {
      color: ${props => (props.drawer ? '#57ec55' : '#1dbb1a')};
    }
  }

  &:nth-child(even) {
    background: ${props => (props.drawer ? '#0797FF' : props.correct ? '#DAFFDE' : '#fafafa')};
  }

  &:nth-child(odd) {
    background: ${props => (props.drawer ? '#0797FF' : props.correct ? '#DAFFDE' : '#f2f2f2')};
  }
`;
