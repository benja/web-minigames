import { DrawIt } from "./DrawIt";
import { getClientById, SocketUser } from "../../client-manager";

function getClientOverride(clientId: string): Pick<SocketUser, "socket" | "username"> {
  const client = getClientById(clientId);
  if (!client.username) {
    throw new Error("Client has no username.")
  }
  return {
    socket: client.socket,
    username: client.username
  }
}

const game = new DrawIt({
  getClientById: getClientOverride
}, [])
