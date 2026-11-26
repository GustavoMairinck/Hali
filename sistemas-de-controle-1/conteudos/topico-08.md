# Tópico 08 — Polos, zeros e resposta forçada × natural

- **Bloco:** Resposta no tempo
- **Importância:** Essencial · **Dificuldade:** Média · **Tempo:** 20 min
- **Pré-requisitos:** 01, 03, 06
- **Relação:** Base para 1ª e 2ª ordem (09–11), polos adicionais (12) e estabilidade (13)
- **Fontes:** Aula 2, slides 3–20 · Diagnóstica Q2 e Q4 · Processual 1º bim Q2 e Q6 · Playlist A.09 (0:00–7:35) · Nise, seção 4.2
- **Áudio:** ../audios/topico-08.mp3

## 1. O que vou aprender?

Achar **polos e zeros**, desenhar no plano s e **prever a forma da resposta** sem fazer a transformada inversa completa.

## 2. Antes de começar

Plano s (01), frações parciais (03), FT (06).

## 3. Entendendo o conceito

**Polos:** raízes do **denominador**. Fazem a FT ir para infinito. Marcados com **×**.

**Zeros:** raízes do **numerador**. Fazem a FT valer zero. Marcados com **○**.

**Analogia:** os polos são o "DNA" do comportamento. Eles decidem a **forma** da resposta (exponencial, oscilação…). Os zeros só mexem nas **amplitudes** (Aula 2, slide 16).

**A saída tem duas partes (Aula 2, slide 3):**

- **Resposta forçada:** vem dos polos **da entrada**. Ex.: degrau (polo em 0) gera uma constante.
- **Resposta natural:** vem dos polos **do sistema**. Ex.: polo em −5 gera e^(−5t).

**Regra visual (Aula 2, slide 15):** quanto **mais à esquerda** o polo, **mais rápido** o termo some.

## 4. Fórmulas importantes

**Polo real em −a → termo no tempo:**

```
K·e^(−at)
```

**Par complexo −σ ± jω → termo no tempo:**

```
K·e^(−σt)·cos(ωt − φ)
```

- σ (parte real) → velocidade com que **decai**.
- ω (parte imaginária) → frequência com que **oscila**.

## 5. Exemplo resolvido

**Problema (Aula 2, slides 17–19):** C(s) = (s+3)/(s(s+2)(s+4)(s+5)) (entrada degrau). Separe a resposta forçada da natural.

1. **Listar polos.** 0 (da entrada), −2, −4, −5 (do sistema). Zero em −3.
2. **Forma da resposta (sem calcular nada):**

```
c(t) = K_1 + K_2e^(−2t) + K_3e^(−4t) + K_4e^(−5t)
```

   - K₁ = forçada. O resto = natural.
3. **Se pedir os valores (regra do tampar):**
   - K₁ = 3/(2·4·5) = **3/40**
   - K₂ = 1/(−2·2·3) = **−1/12**
   - K₃ = (−1)/(−4·(−2)·1) = **−1/8**
   - K₄ = (−2)/(−5·(−3)·(−1)) = **2/15**
4. **Interpretar.** O termo e^(−5t) morre primeiro; e^(−2t) é o mais lento (polo mais perto do eixo).

**Problema 2 (Diagnóstica Q4 / Processual Q2):** mapa com ○ em −3 e +1, × em −6, −2 e 0.

- Zeros → numerador (s+3)(s−1). Polos → s(s+2)(s+6).
- ((s+3)(s−1))/(s(s+2)(s+6)) → alternativa **A**.

## 6. Erros comuns

- **Sinal do fator.** Polo em **−2** vira (s **+** 2). Zero em **+1** vira (s **−** 1).
- **Confundir × e ○.** × = polo. ○ = zero.
- **Achar que zero no SPD torna o sistema instável.** **Não**. Estabilidade depende só dos **polos** (Processual Q6, alternativa B é falsa).
- **Zero em s = ∞.** Se o denominador tem grau maior, a FT vai a zero quando s → ∞ (Aula 2, slide 9). Não precisa calcular isso na prova.

## 7. O que preciso memorizar?

**Memorizar:**
- Polo → denominador → ×. Zero → numerador → ○.
- Polo real −a → e^(−at).

**Entender:** forçada vem da entrada; natural vem do sistema.

## 8. Teste rápido

1. Polos e zeros de (10(s+2))/(s(s+1)(s+5))?
2. Qual polo do item 1 gera a resposta mais lenta (entre os do sistema)?
3. G(s) = (s−1)/(s² + 2s + 10): é estável?

### Respostas (tente antes de ler)

1. Zero: −2. Polos: 0, −1, −5.
2. O polo em **−1** (mais perto do eixo imaginário). O polo em 0 acumula (integra).
3. Polos: −1 ± j3 (SPE) → **estável**. O zero em +1 não muda isso.
