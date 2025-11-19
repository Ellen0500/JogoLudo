import React from 'react';
import './PlayerProfile.css';

import avatarVermelho from '../assets/avatarvermelho.png';
import avatarVerde from '../assets/avatarverde.png';
import avatarAmarelo from '../assets/avataramarelo.png';
import avatarAzul from '../assets/avatarazul.png';

interface PlayerProfileProps {
  color: 'red' | 'green' | 'yellow' | 'blue';
  name: string;
  isActive: boolean;
}

const avatarMap: Record<PlayerProfileProps['color'], string> = {
  red: avatarVermelho,
  green: avatarVerde,
  yellow: avatarAmarelo,
  blue: avatarAzul,
};

const PlayerProfile: React.FC<PlayerProfileProps> = ({ color, name, isActive }) => {
  const avatar = avatarMap[color];

  return (
    <div className={`player-profile ${color} ${isActive ? 'active' : ''}`}>
      <div className="avatar-wrapper">
        <img src={avatar} alt={`${name} avatar`} className="avatar" />
        {isActive && <span className="avatar-glow" />}
      </div>

      <div className="player-info">
        <p className="player-name">{name}</p>
        {isActive && <p className="active-indicator">🎯 Sua vez!</p>}
      </div>
    </div>
  );
};

export default PlayerProfile;
