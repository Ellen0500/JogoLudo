import React from 'react';
import './Board.css';
import Pawn from './Pawn';
import { useLudoGame } from '../game/useLudoGame';
import { SAFE_POSITIONS } from '../game/constants';
import type { PawnColor } from '../game/types';

import estrela from '../assets/estrela.png';
import trofeu from '../assets/trofeu.png';
import setaVermelha from '../assets/setaVermelha.png';
import setaAzul from '../assets/setaAzul.png';
import setaAmarela from '../assets/setaAmarela.png';
import setaVerde from '../assets/setaVerde.png';
import meioVermelhoVerde from '../assets/meioVermelhoVerde.png';
import meioVermelhoAzul from '../assets/meioVermelhoAzul.png';
import meioVerdeAmarelo from '../assets/meioVerdeAmarelo.png';
import meioAzulAmarelo from '../assets/meioAzulAmarelo.png';

import PlayerProfile from './PlayerProfile';

const PLAYER_COLORS: Record<string, string> = {
  P1: 'Vermelho',
  P2: 'Verde',
  P3: 'Azul',
  P4: 'Amarelo',
};

interface BoardProps {
  activePlayers: string[];
  onRestart: () => void;
}

const Board: React.FC<BoardProps> = ({ activePlayers, onRestart }) => {
  const {
    positions,
    turn,
    diceValue,
    state,
    rollDice,
    movePiece,
    resetGame,
    resetDice,
  } = useLudoGame(activePlayers);

  const cells = Array.from({ length: 225 }, (_, i) => i); // 15x15

  const handlePieceClick = (playerId: string, pieceId: number) => {
    if (activePlayers[turn] !== playerId || state !== 'DICE_ROLLED') return;
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

    if ([106, 107, 108, 109, 110, 111].includes(index)) return 'red';
    if ([22, 37, 52, 67, 82, 97].includes(index)) return 'green';
    if ([142, 157, 172, 187, 202, 127].includes(index)) return 'blue';
    if ([114, 115, 116, 117, 118, 113].includes(index)) return 'yellow';

    return '';
  };

  const playerColor = (player: string): PawnColor => {
    switch (player) {
      case 'P1': return 'red';
      case 'P2': return 'green';
      case 'P3': return 'blue';
      case 'P4': return 'yellow';
      default: return 'red';
    }
  };

  return (
    <div className="board-layout">
      {/* Perfis nos cantos */}
      <div className="player-top-left">
        <PlayerProfile color="red" name="Vermelho" isActive={activePlayers[turn] === 'P1'} />
      </div>
      <div className="player-top-right">
        <PlayerProfile color="green" name="Verde" isActive={activePlayers[turn] === 'P2'} />
      </div>
      <div className="player-bottom-right">
        <PlayerProfile color="yellow" name="Amarelo" isActive={activePlayers[turn] === 'P4'} />
      </div>
      <div className="player-bottom-left">
        <PlayerProfile color="blue" name="Azul" isActive={activePlayers[turn] === 'P3'} />
      </div>

      <div className="board-content">
        <div className="controls">
          <div className="left-controls">
            <button onClick={onRestart} className="reset-button">🧹 Reiniciar Jogo</button>
          </div>
          <div className="center-info">
            <button onClick={rollDice} disabled={state !== 'DICE_NOT_ROLLED'}>🎲 Jogar Dado</button>
            <p>Valor do dado: {diceValue ?? '-'}</p>
            <p>Turno: {PLAYER_COLORS[activePlayers[turn]]}</p>
          </div>
          <div className="right-controls">
            <button onClick={resetDice} className="reset-button">🔄 Limpar Dado</button>
          </div>
        </div>

        <div className="board">
          {cells.map((_, index) => (
            <div key={index} className={`cell ${getCellClass(index)}`}>
              {/* Ícones */}
              {index === 112 && <img src={trofeu} alt="Troféu" className="trophy-icon" />}
              {index === 105 && <img src={setaVermelha} alt="Seta vermelha" className="arrow-icon" />}
              {index === 7 && <img src={setaVerde} alt="Seta verde" className="arrow-icon" />}
              {index === 119 && <img src={setaAmarela} alt="Seta amarela" className="arrow-icon" />}
              {index === 217 && <img src={setaAzul} alt="Seta azul" className="arrow-icon" />}
              {index === 96 && <img src={meioVermelhoVerde} alt="meio vermelho verde" className="triangulo" />}
              {index === 126 && <img src={meioVermelhoAzul} alt="meio vermelho azul" className="triangulo" />}
              {index === 98 && <img src={meioVerdeAmarelo} alt="meio verde amarelo" className="triangulo" />}
              {index === 128 && <img src={meioAzulAmarelo} alt="meio azul amarelo" className="triangulo" />}
              {SAFE_POSITIONS.includes(index) && <img src={estrela} alt="Casa segura" className="safe-icon" />}

              {/* Peças */}
              {activePlayers.flatMap(player =>
                positions[player]
                  .map((pos, pieceId) =>
                    pos === index
                      ? {
                          key: `${player}-${pieceId}`,
                          player,
                          pieceId,
                          color: playerColor(player),
                        }
                      : null
                  )
                  .filter(Boolean)
              ).map((pawnData, i, allPawns) => (
                <Pawn
                  key={pawnData!.key}
                  color={pawnData!.color}
                  playerId={pawnData!.player}
                  pieceId={pawnData!.pieceId}
                  onClick={handlePieceClick}
                  className={`pawn ${pawnData!.color} ${allPawns.length > 1 ? `small pawn-${i}` : ''}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;