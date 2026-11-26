# Tópico 07 — Diagrama de blocos e redução

- **Bloco:** Modelagem
- **Importância:** Essencial · **Dificuldade:** Média · **Tempo:** 25 min
- **Pré-requisitos:** 06
- **Relação:** Gera a FT de malha fechada usada em estabilidade (13–15) e erro (16)
- **Fontes:** Aula 1, slides 63–81 · Diagnóstica Q5–Q6 · Processual 1º bim Q3 e Q5 · Lista 2º bim Q3–Q4 · Playlist A.13 (1:33 série; 3:06 paralelo; 7:35 realimentação; 9:00 mover blocos)
- **Áudio:** ../audios/topico-07.mp3

## 1. O que vou aprender?

Reduzir um diagrama de blocos a **um único bloco**, usando 3 regras + 2 truques. Isso caiu em **toda** avaliação até agora.

## 2. Antes de começar

FT (tópico 06). Saber somar e multiplicar frações.

## 3. Entendendo o conceito

**Analogia:** cada bloco é uma "máquina" que multiplica o sinal pela sua FT. Setas são esteiras. Círculos são **somadores** (somam ou subtraem sinais). Pontos de **ramificação** copiam o sinal.

**Regra 1 — Série (um depois do outro): multiplica.**

```
G_eq = G_1·G_2·G_3
```

**Regra 2 — Paralelo (lado a lado, somando no fim): soma** (com o sinal do somador).

```
G_eq = G_1 ± G_2 ± G_3
```

**Regra 3 — Realimentação (a saída volta para o início):**

```
T(s) = (G)/(1 + G·H)
```

- G: caminho direto. H: caminho de volta.
- **+** no denominador se a realimentação é **negativa** (o mais comum).
- Realimentação **unitária**: H = 1 → (G)/(1 + G).

**De onde vem a regra 3 (Aula 1, slide 66):**

1. E = U − H·Y (somador).
2. Y = G·E.
3. Substitui: Y = G·U − G·H·Y.
4. Y·(1 + GH) = G·U → Y/U = G/(1 + GH).

## 4. Fórmulas importantes

**Truques para "desentrelaçar" (Aula 1, slides 72–75):**

- **Mover um somador para frente** de um bloco G: o sinal que entrava no somador passa a entrar **multiplicado por G**.
- **Mover uma ramificação para frente** de um bloco G: o ramo copiado precisa de **1/G** para ficar igual.
- Regra de ouro: **o sinal em cada ponto não pode mudar** depois da mudança.

**Observação de prova:** nas questões com h₁, h₂… (Diagnóstica Q5 e Processual Q3), o símbolo ∗ é **convolução** (série no tempo). Em s, a série é produto.

## 5. Exemplo resolvido

**Problema (Diagnóstica Q6 = Processual Q5):** G = (1)/(s+4) no caminho direto, H = (1)/(s) na realimentação negativa. Ache (Y(s))/(U(s)).

1. **Identificar a forma.** É realimentação → regra 3.
2. **Calcular G·H.** (1)/(s(s+4)).
3. **Montar.**

```
T = (1/(s+4))/(1 + 1/(s(s+4)))
```

4. **Simplificar.** Multiplique em cima e embaixo por s(s+4):

```
T = (s)/(s(s+4) + 1) = (s)/(s² + 4s + 1)
```

5. **Resposta:** alternativa **A**.

**Exemplo 2 (Processual Q3):** h₁ e h₂ em paralelo, depois h₃ em série, depois subtrai h₄ (em paralelo).

- Paralelo: (h₁ + h₂). Série com h₃: (h₁ + h₂) ∗ h₃. Subtrai o ramo: **(h₁ + h₂) ∗ h₃ − h₄** → alternativa **A**.

## 6. Erros comuns

- **Sinal no denominador.** Realimentação negativa → **1 + GH**. Positiva → **1 − GH**.
- **Esquecer o H.** Se o bloco de volta não for 1, ele entra no produto GH.
- **Somar blocos em série.** Série multiplica; só paralelo soma.
- **Mover bloco sem compensar.** Sempre confira se o sinal em cada ponto continua o mesmo.

## 7. O que preciso memorizar?

**Memorizar:** série × , paralelo + , realimentação G/(1 + GH).

**Entender:** a dedução da regra 3 (4 linhas). Se esquecer a fórmula, você a reconstrói.

## 8. Teste rápido

1. G = (10)/(s+1) com realimentação unitária negativa. T(s) = ?
2. Dois blocos (2)/(s) e (3)/(s+1) em série. G_eq = ?
3. Na Lista Q4, o que significa E(s) = R(s)[1 − T(s)]?

### Respostas (tente antes de ler)

1. (10)/(s + 11).
2. (6)/(s(s+1)).
3. O erro é a entrada menos a saída: E = R − C = R − R·T = R(1 − T). Ou seja, é o sinal que sai do somador, na entrada do controlador.
