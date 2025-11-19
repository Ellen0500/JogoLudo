import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './Board.css';
import Pawn from './Pawn';
import PlayerProfile from './PlayerProfile';
import { useLudoGame } from '../game/useLudoGame';
import { SAFE_POSITIONS } from '../game/constants';
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
const PLAYER_COLORS = {
    P1: 'Vermelho',
    P2: 'Verde',
    P3: 'Azul',
    P4: 'Amarelo',
};
const Board = ({ activePlayers, onRestart }) => {
    const { positions, turn, diceValue, state, rollDice, movePiece, } = useLudoGame(activePlayers);
    const cells = Array.from({ length: 225 }, (_, i) => i);
    const handlePieceClick = (playerId, pieceId) => {
        if (activePlayers[turn] !== playerId || state !== 'DICE_ROLLED')
            return;
        movePiece(playerId, pieceId);
    };
    const playerColor = (player) => {
        const map = {
            P1: 'red',
            P2: 'green',
            P3: 'blue',
            P4: 'yellow',
        };
        return map[player] ?? 'red';
    };
    const getCellClass = (index) => {
        const triangleMap = {
            97: 'triangle green top',
            111: 'triangle red left',
            112: 'triangle center',
            113: 'triangle yellow right',
            127: 'triangle blue bottom',
        };
        if (triangleMap[index])
            return triangleMap[index];
        const whiteZones = [
            [16, 19], [31, 34], [46, 49], [61, 64],
            [25, 28], [40, 43], [55, 58], [70, 73],
            [151, 154], [166, 169], [181, 184], [196, 199],
            [160, 163], [175, 178], [190, 193], [205, 208],
        ];
        if (whiteZones.some(([start, end]) => index >= start && index <= end))
            return 'white';
        if ((index >= 0 && index < 6) || (index % 15 < 6 && index < 90))
            return 'red';
        if ((index >= 9 && index < 15) || (index % 15 > 8 && index < 90))
            return 'green';
        if (index >= 135 && index < 225 && index % 15 < 6)
            return 'blue';
        if ((index >= 220 && index < 225) || (index >= 135 && index < 225 && index % 15 > 8))
            return 'yellow';
        const colorZones = {
            106: 'red', 107: 'red', 108: 'red', 109: 'red', 110: 'red', 111: 'red',
            22: 'green', 37: 'green', 52: 'green', 67: 'green', 82: 'green', 97: 'green',
            142: 'blue', 157: 'blue', 172: 'blue', 187: 'blue', 202: 'blue', 127: 'blue',
            114: 'yellow', 115: 'yellow', 116: 'yellow', 117: 'yellow', 118: 'yellow', 113: 'yellow',
        };
        return colorZones[index] ?? '';
    };
    const renderIcons = (index) => {
        const icons = {
            112: _jsx("img", { src: trofeu, alt: "Trof\u00E9u", className: "icon trophy-icon" }),
            105: _jsx("img", { src: setaVermelha, alt: "Seta vermelha", className: "icon arrow-icon" }),
            7: _jsx("img", { src: setaVerde, alt: "Seta verde", className: "icon arrow-icon" }),
            119: _jsx("img", { src: setaAmarela, alt: "Seta amarela", className: "icon arrow-icon" }),
            217: _jsx("img", { src: setaAzul, alt: "Seta azul", className: "icon arrow-icon" }),
            96: _jsx("img", { src: meioVermelhoVerde, alt: "Meio vermelho verde", className: "icon triangle-icon" }),
            126: _jsx("img", { src: meioVermelhoAzul, alt: "Meio vermelho azul", className: "icon triangle-icon" }),
            98: _jsx("img", { src: meioVerdeAmarelo, alt: "Meio verde amarelo", className: "icon triangle-icon" }),
            128: _jsx("img", { src: meioAzulAmarelo, alt: "Meio azul amarelo", className: "icon triangle-icon" }),
        };
        return (_jsxs(_Fragment, { children: [icons[index], SAFE_POSITIONS.includes(index) && (_jsx("img", { src: estrela, alt: "Casa segura", className: "icon safe-icon" }))] }));
    };
    const renderPawns = (index) => {
        const pawns = activePlayers.flatMap(player => positions[player]
            .map((pos, pieceId) => pos === index
            ? {
                key: `${player}-${pieceId}`,
                player,
                pieceId,
                color: playerColor(player),
            }
            : null)
            .filter(Boolean));
        return pawns.map((pawnData, i) => (_jsx(Pawn, { color: pawnData.color, playerId: pawnData.player, pieceId: pawnData.pieceId, onClick: handlePieceClick, className: `pawn ${pawnData.color} ${pawns.length > 1 ? `small pawn-${i}` : ''}` }, pawnData.key)));
    };
    return (_jsxs("div", { className: "board-layout", children: [_jsx("div", { className: "player-top-left", children: _jsx(PlayerProfile, { color: "red", name: "Vermelho", isActive: activePlayers[turn] === 'P1' }) }), _jsx("div", { className: "player-top-right", children: _jsx(PlayerProfile, { color: "green", name: "Verde", isActive: activePlayers[turn] === 'P2' }) }), _jsx("div", { className: "player-bottom-left", children: _jsx(PlayerProfile, { color: "blue", name: "Azul", isActive: activePlayers[turn] === 'P3' }) }), _jsx("div", { className: "player-bottom-right", children: _jsx(PlayerProfile, { color: "yellow", name: "Amarelo", isActive: activePlayers[turn] === 'P4' }) }), _jsxs("div", { className: "board-content", children: [_jsxs("div", { className: `controls turn-${playerColor(activePlayers[turn])}`, children: [_jsx("div", { className: "left-controls", children: _jsx("button", { onClick: onRestart, className: "reset-button", children: "\uD83E\uDDF9 Reiniciar Jogo" }) }), _jsxs("div", { className: "center-info", children: [_jsx("button", { className: "dice-button", onClick: rollDice, disabled: state !== 'DICE_NOT_ROLLED', children: "\uD83C\uDFB2 Jogar Dado" }), _jsxs("p", { className: "dice-value", children: ["Valor do dado: ", _jsx("strong", { children: diceValue ?? '-' })] }), _jsxs("p", { className: "turno-info", children: ["Turno: ", PLAYER_COLORS[activePlayers[turn]], _jsx("span", { className: "turn-indicator", children: "\u2B24" })] })] })] }), _jsx("div", { className: "board", children: cells.map((_, index) => (_jsxs("div", { className: `cell ${getCellClass(index)} ${SAFE_POSITIONS.includes(index) ? 'safe-cell' : ''}`, children: [renderIcons(index), renderPawns(index)] }, index))) })] })] }));
};
export default Board;
