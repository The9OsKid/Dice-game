'use strict';

//selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switching = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  //change player
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

//rolling dice
btnRoll.addEventListener('click', function() {
  if (playing) {
    //random number between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice image
    diceEl.classList.remove('hidden');
    // display coorect image for rolled number
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      //add rolled number to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //remove current score and switch player

      switching();
    }
  }
});

btnHold.addEventListener('click', function() {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //    currentScore = 0;
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switching();
    }
  }
});

btnNew.addEventListener('click', function() {
  document.location.reload();
});
