import { Listener } from '../listener';
import { LobbyCreate } from './LobbyCreate';
import { LobbyLeave } from './LobbyLeave';
import { LobbyJoin } from './LobbyJoin';
import { SetUsername } from './SetUsername';
import { Disconnecting } from "./Disconnecting";

export const events: Listener[] = [new SetUsername(), new LobbyCreate(), new LobbyJoin(), new LobbyLeave(), new Disconnecting()];
