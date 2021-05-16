import { GameMessage } from './GameMessage';
import { GameListener } from '../../game-listener';
import { GameInteraction } from './GameInteraction';
import { GamePickWord } from './GamePickWord';
import { GameClearCanvas } from './GameClearCanvas';

const events: GameListener[] = [new GameClearCanvas(), new GameMessage(), new GameInteraction(), new GamePickWord()];

export default events;
