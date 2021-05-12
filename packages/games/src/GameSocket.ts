import { Dispatch, SetStateAction } from 'react';
import { DrawItSocketEvents } from '@wmg/shared';
import { NextRouter } from 'next/router';
import { DefaultStore } from './utils/store';
import { Game } from '@wmg/shared';
import { GameManager } from './draw-it/game-manager';
import { Tools } from './draw-it/constants';
import { toast } from 'react-hot-toast';

type MousePosition = { x: number; y: number };

export class GameSocket {
  public readonly socket: SocketIOClient.Socket;
  public readonly game: Game;
  private readonly dispatch: Dispatch<SetStateAction<DefaultStore>>;
  private router: NextRouter;

  constructor(socket: SocketIOClient.Socket, game: Game, dispatch: Dispatch<SetStateAction<DefaultStore>>) {
    this.dispatch = dispatch;
    this.socket = socket;
    this.game = game;
    this.initialiseMethods();
  }

  private initialiseMethods() {
    this.socket.on(DrawItSocketEvents.GAME_ROUND_START, (data: any) => {
      console.log(DrawItSocketEvents.GAME_ROUND_START, data);
    });

    this.socket.on(DrawItSocketEvents.GAME_ROUND_END, (data: any) => {
      console.log(DrawItSocketEvents.GAME_ROUND_END, data);
    });

    this.socket.on(DrawItSocketEvents.GAME_TURN_START, (data: { drawer: string; word: string }) => {
      this.dispatch(o => ({
        ...o,
        game: {
          ...o.game,
          drawer: data.drawer,
          word: data.word,
          messages: [],
        },
      }));
    });

    this.socket.on(DrawItSocketEvents.GAME_TURN_END, (data: any) => {
      const ctx = GameManager.getGameManager().getCanvasContext();
      const canvas = GameManager.getGameManager().getCanvas();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    this.socket.on(DrawItSocketEvents.GAME_LETTER_REVEAL, (message: string) => {
      this.dispatch(o => ({
        ...o,
        game: {
          ...o.game,
          word: message,
        },
      }));
    });

    this.socket.on(DrawItSocketEvents.GAME_SEND_MESSAGE, (data: string) => {
      console.log(data);
      this.dispatch(o => ({
        ...o,
        game: {
          ...o.game,
          messages: [...(o.game.messages || []), data],
        },
      }));
    });

    this.socket.on(
      DrawItSocketEvents.GAME_INTERACTION,
      (data: { hand: DefaultStore['hand']; position: { from: MousePosition; to: MousePosition } }) => {
        const ctx = GameManager.getGameManager().getCanvasContext();

        ctx.beginPath(); // begin

        ctx.lineWidth = data.hand.brushRadius;
        ctx.lineCap = 'round';
        ctx.strokeStyle = data.hand.activeTool === Tools.RUBBER ? 'white' : data.hand.color;

        ctx.moveTo(data.position.from.x, data.position.from.y); // from

        ctx.lineTo(data.position.to.x, data.position.to.y); // to

        ctx.stroke(); // draw it!
      },
    );

    this.socket.on(DrawItSocketEvents.GAME_CORRECT_GUESS, () => {
      toast('Correct!', {
        icon: '☑️',
      });
    });

    this.socket.on(DrawItSocketEvents.GAME_PLAYER_LEAVE, (message: string) => {
      console.log(DrawItSocketEvents.GAME_PLAYER_LEAVE, message);
    });
  }

  public guessWord(message: string) {
    this.socket.emit(`${this.game.gameType}-${DrawItSocketEvents.GAME_SEND_MESSAGE}`, message);
  }

  public gameInteraction(data: { hand: DefaultStore['hand']; position: { from: MousePosition; to: MousePosition } }) {
    this.socket.emit(`${this.game.gameType}-${DrawItSocketEvents.GAME_INTERACTION}`, data);
  }
}
