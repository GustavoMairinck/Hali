/* Por episódio: título e cenas Manim. Cada cena cobre do início do parágrafo `from` até o início de `to`. */
export type ManimClip = { from: number; to: number; file: string };
export const EPISODES: Record<string, { title: string; manim: ManimClip[] }> = {
  '01': {
    title: 'Números complexos e o plano s',
    manim: [
      { from: 3, to: 5, file: 'ep01/Ep01Vetor.mp4' },
      { from: 6, to: 7, file: 'ep01/Ep01Espelho.mp4' },
      { from: 7, to: 11, file: 'ep01/Ep01Regioes.mp4' },
      { from: 11, to: 12, file: 'ep01/Ep01Angulo.mp4' },
    ],
  },
  '13': {
    title: 'Estabilidade: conceito e atalhos',
    manim: [
      { from: 2, to: 3, file: 'ep13/Ep13Bola.mp4' },
      { from: 4, to: 7, file: 'ep13/Ep13Respostas.mp4' },
      { from: 8, to: 12, file: 'ep13/Ep13Polos.mp4' },
      { from: 13, to: 17, file: 'ep13/Ep13Atalhos.mp4' },
      { from: 17, to: 18, file: 'ep13/Ep13Exemplos.mp4' },
    ],
  },
  '14': {
    title: 'Critério de Routh-Hurwitz',
    manim: [
      { from: 2, to: 3, file: 'ep14/Ep14Detector.mp4' },
      { from: 3, to: 15, file: 'ep14/Ep14Tabela.mp4' },
    ],
  },
  '15': {
    title: 'Routh no projeto: a faixa de K',
    manim: [
      { from: 2, to: 3, file: 'ep15/Ep15Volume.mp4' },
      { from: 5, to: 12, file: 'ep15/Ep15Tabela.mp4' },
      { from: 12, to: 13, file: 'ep15/Ep15Limite.mp4' },
    ],
  },
  '16': {
    title: 'Erro em regime permanente',
    manim: [
      { from: 3, to: 4, file: 'ep16/Ep16Carros.mp4' },
      { from: 4, to: 5, file: 'ep16/Ep16Tipo.mp4' },
      { from: 7, to: 10, file: 'ep16/Ep16Tabela.mp4' },
      { from: 13, to: 14, file: 'ep16/Ep16Alerta.mp4' },
    ],
  },
  '17': {
    title: 'Ações de controle: liga-desliga, P, I, D e PID',
    manim: [
      { from: 2, to: 6, file: 'ep17/Ep17Faixa.mp4' },
      { from: 6, to: 7, file: 'ep17/Ep17Liga.mp4' },
      { from: 7, to: 8, file: 'ep17/Ep17P.mp4' },
      { from: 8, to: 9, file: 'ep17/Ep17I.mp4' },
      { from: 9, to: 10, file: 'ep17/Ep17D.mp4' },
      { from: 15, to: 16, file: 'ep17/Ep17PID.mp4' },
    ],
  },
  '18': {
    title: 'Sintonia de PID por Ziegler-Nichols',
    manim: [
      { from: 3, to: 4, file: 'ep18/Ep18Curva.mp4' },
      { from: 6, to: 7, file: 'ep18/Ep18Oscila.mp4' },
      { from: 8, to: 9, file: 'ep18/Ep18Routh.mp4' },
      { from: 10, to: 11, file: 'ep18/Ep18Sim.mp4' },
    ],
  },
};
