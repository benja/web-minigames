import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { DefaultStore } from '../../utils/store';
import { Tools } from '../constants';
import { PencilIcon } from './Icons/Pencil';
import { EraserIcon } from './Icons/Eraser';
import { PaintBucketIcon } from './Icons/PaintBucket';
import { TrashIcon } from './Icons/Trash';
import { GameManager } from '../game-manager';

interface DrawingToolsProps {
  state: DefaultStore;
  dispatch: Dispatch<SetStateAction<DefaultStore>>;
}

const colors = [
  '#ffffff',
  '#CBCBC9',
  '#F12D08',
  '#F48500',
  '#FADD03',
  '#3FB601',
  '#47B2FF',
  '#2430DE',
  '#B51DC6',
  '#DE94B2',
  '#B1632E',
  '#000000',
  '#565656',
  '#861605',
  '#D44C00',
  '#F0AA00',
  '#17520A',
  '#255DA9',
  '#0A0B72',
  '#650B77',
  '#B56A7C',
  '#723B08',
];

export function DrawingTools({ state, dispatch }: DrawingToolsProps) {
  return (
    <Container>
      <Left>
        <Button
          onClick={() =>
            dispatch(o => ({
              ...o,
              hand: {
                ...o.hand,
                activeTool: Tools.PAINT_BRUSH,
              },
            }))
          }
        >
          <PencilIcon size={25} color="#0797FF" />
        </Button>

        <Button
          onClick={() =>
            dispatch(o => ({
              ...o,
              hand: {
                ...o.hand,
                activeTool: Tools.RUBBER,
              },
            }))
          }
        >
          <EraserIcon size={25} color="#FF8585" />
        </Button>

        <Button>
          <PaintBucketIcon size={25} color="#000000" />
        </Button>

        <Range
          type="range"
          min="1"
          max="25"
          value={state.hand?.brushRadius}
          onChange={e =>
            dispatch(o => ({
              ...o,
              hand: {
                ...o.hand,
                brushRadius: Number(e.target.value),
              },
            }))
          }
        />

        <ColorsContainer>
          {colors.map(c => (
            <Color
              onClick={() =>
                dispatch(o => ({
                  ...o,
                  hand: {
                    ...o.hand,
                    activeTool: Tools.PAINT_BRUSH,
                    color: c,
                  },
                }))
              }
              color={c}
            />
          ))}
        </ColorsContainer>
      </Left>

      <Button
        onClick={() => {
          const ctx = GameManager.getGameManager().getCanvasContext();
          const canvas = GameManager.getGameManager().getCanvas();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }}
      >
        <TrashIcon size={25} color="#000000" />
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 10px;
  margin: 10px auto;
  padding: 10px;

  position: absolute;
  bottom: -80px;
  left: 9px;

  width: 800px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ColorsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: 210px;
`;

const Color = styled.div<{ color: string }>`
  width: 15px;
  height: 15px;
  border-radius: 999px;
  background: ${props => props.color};
  margin: 2px;
  border: 1px solid #c7c7c7;

  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;

const Button = styled.button`
  border: none;
  padding: 2px 5px;
  border-radius: 5px;
  background: #f2f2f2;
  margin-right: 6px;

  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    opacity: 0.5;
  }
`;

const Range = styled.input`
  ::-webkit-slider-runnable-track {
    width: 100%;
    background: #dedede;
    border-radius: 20px;
  }
`;
