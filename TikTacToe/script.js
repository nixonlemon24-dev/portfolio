const cells = document.querySelectorAll(".game-cell");
let gameActive = true;
let playerTurn = true;
let playerScore = 0;
let computerScore = 0;

function initGame() {
  score();
  document.getElementById("message-container").style.display = "none";
  document.getElementById("restart-btn").style.display = "none";
  document.querySelectorAll("tr").forEach(tr => tr.style.display = "block");

  //showBoard();
  gameActive = true;
  //document.tr.style.display = "table-row";
  cells.forEach(cell => {cell.textContent = ""; cell.classList.remove("marked", "computer");});
}

function resetGame() {
  initGame();
  playerTurn = true;
}

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.textContent === "" && gameActive) {
      boxClick(cell);
    }
  });
});


function boxClick(cell) {
  if (!playerTurn) return;
  playerTurn = false;
  cell.textContent = "X";



  if (checkWin(getBoardFromTable(), "X")) {
    endGame("X wins! 🎉");
    playerScore += 1;
    return;
  }
  if (isDraw()) {
    endGame("It's a draw! 🤝");
    return;
  }

  setTimeout(() => computerMove(), 500);
}

function computerMove() {
  const move = bestMove();
  if (!move) return;

  move.textContent = "O";
  move.classList.add("computer");


  if (checkWin(getBoardFromTable(), "O")) {
    endGame("Computer wins! 🤖");
    computerScore += 1;
    return;
  }
  if (isDraw()) {
    endGame("It's a draw! 🤝");
  }

  playerTurn = true;
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

function endGame(message) {
  gameActive = false;
  setTimeout(() => {
    //document.querySelectorAll("tr").forEach(tr => tr.style.display = "none");
    document.getElementById("message-container").style.display = "block";
    document.getElementById("restart-btn").style.display = "block";
    document.querySelector(".winner-display").textContent = message;
  }, 500);
}

document.getElementById("restart-btn").addEventListener("click", () => {resetGame();});
  
function showBoard() {
  setTimeout(() => {
    document.querySelectorAll("tr").forEach(tr => tr.style.display = "table-row");
  }, 500);

}


function getBoardFromTable() {
  const rows = document.querySelectorAll("tr");
  return Array.from(rows).map(row =>
    Array.from(row.querySelectorAll("td")).map(cell => cell.textContent.trim() || null)
  );
}

function checkWin(board, player) {
  const size = 3;

  for (let r = 0; r < size; r++) {
    if (board[r].every(cell => cell === player)) return true;
  }

  for (let c = 0; c < size; c++) {
    if (board.every(row => row[c] === player)) return true;
  }

  if (board.every((row, i) => row[i] === player)) return true;
  if (board.every((row, i) => row[size - 1 - i] === player)) return true;

  return false;
}
function bestMove() {
  let best = -Infinity;
  let move = null;

  cells.forEach((cell) => {
    if (cell.textContent === "") {
      cell.textContent = "O";
      const score = minimax(0, false);
      cell.textContent = "";
      if (score > best) {
        best = score;
        move = cell;
      }
    }
  });

  return move;
}

function minimax(depth, isMaximizing) {
  const board = getBoardFromTable();

  if (checkWin(board, "O")) return 10 - depth;
  if (checkWin(board, "X")) return depth - 10;
  if ([...cells].every(c => c.textContent !== "")) return 0; // draw

  if (isMaximizing) {
    let best = -Infinity;
    cells.forEach(cell => {
      if (cell.textContent === "") {
        cell.textContent = "O";
        best = Math.max(best, minimax(depth + 1, false));
        cell.textContent = "";
      }
    });
    return best;
  } else {
    let best = Infinity;
    cells.forEach(cell => {
      if (cell.textContent === "") {
        cell.textContent = "X";
        best = Math.min(best, minimax(depth + 1, true));
        cell.textContent = "";
      }
    });
    return best;
  }
}



function score(){
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;
}

initGame();