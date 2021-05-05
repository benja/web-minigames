import { Listener } from '../listener';
import { LobbyCreate } from './LobbyCreate';
import { LobbyLeave } from './LobbyLeave';
import { LobbyJoin } from './LobbyJoin';
import { LobbySetPrivate } from './LobbySetPrivate';
import { JoinQueue } from './JoinQueue';
import { LeaveQueue } from './LeaveQueue';
import { UpdateUsername } from './UpdateUsername';
import { Disconnecting } from './Disconnecting';
import { LobbyKick } from './LobbyKick';
import { LobbyMessage } from './LobbyMessage';

export const events: Listener[] = [
  new UpdateUsername(),
  new LobbyCreate(),
  new LobbyJoin(),
  new LobbyLeave(),
  new LobbyKick(),
  new LobbyMessage(),
  new Disconnecting(),
  new JoinQueue(),
  new LeaveQueue(),
  new LobbySetPrivate(),
];
