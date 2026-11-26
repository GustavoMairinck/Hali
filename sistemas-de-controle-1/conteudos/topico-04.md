# Tópico 04 — Sinais de teste e resposta ao impulso

- **Bloco:** Pré-requisitos de Sinais e Sistemas
- **Importância:** Importante · **Dificuldade:** Baixa · **Tempo:** 10 min
- **Pré-requisitos:** 02
- **Relação:** Entradas usadas em resposta no tempo (09–11) e erro em regime (16)
- **Fontes:** Aula 4, slide 5 "Sinais de teste" · Avaliação Diagnóstica Q3 e Processual 1º bim Q1 · Playlist A.01 (11:15) e A.17 (1:42)
- **Áudio:** ../audios/topico-04.mp3

## 1. O que vou aprender?

Reconhecer os **4 sinais de teste** e saber o que é **resposta ao impulso**. Isso já caiu duas vezes (Diagnóstica Q3 e Processual Q1).

## 2. Antes de começar

Tabela de Laplace (tópico 02).

## 3. Entendendo o conceito

**Analogia:** para testar um carro, você não dirige "qualquer coisa". Você faz testes padrão: arrancada, velocidade constante, curva. Em controle é igual. Usamos **entradas padrão** para comparar sistemas.

| Sinal | No tempo | Laplace | Representa |
|---|---|---|---|
| Impulso | δ(t) | 1 | um "chute" rápido |
| Degrau | u(t) | (1)/(s) | **posição constante** (ex.: mudar o setpoint) |
| Rampa | t·u(t) | (1)/(s²) | **velocidade constante** (ex.: seguir um alvo que anda) |
| Parábola | ½t²·u(t) | (1)/(s³) | **aceleração constante** |

Fonte dos nomes "posição/velocidade/aceleração": Aula 4, slide 5.

**Sistema LTI:** linear e invariante no tempo. Na prática: dobrar a entrada dobra a saída, e o sistema não muda com o tempo. Toda a matéria assume LTI.

**Resposta ao impulso h(t):** é a saída quando a entrada é um impulso.

- Como L{δ} = 1, a saída é **Y(s) = G(s)·1 = G(s)**.
- Então: **a resposta ao impulso é a própria função de transferência, no tempo**.
- Ela é a "impressão digital" do sistema.

## 4. Fórmulas importantes

**Resposta para qualquer entrada:**

```
Y(s) = G(s) · X(s)
```

- No tempo isso seria uma **convolução** y = h ∗ x (difícil). Em s vira **multiplicação** (fácil).

**Resposta ao impulso:**

```
h(t) = L⁻¹{ G(s) }
```

## 5. Exemplo resolvido

**Problema (Diagnóstica Q7, itens a e b):** h(t) = t·e^(−5t)·u(t) e entrada x(t) = t·u(t). Ache H(s), X(s) e Y(s).

1. **H(s).** Base t → (1)/(s²). Com e^(−5t): (1)/((s+5)²).
2. **X(s).** Rampa → (1)/(s²).
3. **Y(s) = H·X.**

```
Y(s) = (1)/(s²(s+5)²)
```

4. **Item c (y(t))** sai por frações parciais. Resolvido no tópico 03.

## 6. Erros comuns

- **Confundir rampa com degrau.** Degrau = valor fixo; rampa = cresce sem parar.
- **Esquecer o ½ da parábola.** A transformada 1/s³ é de **½t²**, não de t².
- **Achar que resposta ao impulso é "a saída com entrada 1".** É com entrada **δ(t)**, cuja transformada é 1.

## 7. O que preciso memorizar?

**Memorizar:** a tabela dos 4 sinais e o que cada um representa.

**Entender:** h(t) ↔ G(s) são a mesma informação.

## 8. Teste rápido

1. Qual sinal de teste representa "velocidade constante"?
2. Se G(s) = (3)/(s+2), qual a resposta ao impulso?
3. Como obter a resposta ao impulso de um sistema? (pergunta de prova)

### Respostas (tente antes de ler)

1. A **rampa**.
2. h(t) = **3·e^(−2t)**.
3. Aplica-se um impulso na entrada (ou calcula-se a transformada inversa de G(s)). Ela representa o comportamento natural do sistema e contém toda a sua dinâmica.
