# Roteiro do áudio — Tópico 13: Estabilidade — conceito e atalhos

Duração do MP3: 3 min 01 s

Episódio treze. Estabilidade: conceito e atalhos.



O professor diz que estabilidade é a especificação mais importante. O motivo é simples: se o sistema é instável, não adianta falar de tempo de resposta nem de erro. Ele simplesmente não funciona.



A imagem que ele usa é a de uma bolinha. Dentro de uma tigela, se você empurra, ela volta para o fundo: estável. Em cima de um morro, se você empurra, ela rola e não volta: instável.



As definições oficiais usam a resposta natural, aquela que vem dos polos do sistema.

Estável: a resposta natural tende a zero.

Instável: a resposta natural cresce sem limite.

Marginalmente estável: a resposta natural não cresce nem some, fica constante ou oscilando.

E existe a definição de entrada limitada, saída limitada: o sistema é estável se toda entrada limitada produz uma saída limitada.



Pelos polos de malha fechada, fica assim.

Todos no lado esquerdo: estável.

Algum no lado direito, ou polos repetidos sobre o eixo imaginário: instável.

Polos simples sobre o eixo imaginário e o resto no lado esquerdo: marginalmente estável.



Agora os atalhos, que respondem a questão um a da lista. Olhando só para os coeficientes do denominador de malha fechada:

Atalho um: se os coeficientes têm sinais diferentes, o sistema é instável.

Atalho dois: se falta alguma potência de s, o sistema é instável ou, no máximo, marginalmente estável.

Atalho três: se todos estão presentes e positivos, não dá para concluir nada. Aí você usa o critério de Routh-Hurwitz, que é o próximo episódio.

Uma exceção boa de saber: para segunda ordem, todos presentes e positivos já garante estabilidade.



Exemplos do slide dezenove. Dois sobre s ao cubo mais s mais um: falta o s ao quadrado, então não é estável. s mais um sobre s ao cubo menos s ao quadrado mais s mais dois: tem coeficiente negativo, instável. s mais dez sobre s vezes s ao quadrado mais s mais um: falta o termo independente, existe um polo na origem, então não é estável.



Erros comuns. Olhar a malha aberta, quando o que importa é a malha fechada. Usar os zeros, que não definem estabilidade. Achar que todos positivos significa estável, o que só vale para primeira e segunda ordem. E achar que polo na origem é estável: ele está sobre o eixo imaginário.





Duas observações de prova. Primeira: quando o enunciado der a função de malha aberta, você precisa montar a malha fechada antes de avaliar a estabilidade. Com realimentação unitária, o denominador de malha fechada é o denominador de G mais o numerador de G. Segunda: escreva sempre o motivo junto da conclusão. Não basta dizer instável. Diga instável porque o coeficiente de s ao quadrado é negativo, ou porque há um polo no semiplano direito. O professor valoriza a justificativa.



Resumo: esquerda estável, direita instável, eixo marginal. Sinais diferentes ou potência faltando: problema. Todos positivos: use Routh.



Pergunta: polos em menos um e mais ou menos jota dois. Qual a classificação? Par simples sobre o eixo, o resto à esquerda: marginalmente estável.
