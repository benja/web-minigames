import { GameListener } from './game-listener';
import { DrawIt } from './draw-it';
import { GameTypes } from '@wmg/shared';

interface ListenerTypes {
  gameType: GameTypes;
  listener: GameListener;
}

const listeners: ListenerTypes[] = [
  ...DrawIt.getListeners().map(listener => ({
    gameType: GameTypes.DRAWING,
    listener,
  })),
];

export default listeners;
