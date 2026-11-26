# Tópico 15 — Routh no projeto — faixa de K para estabilidade

- **Bloco:** Estabilidade
- **Importância:** Essencial · **Dificuldade:** Média · **Tempo:** 20 min
- **Pré-requisitos:** 14
- **Relação:** Usado no 2º método de Ziegler-Nichols (achar Ku, tópico 18) e na avaliação processual (item II "encontrar o limite")
- **Fontes:** Aula 3, slides 30–34 · Lista 2º bim Q1d e Q3 · Avaliação processual 2º bim, item II · Playlist A.16 (1:46 faixa de K; 8:25 marginal) · Nise, seção 6.4
- **Áudio:** ../audios/topico-15.mp3

## 1. O que vou aprender?

Achar o intervalo de **K** que deixa o sistema estável. É a aplicação favorita do professor ("onde o método mostra seu maior valor", Aula 3, slide 30).

## 2. Antes de começar

Montar a tabela de Routh (tópico 14). Resolver inequações simples.

## 3. Entendendo o conceito

**Analogia:** K é o "volume" do controlador. Volume baixo: o sistema responde fraco, mas estável. Volume alto demais: microfonia (oscilação que cresce). O Routh diz **até onde** pode aumentar.

**Ideia:** o K aparece em alguns elementos da 1ª coluna. Para ser estável, **todos** precisam ser **positivos**. Cada um vira uma inequação. A resposta é a **interseção**.

**No limite (Lista Q1d):** quando o K torna um elemento igual a zero, o sistema fica **marginalmente estável**: oscila com amplitude constante. Esse K é o **ganho crítico K_u** de Ziegler-Nichols (tópico 18).

## 4. Fórmulas importantes

**Passo a passo:**

1. Escreva o denominador de MF: 1 + K·G(s) = 0 (ou use o dado no enunciado).
2. Monte a tabela com K como letra.
3. Exija **cada elemento da 1ª coluna > 0**.
4. Faça a interseção.

**Frequência da oscilação no limite:** use a linha s² com o K crítico:

```
A·s² + B = 0 → ω = √(B/A) → período P_u = 2π/ω
```

## 5. Exemplo resolvido

**Problema (Lista 2º bim, Q3):** G_MF = (K)/(s⁴ + 3s³ + 3s² + 2s + K). Faixa de K?

1. **Linha s⁴:** 1  3  K
2. **Linha s³:** 3  2  0
3. **Linha s²:** (3·3 − 1·2)/3 = **7/3** ; (3·K − 1·0)/3 = **K**
4. **Linha s¹:** ((7/3)·2 − 3·K)/(7/3) = **2 − 9K/7**
5. **Linha s⁰:** **K**
6. **Condições.**
   - s¹: 2 − 9K/7 > 0 → **K  0**
7. **Interseção:**

```
0  0.** A linha s⁰ quase sempre dá essa condição.
- **Inverter a inequação ao dividir por negativo.** Ex.: −9K/7 > −2 → K  0".

**Entender:** o K do limite = ganho crítico; a linha s² dá a frequência de oscilação.

## 8. Teste rápido

1. MF: s³ + 6s² + 11s + 6 + K. Faixa de K?
2. Qual o K crítico do item 1 e a frequência de oscilação?
3. Por que no limite o sistema oscila?

### Respostas (tente antes de ler)

1. s¹: (66 − 6 − K)/6 > 0 → K  0 → K > −6. Com K positivo: **0 < K < 60**.
2. **K_u = 60**. Linha s²: 6s² + 66 = 0 → ω = √11 ≈ **3,32 rad/s** (P_u ≈ 1,89 s).
3. Porque um par de polos fica **exatamente sobre o eixo jω** (parte real zero): não cresce nem decai.
