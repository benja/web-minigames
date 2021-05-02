export interface User {
  image: string;
  username: string;
}

export interface Game {
  name: string;
  description: string;
  image: string;
}

export interface Lobby {
  lobbyId: string;
  players: User[];
}
