# Tópico 01 — Números complexos e o plano s

- **Bloco:** Pré-requisitos de Sinais e Sistemas
- **Importância:** Essencial · **Dificuldade:** Baixa · **Tempo:** 12 min
- **Pré-requisitos:** nenhum
- **Relação:** Base para polos e zeros (08), 2ª ordem (10–11) e estabilidade (13)
- **Fontes:** Aula 1, slide "Função de Transferência" (s = σ + jω) · Aula 2, slides 84–88 · Playlist A.20 (10:03, representação vetorial)
- **Áudio:** ../audios/topico-01.mp3

## 1. O que vou aprender?

Ler um número como **s = −3 + j7** e saber **onde ele fica no plano s**.

Isso é usado em quase toda a matéria: polos, estabilidade e resposta no tempo são lidos nesse plano.

## 2. Antes de começar

Você só precisa saber o que é raiz de uma equação do 2º grau (Bhaskara).

## 3. Entendendo o conceito

**Analogia:** o plano s é um mapa. Cada polo é um "endereço" nesse mapa. O endereço diz **como o sistema vai se comportar**.

Um número complexo tem duas partes:

- **Parte real (σ, sigma):** o "leste-oeste" do mapa. Eixo horizontal.
- **Parte imaginária (ω, ômega):** o "norte-sul". Eixo vertical. Vem multiplicada por **j**, onde j² = −1.

Escrevemos: **s = σ + jω**.

Quando a equação **s² + 6s + 58 = 0** tem Δ negativo, as raízes são complexas:

```
s = −3 ± j7
```

Elas sempre aparecem **em par conjugado**: uma com +j7 e outra com −j7. Uma é o espelho da outra em relação ao eixo horizontal.

**O que cada região do plano significa (vamos usar muito):**

| Região | Parte real | Significado no controle |
|---|---|---|
| Semiplano esquerdo (SPE) | σ  0 | resposta **explode** (instável) |

## 4. Fórmulas importantes

**Módulo (distância até a origem):**

```
|s| = √(σ² + ω²)
```

- Usado em: frequência natural ωₙ = distância do polo até a origem (tópico 11).

**Ângulo com o eixo real negativo:**

```
θ = tan⁻¹( ω _d / σ _d )
```

- Usado em: cos θ = ζ (fator de amortecimento, tópico 11).
- Fonte: Aula 2, slide 86.

**Raízes de as² + bs + c = 0 quando Δ  Esses números (−3 ± j7, 7,62, 0,394) são exatamente o exercício da Aula 2, slides 89–90.

## 6. Erros comuns

- **Esquecer o j.** "−3 ± 7" são dois números reais; "−3 ± j7" é um par complexo. Comportamentos totalmente diferentes.
- **Trocar eixos.** Parte real é **horizontal**. Imaginária é **vertical**.
- **Calcular o ângulo a partir do eixo positivo.** No controle, θ é medido a partir do **eixo real negativo** (Aula 2, slide 86).

## 7. O que preciso memorizar?

**Memorizar:**
- s = σ + jω
- SPE = estável, eixo jω = oscila, SPD = instável

**Entender (não decorar):**
- Por que raízes complexas vêm em pares conjugados (os coeficientes do polinômio são reais).

## 8. Teste rápido

1. O polo s = 2 + j3 está em qual semiplano? O que isso indica?
2. Qual o módulo de s = −4 + j3?
3. Raízes de s² + 4 = 0?

### Respostas (tente antes de ler)

1. Semiplano **direito** (parte real +2 > 0). Indica resposta que cresce → **instável**.
2. √(16 + 9) = **5**.
3. s² = −4 → **s = ±j2** (sobre o eixo imaginário → oscilação pura).
