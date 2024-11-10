// script.js
const colorButtons = document.querySelectorAll('.color-button');
const message = document.getElementById('message');
const startButton = document.getElementById('start');

let gameSequence = [];
let playerSequence = [];
let level = 0;

// Function to play a color sequence
function playSequence() {
  playerSequence = [];
  let delay = 500;

  gameSequence.forEach((color, index) => {
    setTimeout(() => {
      flashButton(color);
    }, delay * (index + 1));
  });
}

// Flash the button with a color
function flashButton(color) {
  const button = document.getElementById(color);
  button.classList.add('active');
  setTimeout(() => button.classList.remove('active'), 300);
}

// Start a new round
function newRound() {
  level++;
  message.textContent = `Level ${level}`;
  const colors = ['green', 'red', 'yellow', 'blue'];
  gameSequence.push(colors[Math.floor(Math.random() * colors.length)]);
  playSequence();
}

// Handle player's color selection
function handleColorClick(event) {
  const selectedColor = event.target.id;
  playerSequence.push(selectedColor);
  flashButton(selectedColor);

  // Check if the player's sequence matches the game sequence
  if (playerSequence[playerSequence.length - 1] !== gameSequence[playerSequence.length - 1]) {
    message.textContent = 'Game Over! Try again.';
    resetGame();
    return;
  }

  if (playerSequence.length === gameSequence.length) {
    setTimeout(newRound, 1000);
  }
}

// Reset the game
function resetGame() {
  gameSequence = [];
  playerSequence = [];
  level = 0;
  startButton.disabled = false;
}

// Start the game
startButton.addEventListener('click', () => {
  resetGame();
  startButton.disabled = true;
  newRound();
});

// Add event listeners to color buttons
colorButtons.forEach(button => button.addEventListener('click', handleColorClick));
