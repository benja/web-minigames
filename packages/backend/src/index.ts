import express from 'express';
import { Server, Socket } from 'socket.io';
import { addClient, deleteClient, getClient, getClientById, setCurrentLobby } from './client-manager';
import { createLobby, leaveLobby } from './lobby-manager';
import { events } from './utils/listeners/index';

const app = express();

const server = app.listen(8080, () => {
  console.log('Server is now running on http://localhost:8080');
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket: Socket) => {
  events.forEach(e => {
    socket.emit(e.eventName, async (data: any) => e._handle(socket, data));
  });
});
