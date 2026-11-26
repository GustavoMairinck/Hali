# Tópico 14 — Critério de Routh-Hurwitz

- **Bloco:** Estabilidade
- **Importância:** Essencial · **Dificuldade:** Média · **Tempo:** 25 min
- **Pré-requisitos:** 13
- **Relação:** Ferramenta para faixa de K (15) e para achar o ganho crítico Ku de Ziegler-Nichols (18)
- **Fontes:** Aula 3, slides 20–29 · Lista 2º bim Q1b, Q1c, Q2 · Playlist A.14 (7:35 montagem; 9:03 exemplo) e A.15 (casos especiais) · Nise, seções 6.2–6.3
- **Áudio:** ../audios/topico-14.mp3

## 1. O que vou aprender?

Montar a **tabela de Routh** e contar **quantos polos estão no semiplano direito** — sem calcular nenhuma raiz.

## 2. Antes de começar

Atalhos de estabilidade (tópico 13). Saber calcular um "determinante 2×2" (a·d − b·c).

## 3. Entendendo o conceito

**Ideia:** o Routh é um "detector de sinais". Ele não diz **onde** estão os polos, só **em que lado** do plano.

**A regra final (Aula 3, slide 26):**

> **Número de polos no SPD = número de trocas de sinal na 1ª coluna.**
> Sem trocas → estável.

**O que a tabela informa (Lista Q1b):** quantos polos estão no SPE, no SPD e sobre o eixo jω.

**Maior vantagem (Aula 3, slide 23):** não é analisar (o computador faz). É **projetar**: achar a faixa de K estável (tópico 15).

## 4. Fórmulas importantes

**Montagem para a₄s⁴ + a₃s³ + a₂s² + a₁s + a₀:**

1. **Linha s⁴:** a₄, a₂, a₀ (pulando um).
2. **Linha s³:** a₃, a₁, 0 (os que sobraram).
3. **Linhas seguintes:** cada elemento é

```
((pivô de baixo)·(elemento de cima à direita) − (pivô de cima)·(elemento de baixo à direita))/(pivô de baixo)
```

Em símbolos, para a linha s²: b₁ = (a₃·a₂ − a₄·a₁)/(a₃), b₂ = (a₃·a₀ − a₄·0)/(a₃).

4. Continue até a linha s⁰.

**Dica (Playlist A.15):** pode multiplicar ou dividir uma linha inteira por um número **positivo** para simplificar. Os sinais não mudam.

**Casos especiais (Aula 3, slide 29 — "para casa", Nise 6.3):**

- **Zero só na 1ª coluna:** troque por **ε** (número pequeno positivo) e continue.
- **Linha inteira de zeros:** monte o **polinômio auxiliar** com a linha de cima, derive e use os coeficientes da derivada. Indica raízes simétricas (muitas vezes sobre o eixo jω).

## 5. Exemplo resolvido

**Problema (Lista 2º bim, Q2):** G_MF = (5(s+3))/(s⁴ + 2s³ + 3s² + 4s + 5). É estável?

1. **Atalho primeiro.** Todos os coeficientes presentes e positivos → inconclusivo → Routh.
2. **Linha s⁴:** 1  3  5
3. **Linha s³:** 2  4  0
4. **Linha s²:** (2·3 − 1·4)/2 = **1** ; (2·5 − 1·0)/2 = **5**
5. **Linha s¹:** (1·4 − 2·5)/1 = **−6** ; 0
6. **Linha s⁰:** (−6·5 − 1·0)/(−6) = **5**

| | 1ª col | 2ª col | 3ª col |
|---|---|---|---|
| s⁴ | 1 | 3 | 5 |
| s³ | 2 | 4 | 0 |
| s² | 1 | 5 | |
| s¹ | **−6** | 0 | |
| s⁰ | 5 | | |

7. **Contar trocas.** 1 → −6 (uma), −6 → 5 (duas). **2 trocas**.
8. **Conclusão.** **Instável**, com **2 polos no SPD** (e 2 no SPE).

> Conferido numericamente: raízes ≈ −1,29 ± j0,86 e **+0,29 ± j1,42**.

**Problema 2 (Aula 3, slides 27–28):** realimentação unitária com G = (1000)/((s+2)(s+3)(s+5)).

- Denominador de MF: s³ + 10s² + 31s + 1030.
- 1ª coluna: 1, 10, **−72**, 1030 → **2 trocas** → instável (o professor dividiu a linha s² por 10 e obteve 1, 103; o resultado é o mesmo).

## 6. Erros comuns

- **Usar o denominador de malha aberta.** Use o de **malha fechada** (1 + G·H).
- **Contar sinais negativos em vez de trocas.** Conte **mudanças** (+ → − e − → +).
- **Errar a ordem no "determinante".** Sempre: (pivô de baixo × de cima à direita) − (pivô de cima × de baixo à direita), dividido pelo pivô de baixo.
- **Esquecer o zero que completa a linha.** Linhas com menos termos recebem 0 no final.

## 7. O que preciso memorizar?

**Memorizar:** como montar as 2 primeiras linhas; a fórmula do elemento; trocas = polos no SPD.

**Entender:** o Routh responde "quantos?", não "onde?".

## 8. Teste rápido

1. s³ + 2s² + 3s + 10. Monte a 1ª coluna e conclua.
2. Como identificar estabilidade pela tabela? (Lista Q1c)
3. 1ª coluna: 1, 5, 2, 7. Quantos polos no SPD?

### Respostas (tente antes de ler)

1. s³: 1, 3 | s²: 2, 10 | s¹: (2·3 − 1·10)/2 = **−2** | s⁰: 10. Trocas: 2 → **instável**, 2 polos no SPD.
2. Estável se **não houver troca de sinal** na 1ª coluna (todos com o mesmo sinal).
3. **Zero** (nenhuma troca) → estável.
