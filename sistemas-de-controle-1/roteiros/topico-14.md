# Roteiro do áudio — Tópico 14: Critério de Routh-Hurwitz

Duração do MP3: 3 min 22 s

Episódio catorze. O critério de Routh-Hurwitz.



Meta: montar a tabela de Routh e contar quantos polos estão no lado direito, sem calcular nenhuma raiz.



Pensa no Routh como um detector de sinais. Ele não diz onde estão os polos. Ele diz de que lado eles estão. E a regra final é uma frase só: o número de polos no semiplano direito é igual ao número de trocas de sinal na primeira coluna. Sem troca, o sistema é estável.



Como montar. Pega o denominador de malha fechada, por exemplo s à quarta mais dois s ao cubo mais três s ao quadrado mais quatro s mais cinco.

A primeira linha recebe os coeficientes pulando um: um, três e cinco.

A segunda linha recebe os que sobraram: dois, quatro, e completa com zero.

Da terceira linha em diante, cada elemento é calculado assim: o pivô de baixo vezes o elemento de cima à direita, menos o pivô de cima vezes o elemento de baixo à direita, tudo dividido pelo pivô de baixo. O pivô é o primeiro número de cada linha.



Vamos fazer juntos, é a questão dois da lista.

Linha s quadrado, primeiro elemento: dois vezes três, menos um vezes quatro, dividido por dois. Seis menos quatro, dois, dividido por dois: um.

Segundo elemento: dois vezes cinco, menos um vezes zero, dividido por dois: cinco.

Linha s um: um vezes quatro, menos dois vezes cinco, dividido por um. Quatro menos dez: menos seis.

Linha s zero: dá cinco.

A primeira coluna fica: um, dois, um, menos seis, cinco.

Trocas: de um para menos seis, uma. De menos seis para cinco, duas.

Conclusão: instável, com dois polos no semiplano direito. Eu conferi no computador: as raízes são menos um vírgula dois nove mais ou menos jota zero vírgula oito seis, e mais zero vírgula dois nove mais ou menos jota um vírgula quatro dois.



Uma dica do vídeo da playlist: você pode multiplicar ou dividir uma linha inteira por um número positivo para facilitar. Os sinais não mudam. O professor fez isso no exemplo do slide vinte e oito, dividindo uma linha por dez.



Casos especiais, que o professor deixou para casa. Zero só no primeiro elemento de uma linha: troca por épsilon, um número pequeno positivo, e continua. Linha inteira de zeros: monta o polinômio auxiliar com a linha de cima, deriva, e usa os coeficientes da derivada. Isso indica raízes simétricas, muitas vezes sobre o eixo imaginário.



Erros comuns: usar o denominador de malha aberta; contar números negativos em vez de contar trocas; errar a ordem da conta do elemento; e esquecer o zero que completa a linha.





Um último detalhe que evita erro bobo. Antes de montar a tabela, confira se você está usando o denominador de malha fechada. Se a questão der G em malha aberta com realimentação unitária, some o numerador de G ao denominador de G. Foi assim que o professor fez com mil sobre s mais dois vezes s mais três vezes s mais cinco: o denominador virou s ao cubo mais dez s ao quadrado mais trinta e um s mais mil e trinta. E, depois de contar as trocas, escreva a conclusão completa: estável ou instável, e quantos polos estão no semiplano direito.



Resumo: duas primeiras linhas pulando coeficientes. Elemento é o produto cruzado dividido pelo pivô de baixo. Trocas na primeira coluna são polos no lado direito.



Pergunta: primeira coluna um, cinco, dois, sete. Quantos polos no lado direito? Nenhuma troca. Zero. Estável.
