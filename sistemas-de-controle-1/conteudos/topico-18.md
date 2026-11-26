# Tópico 18 — Sintonia de PID por Ziegler-Nichols

- **Bloco:** Controladores
- **Importância:** Essencial · **Dificuldade:** Média · **Tempo:** 30 min
- **Pré-requisitos:** 09, 15, 17
- **Relação:** Fecha a disciplina; é o tema da avaliação processual do 2º bimestre e da Lista Q8
- **Fontes:** Aula 4, slides 79–99 · Lista 2º bim Q8 · Avaliação processual 2º bim · Ziegler & Nichols (1942) · Åström & Hägglund, Advanced PID Control, cap. 6
- **Áudio:** ../audios/topico-18.mp3

## 1. O que vou aprender?

Calcular K_p, T_i e T_d pelos **dois métodos de Ziegler-Nichols** (ZN), e explicar **por que** precisa de ajuste fino depois.

## 2. Antes de começar

- Curva de 1ª ordem (tópico 09).
- Faixa de K e ganho crítico por Routh (tópico 15).
- PID e K_i = K_p/T_i (tópico 17).

## 3. Entendendo o conceito

**O que é:** uma **receita empírica**. Ziegler e Nichols testaram muitas plantas e criaram tabelas que dão **um bom ponto de partida** (Aula 4, slide 81).

**Analogia:** é a "receita de bolo da avó". Funciona bem na maioria das cozinhas, mas você ainda prova e ajusta o açúcar.

**ZN 1 — Curva de reação (malha aberta) (slides 82–86):**
- Controlador em manual. Aplica um degrau na planta.
- Muitas plantas respondem em forma de **S**.
- Traça a **reta tangente no ponto de inflexão** (onde a curva "muda de curvatura").
- Lê: **L** (atraso, onde a tangente corta o eixo do tempo), **T** (constante de tempo) e **C** (valor final).
- Só serve se a resposta em malha aberta tiver forma de S (sem oscilar, sem integrador).

**ZN 2 — Oscilação / sensibilidade (malha fechada) (slides 89–97):**
- Deixa só o P (T_i = ∞, T_d = 0).
- Aumenta K_p devagar até a saída **oscilar com amplitude constante**.
- Anota o **ganho crítico K_u** e o **período P_u** da oscilação.
- No papel: K_u e P_u saem do **Routh** (tópico 15).

## 4. Fórmulas importantes

**ZN 1 (Aula 4, slide 86) — com R = C/T (taxa de reação):**

| Controlador | K_p | T_i | T_d |
|---|---|---|---|
| P | (1)/(R·L) | ∞ | 0 |
| PI | (0,9)/(R·L) | (L)/(0,3) | 0 |
| PID | (1,2)/(R·L) | 2L | 0,5L |

**ZN 2 (Aula 4, slide 96):**

| Controlador | K_p | T_i | T_d |
|---|---|---|---|
| P | 0,5·K_u | ∞ | 0 |
| PI | 0,45·K_u | (P_u)/(1,2) | 0 |
| PID | 0,6·K_u | (P_u)/(2) | (P_u)/(8) |

**ZN 2 modificado (slide 98):** com sobressinal 0,33K_u, P_u/2, P_u/3; sem sobressinal 0,20K_u, P_u/2, P_u/3.

**Depois:** K_i = K_p/T_i; K_d = K_p·T_d.

## 5. Exemplo resolvido

**Problema (ZN 2 no papel):** planta G(s) = (1)/((s+1)(s+2)(s+3)). Projete um PID.

1. **MF só com P.** 1 + K_p·G = 0 → s³ + 6s² + 11s + (6 + K_p) = 0.
2. **Routh, linha s¹.** (6·11 − (6 + K_p))/6 = 0 → **K_u = 60**.
3. **Frequência no limite.** Linha s²: 6s² + 66 = 0 → ω = √11 ≈ 3,317 rad/s.
4. **Período.** P_u = 2π/3,317 ≈ **1,894 s**.
5. **Tabela (PID).** K_p = 0,6·60 = **36**; T_i = 1,894/2 = **0,947 s**; T_d = 1,894/8 = **0,237 s**.
6. **Ganhos paralelos.** K_i = 36/0,947 ≈ **38,0**; K_d = 36·0,237 ≈ **8,5**.
7. **Resultado na simulação.** %UP ≈ **44%**, T_s ≈ 5 s, erro ao degrau = 0. A ultrapassagem alta é típica de ZN → por isso o **ajuste fino** (item VI da avaliação processual).

**Problema (ZN 1):** degrau unitário na planta; leitura do gráfico: L = 0,5 s, T = 3 s, C = 2.

1. R = C/T = 2/3 ≈ 0,667.
2. R·L = 0,333.
3. PID: K_p = 1,2/0,333 = **3,6**; T_i = 2·0,5 = **1 s**; T_d = 0,5·0,5 = **0,25 s**.

## 6. Erros comuns

- **Usar ZN 1 em planta que oscila ou tem integrador.** A curva precisa ter forma de S.
- **Trocar T_i por K_i.** A tabela dá **T_i** (tempo). K_i = K_p/T_i.
- **Confundir P_u com ω.** P_u = 2π/ω.
- **Achar que ZN dá o valor final.** É **primeira aproximação** (Aula 4, slide 99).
- **Ler L errado.** L vai da origem até onde a **tangente** corta o eixo do tempo, não até onde a curva começa a subir.

## 7. O que preciso memorizar?

**Memorizar:** as duas tabelas (vão na folha A4) e "PID: 0,6 / Pu/2 / Pu/8".

**Entender:** ZN 2 usa o limite de estabilidade; ZN 1 usa a curva em S de malha aberta.

## 8. Teste rápido

1. K_u = 20 e P_u = 4 s. Ganhos de um PI por ZN 2?
2. Por que fazer ajuste fino depois de ZN? (Lista Q8c)
3. No ZN 2, por que zerar I e D antes de aumentar K_p?

### Respostas (tente antes de ler)

1. K_p = 0,45·20 = **9**; T_i = 4/1,2 ≈ **3,33 s** (K_i ≈ 2,7).
2. Porque as tabelas são **empíricas** e dão só uma primeira aproximação; costumam gerar ultrapassagem alta (≈ resposta com decaimento de 1/4). O ajuste fino adapta a resposta às especificações reais (%UP, T_s, erro).
3. Para medir o limite de estabilidade **só da ação proporcional**; o K_u e o P_u das tabelas foram definidos assim.
