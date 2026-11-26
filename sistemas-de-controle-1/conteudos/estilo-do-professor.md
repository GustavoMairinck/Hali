# Estilo de ensino do Prof. Matheus (com base nas evidências)

## Como ele apresenta um conceito novo

1. **Pergunta ou imagem de abertura.** Ex.: "tornado × aeronave — qual a diferença?" (Aula 1).
2. **Definição curta** em destaque.
3. **Fórmula em caixa** (muitas vezes com borda vermelha: ζ = a/2√b, %UP, T<sub>s</sub> = 4/ζωₙ).
4. **Exemplo resolvido** do Nise.
5. **"Conferindo no Matlab…"** — quase todo exemplo termina com simulação.

**Teoria ou exemplo primeiro?** Teoria curta primeiro, exemplo logo depois. Aula 1 usa mais analogias (máquina de lavar, dirigir de olhos fechados); Aulas 2–4 são mais diretas.

## Fórmulas e métodos que ele mais usa

- Redução de blocos com **G/(1 + GH)** (deduzida no slide).
- 1ª ordem na forma **a/(s + a)**: T<sub>r</sub> = 2,2/a, T<sub>s</sub> = 4/a.
- 2ª ordem comparando com **b/(s² + as + b)**: ωₙ = √b, ζ = a/2√b.
- **Routh** com tabela completa e faixa de K.
- Erro em regime com **normalização (G<sub>N</sub>)** e tabela tipo × entrada.
- Controladores: tabela de efeitos de K<sub>p</sub>, K<sub>i</sub>, K<sub>d</sub>; formas discretas u(n).
- Ziegler-Nichols: tabelas dos dois métodos + versão modificada.

## Tipos de questão observados

| Tipo | Exemplos reais |
|---|---|
| Discursiva conceitual | "O que representa uma FT?", "Defina degrau, rampa e impulso", "Diferença entre malha aberta e fechada", "Explique os métodos de ZN" |
| Objetiva (5 alternativas) | mapa de polos → H(s); redução de blocos h₁…h₄; FT com realimentação; estabilidade de G(s); comparação de 1ª ordem |
| Cálculo | ζ, ωₙ, T<sub>p</sub>, %UP, T<sub>s</sub>, T<sub>r</sub>; B para amortecimento crítico; Routh; faixa de K; erro em regime |
| Interpretação de gráfico | 4 respostas de 2ª ordem (classificar) |
| Simulação (processual) | Matlab: variar K, τ, ζ, ωₙ; sintonizar PID por ZN |

## Padrões que ajudam a estudar

- **Reaproveitamento:** a Processual do 1º bim repetiu 4 questões da Diagnóstica. *(observado)*
- **A lista antecipa a prova:** a Lista do 2º bim tem cabeçalho "Data da Prova 20/11". *(observado)* Que a prova do 2º bim siga a lista é **hipótese**.
- **Ele valoriza saber explicar:** quase metade das questões da lista é discursiva. *(observado)*
- **Ele cobra interpretação de resultado:** "o que acontece com o valor final quando K aumenta?", "por que fazer ajuste fino?". *(observado)*

## Como usar isso

1. Treine **escrever** respostas curtas para as perguntas conceituais (teste rápido de cada tópico).
2. Para cálculo, siga sempre o mesmo roteiro: identificar a forma → extrair parâmetros → aplicar a fórmula → interpretar.
3. Leve a folha A4 com as **tabelas** (Routh, erro, efeitos P/I/D, ZN): são o que ele mais usa.
