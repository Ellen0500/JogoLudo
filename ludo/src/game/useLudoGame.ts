import { getIncrementedPosition, MAIN_PATH } from './movement';
import { useState } from 'react';
import {
  BASE_POSITIONS,
  START_POSITIONS,
  HOME_POSITIONS,
  STATE,
  PLAYERS,
  TURNING_POINTS,
  HOME_ENTRANCE,
} from './constants';

export const useLudoGame = () => {
  const [positions, setPositions] = useState(structuredClone(BASE_POSITIONS));
  const [turn, setTurn] = useState(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [state, setState] = useState(STATE.DICE_NOT_ROLLED);

  const rollDice = () => {
    const value = 1 + Math.floor(Math.random() * 6);
    setDiceValue(value);
    setState(STATE.DICE_ROLLED);
    return value;
  };

  const movePiece = (player: string, piece: number) => {
    const current = positions[player][piece];

    // Se está na base
    if (BASE_POSITIONS[player].includes(current)) {
      if (diceValue === 6) {
        updatePosition(player, piece, START_POSITIONS[player]);
        setState(STATE.DICE_NOT_ROLLED);
        setDiceValue(null);
      }
      return;
    }

    // Calcula nova posição
    const newPos = getIncrementedPosition(player, current, diceValue!);
    if (newPos === null) return; // movimento inválido

    updatePosition(player, piece, newPos);

    // Verifica vitória
    const won = positions[player].every(pos => pos === HOME_POSITIONS[player]);
    if (won) {
      alert(`Jogador ${player} venceu!`);
      resetGame();
      return;
    }

    // Troca turno se necessário
    if (diceValue !== 6) {
      setTurn(turn === PLAYERS.length - 1 ? 0 : turn + 1);
    }

    setState(STATE.DICE_NOT_ROLLED);
    setDiceValue(null);
  };

  const updatePosition = (player: string, piece: number, newPos: number) => {
    const updated = { ...positions };
    updated[player][piece] = newPos;
    setPositions(updated);
  };

  const resetGame = () => {
    setPositions(structuredClone(BASE_POSITIONS));
    setTurn(0);
    setDiceValue(null);
    setState(STATE.DICE_NOT_ROLLED);
  };

  const resetDice = () => {
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