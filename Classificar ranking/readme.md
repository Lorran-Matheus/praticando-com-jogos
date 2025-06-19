# Hero Rank Stats

Um pequeno projeto em **JavaScript puro (ES Modules)** que simula um sistema de **ranqueamento de heróis**, com cálculo de tempo de jogo e exibição do progresso no console.

## Funcionalidades

- Define um herói com nome e pontuação.
- Classifica o herói com base na pontuação total:
    - >  Ferro, Bronze, Prata, Ouro, Platina, Ascendente, Imortal ou Radiante.
- Calcula o tempo total gasto em partidas, baseado no número de partidas e na duração média de cada uma.
- Exibe todas as informações no console.

## Lógica

- O rank é determinado pela função `ranking()`, com base no valor de `states.values.rank`.
- A função `tempoDeJogo()` calcula o tempo total com base nas partidas jogadas (`totalDePartidas`) e o tempo por partida (`tempoPartidas`).
- A função `printText()` exibe a mensagem:  

##  Exemplo console

### Input:
`heroName: "BatuskE"`

`rank: 11001`

`currentRank: ""` 

### Output:

```bash
> O Herói BatuskE está no rank Imortal
> Você jogou um total de 3945 partidas.
> Seu tempo em partida foi de 19725 minutos, ou 328.75 horas