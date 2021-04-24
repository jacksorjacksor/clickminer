// Define variables
const container = document.querySelector('.container');
const walls = document.querySelectorAll('.square.wall');
const squares = document.querySelectorAll('.square:not(.wall)');

function setWalls() {
  // This'll be the hard part!!!
}

function setWin() {
  // Pick a random item from a collection
  let winningSquare = squares[Math.floor(Math.random() * squares.length)];
  winningSquare.classList.add('win');
}

function setLose() {
  let squaresWithoutWin = document.querySelectorAll(
    '.square:not(.wall):not(.win)'
  );
  let losingSquare =
    squaresWithoutWin[Math.floor(Math.random() * squaresWithoutWin.length)];
  losingSquare.classList.add('lose');
}

function resetBoard() {
  document.querySelector('.win').classList.remove('win');
  document.querySelector('.lose').classList.remove('lose');
}

function initialiser() {
  // REMOVE existing win and lose blocks
  if (document.querySelector('.win')) {
    resetBoard();
  }
  setWin();
  setLose();
}

// Event Listener
container.addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target.classList.contains('win')) {
    initialiser();
  }
});
// Run the scripts
initialiser();
