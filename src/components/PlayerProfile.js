import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './PlayerProfile.css';
import avatarVermelho from '../assets/avatarVermelho.png';
import avatarVerde from '../assets/avatarVerde.png';
import avatarAmarelo from '../assets/avatarAmarelo.png';
import avatarAzul from '../assets/avatarAzul.png';
const avatarMap = {
    red: avatarVermelho,
    green: avatarVerde,
    yellow: avatarAmarelo,
    blue: avatarAzul,
};
const PlayerProfile = ({ color, name, isActive }) => {
    const avatar = avatarMap[color];
    return (_jsxs("div", { className: `player-profile ${color} ${isActive ? 'active' : ''}`, children: [_jsxs("div", { className: "avatar-wrapper", children: [_jsx("img", { src: avatar, alt: `${name} avatar`, className: "avatar" }), isActive && _jsx("span", { className: "avatar-glow" })] }), _jsxs("div", { className: "player-info", children: [_jsx("p", { className: "player-name", children: name }), isActive && _jsx("p", { className: "active-indicator", children: "\uD83C\uDFAF Sua vez!" })] })] }));
};
export default PlayerProfile;
