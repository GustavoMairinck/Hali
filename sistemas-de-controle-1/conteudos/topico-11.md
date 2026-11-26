# Tópico 11 — 2ª ordem subamortecido — Tp, %UP, Ts e Tr

- **Bloco:** Resposta no tempo
- **Importância:** Essencial · **Dificuldade:** Alta · **Tempo:** 30 min
- **Pré-requisitos:** 10
- **Relação:** Especificações usadas em projeto (15, 17, 18) e na avaliação processual (tabela de Tr, Ts, overshoot)
- **Fontes:** Aula 2, slides 64–95 · Processual 1º bim Q8 e Q10 · Playlist A.11 (4:35 Tp; 6:01 %UP; 7:32 Ts; 9:02 exemplo; 15:06 G(s) a partir do gráfico) · Nise, seção 4.6
- **Áudio:** ../audios/topico-11.mp3

## 1. O que vou aprender?

Calcular as **4 especificações** da resposta subamortecida: **T_p, %UP, T_s, T_r**. E fazer o caminho de volta: dado %UP e T_s, achar ζ e ωₙ.

## 2. Antes de começar

ζ e ωₙ (tópico 10). Calculadora com ln e e^(x).

## 3. Entendendo o conceito

**O que cada especificação mede (Aula 2, slides 67–71):**

- **T_r (subida):** tempo de 10% a 90% do valor final. "Quão rápido arranca."
- **T_p (instante de pico):** tempo até o **primeiro e maior** pico.
- **%UP (ultrapassagem / overshoot / sobressinal):** quanto passou do valor final, em %.
- **T_s (acomodação):** tempo para entrar e **ficar** na faixa de ±2%.

**Olhando os polos −σ_d ± jω_d (Aula 2, slides 84–88):**

- **ω_d** (parte imaginária) = frequência da oscilação → define **T_p**.
- **σ_d** (parte real) = velocidade do decaimento → define **T_s**.
- **Ângulo θ** (cos θ = ζ) → define **%UP**. Polos na mesma "reta radial" têm o **mesmo %UP**.

## 4. Fórmulas importantes

```
ω_d = ωₙ√(1 − ζ²)   ·   σ_d = ζωₙ
```

| Especificação | Fórmula | Depende de |
|---|---|---|
| Instante de pico | T_p = (π)/(ω_d) = (π)/(ωₙ√(1−ζ²)) | parte imaginária |
| Ultrapassagem | %UP = 100·e^(−ζπ/√(1−ζ²)) | **só ζ** |
| Acomodação (2%) | T_s = (4)/(ζωₙ) = (4)/(σ_d) | parte real |
| Subida | sem fórmula exata → **simulação** (Aula 2, slide 81) | — |

**Caminho de volta (Aula 2, slide 77):**

```
ζ = (−ln(%UP/100))/(√(π² + ln²(%UP/100)))
```

**T_r aproximado (Playlist A.12, 12:00; Nise):** ωₙ·T_r ≈ 1,76ζ³ − 0,417ζ² + 1,039ζ + 1. O professor resolve T_r **no Matlab**.

## 5. Exemplo resolvido

**Problema (Aula 2, slide 82):** G(s) = (100)/(s² + 15s + 100). Ache T_p, %UP, T_s, T_r.

1. **ωₙ e ζ.** ωₙ = √100 = 10 rad/s. ζ = 15/(2·10) = **0,75**.
   - *Por quê primeiro:* toda fórmula usa esses dois.
2. **√(1 − ζ²).** √(1 − 0,5625) = √0,4375 ≈ **0,661**.
3. **T_p.** π / (10·0,661) ≈ **0,475 s**.
4. **%UP.** Expoente: −0,75·π/0,661 ≈ −3,56. e^(−3,56) ≈ 0,0284 → **≈ 2,8%**.
5. **T_s.** 4/(0,75·10) = **0,533 s**.
6. **T_r.** Pela aproximação: 2,287/10 ≈ **0,229 s** (simulação dá 0,229 s).

> Conferido por simulação: T_p = 0,475 s, %UP = 2,84%. O T_s simulado (0,57 s) é um pouco maior que 4/ζωₙ porque a fórmula é uma aproximação.

**Problema 2 (Aula 2, slides 89–90):** polos em −3 ± j7.

- θ = tan⁻¹(7/3) = 1,166 rad → ζ = cos θ = **0,394**; ωₙ = 3/ζ = **7,62 rad/s**.
- T_p = π/7 = **0,45 s**; %UP = **26%**; T_s = 4/3 = **1,33 s**.

**Problema 3 — caminho de volta (Aula 2, slides 91–94):** quer %UP = 20% e T_s = 2 s.

1. ζ = −ln(0,2)/√(π² + ln²0,2) ≈ **0,456**.
2. T_s = 4/(ζωₙ) = 2 → ωₙ = 4/(2·0,456) ≈ **4,39 rad/s**.

## 6. Erros comuns

- **Usar ωₙ no T_p.** É **ω_d** (parte imaginária), não ωₙ.
- **Esquecer o 100 ou o sinal no ln.** ln(0,2) é negativo; o ζ sai positivo por causa do "−".
- **Achar que %UP depende de ωₙ.** **Não**: só de ζ.
- **Aplicar as fórmulas em sistema com ζ ≥ 1 ou com 3 polos/zeros sem checar.** Elas valem para 2ª ordem pura subamortecida (ver tópico 12).
- **Ler o valor final errado no gráfico.** %UP é relativo ao **valor final**, não a 1.

## 7. O que preciso memorizar?

**Memorizar (vão na folha A4):** T_p = π/ω_d, T_s = 4/ζωₙ, %UP e a fórmula inversa do ζ.

**Entender:** parte real ↔ T_s; parte imaginária ↔ T_p; ângulo ↔ %UP.

## 8. Teste rápido

1. G(s) = (361)/(s² + 16s + 361) (Processual Q10). Ache ζ, ωₙ e T_s.
2. Se eu aumento só a parte real dos polos (mais à esquerda), o que acontece com T_s e T_p?
3. ζ para %UP = 10%?

### Respostas (tente antes de ler)

1. ωₙ = 19 rad/s; ζ = 16/38 ≈ **0,421**; T_s = 4/8 = **0,5 s**. (T_p ≈ 0,182 s; %UP ≈ 23,3%.)
2. T_s **diminui** (σ maior). T_p **não muda** (ω_d igual). %UP diminui (ângulo menor).
3. ζ ≈ **0,59**.
