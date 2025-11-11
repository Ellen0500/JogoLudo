import { getIncrementedPosition } from './movement';
import { useState } from 'react';
import {
  BASE_POSITIONS,
  START_POSITIONS,
  HOME_POSITIONS,
  STATE,
  SAFE_POSITIONS,
} from './constants';

export const useLudoGame = (activePlayers: string[]) => {
  const [positions, setPositions] = useState(() => {
    const initial: Record<string, number[]> = {};
    for (const player of activePlayers) {
      initial[player] = structuredClone(BASE_POSITIONS[player]);
    }
    return initial;
  });

  const [turn, setTurn] = useState(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [state, setState] = useState(STATE.DICE_NOT_ROLLED);

  const rollDice = () => {
    const value = 1 + Math.floor(Math.random() * 6);
    setDiceValue(value);
    setState(STATE.DICE_ROLLED);

    const currentPlayer = activePlayers[turn];
    const playerPositions = positions[currentPlayer];

    const allInBase = playerPositions.every(pos =>
      BASE_POSITIONS[currentPlayer].includes(pos)
    );

    // Nenhuma peça pode sair da base
    if (allInBase && value !== 6) {
      setTimeout(() => {
        setTurn((turn + 1) % activePlayers.length);
        setDiceValue(null);
        setState(STATE.DICE_NOT_ROLLED);
      }, 1000);
      return value;
    }

    // Verifica se alguma peça pode se mover
    const canMove = playerPositions.some(pos => {
      if (BASE_POSITIONS[currentPlayer].includes(pos)) {
        return value === 6;
      }
      const newPos = getIncrementedPosition(currentPlayer, pos, value);
      return newPos !== null;
    });

    if (!canMove) {
      setTimeout(() => {
        setTurn((turn + 1) % activePlayers.length);
        setDiceValue(null);
        setState(STATE.DICE_NOT_ROLLED);
      }, 1000);
    }

    return value;
  };

  const movePiece = (player: string, piece: number) => {
    const current = positions[player][piece];

    // Se está na base
    if (BASE_POSITIONS[player].includes(current)) {
      if (diceValue === 6) {
        updatePosition(player, piece, START_POSITIONS[player]);
        endTurn();
      }
      return;
    }

    // Calcula nova posição
    const newPos = getIncrementedPosition(player, current, diceValue!);
    if (newPos === null) return;

    const updated = structuredClone(positions);

    // Captura oponente (exceto em casas seguras)
    for (const opponent of activePlayers) {
      if (opponent === player) continue;

      updated[opponent] = updated[opponent].map((pos, i) =>
        pos === newPos && !SAFE_POSITIONS.includes(newPos)
          ? BASE_POSITIONS[opponent][i]
          : pos
      );
    }

    // Atualiza posição do jogador atual
    updated[player][piece] = newPos;
    setPositions(updated);

    // Verifica vitória
    const won = updated[player].every(pos => pos === HOME_POSITIONS[player]);
    if (won) {
      alert(`Jogador ${player} venceu!`);
      resetGame();
      return;
    }

    // Troca turno se necessário
    if (diceValue !== 6) {
      setTurn((turn + 1) % activePlayers.length);
    }

    endTurn();
  };

  const updatePosition = (player: string, piece: number, newPos: number) => {
    const updated = { ...positions };
    updated[player][piece] = newPos;
    setPositions(updated);
  };

  const resetGame = () => {
    const reset: Record<string, number[]> = {};
    for (const player of activePlayers) {
      reset[player] = structuredClone(BASE_POSITIONS[player]);
    }
    setPositions(reset);
    setTurn(0);
    endTurn();
  };

  const resetDice = () => {
    endTurn();
  };

  const endTurn = () => {
    setDiceValue(null);
    setState(STATE.DICE_NOT_ROLLED);
  };

  return {
    positions,
    turn,
    diceValue,
    state,
    rollDice,
    movePiece,
    resetGame,
    resetDice,
  };
};
