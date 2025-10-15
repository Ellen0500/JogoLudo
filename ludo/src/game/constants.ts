// Lista de jogadores
export const PLAYERS = ['P1', 'P2', 'P3', 'P4'];

// Estados possíveis do jogo
export const STATE = {
  DICE_NOT_ROLLED: 'DICE_NOT_ROLLED',
  DICE_ROLLED: 'DICE_ROLLED',
};

// Posições iniciais (casas da base de cada jogador)
export const BASE_POSITIONS: Record<string, number[]> = {
  P1: [32, 33, 47, 48],       // Vermelho
  P2: [41, 42, 56, 57],       // Verde
  P3: [167, 168, 182, 183],   // Azul
  P4: [176, 177, 191, 192],   // Amarelo
};

// Posição de entrada no tabuleiro (quando sai da base com dado 6)
export const START_POSITIONS: Record<string, number> = {
  P1: 106, // faixa vermelha
  P2: 22,  // faixa verde
  P3: 142, // faixa azul
  P4: 114, // faixa amarela
};

// Posição final (meta de cada jogador)
export const HOME_POSITIONS: Record<string, number> = {
  P1: 110,
  P2: 82,
  P3: 202,
  P4: 118,
};

// Posições seguras (não pode ser capturado)
export const SAFE_POSITIONS = [106, 22, 142, 114];

// Ponto de virada para entrar na reta final
export const TURNING_POINTS: Record<string, number> = {
  P1: 105,
  P2: 21,
  P3: 141,
  P4: 113,
};

// Casas internas da reta final (caminho até a meta)
export const HOME_ENTRANCE: Record<string, number[]> = {
  P1: [106, 107, 108, 109, 110],
  P2: [22, 37, 52, 67, 82],
  P3: [142, 157, 172, 187, 202],
  P4: [114, 115, 116, 117, 118],
};