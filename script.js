// Define variables
container = document.querySelector('.container');
level = 0;
leftWallIndex = 0;
rightWallIndex = 9;
topWallIndex = 0;
bottomWallIndex = 9;

setWin();

function setWin() {
  // Pick a random item from a collection
  squares = document.querySelectorAll(".square:not([class*='wall'])");

  squares.forEach((square) => {
    square.classList.add('level' + level);
  });

  winningSquare = squares[Math.floor(Math.random() * squares.length)];

  winningSquare.classList.add('win');
}

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

function winLevel() {
  arrowSquares = document.querySelectorAll('.arrow');
  arrowSquares.forEach((e) => {
    e.classList.remove('arrow');
    e.innerHTML = '';
  });

  level += 1;
  // This works if we keep the IDs correct!
  winningSquare.classList.forEach((e) => {
    if (e.startsWith('row')) {
      winRow = e.slice(3);
    }
    if (e.startsWith('col')) {
      winCol = e.slice(3);
    }
  });
  setWalls(winRow, winCol);
  document.querySelector('.win').classList.remove('win');
  setWin();
}

// Event Listener
container.addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target.classList.contains('win')) {
    if (level < 6) {
      winLevel();
    } else {
      console.log('YOU WIN!!!');
    }
  } else if (
    e.target.classList.contains('square') &
    !e.target.classList.contains('wallGeneric')
  ) {
    e.target.classList.add('arrow');
    e.target.innerHTML = '^';
    arrowFindTheTreasure(e);
  }
});

function arrowFindTheTreasure(e) {
  e.target.classList.add('east');
}
