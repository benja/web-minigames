import styled from "styled-components";
import { Text, Image } from "../../atoms";
import { Card } from "../../layouts";
import { Game } from "@wmg/shared";

interface GameEntryProps extends Game {
  onClick: () => void;
}
export function GameEntry(props: GameEntryProps) {
  return (
    <Card header={props.name} onClick={props.onClick} subHeader={`Limit of ${props.limit} players`}>
      <GameContainer>
        <GameContent>
          <Text>{props.description}</Text>
        </GameContent>
        <GameImage>
          <Image src={props.image} />
        </GameImage>
      </GameContainer>
    </Card>
  )
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
    width: 130px;
  }
`;
