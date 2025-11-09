import { getIncrementedPosition } from './movement';
import { useState } from 'react';
import {
  BASE_POSITIONS,
  START_POSITIONS,
  HOME_POSITIONS,
  STATE,
  TURNING_POINTS,
  HOME_ENTRANCE,
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

  const allInBase = playerPositions.every(pos => BASE_POSITIONS[currentPlayer].includes(pos));

  if (allInBase && value !== 6) {
    // Nenhuma peça pode sair da base, passa o turno
    setTimeout(() => {
      setTurn(turn === activePlayers.length - 1 ? 0 : turn + 1);
      setDiceValue(null);
      setState(STATE.DICE_NOT_ROLLED);
    }, 1000); // pequeno delay para feedback visual
  }

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
    if (newPos === null) return;

    // Clona posições para aplicar múltiplas atualizações
    const updated = structuredClone(positions);

    // Verifica se há oponente na nova posição
    for (const opponent of activePlayers) {
      if (opponent === player) continue;

      updated[opponent].forEach((pos, i) => {
        if (pos === newPos && !SAFE_POSITIONS.includes(newPos)) {
          updated[opponent][i] = BASE_POSITIONS[opponent][i]; // captura
        }
      });
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
      setTurn(turn === activePlayers.length - 1 ? 0 : turn + 1);
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
    const reset: Record<string, number[]> = {};
    for (const player of activePlayers) {
      reset[player] = structuredClone(BASE_POSITIONS[player]);
    }
    setPositions(reset);
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