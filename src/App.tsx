// src/App.tsx
import React, { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import Board from './components/Board';
import './App.css';
import type { Player } from './game/types';

// Função que converte nomes legíveis para os códigos Player
const nameToPlayer = (name: string): Player => {
  switch (name.toLowerCase()) {
    case 'vermelho':
    case 'p1':
      return 'P1';
    case 'verde':
    case 'p2':
      return 'P2';
    case 'azul':
    case 'p3':
      return 'P3';
    case 'amarelo':
    case 'p4':
      return 'P4';
    default:
      // fallback seguro
      return 'P1';
  }
};

const App: React.FC = () => {
  // agora o estado espera Player[] ou null
  const [activePlayers, setActivePlayers] = useState<Player[] | null>(null);

  // wrapper: StartScreen provavelmente chama onStart(names: string[])
  const handleStart = (names: string[]) => {
    const players = names.map(nameToPlayer);
    setActivePlayers(players);
  };

  const handleRestart = () => {
    setActivePlayers(null);
  };

  return (
    <div className="app-container">
      {activePlayers === null ? (
        // passa a função wrapper que converte string[] -> Player[]
        <StartScreen onStart={handleStart} />
      ) : (
        <Board activePlayers={activePlayers} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;
