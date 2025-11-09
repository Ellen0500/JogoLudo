import {
  BASE_POSITIONS,
  HOME_ENTRANCE,
  TURNING_POINTS,
} from './constants';

// Caminho principal do tabuleiro (ordem das casas que os peões percorrem)
export const MAIN_PATH = {
  P1: [91, 92, 93, 94, 95, 81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104, 119, 134, 132, 133, 131, 130, 129, 143, 158, 173, 188, 203, 218, 217, 216, 201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 106, 107, 108, 109, 110, 111],
  P2: [23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104, 119, 134, 132, 133, 131, 130, 129, 143, 158, 173, 188, 203, 218, 217, 216, 201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93, 94, 95, 81, 66, 51, 36, 21, 6, 7, 22, 37, 52, 67, 82, 97],
  P3: [201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93, 94, 95, 81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104, 119, 134, 132, 133, 131, 130, 129, 143, 158, 173, 188, 203, 218, 217, 202, 172, 157, 142],
  P4: [133, 132, 131, 130, 129, 143, 158, 173, 188, 203, 218, 217, 216, 201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93, 94, 95, 81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104, 119, 118, 117, 116, 115, 114],
};

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

  const path = MAIN_PATH[player];
  const mainIndex = path.indexOf(currentPosition);
  if (mainIndex === -1) return null;

  if (currentPosition === TURNING_POINTS[player]) {
    return steps - 1 < homePath.length ? homePath[steps - 1] : null;
  }

  const turnPointIndex = path.indexOf(TURNING_POINTS[player]);
  const stepsToTurn = turnPointIndex - mainIndex;

  if (stepsToTurn >= 0 && stepsToTurn < steps) {
    const remainingSteps = steps - stepsToTurn - 1;
    return remainingSteps < homePath.length ? homePath[remainingSteps] : null;
  }

  const nextIndex = mainIndex + steps;
  return nextIndex < path.length ? path[nextIndex] : null;
};
