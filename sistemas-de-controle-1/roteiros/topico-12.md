# Roteiro do áudio — Tópico 12: Polos adicionais e zeros (polos dominantes)

Duração do MP3: 2 min 55 s

Episódio doze. Polos adicionais e zeros.



Este é um tópico complementar. Ele responde uma pergunta prática: quando posso usar as fórmulas de segunda ordem num sistema maior?



A ideia de polos dominantes. Num sistema de terceira ordem, se um polo está muito à esquerda, o termo que ele gera some muito rápido. Depois de pouco tempo, só sobram os dois polos mais próximos do eixo. Eles dominam a resposta. É como numa corrida de revezamento: o corredor muito rápido quase não muda o tempo total. Quem decide é o mais lento.



A regra do professor: se o polo extra está pelo menos cinco vezes mais à esquerda do que a parte real dos polos dominantes, pode aproximar por segunda ordem.



Exemplo. Polos de s ao quadrado mais quatro s mais vinte e cinco ficam em menos dois mais ou menos jota quatro vírgula cinco oito. Parte real, menos dois. O polo extra está em menos vinte. Vinte é maior que cinco vezes dois, que é dez. Então pode usar as fórmulas: ômega ene cinco, zeta zero vírgula quatro, ultrapassagem de uns vinte e cinco por cento, acomodação de uns dois segundos.



Agora os zeros. Quando você multiplica a resposta por s mais a, ela vira s vezes C mais a vezes C. O primeiro termo é a derivada da resposta original. O segundo é a resposta original em escala. Na prática: um zero no lado esquerdo, perto dos polos dominantes, deixa a resposta mais rápida e com mais ultrapassagem. Se o zero estiver longe, o efeito é pequeno.



E se o zero estiver no lado direito? Aí a derivada entra com sinal contrário, e a resposta começa indo para o lado errado antes de subir. Isso se chama sistema de fase não mínima. Não é instabilidade. É só um formato estranho no começo.



Último caso: quando um zero fica quase em cima de um polo, eles praticamente se cancelam. O professor mostra isso com um zero em menos sete e um polo em menos seis vírgula cinco. Mas como o cancelamento não é perfeito, ele pede para conferir no Matlab.



Erros comuns: comparar com ômega ene em vez da parte real; esquecer que o ganho muda quando você corta um polo distante; e achar que zero no lado direito causa instabilidade.





Como isso aparece para você? Principalmente de duas formas. Na prova, numa pergunta conceitual sobre o efeito de adicionar um polo ou um zero. E no projeto de PID: o controlador PID adiciona dois zeros ao sistema. Por isso, depois de sintonizar, a resposta pode ter mais ultrapassagem do que as fórmulas de segunda ordem previam. Não é erro de conta. É o efeito dos zeros. Essa é mais uma razão para conferir tudo na simulação.



Resumo: regra dos cinco vezes. Zero perto deixa mais rápido e com mais pico. Zero no lado direito: fase não mínima.



Pergunta: polos em menos um mais ou menos jota dois e em menos três. Posso aproximar por segunda ordem? Três é menor que cinco vezes um. Então não.
