# Roteiro do áudio — Tópico 06: Função de transferência

Duração do MP3: 3 min 00 s

Episódio seis. Função de transferência.



Este é um dos tópicos mais importantes do curso, porque tudo depois depende dele. A meta é montar G de s igual a saída sobre entrada.



Pensa na função de transferência como a receita do sistema. Você entra com um ingrediente, a entrada, e a receita diz o prato que sai, a saída. E a receita não depende do ingrediente. Ela só depende do sistema.



A definição completa, do jeito que a prova pede: a função de transferência é a relação entre a transformada de Laplace da saída e a transformada de Laplace da entrada, com condições iniciais nulas. Não esquece dessa parte das condições iniciais nulas numa questão conceitual.



Como montar a partir de uma equação diferencial? Três passos. Troca cada derivada por s: derivada segunda vira s ao quadrado vezes Y, derivada primeira vira s vezes Y. Coloca Y de s e X de s em evidência. Divide.

Exemplo da diagnóstica: duas vezes y duas linhas, mais y linha, mais seis y, igual a x. Fica dois s ao quadrado mais s mais seis, vezes Y, igual a X. Então G é um sobre dois s ao quadrado mais s mais seis.



Para circuitos existe um atalho: as impedâncias em s. Resistor continua R. Indutor vira s L. Capacitor vira um sobre s C. Com isso, o circuito vira um circuito de resistores, e você usa divisor de tensão normalmente.



Exemplo do slide da aula um, o circuito R C. A tensão no capacitor é a impedância dele, um sobre s C, dividida pelo total, R mais um sobre s C, vezes a entrada. Multiplicando em cima e embaixo por s C, fica um sobre R C s mais um. Isso é um sistema de primeira ordem com constante de tempo R C. O episódio nove explica o que isso significa.



Agora um exemplo mecânico, da processual. Massa, mola e amortecedor: a função de transferência é um sobre M s ao quadrado mais B s mais k. Com massa vinte e mola trezentos e vinte, qual B deixa o sistema criticamente amortecido? Criticamente amortecido significa raízes reais iguais, então delta igual a zero. B ao quadrado menos quatro vezes vinte vezes trezentos e vinte igual a zero. B ao quadrado é vinte e cinco mil e seiscentos. B igual a cento e sessenta newton segundo por metro.



Erros comuns: inverter a fração, porque é sempre saída sobre entrada; achar que o capacitor é s C, quando é um sobre s C; e esquecer que o denominador da função de transferência é o que vai decidir polos e estabilidade.



Resumo: G é saída sobre entrada, condições iniciais nulas. Derivada vira s. Impedâncias: R, s L e um sobre s C.



Pergunta: qual a função de transferência de y duas linhas mais três y linha mais dois y igual a cinco x? Se você chegou em cinco sobre s ao quadrado mais três s mais dois, acertou.
