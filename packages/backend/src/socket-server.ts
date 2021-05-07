import { Server, Socket } from 'socket.io';
import events from './listeners';
import { addClient } from './client-manager';
import modules from './modules';
import { GameListener } from './modules/game-listener';

export class SocketServer {
  private readonly io: Server;

  constructor(server: any) {
    this.io = new Server(server, {
      cors: {
        origin: 'http://localhost:3000',
      },
    });

    this.listen();
  }

  private listen(): void {
    console.log(`Listening for socket connections...`);

    this.io.on('connection', (socket: Socket) => {
      addClient(socket);

      events.forEach(event => {
        socket.on(event.eventName, (data: any) => event._handle(socket, data));
      });

      modules.forEach(event => {
        socket.on(`${event.gameType}-${event.listener.eventName}`, (data: any) => event.listener._handle(socket, data));
      });
    });
  }
}
