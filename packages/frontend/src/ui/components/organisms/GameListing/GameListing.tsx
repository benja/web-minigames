import { Game } from "@wmg/shared";
import styled from "styled-components";
import { GameEntry } from "../../molecules";

interface GameListingProps {
  games: Game[];
}
export function GameListing(props: GameListingProps) {
  return (
    <Container>
      {props.games.map((g, index) => <GameEntry {...g} key={`game-${g.name}-index-${index}`} onClick={() => console.log('clicked')}/>)}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
