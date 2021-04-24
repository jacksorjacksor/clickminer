// Define variables
const container = document.querySelector('.container');
var level = 0;
var walls = setWalls();
var squares = document.querySelectorAll(".square:not([class*='wall'])");

function setWalls(wallRow, wallCol) {
  console.log('SetWalls - Level: ' + level);
  // This'll be the hard part!!!
  let wallReference = '.row' + wallRow + ', .col' + wallCol;
  let walls = document.querySelectorAll(wallReference);
  // let walls = document.querySelectorAll('.row1, .col1');
  walls.forEach((e) => {
    e.classList.add('wall' + level);
  });
  return walls;
}

function setWin() {
  // Pick a random item from a collection
  console.log('SetWin - Level: ' + level);
  let squares = document.querySelectorAll(".square:not([class*='wall'])");

  squares.forEach((square) => {
    square.classList.add('level' + level);
  });

  let winningSquare = squares[Math.floor(Math.random() * squares.length)];
  winningSquare.classList.add('win');
  return winningSquare;
}

// function setLose() {
//   let squaresWithoutWin = document.querySelectorAll(
//     ".square:not([class*='wall']):not(.win)"
//   );
//   let losingSquare =
//     squaresWithoutWin[Math.floor(Math.random() * squaresWithoutWin.length)];
//   losingSquare.classList.add('lose');
//   return losingSquare;
// }

function resetBoard() {
  document.querySelector('.win').classList.remove('win');
  // document.querySelector('.lose').classList.remove('lose');
}

function winLevel(winSquare) {
  level += 1;
  // This works if we keep the IDs correct!
  winSquare.classList.forEach(function (e) {
    if (e.startsWith('row')) {
      winRow = e.slice(3);
    }
    if (e.startsWith('col')) {
      winCol = e.slice(3);
    }
  });
  // workout where the win was
  setWalls(winRow, winCol);
  resetBoard();
  initialiser();
}

function initialiser() {
  var winSquare = setWin();
  //   var loseSquare = setLose();
}

// Event Listener
container.addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target.classList.contains('win')) {
    winLevel(e.target);
  }
});
// Run the scripts
initialiser();
