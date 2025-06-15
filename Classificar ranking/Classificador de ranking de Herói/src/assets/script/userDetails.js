let states = {
    view: {
        // totalDePartidas: document.getElementById("Total-de-partidas")
        totalDePartidas: 3945,
        tempoTotalDeJogo: 0,
    },
    values: {
       tempoPartidas: 300, // 5min cada partida 
    }
}

function tempoDeJogo() {
    currentTime = states.view.totalDePartidas * states.values.tempoPartidas;
    states.view.tempoTotalDeJogo = currentTime / 60;
    console.log("")
    console.log(`Você jogou um total de ${states.view.totalDePartidas} partidas.`) 
    console.log(`Seu tempo em partida foi de ${states.view.tempoTotalDeJogo} minutos, ou ${states.view.tempoTotalDeJogo / 60} horas`)
    console.log("")
}

export {tempoDeJogo};