# Simulado final — Sistemas de Controle I

## 1. [s01] Tópico 13 · Nível 1 — Compreensão · Objetiva

Um sistema tem polos de malha fechada em −3, −1 + j2, −1 − j2 e 0. Ele é:

- A) Estável
- B) Instável
- C) Marginalmente estável
- D) Não é possível saber

Espaço para resolução:

____________________________________________________________

____________________________________________________________

## 2. [s02] Tópico 14 · Nível 2 — Aplicação · Numérica

Denominador de MF: s³ + 2s² + 3s + 10. Quantos polos no semiplano direito?

Espaço para resolução:

____________________________________________________________

____________________________________________________________

## 3. [s03] Tópico 15 · Nível 2 — Aplicação · Numérica

G = (K)/(s(s+1)²), realimentação unitária. Qual o K máximo para estabilidade?

Espaço para resolução:

____________________________________________________________

____________________________________________________________

## 4. [s04] Tópico 16 · Nível 2 — Aplicação · Numérica

G(s) = (20)/((s+1)(s+4)), realimentação unitária, **degrau de amplitude 3**. Erro em regime?

Espaço para resolução:

____________________________________________________________

____________________________________________________________

## 5. [s05] Tópico 16 · Nível 1 — Compreensão · Objetiva

G(s) = (160(1+s))/(s²(1 + s/0,1)(1 + s + s²/2)) (normalizada). Qual o tipo e o erro à rampa?

- A) Tipo 0; ∞
- B) Tipo 1; 1/160
- C) Tipo 2; 0
- D) Tipo 2; 1/160

Espaço para resolução:

____________________________________________________________

____________________________________________________________

## 6. [s06] Tópico 11 · Nível 2 — Aplicação · Numérica

Deseja-se %UP = 10%. Qual ζ? (3 casas)

Espaço para resolução:

____________________________________________________________

____________________________________________________________

## 7. [s07] Tópico 07 · Nível 2 — Aplicação · Objetiva

G = (10)/(s(s+2)) com realimentação H = 0,5 (negativa). T(s) = ?

- A) (10)/(s² + 2s + 10)
- B) (10)/(s² + 2s + 5)
- C) (5)/(s² + 2s + 5)
- D) (10)/(s² + 2s + 0,5)

Espaço para resolução:

____________________________________________________________

____________________________________________________________

## 8. [s08] Tópico 17 · Nível 1 — Compreensão · Objetiva

Um processo com muito ruído de medição apresenta ultrapassagem alta. Qual mudança é **menos** recomendada?

- A) Reduzir K_p
- B) Reduzir K_i
- C) Aumentar bastante K_d
- D) Fazer ajuste fino com simulação

Espaço para resolução:

____________________________________________________________

____________________________________________________________

## 9. [s09] Tópico 18 · Nível 2 — Aplicação · Numérica

ZN 2: K_u = 20 e P_u = 4 s. K_i de um **PI**? (K_i = K_p/T_i)

Espaço para resolução:

____________________________________________________________

____________________________________________________________

## 10. [s10] Tópico 18 · Nível 3 — Desafio · Discursiva

Após sintonizar um PID por ZN 2, a simulação mostra %UP ≈ 44% e erro em regime nulo. Explique por que isso acontece e proponha 2 ajustes.

Espaço para resolução:

____________________________________________________________

____________________________________________________________


---

# Gabarito comentado (separado)

## 1. [s01]
<details><summary>Gabarito (tente antes)</summary>

**Resposta:** C

**Resolução:**

Um polo simples sobre o eixo jω (na origem) e o resto no SPE → **marginalmente estável**.

**Fórmula:** Classificação pelos polos

**Por que as outras estão erradas:**

- A) O polo em 0 não está no SPE.
- B) Não há polo no SPD nem repetido no eixo.
- C) Correta.
- D) Os polos bastam.

**Erros prováveis:** Achar que polo na origem é estável.

</details>

## 2. [s02]
<details><summary>Gabarito (tente antes)</summary>

**Resposta:** 2

**Resolução:**

s³: 1, 3 | s²: 2, 10 | s¹: (2·3 − 1·10)/2 = −2 | s⁰: 10. Trocas: 2 → **2 polos no SPD**.

**Fórmula:** trocas de sinal

**Erros prováveis:** Inverter o produto cruzado.

</details>

## 3. [s03]
<details><summary>Gabarito (tente antes)</summary>

**Resposta:** 2

**Resolução:**

MF: s³ + 2s² + s + K. s¹: (2·1 − K)/2 > 0 → K  0. **0 < K < 2** (Aula 3, slide 33).

**Fórmula:** 1ª coluna > 0

**Erros prováveis:** Esquecer K > 0.

</details>

## 4. [s04]
<details><summary>Gabarito (tente antes)</summary>

**Resposta:** 0,5

**Resolução:**

Estável (s² + 5s + 24). Tipo 0, G_N = 20/4 = 5. Degrau unitário: 1/(1+5) = 1/6. Amplitude 3: **3/6 = 0,5**.

**Fórmula:** e = A/(1 + G_N)

**Erros prováveis:** Esquecer a amplitude do degrau.

</details>

## 5. [s05]
<details><summary>Gabarito (tente antes)</summary>

**Resposta:** C

**Resolução:**

s² no denominador → **tipo 2**. Rampa em tipo 2 → **0** (parábola daria 1/160). Supondo MF estável.

**Fórmula:** Tabela tipo × entrada

**Por que as outras estão erradas:**

- A) Há dois integradores.
- B) São dois polos na origem, não um.
- C) Correta.
- D) 1/G_N é para a parábola.

**Erros prováveis:** Confundir ordem com tipo.

</details>

## 6. [s06]
<details><summary>Gabarito (tente antes)</summary>

**Resposta:** 0,591

**Resolução:**

ζ = −ln(0,1)/√(π² + ln²0,1) = 2,303/√(9,870 + 5,302) = 2,303/3,895 ≈ **0,591**.

**Fórmula:** ζ = −ln(%UP/100)/√(π² + ln²(%UP/100))

**Erros prováveis:** Usar ln(10) em vez de ln(0,1).

</details>

## 7. [s07]
<details><summary>Gabarito (tente antes)</summary>

**Resposta:** B

**Resolução:**

T = G/(1 + GH) = (10/(s(s+2)))/(1 + 5/(s(s+2))) = (10)/(s² + 2s + 5).

**Fórmula:** T = G/(1 + GH)

**Por que as outras estão erradas:**

- A) Usou H = 1.
- B) Correta.
- C) Multiplicou o numerador por H também.
- D) Somou H em vez de GH.

**Erros prováveis:** Esquecer o H.

</details>

## 8. [s08]
<details><summary>Gabarito (tente antes)</summary>

**Resposta:** C

**Resolução:**

O D reduz %UP, mas **amplifica ruído** (Aula 4, slide 60). Com ruído alto, aumentar muito K_d piora o sinal de controle.

**Fórmula:** Tabela de efeitos

**Por que as outras estão erradas:**

- A) Reduz %UP.
- B) Reduz %UP.
- C) Correta (é a menos recomendada).
- D) Sempre recomendável.

**Erros prováveis:** Esquecer a sensibilidade do D a ruído.

</details>

## 9. [s09]
<details><summary>Gabarito (tente antes)</summary>

**Resposta:** 2,7

**Resolução:**

K_p = 0,45·20 = 9. T_i = 4/1,2 ≈ 3,333 s. K_i = 9/3,333 = **2,7 s⁻¹**.

**Fórmula:** PI: 0,45K_u; P_u/1,2

**Erros prováveis:** Usar a linha do PID.

</details>

## 10. [s10]
<details><summary>Gabarito (tente antes)</summary>

**Resolução:**

ZN mira uma resposta agressiva (decaimento de ~1/4 por ciclo), então %UP alto é esperado; o erro é nulo porque o I adiciona um integrador. Ajustes: (1) reduzir K_p e/ou K_i (aumentar T_i) para diminuir a ultrapassagem; (2) aumentar levemente K_d (se não houver ruído) ou usar a tabela ZN modificada 'sem sobressinal' (0,2K_u; P_u/2; P_u/3). Conferir na simulação.

**Fórmula:** Tabela de efeitos + ZN modificado

**Erros prováveis:** Propor aumentar K_p.

</details>
