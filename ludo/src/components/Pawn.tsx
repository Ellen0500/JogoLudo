import React from 'react';
import './Pawn.css';
import type { PawnColor } from '../game/types';

interface PawnProps {
  color: PawnColor;
  playerId: string;
  pieceId: number;
  onClick?: (playerId: string, pieceId: number) => void;
}

const Pawn: React.FC<PawnProps> = ({ color, playerId, pieceId, onClick }) => {
  return (
    <div
      className={`pawn ${color}`}
      onClick={() => onClick?.(playerId, pieceId)}
    />
  );
};

export default Pawn;