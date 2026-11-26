# Tópico 06 — Função de transferência

- **Bloco:** Modelagem
- **Importância:** Essencial · **Dificuldade:** Média · **Tempo:** 20 min
- **Pré-requisitos:** 02, 04
- **Relação:** Base de todo o resto: diagramas (07), polos (08), resposta (09–12), estabilidade (13–15)
- **Fontes:** Aula 1, slides 55–62 (circuito RC) · Diagnóstica Q1, Q3a, Q8 · Processual 1º bim Q1a, Q9 · Playlist A.03 (0:25 definição) e A.04 (2:35 massa-mola) · Nise, cap. 2
- **Áudio:** ../audios/topico-06.mp3

## 1. O que vou aprender?

Montar a **função de transferência G(s) = Saída(s) / Entrada(s)** de um sistema simples (circuito ou massa-mola).

## 2. Antes de começar

- Derivada vira "vezes s" (tópico 02).
- Leis básicas de circuitos: V = R·i, V_L = L·di/dt, i_C = C·dv/dt.

## 3. Entendendo o conceito

**Analogia:** a FT é a "receita" do sistema. Você entrega um ingrediente (entrada), ela diz o prato que sai (saída).

**Definição (Aula 1):** a relação entre a saída e a entrada, no domínio de Laplace, com **condições iniciais nulas**.

```
G(s) = (C(s))/(R(s))
```

Ela **não depende da entrada**. Só do sistema.

**Atalho para circuitos — impedâncias em s:**

| Componente | Impedância Z(s) |
|---|---|
| Resistor R | R |
| Indutor L | sL |
| Capacitor C | (1)/(sC) |

Com elas, o circuito vira um "circuito de resistores" e você usa divisor de tensão normalmente.

## 4. Fórmulas importantes

**Da equação diferencial para a FT:**

1. Troque cada derivada d/dt por s (y'' → s²Y, y' → sY).
2. Coloque Y(s) e X(s) em evidência.
3. Divida.

**Exemplo genérico (Diagnóstica Q1):** 2y'' + y' + 6y = x

```
(2s² + s + 6)·Y(s) = X(s) → G(s) = (1)/(2s² + s + 6)
```

**Massa-mola-amortecedor (Processual Q9):**

```
G(s) = (X(s))/(F(s)) = (1)/(Ms² + Bs + k)
```

- M: massa (kg); B: amortecimento (N·s/m); k: mola (N/m).

## 5. Exemplo resolvido

**Problema (Aula 1, slides 55–62):** circuito RC série. Entrada V(s), saída V_C(s). Ache a FT.

1. **Impedâncias.** Resistor: R. Capacitor: 1/(sC).
2. **Divisor de tensão.** A tensão no capacitor é a fração da impedância dele sobre o total:

```
V_C(s) = V(s) · (1/(sC))/(R + 1/(sC))
```

3. **Simplificar.** Multiplique em cima e embaixo por sC:

```
G(s) = (V_C(s))/(V(s)) = (1)/(RCs + 1)
```

4. **Interpretar.** É um sistema de 1ª ordem com constante de tempo τ = RC (tópico 09).

**Exemplo 2 (Processual Q9):** M = 20 kg, k = 320 N/m. Qual B deixa o sistema **criticamente amortecido**?

1. Forma: 20s² + Bs + 320.
2. Criticamente amortecido = raízes reais **iguais** → Δ = 0.
3. B² − 4·20·320 = 0 → B² = 25 600 → **B = 160 N·s/m**.

## 6. Erros comuns

- **Inverter a fração.** FT é **saída sobre entrada**. Confira qual é qual no enunciado.
- **Esquecer "condições iniciais nulas".** Em pergunta conceitual, isso faz parte da definição.
- **Capacitor como sC.** É **1/(sC)**. O indutor é que é sL.

## 7. O que preciso memorizar?

**Memorizar:**
- G = saída/entrada, condições iniciais nulas.
- Z_R = R, Z_L = sL, Z_C = 1/(sC).

**Entender:** o denominador da FT é a "equação característica". Ele decide polos e estabilidade.

## 8. Teste rápido

1. FT de y'' + 3y' + 2y = 5x?
2. Circuito RL série, saída tensão no resistor. FT?
3. O que representa uma função de transferência? (Processual Q1a)

### Respostas (tente antes de ler)

1. (5)/(s² + 3s + 2).
2. (R)/(Ls + R).
3. A relação entre a saída e a entrada de um sistema LTI no domínio de Laplace, com condições iniciais nulas. Ela descreve a dinâmica do sistema, independente da entrada aplicada.
