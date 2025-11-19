export type PawnColor = 'red' | 'green' | 'yellow' | 'blue';

export const STATE = {
  DICE_NOT_ROLLED: 'DICE_NOT_ROLLED',
  DICE_ROLLED: 'DICE_ROLLED',
} as const;

export type GameState = (typeof STATE)[keyof typeof STATE];
export type Player = 'P1' | 'P2' | 'P3' | 'P4';