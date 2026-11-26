# Tópico 17 — Ações de controle — on-off, P, I, D e PID

- **Bloco:** Controladores
- **Importância:** Essencial · **Dificuldade:** Média · **Tempo:** 25 min
- **Pré-requisitos:** 11, 16
- **Relação:** Base para sintonia por Ziegler-Nichols (18) e para a avaliação processual do 2º bimestre
- **Fontes:** Aula 4, slides 21–78 · Lista 2º bim Q7 · Avaliação processual 2º bim · Dorf & Bishop cap. 7 · Ogata cap. 8
- **Áudio:** ../audios/topico-17.mp3

## 1. O que vou aprender?

O que **cada ação** (P, I, D) faz com a resposta, e ler a **tabela de efeitos** que o professor usa (Lista Q7).

## 2. Antes de começar

- Especificações T_r, %UP, T_s (tópico 11).
- Erro em regime e tipo (tópico 16).

## 3. Entendendo o conceito

**Analogia geral:** dirigir mantendo o carro no centro da faixa.

- **P (proporcional):** vira o volante **proporcional** ao quanto você está fora do centro. Corrige o **presente**.
- **I (integral):** se você está fora do centro **há muito tempo**, vai aumentando a correção. Olha o **passado**.
- **D (derivativo):** se o carro está **se afastando rápido**, corrige antes. Olha o **futuro** (a tendência).

**On-off (Aula 4, slides 24–26):** liga ou desliga, nada no meio. Barato. A variável **oscila** em torno da referência. Ex.: geladeira, ferro de passar. Bom para processos **lentos** que toleram oscilação.

**P (slides 31–45):**
- Ação = K_p × erro.
- **Deixa erro de off-set** (erro residual): se o erro fosse zero, a ação seria zero e a variável voltaria a cair. Aumentar K_p **diminui** o erro, mas não zera.
- Exemplo do professor: tanque com boia. Kp = 2 reduz o erro pela metade.

**I (slides 46–55):**
- Ação = soma (integral) do erro ao longo do tempo.
- **Elimina o off-set** ("ação de reset"): continua agindo enquanto houver erro.
- Não usado sozinho. K_i alto → oscilação ou instabilidade.

**D (slides 56–60):**
- Ação = velocidade com que o erro muda.
- **Antecipa** e reduz a ultrapassagem.
- **Não elimina off-set** (erro constante tem derivada zero).
- **Amplifica ruído**. Não usar em processo ruidoso nem sozinho.

## 4. Fórmulas importantes

**PID no domínio s (Aula 4, slides 68 e 77):**

```
(U(s))/(E(s)) = K_p + (K_i)/(s) + K_d·s = K_p·(1 + (1)/(T_i·s) + T_d·s)
```

```
K_i = (K_p)/(T_i)   ·   K_d = K_p·T_d
```

- T_i: tempo integral (de reset). T_d: tempo derivativo.
- O PID **adiciona dois zeros e um polo na origem** (Aula 4, slide 77). O polo na origem é o **integrador**: aumenta o tipo do sistema em 1.

**Forma discreta (Aula 4, slides 31, 46, 56; T = período de amostragem):**

- P: u(n) = K_p·e(n) + u₀
- I: u(n) = K_i·T·e(n) + u(n−1)
- D: u(n) = (K_d/T)·(e(n) − e(n−1))

**Tabela de efeitos (Aula 4, slide 76 = Lista Q7):**

| Aumentar | T_r | %UP | T_s | Erro em regime |
|---|---|---|---|---|
| K_p | diminui | aumenta | muda pouco | diminui |
| K_i | diminui | aumenta | aumenta | **elimina** |
| K_d | diminui pouco | diminui | diminui | muda pouco |

> Ressalva (Aula 4, slide 75): a tabela é uma **tendência**. O efeito real depende da planta.

## 5. Exemplo resolvido

**Problema (Lista Q7):** explique o impacto de P, I e D usando a tabela.

1. **P.** Aumentar K_p deixa a resposta mais rápida (T_r menor) e reduz o erro, mas aumenta a ultrapassagem. Não zera o erro ao degrau em plantas tipo 0.
2. **I.** Adiciona um integrador → o sistema ganha +1 no tipo → o erro ao degrau vai a **zero**. Custo: mais ultrapassagem e acomodação mais lenta (tende a oscilar).
3. **D.** Reage à tendência do erro → "freia" a resposta antes do pico → menos %UP e T_s menor. Quase não afeta o erro em regime. Sensível a ruído.
4. **Conclusão.** PI corrige o erro; PD melhora o transitório; PID combina os dois.

**Mini-cálculo (Aula 4, slide 33):** o erro variou 20% e a válvula abriu 60% → K_p = 60/20 = **3**.

## 6. Erros comuns

- **"D elimina o erro."** Não: quem elimina é o **I**.
- **"Mais K_p sempre melhora."** Aumenta %UP e pode desestabilizar (tópico 15).
- **Confundir T_i com K_i.** K_i = K_p/T_i: T_i **maior** = ação integral **menor**.
- **Esquecer que o I não reduz o pico.** O pico acontece antes de a integral "carregar" (Aula 4, slide 49).

## 7. O que preciso memorizar?

**Memorizar:** a tabela de efeitos; K_i = K_p/T_i; K_d = K_p·T_d.

**Entender:** P = presente, I = passado, D = tendência.

## 8. Teste rápido

1. Qual ação elimina o erro em regime ao degrau?
2. Um processo tem muito ruído de medição. Que ação evitar?
3. K_p = 6 e T_i = 2 s. K_i = ?

### Respostas (tente antes de ler)

1. **Integral (I)**.
2. **Derivativa (D)** — amplifica ruído.
3. K_i = 6/2 = **3 s⁻¹**.
