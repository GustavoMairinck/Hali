# Tópico 13 — Estabilidade — conceito e atalhos

- **Bloco:** Estabilidade
- **Importância:** Essencial · **Dificuldade:** Baixa · **Tempo:** 15 min
- **Pré-requisitos:** 01, 08
- **Relação:** Pré-condição para erro em regime (16); base do Routh-Hurwitz (14–15) e de Ziegler-Nichols 2 (18)
- **Fontes:** Aula 3, slides 2–19 · Lista 2º bim Q1a · Processual 1º bim Q6 · Playlist A.14 (0:00–6:00) · Nise, seção 6.1
- **Áudio:** ../audios/topico-13.mp3

## 1. O que vou aprender?

Dizer se um sistema é **estável, instável ou marginalmente estável** — olhando os polos ou, às vezes, **só os coeficientes**.

## 2. Antes de começar

Regiões do plano s (tópico 01). Resposta natural (tópico 08).

## 3. Entendendo o conceito

**Por que importa (Aula 3, slide 3):** é a especificação **mais importante**. Se o sistema é instável, tempo de resposta e erro não fazem sentido.

**Analogia (Aula 3, slide 7):** bolinha numa tigela (estável: volta ao fundo) × bolinha em cima de um morro (instável: rola e não volta).

**Definições pela resposta natural (Aula 3, slides 4–6):**

- **Estável:** a resposta natural **tende a zero**.
- **Instável:** a resposta natural **cresce sem limite**.
- **Marginalmente estável:** a resposta natural **não cresce nem some** (fica constante ou oscilando).

**Definição BIBO (Aula 3, slide 8):** estável se **toda entrada limitada gera saída limitada**.

**Pelos polos de MALHA FECHADA (Aula 3, slides 12–14):**

| Polos | Classificação |
|---|---|
| todos no SPE | **estável** |
| algum no SPD, ou repetido sobre o eixo jω | **instável** |
| simples sobre o eixo jω, o resto no SPE | **marginalmente estável** |

## 4. Fórmulas importantes

**Atalhos só com os coeficientes do denominador de MF (Aula 3, slide 18):**

1. **Sinais diferentes** entre os coeficientes → **instável** (condição suficiente).
2. **Falta alguma potência de s** → instável ou, no máximo, marginalmente estável.
3. **Todos presentes e positivos** → **não dá para concluir**. Use Routh (tópico 14).

> Exceção: para **2ª ordem**, todos presentes e positivos **garante** estabilidade.

## 5. Exemplo resolvido

**Problema (Aula 3, slide 19):** classifique sem calcular raízes.

1. (2)/(s³ + s + 1) → **falta s²** → não é estável.
2. (s+1)/(s³ − s² + s + 2) → coeficiente **−1** → **instável**.
3. (s+10)/(s(s² + s + 1)) = (s+10)/(s³ + s² + s) → **falta o termo independente** (polo em 0) → não é estável (no máximo marginal).
4. s⁴ + 2s³ + 3s² + 4s + 5 → todos presentes e positivos → **inconclusivo**. Precisa de Routh (tópico 14: é instável).

## 6. Erros comuns

- **Olhar a malha aberta.** A estabilidade do sistema realimentado é dada pelos polos de **malha fechada** (1 + GH = 0).
- **Usar os zeros.** Zeros não definem estabilidade.
- **"Todos positivos = estável".** Só vale para 1ª e 2ª ordem.
- **Polo na origem = estável.** Não: é um polo **sobre o eixo jω**.

## 7. O que preciso memorizar?

**Memorizar:** a tabela de polos e os 3 atalhos.

**Entender:** estabilidade é sobre a resposta **natural**, que vem dos polos do sistema.

## 8. Teste rápido

1. Polos em −2, −1 ± j3. Classificação?
2. Polos em −1, ±j2. Classificação?
3. Lista Q1a: que análises posso fazer olhando só os coeficientes do denominador?

### Respostas (tente antes de ler)

1. **Estável** (todos no SPE).
2. **Marginalmente estável** (par simples sobre o eixo jω).
3. (i) Se há coeficientes com sinais diferentes → instável; (ii) se falta alguma potência de s → instável ou marginalmente estável; (iii) se todos estão presentes e positivos, não há conclusão → usar Routh-Hurwitz.
