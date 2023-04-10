'use strict';

const regex = /rock|paper|scissor/i;
let score = [0, 0]; // [player, computer]

const game = function () {
  for (let i = 0; i < 5; i++) {
    const userInput = prompt('What is your choice: \nRock \nPaper \nScissor');

    const getComputerChoice = function () {
      const choice = Math.trunc(Math.random() * 3);
      if (choice === 0) return 'rock';
      if (choice === 1) return 'paper';
      if (choice === 2) return 'scissor';
    };

    const playRound = function (playerSelection, computerSelection) {
      const player = regex.test(playerSelection);
      const computer = regex.test(computerSelection);

      const playerChoice =
        playerSelection[0].toUpperCase() +
        playerSelection.slice(1).toLowerCase();
      const comChoice =
        computerSelection[0].toUpperCase() +
        computerSelection.slice(1).toLowerCase();

      const display = `You Win! ${playerChoice} beats ${comChoice}`;

      if (player && computer) {
        if (playerChoice === comChoice) {
          return 'Draw! Play again';
        } else if (playerChoice === 'Rock' && comChoice === 'Scissor') {
          score[0]++;
          return display;
        } else if (playerChoice === 'Paper' && comChoice === 'Rock') {
          score[0]++;
          return display;
        } else if (playerChoice === 'Scissor' && comChoice === 'Paper') {
          score[0]++;
          return display;
        } else {
          score[1]++;
          return `You Lose! ${comChoice} beats ${playerChoice}`;
        }
      } else {
        return 'Input is incorrect. Try again!';
      }
    };
    const computerSelection = getComputerChoice();
    console.log(playRound(userInput, computerSelection));
  }

  if (score[0] > score[1]) {
    console.log('You are the winner');
  } else if (score[0] < score[1]) {
    console.log('You are the loser!');
  } else {
    console.log('Draw!');
  }
};

document.querySelector('button').addEventListener('click', game);
