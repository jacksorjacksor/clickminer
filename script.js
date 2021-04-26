// Define variables
container = document.querySelector('.container');
restartButton = document.querySelector('.restartButton');

levelCounter = document.querySelector('.levelCounter');
level = 1;

moveCounter = document.querySelector('.moveCounter');
move = 0;

winText = document.querySelector('.winText');

gameOver = false;

leftWallIndex = 0;
rightWallIndex = 9;
topWallIndex = 0;
bottomWallIndex = 9;

// Define Sound Elements
var audioMusic = document.createElement('audio');
audioMusic.src = 'audio/music.ogg';
audioMusic.loop = true;

var audioLevelCompleted = document.createElement('audio');

var audioShovel = document.createElement('audio');
audioShovel.src = 'audio/shovel.ogg';
audioShovel.volume = 0.2;

var audioYouWin = document.createElement('audio');
audioYouWin.src = 'audio/youWin.ogg';

// Start the game!
setWin();

function reloadTheGame() {
  // Doesn't quite work
  console.log('HI!!!');
  level = 1;
  move = 0;
  leftWallIndex = 0;
  rightWallIndex = 9;
  topWallIndex = 0;
  bottomWallIndex = 9;

  squares = document.querySelectorAll("[class*='wall']");

  squares.forEach((square) => {
    square.classList.remove("[class*='wall']");
  });

  setWin();
}

function playLevelCompleted() {
  levelForAudio = level - 1;
  audioLevelCompleted.src = 'audio/win' + levelForAudio + '.ogg';
  audioLevelCompleted.play();
}

function setWin() {
  // Pick a random item from a collection
  squares = document.querySelectorAll(".square:not([class*='wall'])");

  squares.forEach((square) => {
    square.classList.add('level' + level);
  });

  winningSquare = squares[Math.floor(Math.random() * squares.length)];

  winningSquare.classList.add('win');

  winningSquare.classList.forEach((e) => {
    if (e.startsWith('row')) {
      winRow = e.slice(3);
    }
    if (e.startsWith('col')) {
      winCol = e.slice(3);
    }
  });
}

function setWalls(startingRow, startingCol) {
  console.log('here');
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
  document.querySelectorAll('.arrow').forEach((e) => {
    e.remove();
  });

  level += 1;
  levelCounter.innerHTML = level;
  // This works if we keep the IDs correct!

  setWalls(winRow, winCol);
  document.querySelector('.win').classList.remove('win');
  if (level < 8) {
    playLevelCompleted();
    setWin();
  } else {
    endOfGame();
  }
}

function endOfGame() {
  audioYouWin.play();
  winningSquare.classList.add('finalSquare');
  container.classList.add('winContainer');
  winText.classList.add('winTextVisible');
  gameOver = true;
}

// Event Listener
container.addEventListener('click', (e) => {
  audioMusic.play();
  if (!gameOver) {
    move += 1;
    moveCounter.innerHTML = move;

    console.log(e.target);
    if (e.target.classList.contains('win')) {
      winLevel();
    } else if (
      e.target.classList.contains('square') &
      !e.target.classList.contains('wallGeneric') &
      (e.target.children.length === 0)
    ) {
      audioShovel.play();
      e.target.innerHTML = '<p class="arrow">></p>';
      arrowFindTheTreasure(e);
    }
  }
});

restartButton.addEventListener('click', (e) => {
  reloadTheGame();
});

function arrowFindTheTreasure(e) {
  e.target.classList.forEach((e) => {
    if (e.startsWith('row')) {
      arrowRow = e.slice(3);
    }
    if (e.startsWith('col')) {
      arrowCol = e.slice(3);
    }
  });
  diffRow = arrowRow - winRow;
  diffCol = arrowCol - winCol;

  if (diffRow > 0) {
    direction = 'north';
  } else if (diffRow < 0) {
    direction = 'south';
  } else {
    direction = '';
  }

  if (diffCol < 0) {
    direction += 'east';
  } else if (diffCol > 0) {
    direction += 'west';
  } else {
    direction += '';
  }

  e.target.children[0].classList.add(direction);
}
