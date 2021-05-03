import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Column, Container, Row } from '../ui/components/layouts';
import { StoreContext } from '../utils/store';
import { Game } from '@wmg/shared';
import { GameListing, UserListing } from '../ui/components/organisms';
import { toast } from 'react-hot-toast';
import { useGames } from '../hooks/useGames';

export default function Index() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const { data: games } = useGames();
  const { state } = useContext(StoreContext);
  const { lobbyId } = router.query;

  useEffect(() => {
    if (!state.socket || state.lobby) return;

    if (lobbyId && typeof lobbyId === 'string') {
      state.socket.joinLobby(lobbyId);
    }
  }, [lobbyId, state.lobby, state.socket]);

  return (
    <Container>
      <Row>
        <Column widthFlex={2}>
          <UserListing users={state.lobby?.players || []} />
          {!state.lobby?.id && <button onClick={() => state.socket?.createLobby()}>Create lobby</button>}
          {state.lobby?.id && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(`http://localhost:3000/?lobbyId=${state.lobby.id}`);
                toast('Copied lobby link', {
                  icon: '🎉',
                });
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 1000);
              }}
            >
              {copied ? 'Copied' : 'Copy lobby link'}
            </button>
          )}
        </Column>
        <Column widthFlex={2}>
          <GameListing games={games} />
        </Column>
      </Row>
    </Container>
  );
}
