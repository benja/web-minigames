import { GameCore, GameUser } from "./game-core";
import { DrawIt } from "./draw-it/DrawIt";
import { getClientById as fetchClient } from "../client-manager";
import { GameTypes } from "@wmg/shared";

function getClientById(clientId: string): GameUser {
  const client = fetchClient(clientId);
  if (!client.username) {
    throw new Error("Client has no username.")
  }
  return {
    socket: client.socket,
    username: client.username
  }
}

const modules: GameCore<GameTypes>[] = [
  new DrawIt({ getClientById }, [])
]

export default modules;
