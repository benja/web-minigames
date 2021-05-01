import express from 'express';
import { Server, Socket } from 'socket.io';
import { Lobby } from './utils/lobby';

const app = express();

const server = app.listen(8080, () => {
  console.log('Server is now running on http://localhost:8080');
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const clients: Map<string, string> = new Map();
const lobbies: Map<string, string[]> = new Map();

io.on('connection', socket => {
  socket.on('login', (data: { username: string }) => {
    clients.set(socket.id, data.username);

    // Create lobby
    const lobby = new Lobby();
    lobby.addPlayer(socket.id);

    lobbies.set(lobby.getId(), [socket.id]);
    console.log(`Created lobby for ${data.username} (${socket.id}) with id ${lobby.getId()}`);

    setTimeout(() => {
      console.log(`Lobby (${lobby.getId()}) members: ${lobby.getPlayers()}`);
    }, 1000);
  });
});
