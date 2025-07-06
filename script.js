const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const vsComputerToggle = document.getElementById('vsComputerToggle');

let cells = [];
let currentPlayer = "X";
let boardState = Array(9).fill("");
let vsComputer = false;
let gameOver = false;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],  // Rows
  [0,3,6], [1,4,7], [2,5,8],  // Columns
  [0,4,8], [2,4,6]            // Diagonals
];

function createBoard() {
  board.innerHTML = "";
  boardState = Array(9).fill("");
  cells = [];
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "Player X's turn";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("button");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (boardState[index] || gameOver) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    gameOver = true;
    statusText.textContent = `Player ${currentPlayer} wins!`;
    highlightWin(currentPlayer);
    return;
  }

  if (boardState.every(cell => cell)) {
    statusText.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  if (vsComputer && currentPlayer === "O" && !gameOver) {
    setTimeout(computerMove, 300);
  }
}

function checkWin(player) {
  return winningCombos.some(combo => 
    combo.every(index => boardState[index] === player)
  );
}

function highlightWin(player) {
  winningCombos.forEach(combo => {
    if (combo.every(index => boardState[index] === player)) {
      combo.forEach(index => {
        cells[index].classList.add("winner");
      });
    }
  });
}

function computerMove() {
  // Choose random empty cell
  let emptyIndexes = boardState
    .map((val, i) => val === "" ? i : null)
    .filter(i => i !== null);
  
  let choice = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  if (choice != null) {
    cells[choice].click();
  }
}

resetBtn.addEventListener("click", createBoard);

vsComputerToggle.addEventListener("change", () => {
  vsComputer = vsComputerToggle.checked;
  createBoard();
});

createBoard();
