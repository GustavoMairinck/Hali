# Roteiro do áudio — Tópico 17: Ações de controle — on-off, P, I, D e PID

Duração do MP3: 3 min 02 s

Episódio dezessete. As ações de controle: liga-desliga, P, I, D e PID.



Meta: entender o que cada ação faz com a resposta e conseguir explicar a tabela de efeitos, que é a questão sete da lista.



Analogia: você está dirigindo e quer manter o carro no centro da faixa.

A ação proporcional vira o volante na proporção de quanto você está fora do centro. Ela olha o presente.

A ação integral percebe que você está fora do centro há muito tempo e vai aumentando a correção. Ela olha o passado.

A ação derivativa percebe que o carro está se afastando rápido e corrige antes. Ela olha a tendência, o futuro.



Antes delas, o controle liga-desliga. Só tem dois estados. É barato e muito usado, como na geladeira. A variável fica oscilando em torno da referência. Serve para processos lentos que toleram oscilação.



Proporcional. A ação é K p vezes o erro. Ela deixa um erro residual, chamado off-set. O motivo: se o erro fosse zero, a ação seria zero, e a variável voltaria a cair. Aumentar K p diminui esse erro, mas não zera. O exemplo do professor é o tanque com boia.



Integral. A ação é a soma do erro ao longo do tempo. Enquanto existir erro, ela continua agindo. Por isso elimina o off-set. É chamada de ação de reset. Mas não se usa sozinha, e um K i alto deixa o sistema oscilatório ou até instável. Detalhe: ela não reduz o pico, porque o pico acontece antes de a integral acumular.



Derivativa. Reage à velocidade da mudança do erro. Antecipa e reduz a ultrapassagem. Não elimina o off-set, porque erro constante tem derivada zero. E amplifica ruído: não use em processo ruidoso.



A tabela de efeitos.

Aumentar K p: tempo de subida diminui, ultrapassagem aumenta, acomodação muda pouco, erro diminui.

Aumentar K i: subida diminui, ultrapassagem aumenta, acomodação aumenta, erro é eliminado.

Aumentar K d: subida diminui pouco, ultrapassagem diminui, acomodação diminui, erro muda pouco.

O professor faz uma ressalva: isso é tendência. O efeito real depende da planta.



As fórmulas. O PID é K p mais K i sobre s mais K d vezes s. Ou, na outra forma, K p vezes, abre parênteses, um mais um sobre T i s mais T d s. A conversão é: K i igual a K p sobre T i, e K d igual a K p vezes T d. O PID adiciona dois zeros e um polo na origem. Esse polo é o integrador: ele aumenta o tipo do sistema em um. Isso liga com o episódio dezesseis.



Erros comuns: dizer que o derivativo elimina o erro, quando é o integral; achar que mais K p sempre melhora; e confundir T i com K i: T i maior significa ação integral menor.



Resumo: P presente, I passado, D tendência. I elimina erro, D reduz pico e sofre com ruído.



Pergunta: K p igual a seis e T i igual a dois segundos. Quanto vale K i? Seis sobre dois: três.
