import React from 'react';
import './Board.css';
import Pawn from './Pawn';
import { useLudoGame } from '../game/useLudoGame';
import { PLAYERS } from '../game/constants';
import type { PawnColor } from '../game/types';

const Board: React.FC = () => {
  const {
    positions,
    turn,
    diceValue,
    state,
    rollDice,
    movePiece,
    resetGame,
    resetDice, // ✅ usamos apenas esta função
  } = useLudoGame();

  const cells = Array.from({ length: 225 }, (_, i) => i); // 15x15

  const handlePieceClick = (playerId: string, pieceId: number) => {
    if (PLAYERS[turn] !== playerId || state !== 'DICE_ROLLED') return;
    movePiece(playerId, pieceId);
  };

  const getCellClass = (index: number): string => {
    if (index === 97) return 'triangle green top';
    if (index === 111) return 'triangle red left';
    if (index === 112) return 'triangle center';
    if (index === 113) return 'triangle yellow right';
    if (index === 127) return 'triangle blue bottom';

    if (
      (index >= 16 && index <= 19) || (index >= 31 && index <= 34) ||
      (index >= 46 && index <= 49) || (index >= 61 && index <= 64) ||
      (index >= 25 && index <= 28) || (index >= 40 && index <= 43) ||
      (index >= 55 && index <= 58) || (index >= 70 && index <= 73) ||
      (index >= 151 && index <= 154) || (index >= 166 && index <= 169) ||
      (index >= 181 && index <= 184) || (index >= 196 && index <= 199) ||
      (index >= 160 && index <= 163) || (index >= 175 && index <= 178) ||
      (index >= 190 && index <= 193) || (index >= 205 && index <= 208)
    ) return 'white';

    if ((index >= 0 && index < 6) || (index % 15 < 6 && index < 90)) return 'red';
    if ((index >= 9 && index < 15) || (index % 15 > 8 && index < 90)) return 'green';
    if (index >= 135 && index < 225 && index % 15 < 6) return 'blue';
    if ((index >= 220 && index < 225) || (index >= 135 && index < 225 && index % 15 > 8)) return 'yellow';

    if ([106, 107, 108, 109, 110].includes(index)) return 'red';
    if ([22, 37, 52, 67, 82].includes(index)) return 'green';
    if ([142, 157, 172, 187, 202].includes(index)) return 'blue';
    if ([114, 115, 116, 117, 118].includes(index)) return 'yellow';

    return '';
  };

  const playerColor = (player: string): PawnColor => {
    switch (player) {
      case 'P1': return 'red';
      case 'P2': return 'green';
      case 'P3': return 'blue';
      case 'P4': return 'yellow';
      default: return 'red'; // fallback seguro
    }
  };

  return (
    <>
      <div className="controls">
  <div className="left-controls">
    <button onClick={resetGame} className="reset-button">
      🧹 Reiniciar Jogo
    </button>
  </div>

  <div className="center-info">
    <button onClick={rollDice} disabled={state !== 'DICE_NOT_ROLLED'}>
      🎲 Jogar Dado
    </button>
    <p>Valor do dado: {diceValue ?? '-'}</p>
    <p>Turno: {['Vermelho', 'Verde', 'Azul', 'Amarelo'][turn]}</p>
  </div>

  <div className="right-controls">
    <button onClick={resetDice} className="reset-button">
      🔄 Limpar Dado
    </button>
  </div>
</div>


      <div className="board">
        {cells.map((_, index) => (
          <div key={index} className={`cell ${getCellClass(index)}`}>
            {index === 112 && (
              <img src="ludo/trofeu.png" alt="Troféu" className="trophy-icon" />
            )}
            {PLAYERS.map(player =>
              positions[player].map((pos, pieceId) =>
                pos === index ? (
                  <Pawn
                    key={`${player}-${pieceId}`}
                    color={playerColor(player)}
                    playerId={player}
                    pieceId={pieceId}
                    onClick={handlePieceClick}
                  />
                ) : null
              )
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;