import React, { useState } from 'react';
import { StartScreen } from '../src/components/StartScreen';
import Board from '../src/components/Board';
import './App.css'; // opcional para estilos globais

const App: React.FC = () => {
  const [activePlayers, setActivePlayers] = useState<string[] | null>(null);

  // Reinicia o jogo e volta para a tela de início
  const handleRestart = () => {
    setActivePlayers(null);
  };

  return (
    <div className="app-container">
      {activePlayers === null ? (
        <StartScreen onStart={setActivePlayers} />
      ) : (
        <Board activePlayers={activePlayers} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;