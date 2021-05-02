import { Server, Socket } from 'socket.io';
import { events } from './listeners/index';
import { addClient } from './client-manager';
import { uniqueNamesGenerator, adjectives, colors } from 'unique-names-generator';

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
      const username = uniqueNamesGenerator({
        dictionaries: [adjectives, colors],
        length: 2,
        style: 'capital',
        separator: '',
      });

      addClient(socket, username);

      events.forEach(event => {
        socket.on(event.eventName, async (data: any) => event._handle(socket, data));
      });
    });
  }
}
