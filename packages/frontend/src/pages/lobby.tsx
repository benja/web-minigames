import { Column, Container, Row } from "../ui/components/layouts";
import { UserListing } from "../ui/components/organisms";
import { Game, User } from "@wmg/shared";
import { GameListing } from "../ui/components/organisms";
import { useRouter } from 'next/router'
import { useContext, useEffect } from "react";
import { StoreContext } from "../utils/store";
import { useGameActions } from "@wmg/common";

const users: User[] = [
  {
    username: "Matthew",
    image: "https://avatars.githubusercontent.com/u/16708653?s=400&u=b96a5b2534bdd50476bddf50d0290985b5888687&v=4"
  },
  {
    username: "Benjamin",
    image: "https://avatars.githubusercontent.com/u/16708653?s=400&u=b96a5b2534bdd50476bddf50d0290985b5888687&v=4"
  }
]

const games: Game[] = [
  {
    name: "This is a game name",
    description: "This is a description of a game pepehands",
    image: "https://avatars.githubusercontent.com/u/16708653?s=400&u=b96a5b2534bdd50476bddf50d0290985b5888687&v=4"
  }
]

interface LobbyProps {

}
export default function Lobby() {
  const router = useRouter();
  const { state } = useContext(StoreContext);
  const { joinLobby } = useGameActions();

  const { lobbyId } = router.query;

  useEffect(() => {
    if (lobbyId) {
      if (typeof lobbyId !== 'string') {
        return void router.push(`/lobby`);
      }
      if (state.lobby && state.lobby.lobbyId !== lobbyId) {
        joinLobby(lobbyId)
      }
    }
  }, [lobbyId])

  return (
    <Container>
      <Row>
        <Column widthFlex={1}>
          <UserListing users={users} />
        </Column>
        <Column widthFlex={2}>
          <GameListing games={games} />
        </Column>
      </Row>
    </Container>
  )
}
