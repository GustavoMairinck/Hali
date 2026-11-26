# Roteiro do áudio — Tópico 04: Sinais de teste e resposta ao impulso

Duração do MP3: 3 min 22 s

Episódio quatro. Sinais de teste e resposta ao impulso.



Esse assunto já caiu duas vezes, na diagnóstica e na processual. Então vale ouvir com atenção, são poucos minutos.



Para testar um carro, ninguém dirige de qualquer jeito. Fazem testes padrão: arrancada, velocidade constante, curva. Com sistemas de controle é igual. A gente usa entradas padrão para comparar sistemas.



São quatro.

O impulso: um chute muito rápido. Transformada igual a um.

O degrau: liga e fica ligado. Representa posição constante, como mudar o setpoint de um ar-condicionado de vinte e cinco para vinte e dois graus. Transformada um sobre s.

A rampa: cresce em linha reta. Representa velocidade constante, como seguir um alvo andando. Transformada um sobre s ao quadrado.

A parábola: meio t ao quadrado. Representa aceleração constante. Transformada um sobre s ao cubo. Repara no meio: sem ele, a transformada não seria um sobre s ao cubo.



Agora, resposta ao impulso. É a saída do sistema quando a entrada é um impulso. Como a transformada do impulso é um, a saída fica Y de s igual a G de s vezes um, ou seja, a própria função de transferência. Conclusão: a resposta ao impulso, no tempo, é a transformada inversa de G de s. Ela é a impressão digital do sistema. Toda a dinâmica está ali.



E para qualquer entrada vale: Y de s igual a G de s vezes X de s. No tempo, isso seria uma convolução, uma conta difícil. Em s, é uma multiplicação. Essa é a grande vantagem do Laplace.



Exemplo da diagnóstica. A resposta ao impulso é t vezes exponencial de menos cinco t. A entrada é uma rampa.

H de s: a base t vale um sobre s ao quadrado, e a exponencial troca s por s mais cinco. Fica um sobre s mais cinco ao quadrado.

X de s: rampa, um sobre s ao quadrado.

Y de s: o produto. Um sobre s ao quadrado vezes s mais cinco ao quadrado.

Para chegar no tempo, frações parciais, episódio três.



Erros comuns: confundir degrau com rampa, esquecer o meio da parábola, e dizer que resposta ao impulso é resposta com entrada igual a um. A entrada é o impulso, cuja transformada é que vale um.



Onde isso vai aparecer de novo? Em dois lugares importantes. No episódio nove e no onze, a gente sempre aplica um degrau para medir tempo de subida, ultrapassagem e acomodação. E no episódio dezesseis, de erro em regime, a pergunta é exatamente: o sistema consegue seguir um degrau? E uma rampa? E uma parábola? Então, quando você vir um sinal de teste num enunciado, já associe: degrau, um sobre s; rampa, um sobre s ao quadrado; parábola, um sobre s ao cubo. Esse é o R de s que você vai colocar nas fórmulas.



Uma dica de prova: se o enunciado disser degrau de amplitude cinco, a transformada é cinco sobre s, e não um sobre s. A amplitude multiplica tudo, inclusive o erro final.



Resumo: degrau é posição, rampa é velocidade, parábola é aceleração. Resposta ao impulso é G de s levada para o tempo.



Pergunta: se G de s é três sobre s mais dois, qual a resposta ao impulso? Resposta esperada: três vezes exponencial de menos dois t.
