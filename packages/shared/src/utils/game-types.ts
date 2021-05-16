export enum GameTypes {
  DRAWING = 'drawing',
}

export const GameLobbySizes: Record<GameTypes, number> = {
  [GameTypes.DRAWING]: 5,
};
