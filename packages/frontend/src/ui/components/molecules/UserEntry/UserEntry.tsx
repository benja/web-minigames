import styled from 'styled-components';
import { Icon, Text } from '../../atoms';
import { User } from '@wmg/shared';
import Avatar from 'react-avatar';
import React, { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../../../../utils/store';
import { faCheck, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

interface userEntryProps extends User {
  /*
  Is current user that is logged in
   */
  active?: boolean;

  /*
  State username override
   */
  usernameOverride: string;

  /*
  On username change state callback
   */
  onUsernameChange: (name: string) => void;

  /*
  On username save
   */
  onUsernameSave: () => void;

  /*
  Is user kickable
   */
  kickable?: boolean;

  /*
  On kick action
   */
  onPlayerKick?: () => void;
}
export function UserEntry(props: userEntryProps) {
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <Container>
      <Avatar name={props.username.split(/(?=[A-Z])/).join(' ')} size="35" round="5px" />

      {showInput ? (
        <input value={props.usernameOverride} onChange={e => props.onUsernameChange(e.target.value)} />
      ) : (
        <Text tooltip={'Test'}>{props.username}</Text>
      )}
      {props.admin && (
        <Text header style={{ marginLeft: 10 }} tooltip={'Party leader'}>
          👑
        </Text>
      )}
      {props.kickable && (
        <Icon
          onClick={props.onPlayerKick ? props.onPlayerKick : () => {}}
          icon={faSignOutAlt}
          tooltip={'Kick player'}
        />
      )}
      {(props.username === props.usernameOverride || showInput) && (
        <Icon
          icon={!showInput ? faEdit : faCheck}
          onClick={() => {
            if (!showInput) return setShowInput(true);
            props.onUsernameSave();
            setShowInput(false);
          }}
          tooltip={'Edit username'}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;

  > div {
    &:first-child {
      margin-right: 10px;
    }
    &:last-child {
      margin-left: auto;
    }
  }

  > p {
    margin: auto 0;
  }

  overflow-x: hidden;
`;
