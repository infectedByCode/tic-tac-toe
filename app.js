(function init() {
  let gameOver = false;
  let currentPlayer = 1;
  let playerOne = [];
  let playerTwo = [];
  const santa = String.fromCodePoint(0x1f385);
  const pumpkin = String.fromCodePoint(0x1f383);
  const textDisplay = document.querySelector('#text-display');

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
      el.innerHTML = '_';
      el.addEventListener('click', (e) => claimSquare(e, currentPlayer));
      grid.appendChild(el);
    }
  };

  const checkWinningCombo = (playerPicks) => {
    winningCombos.forEach((combo) => {
      const filtered = combo.filter((item) => playerPicks.includes(item));
      if (filtered.length === 3) {
        gameOver = true;
        textDisplay.textContent = `Player ${currentPlayer} is the winner`;
        document.querySelector(`#scoreboard-${currentPlayer === 1 ? 'one' : 'two'} > p`).textContent +=
          currentPlayer === 1 ? santa : pumpkin;
      }
    });
  };

  const claimSquare = (e, player) => {
    if (gameOver || e.target.innerHTML !== '_') {
      return;
    }
    if (currentPlayer === 1) {
      e.target.innerHTML = santa;
      playerOne.push(Number(e.target.id));
      checkWinningCombo(playerOne);
      currentPlayer = 2;
    } else {
      e.target.innerHTML = pumpkin;
      playerTwo.push(Number(e.target.id));
      checkWinningCombo(playerTwo);
      currentPlayer = 1;
    }
    if (playerOne.length + playerTwo.length === 9 && !gameOver) {
      textDisplay.textContent = 'Game was a draw';
      gameOver = true;
      return;
    } else if (!gameOver) {
      textDisplay.textContent = `Player ${currentPlayer} to go next!`;
    }
  };

  const resetPlayers = () => {
    playerOne = [];
    playerTwo = [];
    currentPlayer = 1;
    textDisplay.textContent = 'Player 1 to start!';
  };

  const startGame = () => {
    gameOver = false;
    resetPlayers();
    createGrid();
  };
  startGame();
  document.querySelector('#restart-btn').addEventListener('click', startGame);
})();
