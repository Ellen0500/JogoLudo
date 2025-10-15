import {
  BASE_POSITIONS,
  HOME_ENTRANCE,
  TURNING_POINTS,
} from './constants';

// Caminho principal do tabuleiro (ordem das casas que os peões percorrem)
export const MAIN_PATH = [
  91, 92, 93, 94, 95, 81, 66, 51, 36, 21, 6,
  7, 8, 23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104,
  119, 134, 13, 132, 131, 130, 129, 143, 158, 173, 188, 203, 218,
  217, 216, 201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120,
  105, 90
];

// Função de movimentação
export const getIncrementedPosition = (
  player: string,
  currentPosition: number,
  steps: number
): number | null => {
  if (BASE_POSITIONS[player].includes(currentPosition)) return null;

  const homePath = HOME_ENTRANCE[player];
  const homeIndex = homePath.indexOf(currentPosition);
  if (homeIndex !== -1) {
    const nextIndex = homeIndex + steps;
    return nextIndex < homePath.length ? homePath[nextIndex] : null;
  }

  const mainIndex = MAIN_PATH.indexOf(currentPosition);
  if (mainIndex === -1) return null;

  const turnPointIndex = MAIN_PATH.indexOf(TURNING_POINTS[player]);
  const stepsToTurn = turnPointIndex - mainIndex;

  if (stepsToTurn >= 0 && stepsToTurn < steps) {
    const remainingSteps = steps - stepsToTurn - 1;
    return remainingSteps < homePath.length ? homePath[remainingSteps] : null;
  }

  const nextIndex = mainIndex + steps;
  return nextIndex < MAIN_PATH.length ? MAIN_PATH[nextIndex] : null;
};