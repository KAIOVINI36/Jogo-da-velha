let cellElements = document.querySelectorAll("[data-cell]");
let board = document.querySelector("[data-board]");
let mensagem = document.querySelector("[data-mesg]");
let div = document.querySelector("[data-res]");
let button = document.querySelector("[reniStart]");

let circulo;

let combinacao = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let startGame = () => {
  for (let cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleclick);
    cell.addEventListener("click", handleclick, { once: true });
  }
  circulo = false;

  setBoard();
  div.classList.remove("show-mesg");
};

let endGame = (isDraw) => {
  if (isDraw) {
    mensagem.innerHTML = "Empatou!";
  } else {
    mensagem.innerHTML = circulo ? "O Venceu!" : " X Venceu!";
  }

  div.classList.add("show-mesg");
};

let checar = (currentPlayer) => {
  return combinacao.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

let checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

let placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

let setBoard = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (circulo) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

let swapTurns = () => {
  circulo = !circulo;

  setBoard();
};

let handleclick = (e) => {
  // Colocar a marca (X ou circulo)
  let cell = e.target;
  let classToAdd = circulo ? "circle" : "x";

  placeMark(cell, classToAdd);

  // Verificar por vitória
  let isWin = checar(classToAdd);

  //verificar por empate
  let isDraw = checkForDraw();
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar símbolo
    swapTurns();
  }
};
startGame();
button.addEventListener("click", startGame);
