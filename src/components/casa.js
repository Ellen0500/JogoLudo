import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import estrela from './estrela.png'; // ajuste o caminho conforme necessário
import { SAFE_POSITIONS } from '../game/constants';
const Casa = ({ position }) => {
    const isSafe = SAFE_POSITIONS.includes(position);
    return (_jsxs("div", { className: "casa", children: [isSafe && (_jsx("img", { src: estrela, alt: "Casa segura", className: "estrela" })), [106, 22, 142, 114]] }));
};
export default Casa;
