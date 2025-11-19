import { jsx as _jsx } from "react/jsx-runtime";
// src/App.tsx
import { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import Board from './components/Board';
import './App.css';
// Função que converte nomes legíveis para os códigos Player
const nameToPlayer = (name) => {
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
const App = () => {
    // agora o estado espera Player[] ou null
    const [activePlayers, setActivePlayers] = useState(null);
    // wrapper: StartScreen provavelmente chama onStart(names: string[])
    const handleStart = (names) => {
        const players = names.map(nameToPlayer);
        setActivePlayers(players);
    };
    const handleRestart = () => {
        setActivePlayers(null);
    };
    return (_jsx("div", { className: "app-container", children: activePlayers === null ? (
        // passa a função wrapper que converte string[] -> Player[]
        _jsx(StartScreen, { onStart: handleStart })) : (_jsx(Board, { activePlayers: activePlayers, onRestart: handleRestart })) }));
};
export default App;
