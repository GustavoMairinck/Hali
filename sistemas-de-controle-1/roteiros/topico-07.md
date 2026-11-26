# Roteiro do áudio — Tópico 07: Diagrama de blocos e redução

Duração do MP3: 3 min 02 s


Episódio sete. Diagrama de blocos e redução.



Esse assunto caiu em todas as avaliações até agora. A meta é reduzir qualquer diagrama a um bloco só, usando três regras e dois truques.



Primeiro, como ler um diagrama. Cada bloco é uma máquina que multiplica o sinal pela sua função de transferência. As setas são esteiras levando o sinal. O círculo é um somador: ele soma ou subtrai sinais, conforme o sinal de mais ou menos marcado em cada entrada. E o ponto de ramificação apenas copia o sinal para dois caminhos.



Regra um: blocos em série, um depois do outro, se multiplicam. G um vezes G dois vezes G três.



Regra dois: blocos em paralelo, lado a lado e somados no final, se somam, respeitando os sinais do somador.



Regra três, a mais importante: realimentação. Quando a saída volta para o começo, a função equivalente é G sobre um mais G vezes H. G é o caminho direto. H é o caminho de volta. O sinal de mais no denominador vale para realimentação negativa, que é o caso mais comum. Se H for igual a um, a realimentação é unitária e fica G sobre um mais G.



Se esquecer a fórmula, você deduz em quatro linhas. O erro é a entrada menos H vezes a saída. A saída é G vezes o erro. Substituindo, a saída é G vezes a entrada menos G H vezes a saída. Passa para o mesmo lado: saída vezes um mais G H igual a G vezes entrada. Divide e pronto.



Os dois truques servem para desembaraçar diagramas entrelaçados. Mover um somador para frente de um bloco G: o sinal que entrava no somador agora precisa entrar multiplicado por G. Mover uma ramificação para depois de um bloco G: o ramo copiado precisa passar por um sobre G. A regra que guia tudo: o sinal em cada ponto do diagrama não pode mudar.



Exemplo que caiu duas vezes. G é um sobre s mais quatro, H é um sobre s, realimentação negativa. G vezes H é um sobre s vezes s mais quatro. A função fica um sobre s mais quatro, dividido por um mais um sobre s vezes s mais quatro. Multiplica em cima e embaixo por s vezes s mais quatro. Em cima sobra s. Embaixo fica s vezes s mais quatro mais um, que é s ao quadrado mais quatro s mais um. Resposta: s sobre s ao quadrado mais quatro s mais um. Alternativa A.



Na outra questão, com h um, h dois, h três e h quatro, aparece o asterisco. Ele indica convolução, que é como a série aparece no tempo. Em s, seria produto. A resposta é h um mais h dois, convolução com h três, menos h quatro.



Erros comuns: trocar o sinal do denominador; esquecer o H no produto; somar blocos em série; e mover blocos sem compensar.



Resumo: série multiplica, paralelo soma, realimentação é G sobre um mais G H.



Pergunta: G igual a dez sobre s mais um com realimentação unitária. Qual a função de malha fechada? Se deu dez sobre s mais onze, está certo.
