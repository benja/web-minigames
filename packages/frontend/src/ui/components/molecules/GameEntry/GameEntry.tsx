import styled from 'styled-components';
import { Text, Image } from '../../atoms';
import { Card } from '../../layouts';
import { GameListing } from '@wmg/shared';

interface GameEntryProps extends GameListing {
  onClick: () => void;
}
export function GameEntry(props: GameEntryProps) {
  return (
    <Card header={props.name} onClick={props.onClick} subHeader={`Limit of ${props.limit} players`}>
      <GameContainer>
        <GameContent>
          <Text>{props.description.length > 400 ? `${props.description.substring(0, 400)}` : props.description}</Text>
        </GameContent>
        <GameImage>
          <Image src={props.image} />
        </GameImage>
      </GameContainer>
    </Card>
  );
}

const GameContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const GameImage = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  > img {
    height: 130px;
    width: auto;
  }
`;
