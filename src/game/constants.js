// constants.ts
// Lista de jogadores (ordem do turno — mantenha a que preferir)
export const PLAYERS = ['P1', 'P2', 'P4', 'P3'];
// Posições iniciais (casas da base de cada jogador)
export const BASE_POSITIONS = {
    P1: [32, 33, 47, 48], // Vermelho
    P2: [41, 42, 56, 57], // Verde
    P3: [167, 168, 182, 183], // Azul
    P4: [176, 177, 191, 192], // Amarelo
};
// Posição de entrada no tabuleiro (quando sai da base com dado 6)
export const START_POSITIONS = {
    P1: 91, // faixa vermelha
    P2: 23, // faixa verde
    P3: 201, // faixa azul
    P4: 133, // faixa amarela
};
// Posição final (meta de cada jogador)
export const HOME_POSITIONS = {
    P1: 111,
    P2: 97,
    P3: 127,
    P4: 113,
};
// Posições seguras (não pode ser capturado)
export const SAFE_POSITIONS = [36, 102, 188, 122];
// Ponto de virada para entrar na reta final
export const TURNING_POINTS = {
    P1: 105,
    P2: 7,
    P3: 217,
    P4: 119,
};
// Casas internas da reta final (caminho até a meta)
export const HOME_ENTRANCE = {
    P1: [106, 107, 108, 109, 110, 111],
    P2: [22, 37, 52, 67, 82, 97],
    P3: [202, 187, 172, 157, 142, 127],
    P4: [118, 117, 116, 115, 114, 113],
};
