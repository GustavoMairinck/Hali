# Roteiro do áudio — Tópico 03: Frações parciais e transformada inversa

Duração do MP3: 3 min 38 s

Episódio três. Frações parciais e transformada inversa.



A meta agora é o caminho de volta: sair de C de s e chegar em c de t.



A ideia é simples. Uma fração grande, como s mais dois sobre s vezes s mais cinco, não está na tabela. Mas ela é feita de peças menores que estão: A sobre s, e B sobre s mais cinco. É como desmontar um lego grande em peças padrão.



A regra de ouro: cada raiz do denominador vira uma fração. Raiz em zero vira A sobre s, que no tempo é só a constante A. Raiz em menos cinco vira B sobre s mais cinco, que no tempo é B vezes exponencial de menos cinco t. E se a raiz for repetida, por exemplo s mais cinco ao quadrado, você precisa de duas frações: uma com s mais cinco e outra com s mais cinco ao quadrado. A de ao quadrado vira t vezes exponencial de menos cinco t.



Como achar A e B? Com a regra do tampar. Para achar o coeficiente de uma raiz, você tampa o fator dessa raiz na fração original e substitui o valor da raiz no que sobrou.



Vamos fazer juntos o exemplo do slide treze da aula dois.

C de s é s mais dois sobre s vezes s mais cinco.

Para A, a raiz é zero. Tampa o s. Sobra s mais dois sobre s mais cinco. Coloca s igual a zero: dois quintos.

Para B, a raiz é menos cinco. Tampa o s mais cinco. Sobra s mais dois sobre s. Coloca s igual a menos cinco: menos três sobre menos cinco, que dá três quintos.

Volta para o tempo: c de t igual a dois quintos mais três quintos vezes exponencial de menos cinco t.



E repara no significado. O dois quintos é constante: ele veio do degrau da entrada. O termo com exponencial some com o tempo: ele veio do polo do sistema. Esse é exatamente o assunto do episódio oito, resposta forçada e resposta natural.



Quando a raiz é repetida, o coeficiente do termo ao quadrado sai pela regra do tampar normal. O do termo simples exige derivar o que sobrou antes de substituir. Na prova, isso aparece pouco. Se aparecer, o desafio da avaliação diagnóstica está resolvido no site, conferido no computador.



Três erros comuns. Primeiro: usar uma fração só para raiz repetida. Segundo: errar sinal na substituição, porque com s igual a menos cinco, vários termos ficam negativos. Terceiro: tentar expandir quando o grau de cima é maior ou igual ao de baixo. Aí tem que dividir os polinômios antes. Em controle, isso quase nunca acontece.





Como isso costuma cair? Na diagnóstica, o professor deu quatro funções em s e pediu duas coisas: desenhar o mapa de polos e zeros e encontrar a equação no tempo. Para a segunda parte, o roteiro é sempre o mesmo. Primeiro, fatorar o denominador. Segundo, escrever uma fração para cada raiz. Terceiro, achar os coeficientes com a regra do tampar. Quarto, trocar cada fração pelo termo da tabela. Se aparecer um denominador como s ao quadrado mais quatro s mais treze, que não fatora em números reais, complete o quadrado: vira s mais dois ao quadrado mais nove, e você volta para seno e cosseno com exponencial, usando o deslocamento em frequência do episódio dois.



Resumo: cada raiz vira uma fração. Tampa o fator, substitui a raiz. A sobre s vira A. B sobre s mais a vira B exponencial de menos a t.



Pergunta: na fração um sobre s mais um vezes s mais três, quanto vale o coeficiente de s mais um? Tampa e substitui. Se deu um meio, acertou.
