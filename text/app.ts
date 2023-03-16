import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

// type startConfetti = () => void;
const newConfetti = startConfetti();

const playerScoreElem = document.getElementById("playerScore") as HTMLElement;
const playerChoiceElem = document.getElementById("playerChoice") as HTMLElement;
const computerScoreElem = document.getElementById(
  "computerScore"
) as HTMLElement;
const computerChoiceElem = document.getElementById(
  "computerChoice"
) as HTMLElement;

const resultText = document.getElementById("resultText") as HTMLElement;

const computerRock = document.getElementById("computerRock") as HTMLElement;
const computerPaper = document.getElementById("computerPaper") as HTMLElement;
const computerScissors = document.getElementById(
  "computerScissors"
) as HTMLElement;
const computerLizard = document.getElementById("computerLizard") as HTMLElement;
const computerSpock = document.getElementById("computerSpock") as HTMLElement;

const playerRock = document.getElementById("playerRock") as HTMLElement;
const playerPaper = document.getElementById("playerPaper") as HTMLElement;
const playerScissors = document.getElementById("playerScissors") as HTMLElement;
const playerLizard = document.getElementById("playerLizard") as HTMLElement;
const playerSpock = document.getElementById("playerSpock") as HTMLElement;

const allGameIcons = document.querySelectorAll(".far")!;
// --------------------------------------------
declare global {
  interface Window {
    select: any;
    resetAll: any;
  }
}

interface Choices {
  [key: string]: { name: string; defeats: string[] };
  rock: { name: string; defeats: string[] };
  paper: { name: string; defeats: string[] };
  scissors: { name: string; defeats: string[] };
  lizard: { name: string; defeats: string[] };
  spock: { name: string; defeats: string[] };
}
// ---------------------------------------------------
const choices: Choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

let playerScoreNumber: number;
let computerScoreNumber: number;
let computerChoice: string = "";

// Pass computer selection value and style icons
function select(playerChoice: string) {
  checkResult(playerChoice);
  // add selected styling and update player choice

  switch (playerChoice) {
    case "rock":
      playerRock.classList.add("selected");
      playerChoiceElem.textContent = " --- Rock";
      break;
    case "scissors":
      playerScissors.classList.add("selected");
      playerChoiceElem.textContent = " --- Scissors";
      break;
    case "paper":
      playerPaper.classList.add("selected");
      playerChoiceElem.textContent = " --- Paper";
      break;
    case "lizard":
      playerLizard.classList.add("selected");
      playerChoiceElem.textContent = " --- Lizard";
      break;
    case "spock":
      playerSpock.classList.add("selected");
      playerChoiceElem.textContent = " --- Spock";
      break;

    default:
      break;
  }
}
window.select = select;

// reset all selected icon
function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove("selected");
  });
  stopConfetti();

  removeConfetti();
}

// reset scores and choices
function resetAll() {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreElem.textContent = `${playerScoreNumber}`;
  computerScoreElem.textContent = `${computerScoreNumber}`;
  playerChoiceElem.textContent = "";
  computerChoiceElem.textContent = "";
  resultText.textContent = "";
  resetSelected();
}

window.resetAll = resetAll;

// -----------
function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = "rock";
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = "paper";
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = "scissors";
  } else if (computerChoiceNumber <= 0.8) {
    computerChoice = "lizard";
  } else {
    computerChoice = "spock";
  }
}

// add "selected" styling and comp choice
function displayComputerChoice() {
  switch (computerChoice) {
    case "rock":
      computerRock.classList.add("selected");
      computerChoiceElem.textContent = " --- Rock";
      break;
    case "scissors":
      computerScissors.classList.add("selected");
      computerChoiceElem.textContent = " --- Scissors";
      break;
    case "paper":
      computerPaper.classList.add("selected");
      computerChoiceElem.textContent = " --- Paper";
      break;
    case "lizard":
      computerLizard.classList.add("selected");
      computerChoiceElem.textContent = " --- Lizard";
      break;
    case "spock":
      computerSpock.classList.add("selected");
      computerChoiceElem.textContent = " --- Spock";
      break;

    default:
      break;
  }
}

// check result, increase scores, update result text
function updateScore(playerChoice: string) {
  //   console.log(playerChoice, computerChoice);
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie";
  } else {
    // from the choices object on line 45

    interface choice {
      name: string;
      defeats: string[];
    }
    const choice: choice = choices[playerChoice];

    // returns -1 if the computer choice is not in the defeat array
    // console.log(choice.defeats.indexOf(computerChoice));
    if (choice.defeats.indexOf(computerChoice) > -1) {
      resultText.textContent = "You win!";
      startConfetti();
      playerScoreNumber++;
      playerScoreElem.textContent = `${playerScoreNumber}`;
    } else {
      resultText.textContent = "You Lost!";
      computerScoreNumber++;
      computerScoreElem.textContent = `${computerScoreNumber}`;
    }
  }
}

// call all functions
function checkResult(playerChoice: string) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// on load
resetAll();
