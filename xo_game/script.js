const STATIC_BOARD = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

let board = new Array(...STATIC_BOARD);

let currentPlayer = "X"; //or O
let done = false;

const stauts = document.getElementById(
  "currentPlayerStatus"
);

const cells =
  document.querySelectorAll(".game-cell");

cells.forEach((elm) => {
  elm.addEventListener("click", function () {
    const attributeValue =
      this.getAttribute("data-id");

    if (!attributeValue) return;
    makeMove(attributeValue);
  });
});

document
  .getElementById("resetButton")
  .addEventListener("click", () => resetBoard());

function makeMove(index) {
  if (done) return;

  if (board[index] === "") {
    board[index] = currentPlayer;
    renderBoard();
    if (checkWin(currentPlayer)) {
      done = true;
    } else if (
      board.every((cell) => cell !== "")
    ) {
      alert("It's a tie!!");
      setTimeout(() => {
        resetBoard();
      }, 1000);
    } else {
      currentPlayer =
        currentPlayer === "X" ? "O" : "X";
    }

    if (checkWin(currentPlayer)) {
      stauts.textContent = `🏆 ${currentPlayer} Win!`;
    } else {
      stauts.textContent = `Current Player: ${currentPlayer}`;
    }
  }
}

function renderBoard() {
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

function checkWin(player) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winConditions.some((com) => {
    return com.every(
      (index) => board[index] === player
    );
  });
}

function resetBoard() {
  board = new Array(...STATIC_BOARD);
  currentPlayer = "X";
  done = false;
  renderBoard();
  stauts.textContent = `Current Player: ${currentPlayer}`;
}
