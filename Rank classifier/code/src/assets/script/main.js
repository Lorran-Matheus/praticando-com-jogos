
let states = {
  view: {
    // heroName: document.getElementById("heroName"),
    championName: "BatuskE",
  },
  values: {
    totalMatches: 326,
    totalGameTime: 0,
    rankPoints: 0,
    currentRank: "",
    matchTime: 2600, // corresponds to the match duration in seconds ( / 60 = minutes)
    wins: 230,
    losses: 0,
    victoryPoints: 60,
    defeatPoints: 42,
  }
}

function defineRank() {
  let currentRankPoints = states.values.rankPoints;
  let currentWins = states.values.wins;
  let currentLosses = states.values.losses;

  currentWins *= states.values.victoryPoints;
  currentLosses *= states.values.defeatPoints;

  currentRankPoints = currentWins - currentLosses;
  states.values.rankPoints = currentRankPoints;

  if (currentRankPoints <= 1000) {
    states.values.currentRank = "Iron";
  } else if (currentRankPoints <= 2000) {
    states.values.currentRank = "Bronze";
  } else if (currentRankPoints <= 3000) {
    states.values.currentRank = "Silver";
  } else if (currentRankPoints <= 4000) {
    states.values.currentRank = "Gold";
  } else if (currentRankPoints <= 6000) {
    states.values.currentRank = "Platinum";
  } else if (currentRankPoints <= 9000) {
    states.values.currentRank = "Ascendant";
  } else if (currentRankPoints <= 12000) {
    states.values.currentRank = "Immortal";
  } else {
    states.values.currentRank = "Radiant";
  }
}

function calculateGameTime() {
  let currentTime = states.values.totalMatches * states.values.matchTime;
  states.view.totalGameTime = currentTime / 60;
}

function calculateLosses(matches) {
  states.values.losses = matches - states.values.wins
}

function printLogText(){
  console.log("")
  console.log(`The Hero ${states.view.championName} is ranked as ${states.values.currentRank}`)
  console.log(`Current rank points: ${states.values.rankPoints}`)
  console.log("")
  console.log(`Total matches: ${states.values.totalMatches}`)
  console.log("")
  console.log(`Wins: ${states.values.wins}`)
  console.log(`Losses: ${states.values.losses}`)
  console.log("")
  console.log(`Match time: ${states.view.totalGameTime.toFixed(0)} minutes (${(states.view.totalGameTime / 60).toFixed(0)} hours).`)
  console.log("")
}

function victorysAchievements(currentRank) {
  if (currentRank === "Iron") {
    console.log(`New achievement unlocked: "Baby steps" -- Reached Iron Rank.`)
  } else if (currentRank === "Bronze") {
    console.log(`New achievement unlocked: "You are beginning to understand" -- Reached Bronze Rank.`)
  } else if (currentRank === "Silver") {
    console.log(`New achievement unlocked: "Looks like someone is really growing up" -- Reached Silver Rank.`)
  } else if (currentRank === "Gold") {
    console.log(`New achievement unlocked: "If you can do Gold, you can do Ascendant, right?" -- Reached Gold Rank.`)
  } else if (currentRank === "Platinum") {
    console.log(`New achievement unlocked: "You're definitely playing this game for keeps" -- Reached Platinum Rank.`)
  } else if (currentRank === "Ascendant") {
    console.log(`New achievement unlocked: "I knew it. You really can reach Ascendant!" -- Reached Ascendant Rank.`)
  } else if (currentRank === "Immortal") {
    console.log(`New achievement unlocked: "It is a piece of cake, isn't it?" -- Reached Immortal Rank.`)
  } else if (currentRank === "Radiant") {
    console.log(`New achievement unlocked: "I don't have words to describe you... YOU ARE THE GREATEST!" -- Reached Radiant Rank`)
  }
  console.log("")
}

function init() {
  calculateGameTime();
  calculateLosses(states.values.totalMatches)
  defineRank();
  printLogText()
  victorysAchievements(states.values.currentRank)
}

init()
