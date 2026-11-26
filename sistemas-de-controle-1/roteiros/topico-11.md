# Roteiro do áudio — Tópico 11: 2ª ordem subamortecido — Tp, %UP, Ts e Tr

Duração do MP3: 3 min 16 s


Episódio onze. Subamortecido: tempo de pico, ultrapassagem, acomodação e subida.



Este é o tópico mais pesado em contas da primeira metade. Vá devagar, com papel do lado.



Primeiro, o que cada especificação mede. Tempo de subida: de dez a noventa por cento do valor final. Instante de pico: tempo até o primeiro e maior pico. Ultrapassagem percentual, também chamada de overshoot ou sobressinal: quanto passou do valor final, em porcentagem. Tempo de acomodação: tempo para entrar na faixa de dois por cento e ficar.



Agora a ideia que organiza tudo, olhando para os polos menos sigma d mais ou menos jota ômega d. A parte imaginária, ômega d, é a frequência da oscilação: ela define o tempo de pico. A parte real, sigma d, é a velocidade do decaimento: ela define o tempo de acomodação. E o ângulo dos polos, cujo cosseno é zeta, define a ultrapassagem.



As fórmulas, faladas.



Ômega d é ômega ene vezes raiz de um menos zeta ao quadrado.



Sigma d é zeta vezes ômega ene.



Tempo de pico: pi sobre ômega d.



Ultrapassagem: cem vezes exponencial de menos zeta pi sobre raiz de um menos zeta ao quadrado. Depende só de zeta.



Acomodação: quatro sobre zeta ômega ene.



Tempo de subida não tem fórmula exata. O professor resolve no Matlab. Existe uma aproximação do Nise, que está no site.



E o caminho de volta, quando a questão dá a ultrapassagem e pede zeta: zeta é menos o logaritmo natural da ultrapassagem sobre cem, dividido pela raiz de pi ao quadrado mais esse logaritmo ao quadrado.



Exemplo do slide oitenta e dois: cem sobre s ao quadrado mais quinze s mais cem.



Primeiro, ômega ene e zeta. Ômega ene é dez. Zeta é quinze sobre vinte, zero vírgula setenta e cinco.



Raiz de um menos zeta ao quadrado: raiz de zero vírgula quatro três sete cinco, mais ou menos zero vírgula seis seis um.



Tempo de pico: pi sobre dez vezes zero vírgula seis seis um, mais ou menos zero vírgula quatro sete cinco segundo.



Ultrapassagem: o expoente dá mais ou menos menos três vírgula cinco seis. Exponencial disso é zero vírgula zero dois oito. Então dois vírgula oito por cento.



Acomodação: quatro sobre sete vírgula cinco, zero vírgula cinco três três segundo.



Eu conferi tudo por simulação.



Outro exemplo do professor: polos em menos três mais ou menos jota sete. Zeta é cosseno do arco tangente de sete sobre três, zero vírgula três nove quatro. Tempo de pico, pi sobre sete, zero vírgula quarenta e cinco segundo. Acomodação, quatro sobre três, um vírgula trinta e três segundo. Ultrapassagem de vinte e seis por cento.



Erros comuns: usar ômega ene no tempo de pico, quando é ômega d; esquecer o sinal de menos no logaritmo; achar que ultrapassagem depende de ômega ene; e aplicar essas fórmulas em sistemas que não são de segunda ordem pura.



Resumo: parte real, acomodação. Parte imaginária, pico. Ângulo, ultrapassagem.



Pergunta: se eu empurro os polos para a esquerda, mantendo a parte imaginária, o que acontece com a acomodação e com o tempo de pico? Acomodação diminui. Tempo de pico não muda.
