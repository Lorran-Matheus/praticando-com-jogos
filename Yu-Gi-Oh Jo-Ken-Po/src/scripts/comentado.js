// Armazena todas as referências aos elementos do jogo na tela (DOM)
const state = {
    score: {
        playerScore: 0,  // Pontuação do jogador
        computerScore: 0, // Pontuação do computador
        scoreBox: document.getElementById("score_points"), // Elemento que exibe o placar
    },
    cardsSprites: {
        avatar: document.getElementById("card-image"), // Imagem da carta em destaque
        name: document.getElementById("card-name"),     // Nome da carta em destaque
        type: document.getElementById("card-type"),     // Tipo (atributo) da carta em destaque
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),    // Carta do jogador revelada no campo
        computer: document.getElementById("computer-field-card") // Carta do computador revelada no campo
    },
    playerSides : {
        player1: "player-cards",                                 // ID do campo de cartas do jogador
        player1Box: document.querySelector("#player-cards"),     // Elemento real do campo de cartas do jogador
        computer: "computer-cards",                              // ID do campo do computador
        computerBox: document.querySelector("#computer-cards"),  // Elemento real do campo do computador
    },
    actions: {
        button: document.getElementById("next-duel"), // Botão para iniciar o próximo duelo
    }
}

// Caminho padrão das imagens das cartas
const pathImages = "/src/assets/icons/"

// Dados das cartas: nome, tipo, imagem, quem vence e quem perde
const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Scissors",
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Rock",
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [1],
    },
];

// Gera aleatoriamente um ID de carta existente
async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length)
    return cardData[randomIndex].id;
}

// Cria um elemento visual (img) representando uma carta
async function createCardImg(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", `${pathImages}card-back.png`);
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    // Se for carta do jogador, adiciona eventos de hover e clique
    if (fieldSide === state.playerSides.player1) {
        cardImage.addEventListener("mouseover", () => {
            drawSelectedCard(IdCard)
        })

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        })
    }

    return cardImage
}

// Exibe os dados da carta selecionada (imagem, nome, tipo)
async function drawSelectedCard(index) {
    state.cardsSprites.avatar.src = cardData[index].img;
    state.cardsSprites.name.innerText = cardData[index].name;
    state.cardsSprites.type.innerText = `Attribute :${cardData[index].type}`;
}

// Desenha várias cartas aleatórias para o campo indicado (jogador ou computador)
async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImg(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

// Inicia o duelo com a carta clicada e revela a carta do computador
async function setCardsField(cardId) {
    await removeAllCardsImages(); // Remove todas as cartas das mãos

    let computerCardId = await getRandomCardId(); // Carta aleatória do computador

    // Mostra as cartas no campo
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    // Verifica resultado do duelo
    let duelResults = await checkDuelResults(cardId, computerCardId);

    // Atualiza o placar e exibe o botão com o resultado
    await updateScore();
    await drawButton(duelResults);
}

// Exibe o botão com o texto do resultado (em caixa alta)
async function drawButton(text){
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";
}

// Atualiza o placar no elemento HTML
async function updateScore(){
    state.score.scoreBox.innerText = 
    `Win :${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

// Verifica se o jogador venceu, perdeu ou empatou
async function checkDuelResults(playerCardId, computerCardId){
    let duelResults = "Draw"
    let playerCard = cardData[playerCardId];

    if(playerCard.WinOf.includes(computerCardId)){
        duelResults = "Win";
        state.score.playerScore++;
    }

    if(playerCard.LoseOf.includes(computerCardId)){
        duelResults = "Lose";
        state.score.computerScore++;
    }

    await playAudio(duelResults); // Toca som de acordo com o resultado

    return duelResults;
}

// Remove todas as imagens de cartas dos dois lados
async function removeAllCardsImages(){
    let {computerBox, player1Box} = state.playerSides;

    let imgElements = computerBox.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1Box.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

// Reinicia o duelo, limpando o campo e as cartas destacadas
async function resetDuel(){
    state.cardsSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    state.cardsSprites.name.innerText = "Select"
    state.cardsSprites.type.innerText = "a card"

    init(); // Recomeça o jogo
}

// Reproduz o som correspondente ao status ("Win", "Lose", "Draw")
async function playAudio (status){
    const audio = new Audio(`/src/assets/audios/${status}.wav`)
    
    try {
        audio.play();
    } catch {}
}

// Função principal que inicia o jogo ao carregar
function init() {
    drawCards(5, state.playerSides.player1);     // Desenha 5 cartas para o jogador
    drawCards(5, state.playerSides.computer);    // Desenha 5 cartas para o computador

    // Inicia música de fundo
    const bgm = document.getElementById("bgm");
    bgm.volume = .4;
    bgm.play();
}

// Executa o jogo ao carregar o script
init();
