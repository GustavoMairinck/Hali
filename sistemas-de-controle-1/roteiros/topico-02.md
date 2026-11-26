# Roteiro do áudio — Tópico 02: Transformada de Laplace — tabela e propriedades

Duração do MP3: 3 min 24 s


Episódio dois. Transformada de Laplace, com a tabela simplificada.



Neste episódio, a meta é transformar uma função do tempo em uma função de s usando só a sua tabela e três regras. Nada além disso.



Começa pela ideia. Laplace é um tradutor. No idioma do tempo, os sistemas são descritos por equações diferenciais, que são chatas de resolver. No idioma s, derivar vira multiplicar por s, e integrar vira dividir por s. As equações viram contas de frações. Você resolve no idioma s e depois traduz de volta.



Isso explica a tabela. O impulso vale um. O degrau, que é a integral do impulso, vale um sobre s. A rampa, que é a integral do degrau, vale um sobre s ao quadrado. Viu o padrão? Cada integração coloca mais um s embaixo. Por isso t elevado a n tem transformada n fatorial sobre s elevado a n mais um.



Ainda na tabela: exponencial de menos a t vira um sobre s mais a. Seno de ômega t vira ômega sobre s ao quadrado mais ômega ao quadrado. E cosseno vira s sobre s ao quadrado mais ômega ao quadrado.



Agora as três regras.



Regra um, linearidade. Constantes saem para fora. Sete vezes alguma coisa vira sete vezes a transformada dessa coisa.



Regra dois, a mais importante e a que não está na tabela: deslocamento na frequência. Se a função está multiplicada por exponencial de menos a t, você troca todo s por s mais a. Se for exponencial de mais a t, troca todo s por s menos a. O sinal sempre inverte. O motivo é que a definição de Laplace já tem um exponencial de menos s t. Quando você junta com exponencial de menos a t, fica exponencial de menos, abre parênteses, s mais a, fecha parênteses, vezes t.



Regra três: derivada vira s vezes F de s, com condições iniciais nulas.



Vamos a um exemplo do jeito que aparece na prova. Cinco vezes exponencial de menos dois t vezes seno de três t.



Passo um, separa as peças: a constante cinco, a exponencial, e o seno.



Passo dois, o seno de três t, pela tabela, é três sobre s ao quadrado mais nove.



Passo três, a exponencial de menos dois t manda trocar s por s mais dois. Fica três sobre, abre parênteses, s mais dois, fecha, ao quadrado, mais nove. Atenção: o nove não muda. Ele é ômega ao quadrado, não é s. E o quadrado já estava no s ao quadrado da tabela.



Passo quatro, multiplica pela constante: cinco vezes três, quinze.



Resposta: quinze sobre s mais dois ao quadrado mais nove.



Um truque para nunca errar o sinal: o polo tem o mesmo número do expoente. Exponencial de menos cinco t gera polo em s igual a menos cinco, ou seja, fator s mais cinco.



Erros que mais aparecem: errar o sinal do deslocamento, trocar só um dos s quando há dois, mexer no ômega ao quadrado, e esquecer o fatorial. t à quarta dá quatro fatorial, que é vinte e quatro, sobre s à quinta.



Resumo: tabela mais três regras. A estrela é o deslocamento: exponencial de menos a t, troca s por s mais a.



Pergunta: qual a transformada de t ao quadrado vezes exponencial de três t? Pensa um pouco. Base: dois sobre s ao cubo. Expoente positivo, então s vira s menos três. Confere no site se você chegou em dois sobre s menos três ao cubo.
