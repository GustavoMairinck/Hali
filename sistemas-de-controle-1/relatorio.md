# Relatório de conclusão

## 1. Materiais analisados

| Material | Páginas | Como foi lido |
|---|---|---|
| Apresentação da disciplina | 7 | texto integral |
| Aula 1 — Introdução e Diagrama de Blocos | 81 | texto integral + slides 55–81 vistos como imagem |
| Aula 2 — Resposta no Tempo | 105 | texto integral + 56 slides de fórmulas/exemplos vistos como imagem |
| Aula 3 — Estabilidade | 34 | texto integral + 16 slides vistos como imagem |
| Aula 4 — Erro em regime e controladores | 99 | texto integral + 31 slides vistos como imagem |
| Avaliação Diagnóstica (06/08) | 5 | integral, como imagem |
| Avaliação Processual 1º bim (08/10) | 6 | integral, como imagem |
| Lista de Exercícios 2º bim (20/11) | 2 | integral, como imagem |
| Avaliação Processual 2º bim (projeto ZN) | 1 | integral, como imagem |

## 2. Vídeos da playlist efetivamente acessados

**Atenção:** a playlist é do **"Prof. Danillo"** (23 vídeos, segue o livro do Nise), **não** do seu professor. Ela foi usada como apoio, e o estilo de avaliação foi tirado só dos materiais do Prof. Matheus.

Os **23 vídeos** foram acessados. Li as **transcrições automáticas** do YouTube pelo navegador, em **trechos de 75–150 s** de cada vídeo (amostragem). Não assisti aos vídeos e não li as transcrições na íntegra. Fórmulas mostradas só na tela não aparecem na transcrição.

| # | Vídeo | Duração | Usado em |
|---|---|---|---|
| 1 | A.01 Introdução | 15:25 | 05 |
| 2 | A.02 Revisão Laplace | 19:30 | 02, 03 |
| 3 | A.03 FT e sistemas elétricos | 19:47 | 06 |
| 4 | A.04 Mecânicos translacionais/rotacionais | 15:49 | 06 |
| 5 | A.05 Engrenagens e eletromecânicos | 16:14 | (fora da ementa das aulas) |
| 6–8 | A.06–A.08 Espaço de estados | 26:55 / 30:17 / 15:43 | (não aparece nos slides) |
| 9 | A.09 Polos, zeros e 1ª ordem | 23:17 | 08, 09 |
| 10 | A.10 2ª ordem | 17:53 | 10 |
| 11 | A.11 2ª ordem subamortecida | 32:38 | 11 |
| 12 | A.12 Polos adicionais e zeros | 21:25 | 11, 12 |
| 13 | A.13 Redução de subsistemas | 24:15 | 07 |
| 14 | A.14 Estabilidade e Routh | 18:03 | 13, 14 |
| 15 | A.Complementar Estimação de modelos | 27:19 | 18 (curva de reação) |
| 16 | A.15 Routh — casos especiais | 41:04 | 14 |
| 17 | A.16 Projeto com Routh | 27:19 | 15 |
| 18 | A.17 Erro em regime | 27:35 | 16 |
| 19 | A.18 Constantes de erro e tipo | 34:05 | 16 |
| 20 | A.19 Erro para perturbações | 25:06 | 16 (complementar) |
| 21–22 | Práticas 1 e 2 | 18:31 / 30:06 | 09, 10 |
| 23 | A.20 Lugar das raízes | 40:04 | (não aparece nos slides) |

Os timestamps usados estão nas fontes de cada tópico (ex.: "Playlist A.11, 4:35").

## 3. Assuntos identificados

Os 18 tópicos do mapa de aprendizagem. **PID e Ziegler-Nichols não estão na playlist**: só nos slides da Aula 4. **Espaço de estados e lugar das raízes** estão na playlist e na ementa, mas **não** nos slides nem nas avaliações. Por isso ficaram de fora.

## 4. Pré-requisitos de Sinais e Sistemas recuperados

Números complexos e plano s, Laplace (tabela simplificada + deslocamento em frequência), frações parciais e sinais de teste/resposta ao impulso (tópicos 01–04). Foram tratados só até a profundidade que as avaliações exigem.

## 5. Fontes externas

Ver a página "Referências". Principais: Nise (bibliografia principal do professor), Dorf & Bishop, Ogata, Åström & Hägglund, notas de aula da USP, UDESC, UFRN, MIT OCW e Univ. de Illinois.

## 6. Organização dos conteúdos

Por **dependência entre conceitos** (não pela ordem dos vídeos): pré-requisitos → modelagem → resposta no tempo → estabilidade → erro → controladores. Cada tópico segue as 8 partes pedidas e tem um episódio de áudio.

## 7. Padrões de ensino e avaliação (observado × hipótese)

**Observado nos materiais:**
- Sequência dos slides: conceito → definição → fórmula em destaque → exemplo resolvido → "conferindo no Matlab".
- Exemplos e figuras são do **Nise** (−3 ± j7; J e D para %UP = 20%; 1000/((s+2)(s+3)(s+5)); K/(s(s+7)(s+11))).
- No erro em regime, ele usa a **normalização G_N** em vez dos nomes K_p, K_v, K_a.
- As provas misturam **discursivas conceituais** (definições), **objetivas** (mapa de polos → H(s), redução de blocos, estabilidade), **cálculo** (ζ, ωₙ, T_p, %UP, T_s, T_r) e **interpretação de gráfico**.
- **Questões se repetem**: a Processual do 1º bim reaproveitou 4 questões da Diagnóstica (Q1 conceitual, mapa de polos, h₁…h₄, realimentação 1/(s+4) com 1/s).
- Avaliações processuais (30%) são com **simulação no Matlab**.

**Hipóteses (não confirmadas):**
- A prova do 2º bim deve seguir a Lista de 20/11 (Routh, faixa de K, erro em regime, efeitos de P/I/D, Ziegler-Nichols), dado o padrão de reaproveitamento.
- Itens do 1º bim podem reaparecer numa prova final/substitutiva.
- A data da prova do 2º bim estava prevista para 24/11 ("a conferir"). Não sei se já aconteceu.

## 8. Assuntos que merecem mais atenção

1. **Routh-Hurwitz e faixa de K** — 3 questões da lista + item II da avaliação processual + usado no ZN 2.
2. **Erro em regime** — 3 questões da lista; o professor tem uma tabela própria (G_N).
3. **Ziegler-Nichols** — questão 8 da lista + projeto da avaliação processual.
4. **Efeitos de P, I e D** — questão 7 da lista (tabela).
5. **2ª ordem subamortecida** — mais exemplos resolvidos nos slides (Aula 2) e 2 questões na processual do 1º bim.

## 9. Limitações

- **Áudios:** gerados com uma voz neural offline (Kokoro v1.0, voz pt-BR "pm_alex"), frase por frase, com a marcação de tempo usada para sincronizar os visuais e o roteiro no player. Eu não consigo ouvir os arquivos; conferi a inteligibilidade transcrevendo trechos de volta com reconhecimento de fala (Whisper). A pronúncia de alguns termos técnicos ainda pode sair estranha. O player permite velocidade de 0,5× a 3×.
- **Playlist:** transcrições automáticas, lidas por amostragem.
- **Slides com fórmulas em imagem:** li visualmente os slides de fórmulas e exemplos (~130). Os demais foram lidos só pelo texto extraído.
- **Questão 5 da Lista:** o sistema em malha fechada é instável (Routh). Expliquei as duas leituras possíveis da resposta esperada.
- **Matlab:** não está disponível aqui. As conferências numéricas foram feitas em Python (SciPy/SymPy).
- **Progresso e histórico** ficam salvos no navegador do aparelho em uso. Outro navegador começa do zero.

## Sequência de estudos recomendada

| Etapa | Tópicos | Tempo estimado |
|---|---|---|
| 1. Base | 01 → 02 → 04 | ~45 min |
| 2. Ponte | 06 → 07 → 08 | ~65 min |
| 3. Estabilidade e erro (2º bim) | 13 → 14 → 15 → 16 | ~1h30 |
| 4. Resposta no tempo | 09 → 10 → 11 | ~65 min |
| 5. Controladores (2º bim) | 17 → 18 | ~55 min |
| 6. Complementos | 03, 05, 12 | ~45 min |
| 7. Treino | Banco de questões → Simulado → Revisão dos erros | ~1h30 |

A ordem do site segue essa tabela. Os tópicos 09–11 vêm antes de 17 porque os efeitos do PID são descritos com T_r, %UP e T_s.

Faça uma pausa de 5 min a cada 25–30 min. O site guarda onde você parou.
