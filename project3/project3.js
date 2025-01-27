const cardGrid = document.getElementById("card-grid");
const moveCountElement = document.getElementById("move-count");
const timerElement = document.getElementById("timer");
const restartButton = document.getElementById("restart-button");

let cards = [];
let firstCard = null;
let secondCard = null;
let moves = 0;
let timer = 0;
let timerInterval = null;

const symbols = ["A", "B", "C", "D", "E", "F", "G", "H"];

function initializeGame() {
  cards = [...symbols, ...symbols]
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({ id: index, symbol, matched: false }));

  renderGrid();
  moves = 0;
  moveCountElement.textContent = moves;
  timer = 0;
  timerElement.textContent = formatTime(timer);
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerElement.textContent = formatTime(timer);
  }, 1000);
}

function renderGrid() {
  cardGrid.innerHTML = "";
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.dataset.id = card.id;
    cardElement.addEventListener("click", () => flipCard(card));
    if (card.matched) {
      cardElement.classList.add("matched");
      cardElement.textContent = card.symbol;
    } else if (card === firstCard || card === secondCard) {
      cardElement.classList.add("flipped");
      cardElement.textContent = card.symbol;
    }
    cardGrid.appendChild(cardElement);
  });
}

function flipCard(card) {
  if (card.matched || card === firstCard || card === secondCard) return;

  if (!firstCard) {
    firstCard = card;
  } else if (!secondCard) {
    secondCard = card;
    moves++;
    moveCountElement.textContent = moves;
    checkMatch();
  }
  renderGrid();
}

function checkMatch() {
  if (firstCard.symbol === secondCard.symbol) {
    firstCard.matched = true;
    secondCard.matched = true;
    firstCard = null;
    secondCard = null;
    if (cards.every((card) => card.matched)) {
      clearInterval(timerInterval);
      alert(`Game completed in ${moves} moves and ${formatTime(timer)}!`);
    }
  } else {
    setTimeout(() => {
      firstCard = null;
      secondCard = null;
      renderGrid();
    }, 1000);
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

restartButton.addEventListener("click", initializeGame);

initializeGame();
