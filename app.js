let gameOver = false;
let currentPlayer = 1;
let playerOne = [];
let playerTwo = [];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const createGrid = () => {
  const grid = document.querySelector('#grid');
  grid.innerHTML = null;
  for (let i = 0; i < 9; i++) {
    const el = document.createElement('div');
    el.id = i;
    el.addEventListener('click', (e) => claimSquare(e, currentPlayer));
    grid.appendChild(el);
  }
};

const checkWinningCombo = (playerPicks) => {
  winningCombos.forEach((combo) => {
    const filtered = combo.filter((item) => playerPicks.includes(item));
    if (filtered.length === 3) {
      gameOver = true;
      alert(`Player ${currentPlayer} is the winner`);
    }
  });
};

const claimSquare = (e, player) => {
  if (gameOver) {
    return;
  }
  e.target.textContent = player === 1 ? 'X' : 'O';
  if (currentPlayer === 1) {
    playerOne.push(Number(e.target.id));
    checkWinningCombo(playerOne);
    currentPlayer = 2;
  } else {
    playerTwo.push(Number(e.target.id));
    checkWinningCombo(playerTwo);
    currentPlayer = 1;
  }
};

const resetPlayers = () => {
  playerOne = [];
  playerTwo = [];
};

const startGame = () => {
  gameOver = false;
  resetPlayers();
  createGrid();
};

startGame();

document.querySelector('#restart-btn').addEventListener('click', startGame);
