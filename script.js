const ruleButton = document.querySelector("#rules-button");
const gameRules = document.querySelector(".game-rule");
const crossButton = document.querySelector("#cross-sign");
const playArea = document.querySelector(".play-area");

ruleButton.addEventListener("click", toggleRules);
crossButton.addEventListener("click", toggleRules);

function toggleRules() {
  gameRules.style.right =
    gameRules.style.getPropertyValue("right") === "1rem" ? "-70rem" : "1rem";
  crossButton.style.display =
    crossButton.style.getPropertyValue("display") === "inline-block"
      ? "none"
      : "inline-block";
}

const pcChoices = ["rock", "paper", "scissors"];
const resultSection = document.querySelector(".results");
const playButtons = document.querySelectorAll(".play-area div");

playButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const randomChoice = Math.floor(Math.random() * pcChoices.length);
    determineWinner(
      e.currentTarget.getAttribute("value"),
      pcChoices[randomChoice]
    );
    playArea.classList.add("inactive");
    resultSection.classList.remove("inactive");
  });
});

function determineWinner(playerChoice, pcChoice) {
  if (playerChoice === "rock") {
    if (pcChoice === "rock") updateGameDisplay(playerChoice, pcChoice, "tie");
    if (pcChoice === "scissors")
      updateGameDisplay(playerChoice, pcChoice, "playerwins");
    if (pcChoice === "paper")
      updateGameDisplay(playerChoice, pcChoice, "pcwins");
  }
  if (playerChoice === "scissors") {
    if (pcChoice === "rock")
      updateGameDisplay(playerChoice, pcChoice, "pcwins");
    if (pcChoice === "scissors")
      updateGameDisplay(playerChoice, pcChoice, "tie");
    if (pcChoice === "paper")
      updateGameDisplay(playerChoice, pcChoice, "playerwins");
  }
  if (playerChoice === "paper") {
    if (pcChoice === "rock")
      updateGameDisplay(playerChoice, pcChoice, "playerwins");
    if (pcChoice === "scissors")
      updateGameDisplay(playerChoice, pcChoice, "pcwins");
    if (pcChoice === "paper") updateGameDisplay(playerChoice, pcChoice, "tie");
  }
}

const playerScoreDisplay = document.querySelector("#player-score-number");
const pcScoreDisplay = document.querySelector("#computer-score-number");
let playerScore = parseInt(localStorage.getItem("playerwins")) || 0;
let pcScore = parseInt(localStorage.getItem("pcwins")) || 0;

playerScoreDisplay.textContent = playerScore;
pcScoreDisplay.textContent = pcScore;

function updateGameDisplay(playerChoice, pcChoice, gameStatus) {
  const playerImage = document.querySelector(".player-choices img");
  playerImage.src = `./assets/images/${playerChoice}.png`;

  const pcImage = document.querySelector(".pc-choices img");
  pcImage.src = `./assets/images/${pcChoice}.png`;

  const resultText = document.querySelector(".won-lost-text");
  if (gameStatus === "tie") {
    resultText.textContent = "TIE UP";
  } else if (gameStatus === "playerwins") {
    resultText.textContent = "YOU WON";
    playerScore++;
    document.querySelector("#next-button").classList.remove("inactive");
  } else if (gameStatus === "pcwins") {
    resultText.textContent = "YOU LOST";
    pcScore++;
  }

  // Store updated scores in local storage
  localStorage.setItem("playerwins", playerScore);
  localStorage.setItem("pcwins", pcScore);
  playerScoreDisplay.textContent = playerScore;
  pcScoreDisplay.textContent = pcScore;
}

Array.from(document.querySelectorAll(".play-again-btn")).forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.reload();
  });
});

document.querySelector("#next-button").addEventListener("click", () => {
  playArea.classList.add("inactive");
  resultSection.classList.add("inactive");
  document.querySelector("header").classList.add("inactive");
  document.querySelector(".hurray-page").classList.remove("inactive");
  document.querySelector("#next-button").classList.add("inactive");
});
