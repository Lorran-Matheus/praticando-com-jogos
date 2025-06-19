// Objeto que centraliza todo o estado do jogo
const state = {
    view: {
        // Seleciona todas as divs com a classe "square" (as casas onde o inimigo pode aparecer)
        squares: document.querySelectorAll(".square"),
        // Seleciona o elemento com a classe "enemy" (o inimigo visível no momento)
        enemy: document.querySelector(".enemy"),
        // Seleciona o elemento que mostra o tempo restante na tela
        timeleft: document.querySelector("#time-left"),
        // Seleciona o elemento que mostra a pontuação atual
        score: document.querySelector("#score")
    },
    values: {
        // Define o intervalo em milissegundos que o inimigo aparece em outra posição
        gameVelocity: 1000,
        // Guarda a posição (ID) do quadrado onde o inimigo apareceu por último
        hitPosition: 0,
        // Guarda o número de acertos do jogador
        result: 0,
        // Tempo total da partida, em segundos
        currentTime: 60,
    },
    actions: {
        // Inicia um timer que chama a função randomSquare a cada segundo
        timerId: setInterval(randomSquare, 1000),
        // Inicia um timer que chama a função countDown a cada segundo
        countDownTimerId: setInterval(countDown, 1000),
    }
};

// Função responsável por tocar o som do jogo
function playSound(audioName) {
    // Cria um novo objeto de áudio com base no nome passado e caminho relativo
    let audio = new Audio(`/src/audio/${audioName}.m4a`);
    // Define o volume do som
    audio.volume = 0.2;
    // Reproduz o som
    audio.play();
}

// Função que gerencia a contagem regressiva do tempo do jogo
function countDown() {
    // Reduz 1 segundo do tempo atual
    state.values.currentTime--;
    // Atualiza o elemento da tela com o novo tempo
    state.view.timeleft.textContent = state.values.currentTime;

    // Quando o tempo acaba, finaliza o jogo
    if (state.values.currentTime <= 0) {
        // Para o timer da contagem regressiva
        clearInterval(state.actions.countDownTimerId);
        // Para o timer que troca a posição do inimigo
        clearInterval(state.actions.timerId);
        // Mostra o resultado final em um alerta
        alert("Game Over! O seu resultado foi:" + state.values.result);
    }
}

// Função que escolhe aleatoriamente um quadrado para o inimigo aparecer
function randomSquare() {
    // Remove a classe "enemy" de todos os quadrados, apagando o inimigo da tela
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    // Gera um número aleatório de 0 a 8 (total de 9 quadrados)
    let randomNumber = Math.floor(Math.random() * 9);
    // Seleciona o quadrado correspondente ao número gerado
    let randomSquare = state.view.squares[randomNumber];
    // Adiciona a classe "enemy" a esse quadrado, fazendo o inimigo aparecer
    randomSquare.classList.add("enemy");
    // Atualiza o valor de `hitPosition` com o ID do quadrado selecionado
    state.values.hitPosition = randomSquare.id;
}

// Função que adiciona eventos de clique aos quadrados
function addListenerHitbox() {
    // Para cada quadrado do jogo
    state.view.squares.forEach((square) => {
        // Adiciona um evento que será disparado quando o botão do mouse for pressionado
        square.addEventListener('mousedown', () => {
            // Se o ID do quadrado clicado for igual ao ID do inimigo atual
            if(square.id === state.values.hitPosition){
                // Incrementa a pontuação
                state.values.result++;
                // Atualiza o texto da pontuação na tela
                state.view.score.textContent = state.values.result;
                // Limpa o valor de `hitPosition` para evitar múltiplos pontos no mesmo inimigo
                state.values.hitPosition = null;
                // Toca o som de acerto
                playSound("hit");
            }
        });
    });
}

// Função principal que inicia o jogo
function init() {
    // Ativa os eventos de clique nos quadrados
    addListenerHitbox();
}

// Chamada da função que inicia tudo
init();
