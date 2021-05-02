import express from 'express';
import { Server, Socket } from 'socket.io';
import { addClient, deleteClient, getClient, getClientById, setCurrentLobby } from "./client-manager";
import { createLobby, leaveLobby } from "./lobby-manager";

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
  try {
    socket.on('login', ({ username }: { username: string }) => {
      addClient(socket, username);

      const lobby = createLobby(socket);

      setCurrentLobby(socket, lobby.getId())

      console.log(`Created lobby for ${username} (${socket.id}) with id ${lobby.getId()}`);

      setTimeout(() => {
        console.log(`Lobby (${lobby.getId()}) members: ${lobby.getPlayers()}`);
      }, 1000);

      socket.emit("setLobby", {
        lobbyId: lobby.getId(),
        players: lobby.getPlayers().map(p => ({
          ...getClientById(p),
          socket: undefined
        }))
      })
    });

    socket.on("disconnect", () => {
      const client = getClient(socket);

      if (client.currentLobby) {
        leaveLobby(socket, client.currentLobby);

        console.log(`Deleted lobby ${client.currentLobby} for user ${socket.id}`)
      }

      deleteClient(socket);
      console.log(`Disconnected user ${socket.id}`)
    })

    socket.on('error', err => {
      console.log(err);
    })
  } catch (e) {}
});
