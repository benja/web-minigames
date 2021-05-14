import { GameMessage } from './GameMessage';
import { GameListener } from '../../game-listener';
import { GameInteraction } from './GameInteraction';
import { GamePickWord } from './GamePickWord';

const events: GameListener[] = [new GameMessage(), new GameInteraction(), new GamePickWord()];

export default events;
