# Roteiro do áudio — Tópico 18: Sintonia de PID por Ziegler-Nichols

Duração do MP3: 4 min 00 s

Episódio dezoito. Sintonia de PID por Ziegler-Nichols.



Este é o assunto da avaliação processual do segundo bimestre e da questão oito da lista. Meta: calcular os ganhos pelos dois métodos e explicar por que precisa de ajuste fino depois.



Ziegler e Nichols testaram muitas plantas e montaram tabelas empíricas. Elas dão um bom ponto de partida. É como a receita de bolo da avó: funciona na maioria das cozinhas, mas você ainda prova e ajusta.



Método um, curva de reação. É em malha aberta. Com o controlador em manual, você aplica um degrau na planta. Muitas plantas respondem em forma de S. Você traça a reta tangente no ponto de inflexão, onde a curva muda de curvatura. Lê três números: L, o atraso, que é onde a tangente corta o eixo do tempo; T, a constante de tempo; e C, o valor final. A taxa de reação R é C sobre T.

A tabela: para PID, K p é um vírgula dois sobre R L, T i é dois L, e T d é meio L. Para PI, K p é zero vírgula nove sobre R L e T i é L sobre zero vírgula três. Para P, K p é um sobre R L.

Atenção: esse método só serve se a curva tiver forma de S. Planta que oscila ou que tem integrador não serve.



Método dois, oscilação, também chamado de sensibilidade. É em malha fechada. Você tira o integral e o derivativo, deixa só o proporcional, e vai aumentando K p devagar até a saída oscilar com amplitude constante. Esse ganho é o ganho crítico, K u. O período dessa oscilação é P u.

A tabela: para P, zero vírgula cinco K u. Para PI, zero vírgula quarenta e cinco K u e T i igual a P u sobre um vírgula dois. Para PID, zero vírgula seis K u, T i igual a P u sobre dois, e T d igual a P u sobre oito.



No papel, K u e P u saem do Routh, como no episódio quinze. Exemplo: planta um sobre s mais um vezes s mais dois vezes s mais três. Com o proporcional, a malha fechada é s ao cubo mais seis s ao quadrado mais onze s mais seis mais K p. A linha s um zera em K p igual a sessenta. Então K u é sessenta. Na linha s dois, seis s ao quadrado mais sessenta e seis igual a zero dá ômega igual à raiz de onze, uns três vírgula três dois radianos por segundo. O período é dois pi sobre isso: um vírgula oito nove segundo.

PID: K p é zero vírgula seis vezes sessenta, trinta e seis. T i é um vírgula oito nove sobre dois, zero vírgula noventa e cinco segundo. T d é um vírgula oito nove sobre oito, zero vírgula vinte e quatro segundo.

Eu simulei esse controlador: o erro ao degrau vai a zero, mas a ultrapassagem fica perto de quarenta e quatro por cento. Isso é típico de Ziegler-Nichols.



E é por isso que o ajuste fino é necessário. As tabelas são empíricas e dão só uma primeira aproximação. Elas tendem a gerar ultrapassagem alta. O ajuste fino adapta o controlador às especificações reais: ultrapassagem, acomodação e erro. Essa é a resposta da questão oito c. O professor também mostra uma versão modificada da tabela, com e sem sobressinal, que suaviza a resposta.



Erros comuns: usar o método um em planta que não tem curva em S; trocar T i com K i; confundir o período com a frequência, lembrando que P u é dois pi sobre ômega; e ler o atraso L até onde a curva começa a subir, quando é até onde a tangente corta o eixo.



Resumo: método um, curva em S, L e T. Método dois, limite de estabilidade, K u e P u. PID pelo método dois: zero vírgula seis, P u sobre dois, P u sobre oito. Depois, sempre ajuste fino.



Pergunta final: K u igual a vinte e P u igual a quatro segundos. Quais os ganhos de um PI? K p, zero vírgula quarenta e cinco vezes vinte, nove. T i, quatro sobre um vírgula dois, mais ou menos três vírgula três segundos.
