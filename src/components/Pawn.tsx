import React from 'react';
import './Pawn.css';
import type { PawnColor } from '../game/types';

interface PawnProps {
  color: PawnColor;
  playerId: string;
  pieceId: number;
  onClick?: (playerId: string, pieceId: number) => void;
  className?: string; // ✅ permite aplicar estilos personalizados
}

const Pawn: React.FC<PawnProps> = ({ color, playerId, pieceId, onClick, className }) => {
  return (
    <div
      className={className ?? `pawn ${color}`} // ✅ usa className se fornecido, senão aplica padrão
      onClick={() => onClick?.(playerId, pieceId)}
    />
  );
};

export default Pawn;