import { GameMessage } from './GameMessage';
import { GameListener } from '../../game-listener';
import { GameInteraction } from './GameInteraction';

const events: GameListener[] = [new GameMessage(), new GameInteraction()];

export default events;
