import { Column, Container, Row } from '../ui/components/layouts';
import { UserListing } from '../ui/components/organisms';
import { GameLobbySizes, User } from "@wmg/shared";
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../utils/store';
import { useGames } from "../hooks/useGames";
import { AvatarRow, Button, GameEntry, List } from "../ui/components/molecules";
import { ListItem, Text } from "../ui";
import { Centered } from "../ui/components/layouts/Centered";

const users: User[] = [
  {
    username: 'Matthew',
    image: 'https://avatars.githubusercontent.com/u/16708653?s=400&u=b96a5b2534bdd50476bddf50d0290985b5888687&v=4',
  },
  {
    username: 'Benjamin',
    image: 'https://avatars.githubusercontent.com/u/16708653?s=400&u=b96a5b2534bdd50476bddf50d0290985b5888687&v=4',
  },
];

export default function Lobby() {
  const router = useRouter();
  const { state } = useContext(StoreContext);
  const { data: games } = useGames();

  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    if (!state.account) {
      return void router.push(`/`);
    }

    if (typeof id !== 'string') {
      return void router.push(`/lobby`);
    }

    if (state.lobby?.id !== id) {
      state.socket.joinLobby(id);
    }
  }, [id]);

  if (state.queue) {
    return (
      <Centered>
        <Text header>You are currently in queue for {state.queue.type}...</Text>
        <AvatarRow users={function() {
          const emptyUsers = new Array(GameLobbySizes[state.queue.type]).fill({});
          state.lobby.players.forEach((p, i) => emptyUsers[i] = p);
          return emptyUsers;
        }()} showName />
        <Button text={"Leave queue"} onClick={() => state.socket.leaveGameSearch(state.queue.type)} />
      </Centered>
    )
  }

  return (
    <Container>
      <Row>
        <Column widthFlex={1}>
          <UserListing users={state.lobby?.players || []} />
        </Column>
        <Column widthFlex={2}>
          <List>
            {games && games.map(game => <ListItem><GameEntry onClick={() => state.socket.startGameSearch(game.type)} {...game} /></ListItem>)}
          </List>
        </Column>
      </Row>
    </Container>
  );
}
