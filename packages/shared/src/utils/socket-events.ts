export enum SocketEvents {
  DISCONNECTING = "disconnecting",
  SET_USERNAME = 'set_username',
  LOBBY_CREATE = 'lobby_create',
  LOBBY_JOIN = 'lobby_join',
  LOBBY_LEAVE = 'lobby_leave',
  LOBBY_SEND_MESSAGE = 'lobby_send_message',
  LOBBY_ON_TYPE = 'lobby_on_type',
  QUEUE_JOIN = 'queue_join',
  QUEUE_LEAVE = 'queue_leave',
  GAME_START = 'game_start',
  GAME_END = 'game_end',
  ERROR = 'error',
}
