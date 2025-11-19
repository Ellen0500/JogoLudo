import { getIncrementedPosition } from './movement';
import { useState } from 'react';
import { BASE_POSITIONS, START_POSITIONS, HOME_POSITIONS, SAFE_POSITIONS, } from './constants';
import { STATE } from './types';
export const useLudoGame = (activePlayers) => {
    // POSITIONS TIPADO CORRETAMENTE
    const [positions, setPositions] = useState(() => {
        const initial = {};
        for (const player of activePlayers) {
            initial[player] = structuredClone(BASE_POSITIONS[player]);
        }
        return initial;
    });
    const [turn, setTurn] = useState(0);
    const [diceValue, setDiceValue] = useState(null);
    const [state, setState] = useState(STATE.DICE_NOT_ROLLED);
    const rollDice = () => {
        const value = 1 + Math.floor(Math.random() * 6);
        setDiceValue(value);
        setState(STATE.DICE_ROLLED);
        const currentPlayer = activePlayers[turn];
        const playerPositions = positions[currentPlayer];
        const allInBase = playerPositions.every(pos => BASE_POSITIONS[currentPlayer].includes(pos));
        if (allInBase && value !== 6) {
            setTimeout(() => {
                setTurn((turn + 1) % activePlayers.length);
                setDiceValue(null);
                setState(STATE.DICE_NOT_ROLLED);
            }, 1000);
            return value;
        }
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
    const movePiece = (player, piece) => {
        const current = positions[player][piece];
        if (BASE_POSITIONS[player].includes(current)) {
            if (diceValue === 6) {
                updatePosition(player, piece, START_POSITIONS[player]);
                endTurn();
            }
            return;
        }
        const newPos = getIncrementedPosition(player, current, diceValue);
        if (newPos === null)
            return;
        const updated = structuredClone(positions);
        for (const opponent of activePlayers) {
            if (opponent === player)
                continue;
            updated[opponent] = updated[opponent].map((pos, i) => pos === newPos && !SAFE_POSITIONS.includes(newPos)
                ? BASE_POSITIONS[opponent][i]
                : pos);
        }
        updated[player][piece] = newPos;
        setPositions(updated);
        const won = updated[player].every(pos => pos === HOME_POSITIONS[player]);
        if (won) {
            alert(`Jogador ${player} venceu!`);
            resetGame();
            return;
        }
        if (diceValue !== 6) {
            setTurn((turn + 1) % activePlayers.length);
        }
        endTurn();
    };
    const updatePosition = (player, piece, newPos) => {
        const updated = structuredClone(positions);
        updated[player][piece] = newPos;
        setPositions(updated);
    };
    const resetGame = () => {
        const reset = {};
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
