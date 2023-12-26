let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function handleCellClick(index) {
  if (gameBoard[index] === "" && gameActive) {
    gameBoard[index] = currentPlayer;
    renderBoard();
    checkWinner();
    togglePlayer();
  }
}

function renderBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";

  gameBoard.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = value;
    cell.addEventListener("click", () => handleCellClick(index));
    boardElement.appendChild(cell);
  });
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameActive = false;
      displayResult(`${currentPlayer} wins!`);
      return;
    }
  }

  if (!gameBoard.includes("")) {
    gameActive = false;
    displayResult("It's a tie!");
  }
}

function displayResult(result) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = result;
  resultElement.className = "result";
  resultElement.style = "visibility:visible";
}

function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  renderBoard();
  displayResult("");
  const resultElement = document.getElementById("result");

  resultElement.style = "visibility:hidden";
}

// Initial rendering of the board
renderBoard();
