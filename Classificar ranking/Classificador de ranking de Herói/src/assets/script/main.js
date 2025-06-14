const { tempoDeJogo } = require('./userDetails');

let states = {
    view: {
        // heroName: document.getElementById("heroName"),
        heroName: "BatuskE",
    },
    values: {
        // rank: document.getElementById("currentPoints"),
        rank: 11001,
        currentRank: "",
    }
}

function ranking(rank) {
    if (rank <= 1000) {
    states.values.currentRank = "Ferro";

  } else if (rank <= 2000) {
    states.values.currentRank = "Bronze";

  } else if (rank <= 3000) {
    states.values.currentRank = "Prata";

  } else if (rank <= 4000) {
    states.values.currentRank = "Ouro";

  } else if (rank <= 6000) {
    states.values.currentRank = "Platina";

  } else if (rank <= 9000) {
    states.values.currentRank = "Ascendente";

  } else if (rank <= 12000) {
    states.values.currentRank = "Imortal";

  } else {
    states.values.currentRank = "Radiante";
  }
}

function printText() {
    if (states.values.currentRank) {
        console.log("")
        console.log(`O Herói ${states.view.heroName} está no rank ${states.values.currentRank}`)
    }
}

function init() {
    ranking(states.values.rank);
    printText();
    tempoDeJogo(states.view.tempoPartidas);
}

init()