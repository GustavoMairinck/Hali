# Roteiro do áudio — Tópico 05: O que é um sistema de controle

Duração do MP3: 3 min 28 s


Episódio cinco. O que é um sistema de controle.



Este episódio é de vocabulário. Ele vale ponto fácil, porque a processual do primeiro bimestre pediu justamente isso.



O professor abre a disciplina com uma comparação: um tornado e um avião. Os dois levam muita massa pelo ar, usando muita energia. A diferença entre eles é uma só: o controle. Controlar é fazer uma variável assumir um valor desejado ou seguir uma trajetória.



Agora as peças, usando um ar-condicionado como exemplo.



A referência, ou setpoint, é o valor que você quer. Vinte e dois graus.



A saída, ou variável controlada, é a temperatura real da sala.



O controlador compara a referência com a saída medida e decide o que fazer. Pode ser um microprocessador.



O atuador faz o trabalho físico. O compressor.



O processo é a sala.



A planta é atuador mais processo, juntos. No projeto, eles viram um bloco só.



O sensor mede a saída. Um termistor, por exemplo.



E o distúrbio é tudo que atrapalha. Alguém abrindo a porta.



Agora a diferença mais cobrada: malha aberta e malha fechada.



Malha aberta não mede a saída. Ela segue um programa. O exemplo do professor é a máquina de lavar: ela não sabe se a roupa ficou limpa. Ele também diz que dirigir em malha aberta é dirigir de olhos fechados.



Malha fechada mede a saída, compara com a referência e corrige. Isso se chama realimentação.



Vantagens da malha fechada: mais precisão e rejeição de distúrbios. Desvantagens: custo maior, manutenção mais complexa e, o ponto principal, risco de instabilidade. A malha aberta é simples e barata, mas sensível a perturbações e a variações dos parâmetros.



Se cair uma questão pedindo diferença e exemplo, o roteiro é: define malha aberta, dá um exemplo, como uma torradeira com timer; define malha fechada, dá um exemplo, como um ferro de passar com termostato; e fecha com a troca, ou seja, precisão contra custo e risco de instabilidade.



Três armadilhas. Dizer que malha fechada é sempre melhor: não é, ela pode ficar instável. Confundir planta com processo: planta é atuador mais processo. E achar que ter sensor já é malha fechada: só é se a medida for usada para corrigir a ação.



Uma última peça do vocabulário: os erros de medição, que o professor classifica como um tipo de distúrbio. Erro grosseiro, quando alguém anota errado ou inverte a polaridade. Erro acidental, como uma queda de tensão que ninguém percebeu. Erro de inserção, quando o próprio instrumento muda o que está sendo medido, como um termômetro frio num líquido quente. Erro de paralaxe, por causa do ângulo de visão num instrumento analógico. E erro de zeragem, quando o zero do instrumento está desajustado. Isso importa porque, em malha fechada, o controlador confia no sensor. Se a medida está errada, ele corrige para o lugar errado.



E onde tudo isso aparece no resto da disciplina? O somador do diagrama de blocos é o comparador. O bloco G é a planta. O bloco H é o sensor. E o controlador PID, do episódio dezessete, é a peça que transforma o erro em ação.



Resumo: medir, comparar, corrigir. Isso é realimentação.



Pergunta: um semáforo com tempo fixo é malha aberta ou fechada? Pensa no que ele mede. Ele não mede nada. Malha aberta.
