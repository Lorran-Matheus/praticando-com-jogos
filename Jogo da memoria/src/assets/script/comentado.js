// Lista de emojis com pares duplicados (total de 16 itens = 8 pares)
const emojis = [
    "😺", "😺",
    "🐺", "🐺",
    "🐵", "🐵",
    "🐶", "🐶",
    "🦊", "🦊",
    "🐯", "🐯",
    "🦝", "🦝",
    "🐷", "🐷"
];

// Array para armazenar temporariamente as cartas viradas
let openCards = [];

// Embaralha os emojis aleatoriamente
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

// Criação das cartas no DOM
for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div"); // Cria uma nova div para representar uma carta
    box.className = "item"; // Adiciona a classe CSS que define o estilo da carta
    box.innerHTML = shuffleEmojis[i]; // Insere o emoji embaralhado dentro da carta
    box.onclick = handleClick; // Define a função que será chamada ao clicar na carta
    document.querySelector(".game").appendChild(box); // Adiciona a carta ao contêiner do jogo
}

// Função chamada ao clicar em uma carta
function handleClick() {
    // Permite virar no máximo duas cartas ao mesmo tempo
    if (openCards.length < 2) {
        this.classList.add("boxOpen"); // Adiciona a classe para exibir visualmente a carta virada
        openCards.push(this); // Armazena a carta virada no array temporário
    }

    // Se duas cartas foram viradas, verifica se são iguais após 600ms
    if (openCards.length == 2) {
        setTimeout(checkMacth, 600);
    }

    console.log(openCards); // Mostra as cartas viradas no console (para depuração)
}

// Função que verifica se as duas cartas viradas são iguais
function checkMacth() {
    // Compara os emojis das duas cartas viradas
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        // Se forem iguais, adiciona uma classe que mantém as cartas abertas permanentemente
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        // Se forem diferentes, remove a classe que mostra as cartas viradas (esconde novamente)
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    // Limpa o array para permitir novas tentativas
    openCards = [];

    // Verifica se todas as cartas foram combinadas
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("Você venceu !"); // Exibe mensagem de vitória
    }
}
