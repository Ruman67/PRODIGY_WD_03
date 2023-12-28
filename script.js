let currentPlayer = 'X';
let gameActive = false;
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const gameGrid = document.getElementById('game-grid');
const status = document.getElementById('status');

// Function to handle clicks on the grid cells
function cellClick(clickedCell, cellIndex) {
  if (gameState[cellIndex] === '' && gameActive) {
    gameState[cellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    checkWin();
    checkDraw();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to check for a win
function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      gameActive = false;
      status.innerText = `${gameState[a]} wins!`;
    }
  }
}

// Function to check for a draw
function checkDraw() {
  if (!gameState.includes('') && gameActive) {
    gameActive = false;
    status.innerText = 'It\'s a draw!';
  }
}

// Function to start a new game
function startGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.innerText = '';
  gameGrid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-cell-index', i);
    cell.addEventListener('click', () => cellClick(cell, i));
    gameGrid.appendChild(cell);
  }
}

// Initialize the game on page load
startGame();
