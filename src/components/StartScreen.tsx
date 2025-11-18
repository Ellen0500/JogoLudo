import React, { useState } from 'react';
import './StartScreen.css';
import tabuleiroLudo from '../assets/tabuleiroLudo.png';

type StartScreenProps = {
  onStart: (players: string[]) => void;
};

const colorToPlayerId: Record<string, string> = {
  Vermelho: 'P1',
  Verde: 'P2',
  Azul: 'P3',
  Amarelo: 'P4',
};

const colors = ['Vermelho', 'Verde', 'Amarelo', 'Azul'];

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [players, setPlayers] = useState<number>(2);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else if (selectedColors.length < players) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const startGame = () => {
    const playerIds = selectedColors.map(color => colorToPlayerId[color]);
    onStart(playerIds); // envia os IDs corretos para o App
  };

  return (
    <div className="start-wrapper">

      <div className="board-preview">
          <img src={tabuleiroLudo} alt="Tabuleiro Ludo" className="board-image" />
        </div>

      <div className="start-screen">
        <h1>🎲 JOGO LUDO ONLINE</h1>

        <div className="section">
          <h2>Quantidade de jogadores</h2>
          <div className="player-buttons">
            {[2, 3, 4].map(num => (
              <button
                key={num}
                className={players === num ? 'active' : ''}
                onClick={() => {
                  setPlayers(num);
                  setSelectedColors([]);
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Selecione as cores</h2>
          <div className="color-boxes">
            {colors.map(color => (
              <div
                key={color}
                className={`color-box ${selectedColors.includes(color) ? 'selected' : ''}`}
                onClick={() => toggleColor(color)}
              >
                {color}
              </div>
            ))}
          </div>
        </div>

        <button
          className="start-button"
          onClick={startGame}
          disabled={selectedColors.length !== players}
        >
          Iniciar Jogo
        </button>

        
      </div>
    </div>
  );
};