import React, { useState } from 'react';
import styled from 'styled-components';
import { GameContainer } from '@wmg/common';
import { DRAW_IT_CONTAINER_ID, DRAW_IT_CANVAS_ID } from '../constants';
import { ClockIcon } from './Icons/Clock';
import { DrawerIcon } from './Icons/Drawer';
import { ReportIcon } from './Icons/Report';
import { DefaultStore } from '../../utils/store';
import { useEffect, Dispatch, SetStateAction } from 'react';
import { Modal } from './Modal';
import { MessageType } from '@wmg/shared';
import { DrawingTools } from './DrawingTools';

interface CanvasProps {
  state: DefaultStore;
  dispatch: Dispatch<SetStateAction<DefaultStore>>;
}

export function Canvas({ state, dispatch }: CanvasProps) {
  const drawer = state.gameSocket?.game?.players.find(p => p.id === state.game?.drawer);

  const isDrawer = state.game && state.gameSocket && state.game?.drawer === state.gameSocket?.socket?.id;

  const [time, setTime] = useState(0);
  const [hasReported, setHasReported] = useState(false);

  // useEffect(() => {
  //   if (!state.game) return;
  //   let timer = null;

  //   if (state.game?.roundLength !== null) {
  //     setTime(state.game.roundLength);
  //     timer = setInterval(() => {
  //       setTime(t => t - 1);
  //     }, 1000);
  //   }

  //   setHasReported(false);

  //   return () => clearInterval(timer);
  // }, [state.game?.roundLength]);

  return (
    <Container>
      <TopContainer>
        <Navigation>
          <SpaceContainer>
            {drawer && (
              <User>
                <Avatar src={`https://avatars.dicebear.com/api/human/${drawer.username}.svg`} />
                <Name>{drawer.username}</Name>
                <DrawerIcon size={25} color="#FFBD3E" />
              </User>
            )}
          </SpaceContainer>
          <CurrentWord>{state?.game?.word}</CurrentWord>
          <SpaceContainer style={{ justifyContent: 'flex-end' }}>
            {!isDrawer && (
              <ReportButton
                onClick={() => {
                  if (hasReported) {
                    return state.gameSocket?.addMessage(MessageType.ALERT, 'You have already reported this user');
                  }
                  state.gameSocket?.addMessage(MessageType.ALERT, 'Your report has been sent');
                  setHasReported(true);
                }}
              >
                <ReportIcon size={25} color="#FF0000" />
              </ReportButton>
            )}
          </SpaceContainer>
        </Navigation>

        <GameContainer id={DRAW_IT_CONTAINER_ID}>
          <Modal state={state} />
          <DrawingBoard id={DRAW_IT_CANVAS_ID} />
        </GameContainer>

        {/* <Footer>
          <Left>
            <ClockIcon size={24} color="#FFBD3E" />
            <TimeLeft>{time}s</TimeLeft>
          </Left>
          <Slider>
            <Fill roundTime={state.game?.roundLength} width={time} />
          </Slider>
        </Footer> */}
      </TopContainer>
      {isDrawer && state.game?.roundLength && <DrawingTools state={state} dispatch={dispatch} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 600px;
  border-radius: 10px;
  margin: 0 10px;

  background: blue;
`;

const DrawingBoard = styled.canvas`
  background: white;
  width: 100%;
  height: 100%;
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  background: #f3f3f3;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;

  background: white;
  padding: 5px 10px;
  border-radius: 5px;
`;

const Avatar = styled.div<{ src: string }>`
  width: 25px;
  height: 25px;
  border-radius: 5px;

  position: relative;
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Name = styled.p`
  font-size: 14.5px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  margin: 0 5px;
`;

const CurrentWord = styled.p`
  font-size: 20px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;

  user-select: none;
  pointer-events: none;
  letter-spacing: 3px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  background: #f3f3f3;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TimeLeft = styled.p`
  font-size: 15px;
  margin-left: 5px;
  color: black;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
`;

const Slider = styled.div`
  background: #e4e4e4;
  height: 8px;
  border-radius: 10px;
  width: 100%;
  margin: 0 10px;
`;

const Fill = styled.div<{ roundTime: number; width: number }>`
  width: ${props => (props.width / props.roundTime) * 100}%;
  height: inherit;
  background: #ffbd3e;
  border-radius: 10px;
  animation: width 0.5s;
`;

const ReportButton = styled.button`
  border: none;
  padding: 2px 5px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.32);
  cursor: pointer;

  transition: 0.2s ease-in-out;
  &:hover {
    opacity: 0.5;
  }
`;

const SpaceContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: row;
`;
