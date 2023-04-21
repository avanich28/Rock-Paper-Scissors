'use strict';

const roundDisplay = document.querySelector('.round');
const resultDisplay = document.querySelector('div.result');
const scoreBoard = document.querySelectorAll('div.score');

const announce = document.querySelector('div.end');
const message = document.querySelector('div.resultEnd');
const buttonRestart = document.querySelector('button.play.again');
const overlay = document.querySelector('.overlay');

const btnRock = document.querySelector('button.rock');
const btnPaper = document.querySelector('button.paper');
const btnScissor = document.querySelector('button.scissor');

const btns = [btnRock, btnPaper, btnScissor];

// const regex = /rock|paper|scissor/i;
let scores = [0, 0]; // [player, computer]
let round = 1;
resultDisplay.innerHTML = '';

const game = function (e) {
  // sound click
  const audio = document.querySelector('.sound');
  if (e) {
    audio.currentTime = 0;
    audio.play();
  }

  // convert choice num to rps
  const choiceStr = function (choice) {
    if (choice === 0) return 'rock';
    if (choice === 1) return 'paper';
    if (choice === 2) return 'scissor';
  };

  // user choice
  const userInput = Number(e.target.id);
  const getUserChoice = function (userChoice) {
    return choiceStr(userChoice);
  };

  // computer choice
  const getComputerChoice = function () {
    const randomChoice = Math.trunc(Math.random() * 3);
    return choiceStr(randomChoice);
  };

  const playRound = function (playerSelection, computerSelection) {
    if (round <= 5) {
      // Result message
      const display = function (result) {
        // update round display
        roundDisplay.textContent = `ROUND ${round}`;

        // update display
        resultDisplay.addClassList = 'result';
        const capital = function (word) {
          return word.split('')[0].toUpperCase() + word.slice(1);
        };
        resultDisplay.innerHTML = `<div>You ${
          result === 'win'
            ? 'Win!</div>' +
              '<br/><div>' +
              capital(playerSelection) +
              ' ' +
              'beats' +
              ' ' +
              computerSelection
            : result === 'draw'
            ? 'and computer are draw!</div>' +
              '<br/><div>' +
              capital(playerSelection) +
              ' ' +
              "can't beat" +
              ' ' +
              computerSelection
            : 'Lose!</div>' +
              '<br/><div>' +
              capital(computerSelection) +
              ' ' +
              'beats' +
              ' ' +
              playerSelection
        }</div> `;
        if (result === 'win') {
          resultDisplay.style.color = 'rgb(85, 213, 65)';
        } else if (result === 'draw') {
          resultDisplay.style.color = 'blue';
        } else {
          resultDisplay.style.color = 'red';
        }

        // update score board
        scoreBoard[0].textContent = scores[0];
        scoreBoard[1].textContent = scores[1];

        // update round
        round++;
      };

      // Condition rps game
      if (playerSelection === computerSelection) {
        // Draw
        return display('draw');
      } else if (
        playerSelection === 'rock' &&
        computerSelection === 'scissor'
      ) {
        // Player win
        scores[0]++;
        return display('win');
      } else if (playerSelection === 'paper' && computerSelection === 'rock') {
        // player win
        scores[0]++;
        return display('win');
      } else if (
        playerSelection === 'scissor' &&
        computerSelection === 'paper'
      ) {
        // player win
        scores[0]++;
        return display('win');
      } else {
        // player lose!
        scores[1]++;
        return display('lose');
      }
    } else {
      // Game end!
      announce.classList.toggle('hidden');
      overlay.classList.toggle('hidden');

      // O.K or Game Over
      if (scores[0] > scores[1]) {
        message.textContent = 'O.K';
        announce.style.backgroundColor = 'rgb(85, 213, 65)';
      } else if (scores[0] < scores[1]) {
        message.textContent = 'Game Over!';
        announce.style.backgroundColor = 'red';
      } else {
        message.textContent = 'Draw!';
        announce.style.backgroundColor = 'blue';
      }

      // remove event listener
      btns.forEach(btn => {
        btn.removeEventListener('click', game);
      });
    }
  };
  // Call function
  const computerSelection = getComputerChoice();
  const playerSelection = getUserChoice(userInput);
  playRound(playerSelection, computerSelection);
};

// Play game again
const restartGame = function (e) {
  // Add sound restart button
  const audioRestart = document.querySelector('.soundRestart');
  if (e) {
    audioRestart.currentTime = 0;
    audioRestart.play();
  }

  // Reset Display
  scores = [0, 0];
  round = 1;
  scoreBoard.forEach(score => (score.textContent = 0));
  roundDisplay.textContent = `ROUND ${round}`;
  resultDisplay.innerHTML = '';
  announce.classList.toggle('hidden');
  overlay.classList.toggle('hidden');

  // Add Event Listener back
  btns.forEach(btn => {
    btn.addEventListener('click', game);
  });
};

// restart button
buttonRestart.addEventListener('click', restartGame);

// Click Play
btns.forEach(btn => {
  btn.addEventListener('click', game);
});
