import { Listener } from '../listener';
import { LobbyCreate } from './LobbyCreate';
import { LobbyLeave } from './LobbyLeave';
import { LobbyJoin } from './LobbyJoin';
import { SetUsername } from './SetUsername';
import { Disconnecting } from "./Disconnecting";
import { JoinQueue } from "./JoinQueue";
import { LeaveQueue } from "./LeaveQueue";
import { LobbySetPrivate } from "./LobbySetPrivate";

export const events: Listener[] = [
  new SetUsername(),
  new LobbyCreate(),
  new LobbyJoin(),
  new LobbyLeave(),
  new Disconnecting(),
  new JoinQueue(),
  new LeaveQueue(),
  new LobbySetPrivate()
];
