# Tópico 10 — Sistemas de 2ª ordem — ζ, ωₙ e os 4 tipos de resposta

- **Bloco:** Resposta no tempo
- **Importância:** Essencial · **Dificuldade:** Média · **Tempo:** 20 min
- **Pré-requisitos:** 01, 08, 09
- **Relação:** Base para o subamortecido (11), polos dominantes (12) e para ler respostas de PID (17–18)
- **Fontes:** Aula 2, slides 40–63 · Processual 1º bim Q8, Q9 e Simulação Parte 2 · Playlist A.10 (9:06 fator de amortecimento; 10:31 forma geral) e Prática 2 · Nise, seção 4.4–4.5
- **Áudio:** ../audios/topico-10.mp3

## 1. O que vou aprender?

Olhar para (b)/(s² + as + b) e dizer, em 30 segundos, **qual o tipo de resposta**: sub, sobre, criticamente ou não amortecida.

## 2. Antes de começar

Raízes complexas (01) e o que polos significam (08).

## 3. Entendendo o conceito

**Analogia:** um carro passando num quebra-molas.

- **Amortecedor novo** (ζ ≥ 1): o carro desce e para. Sem balançar.
- **Amortecedor gasto** (0  1 | reais e **diferentes** | **superamortecida**: lenta, sem ultrapassar |

## 4. Fórmulas importantes

**Forma geral (Aula 2, slide 57):**

```
G(s) = (K·ωₙ²)/(s² + 2ζωₙ·s + ωₙ²)
```

**Comparando com (b)/(s² + as + b):**

```
ωₙ = √b   ·   ζ = (a)/(2√b)
```

- Fonte: Aula 2, slides 52–54 e 63 (a fórmula ζ = a / 2√b está em destaque no slide 63).

**Polos em função de ζ e ωₙ:**

```
s = −ζωₙ ± ωₙ√(ζ² − 1)
```

**Ganho K:** valor final para degrau unitário = G(0).

## 5. Exemplo resolvido

**Problema (Aula 2, slide 56):** G(s) = (36)/(s² + 4,2s + 36). Ache ζ e ωₙ.

1. **ωₙ.** b = 36 → ωₙ = √36 = **6 rad/s**.
2. **ζ.** a = 4,2 → ζ = 4,2 / (2·6) = **0,35**.
3. **Classificar.** 0  1 → não / sub / crítico / super.

**Entender:** ζ decide a **forma**; ωₙ decide a **escala de tempo**.

## 8. Teste rápido

1. (25)/(s² + 10s + 25) — tipo de resposta?
2. (9)/(s² + 9) — tipo?
3. Por que o criticamente amortecido é o "mais rápido sem ultrapassagem"?

### Respostas (tente antes de ler)

1. ωₙ = 5, ζ = 10/10 = **1** → criticamente amortecido.
2. a = 0 → ζ = 0 → **não amortecido** (polos ±j3, oscila para sempre).
3. Com ζ  1 um dos polos fica mais perto da origem e a resposta fica lenta. ζ = 1 é a fronteira.
