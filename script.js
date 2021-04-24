// Define variables
const container = document.querySelector('.container');
var level = 0;
var squares = document.querySelectorAll(".square:not([class*='wall'])");

function setWin() {
  // Pick a random item from a collection
  let squares = document.querySelectorAll(".square:not([class*='wall'])");

  squares.forEach((square) => {
    square.classList.add('level' + level);
  });

  let winningSquare = squares[Math.floor(Math.random() * squares.length)];
  winningSquare.classList.add('win');
  return winningSquare;
}

leftWallIndex = 0;
rightWallIndex = 9;
topWallIndex = 0;
bottomWallIndex = 9;

function setWalls(startingRow, startingCol) {
  // Check if which walls are furthest way from the win and bring their walls closer
  if (
    Math.abs(startingCol - leftWallIndex) <
    Math.abs(startingCol - rightWallIndex)
  ) {
    rightWallIndex -= 1;
    wallCol = rightWallIndex;
  } else {
    leftWallIndex += 1;
    wallCol = leftWallIndex;
  }

  if (
    Math.abs(startingRow - topWallIndex) <
    Math.abs(startingRow - bottomWallIndex)
  ) {
    bottomWallIndex -= 1;
    wallRow = bottomWallIndex;
  } else {
    topWallIndex += 1;
    wallRow = topWallIndex;
  }

  wallReference = '.row' + wallRow + ', .col' + wallCol;

  walls = document.querySelectorAll(wallReference);

  walls.forEach((e) => {
    // IF there isn't a list already
    if (!e.classList.contains('wallGeneric')) {
      e.classList.add('wallGeneric'); // just checking if there's a wall
      e.classList.add('wall' + level);
    }
  });
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
  document.querySelector('.win').classList.remove('win');
  // document.querySelector('.lose').classList.remove('lose');
  var winSquare = setWin();
  //   var loseSquare = setLose();
}

function initialiser() {
  var winSquare = setWin();
  //   var loseSquare = setLose();
}

// Event Listener
container.addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target.classList.contains('win')) {
    if (level < 6) {
      winLevel(e.target);
    } else {
      console.log('YOU WIN!!!');
    }
  }
});
// Run the scripts
initialiser();

// function setLose() {
//   let squaresWithoutWin = document.querySelectorAll(
//     ".square:not([class*='wall']):not(.win)"
//   );
//   let losingSquare =
//     squaresWithoutWin[Math.floor(Math.random() * squaresWithoutWin.length)];
//   losingSquare.classList.add('lose');
//   return losingSquare;
// }
