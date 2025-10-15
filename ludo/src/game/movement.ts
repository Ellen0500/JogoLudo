import {
  BASE_POSITIONS,
  HOME_ENTRANCE,
  TURNING_POINTS,
} from './constants';

export const getIncrementedPosition = (
  player: string,
  currentPosition: number,
  steps: number
): number | null => {
  if (BASE_POSITIONS[player].includes(currentPosition)) return null;

  if (HOME_ENTRANCE[player].includes(currentPosition)) {
    const index = HOME_ENTRANCE[player].indexOf(currentPosition);
    const nextIndex = index + steps;
    if (nextIndex >= HOME_ENTRANCE[player].length) return null;
    return HOME_ENTRANCE[player][nextIndex];
  }

  let pos = currentPosition;
  for (let i = 0; i < steps; i++) {
    if (pos === TURNING_POINTS[player]) {
      pos = HOME_ENTRANCE[player][0];
    } else {
      pos = (pos + 1) % 225;
    }
  }

  return pos;
};