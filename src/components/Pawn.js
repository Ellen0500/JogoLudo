import { jsx as _jsx } from "react/jsx-runtime";
import './Pawn.css';
const Pawn = ({ color, playerId, pieceId, onClick, className }) => {
    return (_jsx("div", { className: className ?? `pawn ${color}`, onClick: () => onClick?.(playerId, pieceId) }));
};
export default Pawn;
