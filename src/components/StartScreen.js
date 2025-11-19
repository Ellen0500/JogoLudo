import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './StartScreen.css';
import tabuleiroLudo from '../assets/tabuleiroLudo.png';
const colorToPlayerId = {
    Vermelho: 'P1',
    Verde: 'P2',
    Azul: 'P3',
    Amarelo: 'P4',
};
const colors = ['Vermelho', 'Verde', 'Amarelo', 'Azul'];
export const StartScreen = ({ onStart }) => {
    const [players, setPlayers] = useState(2);
    const [selectedColors, setSelectedColors] = useState([]);
    const toggleColor = (color) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter(c => c !== color));
        }
        else if (selectedColors.length < players) {
            setSelectedColors([...selectedColors, color]);
        }
    };
    const startGame = () => {
        const playerIds = selectedColors.map(color => colorToPlayerId[color]);
        onStart(playerIds); // envia os IDs corretos para o App
    };
    return (_jsxs("div", { className: "start-wrapper", children: [_jsx("div", { className: "board-preview", children: _jsx("img", { src: tabuleiroLudo, alt: "Tabuleiro Ludo", className: "board-image" }) }), _jsxs("div", { className: "start-screen", children: [_jsx("h1", { children: "\uD83C\uDFB2 JOGO LUDO ONLINE" }), _jsxs("div", { className: "section", children: [_jsx("h2", { children: "Quantidade de jogadores" }), _jsx("div", { className: "player-buttons", children: [2, 3, 4].map(num => (_jsx("button", { className: players === num ? 'active' : '', onClick: () => {
                                        setPlayers(num);
                                        setSelectedColors([]);
                                    }, children: num }, num))) })] }), _jsxs("div", { className: "section", children: [_jsx("h2", { children: "Selecione as cores" }), _jsx("div", { className: "color-boxes", children: colors.map(color => (_jsx("div", { className: `color-box ${selectedColors.includes(color) ? 'selected' : ''}`, onClick: () => toggleColor(color), children: color }, color))) })] }), _jsx("button", { className: "start-button", onClick: startGame, disabled: selectedColors.length !== players, children: "Iniciar Jogo" })] })] }));
};
