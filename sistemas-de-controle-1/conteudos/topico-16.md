# Tópico 16 — Erro em regime permanente

- **Bloco:** Erro em regime
- **Importância:** Essencial · **Dificuldade:** Alta · **Tempo:** 30 min
- **Pré-requisitos:** 02, 07, 13
- **Relação:** Especificação de projeto; explica por que a ação integral (17) zera o erro ao degrau
- **Fontes:** Aula 4, slides 2–20 · Lista 2º bim Q4, Q5, Q6 · Playlist A.17 (6:46 fórmula; 8:22 papel do integrador) e A.18 (1:46 Kp, Kv, Ka; 3:20 tipo) · Nise, cap. 7
- **Áudio:** ../audios/topico-16.mp3

## 1. O que vou aprender?

Calcular **quanto o sistema erra depois que tudo se acalma** (t → ∞), para degrau, rampa e parábola. Usar o **tipo do sistema** para responder rápido.

## 2. Antes de começar

- Sinais de teste e suas transformadas (tópico 04).
- Realimentação G/(1+G) (tópico 07).
- **Estabilidade (tópico 13).** Sem ela, nada deste tópico vale.

## 3. Entendendo o conceito

**Definição (Aula 4, slide 3):** erro = entrada − saída, quando t → ∞.

**Analogia:** um motorista seguindo outro carro.
- Carro da frente **parado** (degrau): dá para encostar exatamente? Depende do motorista.
- Carro da frente a **velocidade constante** (rampa): alguns motoristas ficam sempre um pouco atrás, outros ficam cada vez mais longe.

**O "tipo" do sistema decide isso (Aula 4, slide 6):**

> **Tipo = número de polos na origem (integradores) da FTMA G(s).**

Cada integrador é um "motorista que acumula o atraso e corrige". Quanto mais integradores, mais tipos de entrada o sistema segue sem erro.

**Ordem ≠ tipo.** Ordem = grau do denominador. Tipo = quantos "s" puros no denominador.

## 4. Fórmulas importantes

**Erro a partir da FT de malha fechada T(s) (Aula 4, slide 11):**

```
E(s) = R(s)·[1 − T(s)]   ·   e(∞) = lim_s→0 s·E(s)
```

**Erro a partir da FT de malha aberta G(s), realimentação unitária (Aula 4, slide 14):**

```
e(∞) = lim_s→0 (s·R(s))/(1 + G(s))
```

**Método do professor — normalizar G(s) (Aula 4, slides 15–19):** escreva cada fator como (1 + s/p). O número que sobra na frente é **G_N**.

Exemplo do slide: (32(s+1))/(s²(s+0,1)(s²+2s+2)) = (160(1+s))/(s²(1+s/0,1)(1+s+s²/2)) → **tipo 2, G_N = 160**.

**Tabela-resumo (Aula 4, slide 20):**

| Entrada \ Tipo | 0 | 1 | 2 |
|---|---|---|---|
| Degrau | (1)/(1 + G_N) | 0 | 0 |
| Rampa | ∞ | (1)/(G_N) | 0 |
| Parábola | ∞ | ∞ | (1)/(G_N) |

**Equivalência com o livro (Nise, Playlist A.18):** G_N = K_p = lim G(s) (tipo 0); = K_v = lim s·G(s) (tipo 1); = K_a = lim s²·G(s) (tipo 2). É o mesmo número.

**Entrada com amplitude A:** multiplique o erro por A.

## 5. Exemplo resolvido

**Problema 1 (Aula 4, slide 12):** T(s) = (5)/(s² + 7s + 10), degrau unitário.

1. **Estável?** 2ª ordem, coeficientes positivos → sim.
2. **E(s) = R·(1 − T).** Com R = 1/s.
3. **Limite.** e(∞) = lim s·(1/s)·(1 − T(s)) = 1 − T(0) = 1 − 5/10 = **0,5**.

**Problema 2 (estável, tipo 1):** G(s) = (10)/(s(s+5)), realimentação unitária.

1. **Estável?** MF: s² + 5s + 10 → sim.
2. **Normalizar.** (10)/(5·s·(1 + s/5)) = (2)/(s(1+s/5)) → **tipo 1, G_N = 2**.
3. **Degrau:** e = **0**. **Rampa:** e = 1/2 = **0,5**. **Parábola:** **∞**.

**Problema 3 (Lista 2º bim, Q6):** G_MF = (s+1)/(s² + 3s + 10), rampa unitária.

1. **Estável?** Sim (2ª ordem, coeficientes positivos).
2. **1 − T** = (s² + 3s + 10 − s − 1)/(s² + 3s + 10) = (s² + 2s + 9)/(s² + 3s + 10).
3. **s·E(s)** = s·(1)/(s²)·(1 − T) = (s² + 2s + 9)/(s(s² + 3s + 10)).
4. **Limite s → 0:** (9)/(0) → **e(∞) = ∞**.
5. **Interpretação.** T(0) = 1/10 ≠ 1: o sistema já erra ao degrau (erro 0,9). Com rampa, o erro cresce sem parar.

## 6. Erros comuns

- **Não checar estabilidade antes.** O limite dá um número mesmo para sistema instável, mas esse número é **falso** (Lista Q5: veja o banco de questões).
- **Usar G(s) quando o enunciado dá T(s).** Com T, use E = R(1 − T). Com G (unitária), use sR/(1 + G).
- **Contar o tipo na FT de malha fechada.** O tipo é da **malha aberta**.
- **Esquecer a amplitude.** Degrau de 15 → erro × 15.
- **Errar o G_N.** Normalize **todos** os fatores, inclusive (s² + 2s + 2) → 2(1 + s + s²/2).

## 7. O que preciso memorizar?

**Memorizar:** a tabela 3×3; E = R(1 − T); "checar estabilidade primeiro".

**Entender:** cada integrador "vence" uma entrada a mais.

## 8. Teste rápido

1. G(s) = (20)/((s+1)(s+4)), realimentação unitária. Erro ao degrau unitário?
2. Mesmo G, erro à rampa?
3. Que controlador adiciona um integrador ao sistema?

### Respostas (tente antes de ler)

1. Tipo 0, G_N = 20/4 = 5 → e = 1/(1+5) = **1/6 ≈ 0,167**. (MF: s² + 5s + 24, estável.)
2. **∞** (tipo 0).
3. O **integral (I)** — por isso o PI elimina o erro ao degrau (tópico 17).
