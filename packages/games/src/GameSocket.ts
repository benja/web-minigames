import { Dispatch, SetStateAction } from 'react';
import { DrawItSocketEvents, Message, MessageType } from '@wmg/shared';
import { NextRouter } from 'next/router';
import { DefaultStore } from './utils/store';
import { Game } from '@wmg/shared';
import { GameManager } from './draw-it/game-manager';
import { Tools } from './draw-it/constants';
import { toast } from 'react-hot-toast';
import { SocketEvents } from '@wmg/shared';

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
    this.socket.on(DrawItSocketEvents.GAME_ROUND_START, (data: { currentRound: number }) => {
      this.dispatch(o => ({
        ...o,
        game: {
          ...o.game,
          currentRound: data.currentRound,
        },
      }));
    });

    this.socket.on(
      DrawItSocketEvents.GAME_ROUND_END,
      (data: { correctWord: string; roundScores: { id: number }[]; totalScores: { id: number }[] }) => {
        this.dispatch(o => ({
          ...o,
          game: {
            ...o.game,
            modal: true,
            correctWord: data.correctWord,
            roundScores: data.roundScores,
            totalScores: data.totalScores,
            drawer: undefined,
            word: undefined,
            roundLength: null,
          },
        }));
      },
    );

    this.socket.on(
      DrawItSocketEvents.GAME_TURN_START,
      (data: { drawer: string; word: string; roundLength: number }) => {
        this.dispatch(o => ({
          ...o,
          game: {
            ...o.game,
            drawer: data.drawer,
            word: data.word,
            correctGuessors: [],
            roundLength: data.roundLength,
            modal: false,
            words: undefined,
          },
        }));
      },
    );

    this.socket.on(DrawItSocketEvents.GAME_TURN_END, (data: { correctWord: string; roundScores: { id: number }[] }) => {
      const ctx = GameManager.getGameManager().getCanvasContext();
      const canvas = GameManager.getGameManager().getCanvas();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.dispatch(o => ({
        ...o,
        game: {
          ...o.game,
          modal: true,
          correctWord: data.correctWord,
          roundScores: data.roundScores,
          messages: [
            ...o.game.messages,
            !o.game.correctGuessors.length && {
              type: MessageType.ALERT,
              message: 'No one guessed the word',
            },
          ],
          drawer: undefined,
          word: undefined,
          roundLength: null,
        },
      }));
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

    this.socket.on(DrawItSocketEvents.GAME_SEND_MESSAGE, (data: Message) => {
      this.dispatch(o => ({
        ...o,
        game: {
          ...o.game,
          messages: [
            ...o.game.messages,
            {
              ...data,
            },
          ],
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

    this.socket.on(DrawItSocketEvents.GAME_CORRECT_GUESS, (socketId: string) => {
      this.dispatch(o => ({
        ...o,
        game: {
          ...o.game,
          correctGuessors: [...o.game.correctGuessors, socketId],
          messages: [
            ...o.game.messages,
            {
              type: MessageType.ALERT,
              message: `${o.gameSocket.game.players.find(p => p.id === socketId)?.username} guessed the word`,
            },
          ],
        },
      }));
    });

    this.socket.on(DrawItSocketEvents.GAME_PLAYER_LEAVE, (message: string) => {
      console.log(DrawItSocketEvents.GAME_PLAYER_LEAVE, message);
    });

    this.socket.on(DrawItSocketEvents.GAME_PICK_WORD, (words: string[]) => {
      this.dispatch(o => ({
        ...o,
        game: {
          ...o.game,
          modal: true,
          words: words,
        },
      }));
    });

    this.socket.on(DrawItSocketEvents.GAME_DRAWER_SELECTED, (socketId: string) => {
      this.dispatch(o => ({
        ...o,
        game: {
          ...o.game,
          drawer: socketId,
          messages: [
            ...o.game.messages,
            {
              type: MessageType.ALERT,
              message: `${o.gameSocket.game.players.find(p => p.id === socketId)?.username} is the drawer`,
            },
          ],
        },
      }));
    });
  }

  public pickWord(message: string) {
    this.socket.emit(`${this.game.gameType}-${DrawItSocketEvents.GAME_PICK_WORD}`, message);

    this.dispatch(o => ({
      ...o,
      game: {
        ...o.game,
        modal: false,
        words: undefined,
      },
    }));
  }

  public addMessage(type: MessageType.ALERT, message: string) {
    this.dispatch(o => ({
      ...o,
      game: {
        ...o.game,
        messages: [
          ...o.game.messages,
          {
            type,
            message: message,
          },
        ],
      },
    }));
  }

  public guessWord(message: string) {
    this.socket.emit(`${this.game.gameType}-${DrawItSocketEvents.GAME_SEND_MESSAGE}`, message);
  }

  public gameInteraction(data: { hand: DefaultStore['hand']; position: { from: MousePosition; to: MousePosition } }) {
    this.socket.emit(`${this.game.gameType}-${DrawItSocketEvents.GAME_INTERACTION}`, data);
  }
}
