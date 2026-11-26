# Mapa de aprendizagem

Ordem por dependência entre conceitos (não pela ordem dos vídeos).

## A. Pré-requisitos de Sinais e Sistemas

Só o necessário: números complexos, Laplace com a tabela simplificada, frações parciais e sinais de teste.

| Tópico | Pré-requisitos | Importância | Dificuldade | Relação |
|---|---|---|---|---|
| 01. Números complexos e o plano s | nenhum | Essencial | Baixa | Base para polos e zeros (08), 2ª ordem (10–11) e estabilidade (13) |
| 02. Transformada de Laplace — tabela e propriedades | 01 | Essencial | Média | Usada em função de transferência (06), resposta no tempo (08–11) e erro em regime (16) |
| 03. Frações parciais e transformada inversa | 02 | Importante | Média | Usada para achar c(t) em polos e zeros (08) e na resposta de 1ª/2ª ordem (09–11) |
| 04. Sinais de teste e resposta ao impulso | 02 | Importante | Baixa | Entradas usadas em resposta no tempo (09–11) e erro em regime (16) |

## B. Fundamentos e modelagem

Vocabulário, função de transferência e diagramas de blocos.

| Tópico | Pré-requisitos | Importância | Dificuldade | Relação |
|---|---|---|---|---|
| 05. O que é um sistema de controle | nenhum | Importante | Baixa | Vocabulário usado em todo o curso; base para diagramas de blocos (07) e controladores (17) |
| 06. Função de transferência | 02, 04 | Essencial | Média | Base de todo o resto: diagramas (07), polos (08), resposta (09–12), estabilidade (13–15) |
| 07. Diagrama de blocos e redução | 06 | Essencial | Média | Gera a FT de malha fechada usada em estabilidade (13–15) e erro (16) |

## C. Resposta no tempo (1º bimestre)

Polos e zeros, 1ª ordem, 2ª ordem, especificações e polos dominantes.

| Tópico | Pré-requisitos | Importância | Dificuldade | Relação |
|---|---|---|---|---|
| 08. Polos, zeros e resposta forçada × natural | 01, 03, 06 | Essencial | Média | Base para 1ª e 2ª ordem (09–11), polos adicionais (12) e estabilidade (13) |
| 09. Sistemas de 1ª ordem | 08 | Essencial | Baixa | Modelo mais simples; base para 2ª ordem (10) e para a curva de reação de Ziegler-Nichols (18) |
| 10. Sistemas de 2ª ordem — ζ, ωₙ e os 4 tipos de resposta | 01, 08, 09 | Essencial | Média | Base para o subamortecido (11), polos dominantes (12) e para ler respostas de PID (17–18) |
| 11. 2ª ordem subamortecido — Tp, %UP, Ts e Tr | 10 | Essencial | Alta | Especificações usadas em projeto (15, 17, 18) e na avaliação processual (tabela de Tr, Ts, overshoot) |
| 12. Polos adicionais e zeros (polos dominantes) | 11 | Complementar | Média | Justifica usar fórmulas de 2ª ordem em sistemas maiores; explica o efeito dos zeros do PID (17) |

## D. Estabilidade (2º bimestre)

Conceito, atalhos, Routh-Hurwitz e faixa de K.

| Tópico | Pré-requisitos | Importância | Dificuldade | Relação |
|---|---|---|---|---|
| 13. Estabilidade — conceito e atalhos | 01, 08 | Essencial | Baixa | Pré-condição para erro em regime (16); base do Routh-Hurwitz (14–15) e de Ziegler-Nichols 2 (18) |
| 14. Critério de Routh-Hurwitz | 13 | Essencial | Média | Ferramenta para faixa de K (15) e para achar o ganho crítico Ku de Ziegler-Nichols (18) |
| 15. Routh no projeto — faixa de K para estabilidade | 14 | Essencial | Média | Usado no 2º método de Ziegler-Nichols (achar Ku, tópico 18) e na avaliação processual (item II "encontrar o limite") |

## E. Erro em regime e controladores (2º bimestre)

Erro em regime, ações P/I/D/PID e sintonia de Ziegler-Nichols.

| Tópico | Pré-requisitos | Importância | Dificuldade | Relação |
|---|---|---|---|---|
| 16. Erro em regime permanente | 02, 07, 13 | Essencial | Alta | Especificação de projeto; explica por que a ação integral (17) zera o erro ao degrau |
| 17. Ações de controle — on-off, P, I, D e PID | 11, 16 | Essencial | Média | Base para sintonia por Ziegler-Nichols (18) e para a avaliação processual do 2º bimestre |
| 18. Sintonia de PID por Ziegler-Nichols | 09, 15, 17 | Essencial | Média | Fecha a disciplina; é o tema da avaliação processual do 2º bimestre e da Lista Q8 |

## Pré-requisitos de Sinais e Sistemas (só o necessário)

| Pré-requisito | O que é / por que aprender | Onde será usado | Profundidade para a prova |
|---|---|---|---|
| Números complexos e plano s | Ler polos como pontos de um mapa. | Polos/zeros, 2ª ordem, estabilidade, Routh. | Saber parte real/imaginária, módulo, ângulo e as 3 regiões. Sem álgebra complexa avançada. |
| Transformada de Laplace | Transforma equações diferenciais em álgebra; toda FT vive em s. | FT, resposta no tempo, erro em regime (teorema do valor final). | Tabela simplificada + linearidade + deslocamento em frequência + derivada. Não precisa da integral de definição. |
| Frações parciais / inversa | Volta de C(s) para c(t). | Resposta forçada × natural; Diagnóstica Q2/Q7. | Raízes simples (regra do tampar) e noção de raiz repetida. |
| Sinais de teste e resposta ao impulso | Entradas padrão para comparar sistemas. | Resposta ao degrau, erro em regime. | Saber as 4 transformadas e que h(t) = L⁻¹{G(s)}. Convolução só como ideia. |
