# Tópico 09 — Sistemas de 1ª ordem

- **Bloco:** Resposta no tempo
- **Importância:** Essencial · **Dificuldade:** Baixa · **Tempo:** 15 min
- **Pré-requisitos:** 08
- **Relação:** Modelo mais simples; base para 2ª ordem (10) e para a curva de reação de Ziegler-Nichols (18)
- **Fontes:** Aula 2, slides 21–39 · Processual 1º bim Q7 e Simulação Parte 1 · Playlist A.09 (7:35 Tr; 9:04 Ts) e Prática 1 · Nise, seção 4.3
- **Áudio:** ../audios/topico-09.mp3

## 1. O que vou aprender?

Dado G(s) = (K)/(τs + 1) ou (ka)/(s+a), tirar **3 números** em menos de 1 minuto: **τ, T_r e T_s**.

## 2. Antes de começar

Polo real gera e^(−at) (tópico 08).

## 3. Entendendo o conceito

**Analogia:** encher uma caixa d'água com a torneira aberta. No começo enche rápido. Perto de cheia, enche devagar. Nunca "passa do ponto". Isso é 1ª ordem: **sobe e estabiliza, sem oscilar**.

**Ordem** = grau do denominador = número de polos (Aula 2, slide 21).

**A resposta ao degrau:**

```
c(t) = k·(1 − e^(−t/τ))
```

- **k (ganho estacionário):** o valor final (para degrau unitário).
- **τ (constante de tempo):** "velocidade" do sistema. Em t = τ, a saída chega a **63%** do final.

## 4. Fórmulas importantes

Forma do professor: G(s) = (a)/(s + a) (polo em −a). Então **τ = 1/a**.

| Grandeza | Fórmula | Significado |
|---|---|---|
| Constante de tempo | τ = (1)/(a) | tempo para chegar a 63% |
| Tempo de subida | T_r = (2,2)/(a) | de 10% a 90% do final |
| Tempo de acomodação | T_s = (4)/(a) | entrar e ficar na faixa de ±2% |

- Fonte: Aula 2, slides 28–31. **Unidade:** segundos (se a está em 1/s).
- De onde vem o 2,2: tempo em que chega a 90% (2,31/a) menos o tempo em que chega a 10% (0,11/a).
- De onde vem o 4: e^(−4) ≈ 0,018, ou seja, falta menos de 2%.

**Atenção à forma:** se aparecer (K)/(τs + 1), divida por τ: o polo é −1/τ, então a = 1/τ.

## 5. Exemplo resolvido

**Problema (Aula 2, slide 39):** G(s) = (50)/(s + 50). Ache τ, T_r, T_s.

1. **Achar a.** O polo é −50 → a = 50.
2. **τ.** 1/50 = **0,02 s** (20 ms).
3. **T_r.** 2,2/50 = **0,044 s**.
4. **T_s.** 4/50 = **0,08 s**.
5. **Valor final (degrau).** G(0) = 50/50 = **1**.

**Problema 2 — ler o gráfico (Aula 2, slides 34–37, motor CC):** a resposta estabiliza em 100 rpm e passa por 63 rpm em t ≈ 2 ms.

- k = **100**, τ ≈ **2 ms** → a = 500 → T_r = 4,4 ms; T_s = 8 ms.

**Problema 3 (Processual Q7):** G₁ = (1)/(s+1), G₂ = (1)/(s+5), G₃ = (1)/(s−10).

- G₂ (polo em −5) é o mais rápido: menor T_r **e** menor T_s que G₁ → alternativa **b**.
- G₃ tem polo em **+10**: é **instável**. Não tem T_r nem T_s (a resposta explode).

## 6. Erros comuns

- **Usar o numerador.** τ vem **do polo**, não do ganho. (100)/(s+5) tem τ = 0,2 s (o ganho é 20).
- **Esquecer de normalizar.** (2)/(4s + 1) → τ = 4 s, não 1/4.
- **Ganho muda o tempo?** **Não.** K altera só o valor final (Processual, simulação Parte 1).

## 7. O que preciso memorizar?

**Memorizar:** τ = 1/a, T_r = 2,2/a, T_s = 4/a, 63%.

**Entender:** polo mais à esquerda → a maior → mais rápido.

## 8. Teste rápido

1. G(s) = (4)/(s + 2): valor final ao degrau unitário e T_s?
2. Aumentar τ deixa o sistema mais rápido ou mais lento?
3. G(s) = (3)/(0,5s + 1): τ = ?

### Respostas (tente antes de ler)

1. Valor final 4/2 = **2**. T_s = 4/2 = **2 s**.
2. **Mais lento** (τ maior = demora mais para chegar a 63%).
3. **τ = 0,5 s** (polo em −2).
