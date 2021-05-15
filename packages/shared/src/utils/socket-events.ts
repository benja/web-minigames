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

/*
DRAW IT TYPES
 */
export enum DrawItSocketEvents {
  // Can emit
  GAME_SEND_MESSAGE = 'game_send_message',
  GAME_PLAYER_LEAVE = 'game_player_leave',
  GAME_INTERACTION = 'game_interaction',
  GAME_PICK_WORD = 'game_pick_word',

  // Only receivables
  GAME_CORRECT_GUESS = 'game_correct_guess',
  GAME_LETTER_REVEAL = 'game_letter_reveal',
  GAME_DRAWER_SELECTED = 'game_drawer_selected',
  GAME_COUNTDOWN = 'game_countdown',
  GAME_ROUND_START = 'game_round_start',
  GAME_ROUND_END = 'game_round_end',
  GAME_TURN_START = 'game_turn_start',
  GAME_TURN_END = 'game_turn_end',
}

// Emitted on GAME_ROUND_END
export interface IRoundFinish {
  correctWord: string;
  roundScores: Record<string, number>;
  totalScores: Record<string, number>;
}
