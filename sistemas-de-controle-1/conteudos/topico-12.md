# Tópico 12 — Polos adicionais e zeros (polos dominantes)

- **Bloco:** Resposta no tempo
- **Importância:** Complementar · **Dificuldade:** Média · **Tempo:** 15 min
- **Pré-requisitos:** 11
- **Relação:** Justifica usar fórmulas de 2ª ordem em sistemas maiores; explica o efeito dos zeros do PID (17)
- **Fontes:** Aula 2, slides 96–105 · Playlist A.12 (1:33 polo adicional; 4:37 zero) · Nise, seções 4.7–4.8
- **Áudio:** ../audios/topico-12.mp3

## 1. O que vou aprender?

Saber **quando** posso usar as fórmulas de 2ª ordem num sistema de 3ª ordem (ou com zero), e **o que um zero faz** com a resposta.

## 2. Antes de começar

Especificações de 2ª ordem (tópico 11).

## 3. Entendendo o conceito

**Polos dominantes.** Num sistema com 3 polos, o polo que está **muito à esquerda** gera um termo que some muito rápido. Depois de pouco tempo, só "sobram" os dois polos mais perto do eixo. Eles **dominam** a resposta.

**Analogia:** numa corrida de revezamento, um corredor muito rápido quase não altera o tempo total. O tempo é decidido pelos mais lentos.

**Zero no semiplano esquerdo:** deixa a resposta **mais rápida** e com **mais ultrapassagem** (Aula 2, slide 102). Quanto mais perto dos polos dominantes, maior o efeito.

**Zero no semiplano direito:** a resposta **começa indo para o lado errado** antes de subir. Isso se chama **sistema de fase não mínima** (Aula 2, slides 103–104). Exemplo físico: um avião que perde um pouco de altitude no começo da subida.

## 4. Fórmulas importantes

**Regra dos 5× (Aula 2, slide 98):**

```
|polo extra| ≥ 5 · |parte real dos polos dominantes| → pode aproximar por 2ª ordem
```

**Efeito do zero (Aula 2, slide 101):**

```
(s + a)·C(s) = s·C(s) + a·C(s)
```

- s·C(s) = **derivada** da resposta original.
- a·C(s) = resposta original **em escala**.
- Zero muito longe (a grande) → domina a parte "em escala" → efeito pequeno.

## 5. Exemplo resolvido

**Problema:** G(s) = (K)/((s² + 4s + 25)(s + 20)). Posso usar as fórmulas de 2ª ordem?

1. **Polos dominantes.** s² + 4s + 25 → −2 ± j4,58. Parte real: −2.
2. **Polo extra.** −20.
3. **Comparar.** 20 ≥ 5·2 = 10 → **sim**, pode aproximar.
4. **Usar o 2º ordem.** ωₙ = 5, ζ = 0,4 → %UP ≈ 25%; T_s ≈ 4/2 = 2 s.

**Problema 2 (Aula 2, slide 105):** (185,71(s+7))/((s+6,5)(s+10)(s+20)).

- O zero em −7 fica quase em cima do polo em −6,5. Eles praticamente se **cancelam**.
- Sobram polos em −10 e −20 → comportamento parecido com 2ª ordem **superamortecida**.
- Mas o cancelamento não é perfeito, então o professor pede para **conferir no Matlab**.

## 6. Erros comuns

- **Comparar com o módulo do polo complexo.** A regra usa a **parte real** (ζωₙ), não ωₙ.
- **Esquecer o ganho no cancelamento.** Ao "cortar" um polo distante, o ganho DC muda (Playlist A.12, 9:06). Confira G(0).
- **Achar que zero no SPD causa instabilidade.** Não causa: muda só o formato inicial.

## 7. O que preciso memorizar?

**Memorizar:** regra dos 5×; zero no SPD = fase não mínima.

**Entender:** zero = derivada + escala.

## 8. Teste rápido

1. Polos em −1 ± j2 e −3. Pode aproximar por 2ª ordem?
2. Adicionar um zero perto dos polos dominantes aumenta ou diminui o %UP?
3. O que é um sistema de fase não mínima?

### Respostas (tente antes de ler)

1. **Não.** 3 < 5·1 = 5.
2. **Aumenta** (e o T_r diminui).
3. Sistema com **zero no semiplano direito**; a resposta ao degrau começa no sentido oposto ao do valor final.
