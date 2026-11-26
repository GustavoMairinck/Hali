# Tópico 05 — O que é um sistema de controle

- **Bloco:** Fundamentos da disciplina
- **Importância:** Importante · **Dificuldade:** Baixa · **Tempo:** 10 min
- **Pré-requisitos:** nenhum
- **Relação:** Vocabulário usado em todo o curso; base para diagramas de blocos (07) e controladores (17)
- **Fontes:** Aula 1, slides 1–40 · Processual 1º bim Q4 · Playlist A.01 (5:06 malha aberta; 7:32 malha fechada)
- **Áudio:** ../audios/topico-05.mp3

## 1. O que vou aprender?

O vocabulário básico: **planta, atuador, sensor, controlador, malha aberta e malha fechada**. A Processual do 1º bimestre (Q4) cobrou exatamente isso.

## 2. Antes de começar

Nada. Este é o ponto de partida.

## 3. Entendendo o conceito

**Controlar** é fazer uma variável assumir um valor desejado ou seguir uma trajetória (Aula 1).

O professor abre com: **tornado × avião**. Os dois carregam massa pelo ar. A diferença é **o controle**.

**As peças (exemplo: ar-condicionado):**

- **Referência / setpoint (SP):** a temperatura que você quer. Ex.: 22 °C.
- **Saída / variável controlada (PV):** a temperatura real da sala.
- **Controlador:** compara SP com PV e decide o que fazer. Ex.: microprocessador.
- **Atuador:** faz o trabalho físico. Ex.: compressor.
- **Processo:** a sala.
- **Planta = atuador + processo** (Aula 1). No projeto, eles viram um bloco só.
- **Sensor:** mede a saída. Ex.: termistor.
- **Distúrbio:** o que atrapalha. Ex.: alguém abre a porta.
  - Erros de medição também são distúrbios (Aula 1): **grosseiro** (anotar errado, polaridade invertida), **acidental** (queda de tensão não percebida), **de inserção** (o instrumento altera o que mede), **de paralaxe** (ângulo de leitura) e **de zeragem** (zero desajustado).

**Malha aberta:** não mede a saída. Segue um programa fixo.
- Exemplo do professor: **máquina de lavar** (não sabe se a roupa está limpa).
- "Dirigir em malha aberta é dirigir de olhos fechados" (Aula 1).

**Malha fechada (realimentação):** mede a saída e corrige.
- Exemplo: piloto automático, ar-condicionado com termostato.

| | Malha aberta | Malha fechada |
|---|---|---|
| Custo | baixo | maior |
| Precisão | baixa | **alta** |
| Perturbações | não corrige | **rejeita** |
| Instabilidade | não cria | **pode criar** |

## 4. Fórmulas importantes

**Erro (o que o controlador "vê"):**

```
e(t) = referência − saída medida
```

Será transformado em E(s) = R(s) − C(s) no tópico 16.

## 5. Exemplo resolvido

**Problema (estilo Processual Q4):** explique a diferença entre malha aberta e fechada, com um exemplo de cada.

1. **Definição de malha aberta.** A saída não influencia a ação de controle.
2. **Exemplo.** Torradeira com timer: torra pelo tempo programado, mesmo se o pão já queimou.
3. **Definição de malha fechada.** A saída é medida e comparada com a referência; a diferença (erro) gera a ação.
4. **Exemplo.** Ferro de passar com termostato: desliga quando atinge a temperatura e religa quando esfria.
5. **Fechar com a troca.** Malha fechada ganha precisão e rejeição de distúrbios, mas custa mais e pode ficar instável.

## 6. Erros comuns

- **Dizer que malha fechada é sempre melhor.** Ela pode ficar **instável**. É por isso que estudamos estabilidade.
- **Confundir planta com processo.** Planta = atuador + processo.
- **Achar que ter sensor já é malha fechada.** Precisa usar a medida para **corrigir** a ação.

## 7. O que preciso memorizar?

**Memorizar:** a tabela malha aberta × fechada e um exemplo de cada.

**Entender:** realimentação = medir, comparar, corrigir.

## 8. Teste rápido

1. Um semáforo com tempo fixo é malha aberta ou fechada?
2. Cite 1 desvantagem da malha fechada.
3. O que forma a "planta"?

### Respostas (tente antes de ler)

1. **Malha aberta** (não mede o trânsito).
2. Risco de **instabilidade** (ou custo/manutenção maiores).
3. **Atuador + processo**.
