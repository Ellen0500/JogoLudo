import React from 'react';
import estrela from './estrela.png'; // ajuste o caminho conforme necessário
import { SAFE_POSITIONS } from '../game/constants';

interface CasaProps {
  position: number;
}

const Casa: React.FC<CasaProps> = ({ position }) => {
  const isSafe = SAFE_POSITIONS.includes(position);

  return (
    <div className="casa">
      {isSafe && (
        <img src={estrela} alt="Casa segura" className="estrela" />
      )}
      {[106, 22, 142, 114]}
    </div>
  );
};

export default Casa;