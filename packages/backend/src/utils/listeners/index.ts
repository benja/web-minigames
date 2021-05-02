import { Listener } from '../listener';
import { LobbyJoin } from './LobbyJoin';
import { LobbyLeave } from './LobbyLeave';

export const events: Listener[] = [new LobbyJoin(), new LobbyLeave()];
