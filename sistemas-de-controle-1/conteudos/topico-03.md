# Tópico 03 — Frações parciais e transformada inversa

- **Bloco:** Pré-requisitos de Sinais e Sistemas
- **Importância:** Importante · **Dificuldade:** Média · **Tempo:** 20 min
- **Pré-requisitos:** 02
- **Relação:** Usada para achar c(t) em polos e zeros (08) e na resposta de 1ª/2ª ordem (09–11)
- **Fontes:** Aula 2, slides 13–19 · Avaliação Diagnóstica Q2 e Q7 · Playlist A.02 (11:16 raízes distintas; 12:32 raízes repetidas) · Nise, seção 2.2
- **Áudio:** ../audios/topico-03.mp3

## 1. O que vou aprender?

Voltar do "idioma s" para o tempo: transformar **C(s)** em **c(t)**.

O truque: quebrar uma fração grande em **frações pequenas que estão na tabela**.

## 2. Antes de começar

- Tabela de Laplace e deslocamento em frequência (tópico 02).
- Saber fatorar o denominador (achar as raízes).

## 3. Entendendo o conceito

**Analogia:** é como desmontar um lego. A peça grande (s+2)/(s(s+5)) não está na tabela. Mas ela é feita de duas peças que estão: (A)/(s) e (B)/(s+5).

Cada raiz do denominador vira **uma fração**:

- Raiz em 0 → (A)/(s) → vira **A** (degrau) no tempo.
- Raiz em −5 → (B)/(s+5) → vira **B·e^(−5t)** no tempo.
- Raiz repetida (s+5)² → precisa de **duas** frações: (C)/(s+5) + (D)/((s+5)²) → C·e^(−5t) + D·t·e^(−5t).

## 4. Fórmulas importantes

**Regra do "tampar" (resíduo) — para raízes simples:**

```
A = [ F(s)·(s − p) ] avaliado em s = p
```

Na prática: **tape** o fator da raiz e substitua o valor da raiz no resto.

**Raiz repetida (s − p)²:**

- Coeficiente do termo ao quadrado: regra do tampar normal.
- Coeficiente do termo simples: **derivar** o que sobrou e substituir s = p.

**Pares que você vai usar na volta:**

| Fração | No tempo |
|---|---|
| (A)/(s) | A |
| (B)/(s + a) | B·e^(−at) |
| (D)/((s + a)²) | D·t·e^(−at) |

## 5. Exemplo resolvido

**Problema (Aula 2, slide 13):** C(s) = (s+2)/(s(s+5)). Ache c(t).

1. **Escrever a forma.** C(s) = (A)/(s) + (B)/(s+5).
   - *Por quê:* duas raízes simples (0 e −5) → duas frações.
2. **Achar A (raiz s = 0).** Tape o "s": sobra (s+2)/(s+5). Em s = 0: (2)/(5).
3. **Achar B (raiz s = −5).** Tape o "(s+5)": sobra (s+2)/(s). Em s = −5: (−3)/(−5) = (3)/(5).
4. **Voltar ao tempo.**

```
c(t) = 2/5 + (3/5)·e^(−5t)
```

5. **Interpretar.** O 2/5 é constante (veio do degrau de entrada). O termo com e^(−5t) some com o tempo (veio do polo do sistema). Isso é o tópico 08.

**Desafio (Avaliação Diagnóstica, Q7):** Y(s) = (1)/(s²(s+5)²).

Resultado (conferido com software):

```
y(t) = t/25 − 2/125 + (t/25)·e^(−5t) + (2/125)·e^(−5t)
```

## 6. Erros comuns

- **Grau do numerador ≥ grau do denominador.** Aí precisa dividir os polinômios antes (Playlist A.02, 17:32). Em controle quase nunca acontece.
- **Raiz repetida com uma fração só.** (s+5)² precisa de duas frações.
- **Sinal na substituição.** Em s = −5, (s+2) vale −3, e s vale −5. Os dois negativos se cancelam.

## 7. O que preciso memorizar?

**Memorizar:** a regra do tampar e os 3 pares da tabela acima.

**Entender:** cada polo vira um termo no tempo. Esse é o elo com o tópico 08.

## 8. Teste rápido

1. Escreva a forma (sem calcular) de (1)/((s+1)(s+3)).
2. Calcule A e B do item 1.
3. Qual termo no tempo aparece por causa de (4)/((s+2)²)?

### Respostas (tente antes de ler)

1. (A)/(s+1) + (B)/(s+3).
2. A = 1/(−1+3) = **1/2**. B = 1/(−3+1) = **−1/2**. Logo c(t) = ½e^(−t) − ½e^(−3t).
3. **4·t·e^(−2t)**.
