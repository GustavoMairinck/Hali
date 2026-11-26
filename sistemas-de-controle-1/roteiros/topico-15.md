# Roteiro do áudio — Tópico 15: Routh no projeto — faixa de K para estabilidade

Duração do MP3: 3 min 19 s

Episódio quinze. Routh no projeto: a faixa de K.



O professor diz que é aqui que o Routh mostra seu maior valor. E isso aparece na lista, na questão três, e na avaliação processual, no item que pede para encontrar o limite de estabilidade.



Pensa no ganho K como o volume do controlador. Com volume baixo, o sistema responde fraco, mas estável. Com volume alto demais, aparece a microfonia: uma oscilação que cresce. O Routh diz até onde você pode aumentar o volume.



A ideia. O K aparece em alguns elementos da primeira coluna. Para o sistema ser estável, todos precisam ser positivos. Cada elemento vira uma inequação. A resposta é a interseção de todas.



Passo a passo, com a questão três da lista. O denominador de malha fechada é s à quarta mais três s ao cubo mais três s ao quadrado mais dois s mais K.

Linha s quatro: um, três e K.

Linha s três: três, dois e zero.

Linha s dois: três vezes três menos um vezes dois, sobre três. Nove menos dois, sete, sobre três: sete terços. O segundo elemento é três K sobre três: K.

Linha s um: sete terços vezes dois, menos três vezes K, dividido por sete terços. Isso simplifica para dois menos nove K sobre sete.

Linha s zero: K.

Agora as condições. Dois menos nove K sobre sete maior que zero dá K menor que catorze nonos, mais ou menos um vírgula cinco seis. E K maior que zero.

Resposta: K entre zero e catorze nonos.



E o que acontece exatamente no limite? Quando K vale catorze nonos, a linha s um zera. O sistema fica marginalmente estável: oscila com amplitude constante. Para achar a frequência dessa oscilação, usa a linha s dois: sete terços s ao quadrado mais catorze nonos igual a zero. Isso dá ômega igual à raiz de dois terços, mais ou menos zero vírgula oito dois radianos por segundo.



Guarda isso, porque é exatamente o que o segundo método de Ziegler-Nichols precisa: o ganho crítico e o período da oscilação. É o episódio dezoito.



Exemplos do slide. K sobre s vezes s mais sete vezes s mais onze: estável para K entre zero e mil trezentos e oitenta e seis. No slide está escrito um ponto três oito seis, com ponto de milhar. Não leia como um vírgula três. E K sobre s vezes s mais um ao quadrado: estável para K entre zero e dois.



Erros comuns: esquecer o K maior que zero; inverter o sinal da inequação ao dividir por negativo; montar a tabela com a malha aberta; e ler errado o ponto de milhar.





Como isso se conecta com o seu projeto da avaliação processual? O item dois pede para verificar a estabilidade e encontrar o limite. Isso é exatamente o que você acabou de ouvir: montar a tabela com o ganho, achar o valor que zera a linha s um, e calcular a frequência da oscilação. Esse ganho limite e esse período são a entrada do segundo método de Ziegler-Nichols.



Resumo: monte a tabela com K, exija tudo positivo, faça a interseção. No limite, oscila, e a linha s dois dá a frequência.



Pergunta: s ao cubo mais seis s ao quadrado mais onze s mais seis mais K. Qual o K crítico? Linha s um: sessenta e seis menos seis menos K, sobre seis. Zera em K igual a sessenta.
