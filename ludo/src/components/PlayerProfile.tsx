import React from 'react';
import './PlayerProfile.css';

import avatarVermelho from '../assets/avatarVermelho.png';
import avatarVerde from '../assets/avatarVerde.png';
import avatarAmarelo from '../assets/avatarAmarelo.png';
import avatarAzul from '../assets/avatarAzul.png';

interface PlayerProfileProps {
  color: 'red' | 'green' | 'yellow' | 'blue';
  name: string;
  isActive: boolean;
}

const avatarMap: Record<string, string> = {
  red: avatarVermelho,
  green: avatarVerde,
  yellow: avatarAmarelo,
  blue: avatarAzul,
};

const PlayerProfile: React.FC<PlayerProfileProps> = ({ color, name, isActive }) => {
  const avatar = avatarMap[color];

  return (
    <div className={`player-profile ${color}`}>
      <img src={avatar} alt={`${name} avatar`} className="avatar" />
      <div className="player-info">
        <p className="player-name">{name}</p>
        {isActive && <p className="active-indicator">🎯 Sua vez!</p>}
      </div>
    </div>
  );
};

export default PlayerProfile;