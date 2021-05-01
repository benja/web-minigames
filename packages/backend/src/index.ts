import express from 'express';
import { Server, Socket } from 'socket.io';
import { generateLobbyId } from './utils/generateLobbyId';

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
    const lobbyId = generateLobbyId();
    lobbies.set(lobbyId, [socket.id]);
    console.log(`Created lobby for ${data.username} with id ${lobbyId}`);

    setTimeout(() => {
      console.log(`Lobby (${lobbyId}) members: ${[...lobbies.values()]}`);
    }, 1000);
  });
});
