# Tópico 02 — Transformada de Laplace — tabela e propriedades

- **Bloco:** Pré-requisitos de Sinais e Sistemas
- **Importância:** Essencial · **Dificuldade:** Média · **Tempo:** 20 min
- **Pré-requisitos:** 01
- **Relação:** Usada em função de transferência (06), resposta no tempo (08–11) e erro em regime (16)
- **Fontes:** Tabela simplificada do professor · Avaliação Diagnóstica Q2 e Q7 · Playlist A.02 (5:05 tabela; 7:33 deslocamento em frequência) · Nise, cap. 2
- **Áudio:** ../audios/topico-02.mp3

## 1. O que vou aprender?

Transformar uma função do tempo **f(t)** em uma função de **s**, usando **só a tabela simplificada** + **3 propriedades**.

## 2. Antes de começar

- Saber ler o plano s (tópico 01).
- **u(t)** é o degrau: vale 0 antes de t = 0 e 1 depois. Ele só indica "o sinal começa em t = 0".

## 3. Entendendo o conceito

**Analogia:** Laplace é um **tradutor**. Equações diferenciais (difíceis) viram contas de multiplicar e dividir (fáceis). Você resolve no "idioma s" e depois traduz de volta.

- Derivar no tempo → **multiplicar por s**.
- Integrar no tempo → **dividir por s**.

Por isso o degrau (que é a "integral" do impulso) vale 1/s, e a rampa (integral do degrau) vale 1/s².

**A tabela simplificada (a que você usa):**

| f(t) | F(s) |
|---|---|
| δ(t) impulso | 1 |
| u(t) degrau | (1)/(s) |
| t·u(t) rampa | (1)/(s²) |
| tⁿ·u(t) | (n!)/(sⁿ⁺¹) |
| e^(∓at)·u(t) | (1)/(s ± a) |
| sen(ωt)·u(t) | (ω)/(s² + ω²) |
| cos(ωt)·u(t) | (s)/(s² + ω²) |

## 4. Fórmulas importantes

**Propriedade 1 — Linearidade (constantes saem para fora):**

```
L{ 7·f(t) } = 7·F(s)
```

**Propriedade 2 — Deslocamento na frequência (a que NÃO está na tabela):**

```
L{ e^(−at)·f(t) } = F(s + a)
```

- Multiplicar por e^(−at) → troque **todo s** por **(s + a)**.
- Multiplicar por e^(+at) → troque **todo s** por **(s − a)**.
- **O sinal sempre inverte.** Motivo: a definição já tem e^(−st); juntando, e^(−at)·e^(−st) = e^(−(s+a)t).
- Fonte: Playlist A.02, 7:33.

**Propriedade 3 — Derivada (condições iniciais nulas):**

```
L{ df/dt } = s·F(s)
```

**Teorema do valor final (vai aparecer em erro em regime, tópico 16):**

```
f(∞) = lim_s→0 s·F(s)
```

- Só vale se o sistema for **estável** (tópico 13).

## 5. Exemplo resolvido

**Problema:** f(t) = 5·e^(−2t)·sen(3t)·u(t). Ache F(s).

1. **Separar as peças.** Constante: 5. Exponencial: e^(−2t). Base: sen(3t).
   - *Por quê:* cada peça tem uma regra.
2. **Base na tabela.** sen(3t) → (3)/(s² + 9) (ω = 3, ω² = 9).
3. **Exponencial.** e^(−2t) → troca **s** por **(s + 2)**: (3)/((s+2)² + 9).
   - O **9 não muda**. Só o s é trocado.
   - O quadrado já estava no s² da tabela.
4. **Constante.** 5 · 3 = 15.

```
F(s) = (15)/((s+2)² + 9)
```

**Mais dois para fixar:**

- 7·e^(4t)·t⁴ → base (4!)/(s⁵) → expoente positivo, s vira (s − 4) → 7·24 = (168)/((s−4)⁵).
- e^(−5t)·t → base (1)/(s²) → (1)/((s+5)²).

## 6. Erros comuns

- **Errar o sinal no deslocamento.** e^(−5t) gera (s **+** 5). Confira: o polo (s = −5) tem o **mesmo número do expoente**.
- **Trocar só o primeiro s.** Em (s)/(s² + 9) com e^(−2t), fica (s+2)/((s+2)² + 9): os dois s mudam.
- **Mexer no ω².** O 9 é ω², não é s. Não muda.
- **Esquecer o n! no tⁿ.** t⁴ → 4! = 24, não 4.
- **Expoente errado.** tⁿ → s elevado a **n + 1**.

## 7. O que preciso memorizar?

**Memorizar:**
- Degrau 1/s, rampa 1/s², parábola (t²/2) → 1/s³.
- e^(−at)·f(t) → F(s + a).

**Entender:**
- O polo de e^(−at) está em s = −a. Exponencial que decai = polo negativo.

## 8. Teste rápido

1. L{ 3·e^(−t)·cos(2t) } = ?
2. L{ t²·e^(3t) } = ?
3. Qual entrada de teste tem transformada 1/s²?

### Respostas (tente antes de ler)

1. Base (s)/(s² + 4) → (3(s+1))/((s+1)² + 4).
2. Base (2)/(s³) → s vira (s − 3) → (2)/((s−3)³).
3. A **rampa unitária** t·u(t).
