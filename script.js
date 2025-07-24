const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('winningMessage');
const messageText = document.getElementById('messageText');
const restartButton = document.getElementById('restartButton');

const WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],  // Rows
  [0,3,6], [1,4,7], [2,5,8],  // Columns
  [0,4,8], [2,4,6]            // Diagonals
];

let isCircleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isCircleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHover();
  message.style.display = 'none';
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'o' : 'x';
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isCircleTurn = !isCircleTurn;
    setBoardHover();
  }
}

function endGame(draw) {
  if (draw) {
    messageText.innerText = "It's a Draw!";
  } else {
    messageText.innerText = `${isCircleTurn ? "O" : "X"} Wins!`;
  }
  message.style.display = 'block';
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function setBoardHover() {
  board.classList.remove('x', 'o');
  board.classList.add(isCircleTurn ? 'o' : 'x');
}
