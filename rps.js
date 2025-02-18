// 0 = rock, 1 = paper, 2 = scissors
function num2rps(x) {
  switch (x) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    default:
      return "scissors";
  }
}

function getComputerChoice() {
  return num2rps(Math.floor(Math.random() * 3)); // random 0, 1 or 2 => transformed to "rock", "paper" or "scissors"
}

// returns -1 if human loses, 0 if draw, 1 if human wins
function rpsResult(human, comp) {
  if (human === "rock")
    return comp === "rock" ? 0 : comp === "paper" ? -1 : 1;
  else if (human === "paper")
    return comp === "rock" ? 1 : comp === "paper" ? 0 : -1;
  else
    return comp === "rock" ? -1 : comp === "paper" ? 1 : 0;
}

function playRound(humanSelection) {
  const computerSelection = getComputerChoice();
  imgComputer.src = `fig/roshambo-${computerSelection}.webp`;
  if (!computerAnim)
    imgComputer.classList.add("anim");
  else
    imgComputer.classList.remove("anim");
  computerAnim = !computerAnim;
  const result = rpsResult(humanSelection, computerSelection);
  let resultString;
  switch (result) {
    case 1:
      resultString = `You win, because ${humanSelection} beats ${computerSelection}.`;
      score.human += 1;
      break;
    case 0:
      resultString = `Draw! The result was ${humanSelection} vs ${computerSelection}.`;
      break;
    default:
      resultString = `You lose, because ${humanSelection} loses to ${computerSelection}.`;
      score.computer += 1;
  }
  return resultString
}

function playGame(humanSelection) {
  if (isFinishedGame())  // the game was finished
    reinitGame();

  let resultString = playRound(humanSelection);

  displayResults(resultString);
  displayFinalWinner();
}

function isFinishedGame() {
  return score.human == 5 || score.computer == 5
}

function reinitGame() {
  score.human = 0;
  score.computer = 0;
  divWinner.textContent = "";
  divWinner.style.visibility = "hidden";
}

function displayResults(resultString) {
  divResults.textContent = resultString;  // display round result
  divScore.textContent = `You: ${score.human}   vs.   Computer: ${score.computer}`; // display score
  divResults.style.visibility = "visible";
  divScore.style.visibility = "visible";
}

function displayFinalWinner() {
  let scoreString = "[Winner]";
  if (score.human == 5) {
    scoreString = "You win!"
    divWinner.style.color = "green";
    divWinner.style.visibility = "visible";
  }
  else if (score.computer == 5) {
    scoreString = "You lose!"
    divWinner.style.color = "red";
    divWinner.style.visibility = "visible";
  }
  divWinner.textContent = scoreString;  // display winner
}

const btnRock = document.querySelector("#rock");
const btnPaper = document.querySelector("#paper");
const btnScissors = document.querySelector("#scissors");

btnRock.addEventListener("click", () => { playGame("rock"); });
btnPaper.addEventListener("click", () => { playGame("paper"); });
btnScissors.addEventListener("click", () => { playGame("scissors"); });

const divResults = document.querySelector("#results");
divResults.style.visibility = "hidden";
const divScore = document.querySelector("#score");
divScore.style.visibility = "hidden";
const divWinner = document.querySelector("#winner");
divWinner.style.visibility = "hidden";

const imgComputer = document.querySelector("#computer");

let score = { human: 0, computer: 0 };
let computerAnim = false;
