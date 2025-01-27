const arrayContainer = document.getElementById("array-container");
const commentaryElement = document.getElementById("commentary");
const algorithmSelect = document.getElementById("algorithm-select");
const speedSlider = document.getElementById("speed-slider");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

let array = [];
let delay = 500;

function generateArray(size = 20) {
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  renderArray();
}

function renderArray() {
  arrayContainer.innerHTML = "";
  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "array-bar";
    bar.style.height = `${value * 3}px`;
    bar.style.width = "20px";
    arrayContainer.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort() {
  commentaryElement.textContent = "Starting Bubble Sort...";
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      highlightBars(j, j + 1);
      if (array[j] > array[j + 1]) {
        commentaryElement.textContent = `Swapping ${array[j]} and ${array[j + 1]}`;
        await swap(j, j + 1);
      }
      unhighlightBars(j, j + 1);
    }
  }
  commentaryElement.textContent = "Bubble Sort completed!";
}

async function insertionSort() {
  commentaryElement.textContent = "Starting Insertion Sort...";
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    highlightBars(i);
    commentaryElement.textContent = `Placing ${key} in the sorted portion`;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      renderArray();
      await sleep(delay);
      j--;
    }
    array[j + 1] = key;
    renderArray();
    unhighlightBars(i);
  }
  commentaryElement.textContent = "Insertion Sort completed!";
}

function highlightBars(...indices) {
  indices.forEach((index) => {
    arrayContainer.children[index].style.backgroundColor = "red";
  });
}

function unhighlightBars(...indices) {
  indices.forEach((index) => {
    arrayContainer.children[index].style.backgroundColor = "#007bff";
  });
}

async function swap(i, j) {
  [array[i], array[j]] = [array[j], array[i]];
  renderArray();
  await sleep(delay);
}

startButton.addEventListener("click", async () => {
  startButton.disabled = true;
  resetButton.disabled = true;
  const algorithm = algorithmSelect.value;
  if (algorithm === "bubble") {
    await bubbleSort();
  } else if (algorithm === "insertion") {
    await insertionSort();
  }
  startButton.disabled = false;
  resetButton.disabled = false;
});

resetButton.addEventListener("click", () => {
  generateArray();
  commentaryElement.textContent = "Array reset. Ready to sort!";
});

speedSlider.addEventListener("input", (e) => {
  delay = 100 - e.target.value;
});

generateArray();
