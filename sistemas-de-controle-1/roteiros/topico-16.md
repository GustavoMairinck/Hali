# Roteiro do áudio — Tópico 16: Erro em regime permanente

Duração do MP3: 3 min 19 s


Episódio dezesseis. Erro em regime permanente.



Este é o tópico mais trabalhoso do segundo bimestre, e a lista tem três questões sobre ele. Vamos com calma.



Definição: o erro em regime é a diferença entre a entrada e a saída quando o tempo vai para infinito. Ou seja, depois que tudo se acalmou, quanto o sistema ainda erra?



Analogia: um motorista seguindo outro carro. Se o carro da frente está parado, que é o degrau, dá para encostar exatamente? Depende do motorista. Se o carro da frente anda a velocidade constante, que é a rampa, alguns motoristas ficam sempre um pouco atrás e outros vão ficando cada vez mais longe.



Quem decide isso é o tipo do sistema. Tipo é o número de polos na origem da função de malha aberta. Cada polo na origem é um integrador, um motorista que acumula o atraso e corrige. Quanto mais integradores, mais tipos de entrada o sistema segue sem erro. E atenção: tipo não é ordem. Ordem é o grau do denominador.



Duas fórmulas. Se a questão dá a função de malha fechada T: o erro E é R vezes um menos T, e o erro final é o limite, com s indo para zero, de s vezes E. Se a questão dá a malha aberta G, com realimentação unitária: o erro final é o limite de s vezes R sobre um mais G.



O método do professor é normalizar G. Você escreve cada fator na forma um mais s sobre alguma coisa. O número que sobra na frente é G N. Aí usa a tabela.



Para degrau: tipo zero, erro um sobre um mais G N. Tipo um ou mais, erro zero.



Para rampa: tipo zero, infinito. Tipo um, um sobre G N. Tipo dois, zero.



Para parábola: tipo zero e um, infinito. Tipo dois, um sobre G N.



No livro, esse G N aparece com os nomes K p, K v e K a. É o mesmo número.



Exemplo do slide. T igual a cinco sobre s ao quadrado mais sete s mais dez, degrau unitário. O erro é um menos T de zero. T de zero é cinco sobre dez, meio. Erro: zero vírgula cinco.



Exemplo da lista, questão seis. A malha fechada é s mais um sobre s ao quadrado mais três s mais dez, com rampa. Um menos T fica s ao quadrado mais dois s mais nove sobre s ao quadrado mais três s mais dez. Multiplica por s e por um sobre s ao quadrado. Sobra s ao quadrado mais dois s mais nove sobre s vezes s ao quadrado mais três s mais dez. Com s indo a zero, dá nove sobre zero. Erro infinito.



Agora o alerta mais importante do episódio. O teorema do valor final só vale se o sistema for estável. Se for instável, o limite dá um número, mas esse número é falso. Na questão cinco da lista, a malha fechada com ganho quinze tem o denominador s ao cubo mais três s ao quadrado mais dois s mais quinze. Pelo Routh, três vezes dois é seis, que é menor que quinze. Instável. Então a resposta certa não é erro zero: o erro não se acomoda, ele cresce. Sempre cheque a estabilidade primeiro.



Resumo: tipo é o número de integradores da malha aberta. Use a tabela três por três. E estabilidade antes de tudo.



Pergunta: vinte sobre s mais um vezes s mais quatro, realimentação unitária, degrau unitário. Tipo zero, G N igual a cinco, erro um sexto.
