import { Listener } from '../listener';
import { LobbyCreate } from './LobbyCreate';
import { LobbyLeave } from './LobbyLeave';
import { LobbyJoin } from './LobbyJoin';
import { UpdateUsername } from './UpdateUsername';
import { Disconnecting } from './Disconnecting';

export const events: Listener[] = [
  new UpdateUsername(),
  new LobbyCreate(),
  new LobbyJoin(),
  new LobbyLeave(),
  new Disconnecting(),
];
