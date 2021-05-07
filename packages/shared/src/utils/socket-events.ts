export enum SocketEvents {
  DISCONNECTING = 'disconnecting',
  UPDATE_USERNAME = 'update_username',
  LOBBY_CREATE = 'lobby_create',
  LOBBY_JOIN = 'lobby_join',
  LOBBY_LEAVE = 'lobby_leave',
  LOBBY_KICK = 'lobby_kick',
  LOBBY_SEND_MESSAGE = 'lobby_send_message',
  LOBBY_SET_PRIVATE = 'lobby_set_private',
  LOBBY_ON_TYPE = 'lobby_on_type',
  QUEUE_JOIN = 'queue_join',
  QUEUE_LEAVE = 'queue_leave',
  GAME_START = 'game_start',
  GAME_END = 'game_end',
  ERROR = 'error',
}

export enum DrawItSocketEvents {
  GAME_SEND_MESSAGE = "game_send_message",
  GAME_START = "game_start",
  GAME_END = "game_end",
  GAME_PLAYER_LEAVE = "GAME_PLAYER_LEAVE"
}
