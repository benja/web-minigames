import { Listener } from '../listener';
import { LobbyCreate } from './LobbyCreate';
import { LobbyLeave } from './LobbyLeave';
import { LobbyJoin } from './LobbyJoin';
import { SetUsername } from './SetUsername';

export const events: Listener[] = [new SetUsername(), new LobbyCreate(), new LobbyJoin(), new LobbyLeave()];
