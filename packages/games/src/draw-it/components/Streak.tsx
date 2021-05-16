import React from 'react';
import styled, { keyframes } from 'styled-components';

export function Streak({ number, alt }: { number: number; alt?: boolean }) {
  return (
    <Container>
      <Number alt={alt}>x{number}</Number>
      <Fire alt={alt}>
        <div className="fire-left">
          <div className="main-fire"></div>
          <div className="particle-fire"></div>
        </div>
        <div className="fire-main">
          <div className="main-fire"></div>
          <div className="particle-fire"></div>
        </div>
        <div className="fire-right">
          <div className="main-fire"></div>
          <div className="particle-fire"></div>
        </div>
      </Fire>
    </Container>
  );
}

const scaleUpDown = keyframes`
  0%,
  100% {
    transform: scaleY(1) scaleX(1);
  }
  50%,
  90% {
    transform: scaleY(1.1);
  }
  75% {
    transform: scaleY(0.95);
  }
  80% {
    transform: scaleX(0.95);
  }
`;

const shake = keyframes`
  0%,
  100% {
    transform: skewX(0) scale(1);
  }
  50% {
    transform: skewX(5deg) scale(0.9);
  }
`;

const particleUp = keyframes`
 0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: -100%;
    transform: scale(0.5);
  }
`;

const glow = keyframes`
  0%,
  100% {
    background-color: #ef5a00;
  }
  50% {
    background-color: #ff7800;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

const Number = styled.p<{ alt?: boolean }>`
  font-size: 13px;
  color: ${props => (props.alt ? 'white' : '#ef5a00')};
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  filter: drop-shadow(0 0 10px ${props => (props.alt ? 'white' : '#d43322')});
  margin-right: 7px;
`;

const Fire = styled.div<{ alt?: boolean }>`
  position: relative;
  width: 15px;
  height: 15px;
  background-color: transparent;
  margin-left: auto;
  margin-right: auto;

  .fire-main {
    position: absolute;
    height: 100%;
    width: 100%;
    animation: ${scaleUpDown} 3s ease-out;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  .fire-main .main-fire {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      farthest-corner at 10px 0,
      ${props => (props.alt ? 'white' : '#d43300')} 0%,
      ${props => (props.alt ? 'white' : '#ef5a00')} 95%
    );
    transform: scaleX(0.8) rotate(45deg);
    border-radius: 0 40% 60% 40%;
  }

  .fire-main .particle-fire {
    position: absolute;
    top: 0%;
    left: 20%;
    width: 10px;
    height: 10px;
    background-color: ${props => (props.alt ? 'white' : '#ef5a00')};
    border-radius: 50%;
    animation: ${particleUp} 2s ease-out 0;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  .fire-right {
    height: 100%;
    width: 100%;
    position: absolute;
    animation: ${shake} 2s ease-out 0;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  .fire-right .main-fire {
    position: absolute;
    top: 0%;
    right: -25%;
    width: 80%;
    height: 80%;
    background-color: ${props => (props.alt ? 'white' : '#ef5a00')};
    transform: scaleX(0.8) rotate(45deg);
    border-radius: 0 40% 60% 40%;
  }

  .fire-right .particle-fire {
    position: absolute;
    top: 5%;
    left: -10%;
    width: 10px;
    height: 10px;
    background-color: ${props => (props.alt ? 'white' : '#ef5a00')};
    transform: scaleX(0.3) rotate(45deg);
    border-radius: 50%;
    animation: ${particleUp} 2s ease-out 0;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  .fire-left {
    position: absolute;
    height: 100%;
    width: 100%;
    animation: ${shake} 3s ease-out 0;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  .fire-left .main-fire {
    position: absolute;
    top: 4%;
    left: -20%;
    width: 80%;
    height: 80%;
    background-color: ${props => (props.alt ? 'white' : '#ef5a00')};
    transform: scaleX(0.8) rotate(45deg);
    border-radius: 0 40% 60% 40%;
  }
`;
