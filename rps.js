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
  return num2rps(Math.floor(Math.random() * 3)); // random number: 0, 1 or 2
}

function getHumanChoice() {
  // there is a getComputerChoice below, to automatically fill a choice in the prompt
  return prompt("What do you choose?\nChoose one of the following:\nrock\npaper\nscissors", getComputerChoice()).toLowerCase();
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

// plays a single round
function playRound() {
  const humanSelection = getHumanChoice();
  const computerSelection = getComputerChoice();
  const result = rpsResult(humanSelection, computerSelection);
  if (result === 1)
    console.log(`You win, because ${humanSelection} beats ${computerSelection}.`);
  else if (result === 0)
    console.log(`Draw! The result was ${humanSelection} vs ${computerSelection}.`);
  else
    console.log(`You lose, because ${humanSelection} loses to ${computerSelection}.`);
  return result;
}

// main function
function playGame() {
  let humanScore = 0;
  let computerScore = 0;
  let result;
  for (let i = 0; i < 5; i++) {
    result = playRound();
    humanScore += (result === 1) ? 1 : 0;      // if rpsResult === 1, the human wins we add +1. Otherwise, we add 0
    computerScore += (result === -1) ? 1 : 0;  // if rpsResult === -1, the computer wins and we add +1. Otherwise, we add 0
  }
  console.log(`Your score was ${humanScore}, and the computer's score was ${computerScore}.`,
              (humanScore > computerScore) ? "You win!" : (humanScore === computerScore) ? "Draw!" : "You lose!");
}

playGame()
