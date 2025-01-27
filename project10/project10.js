const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const difficultySelect = document.getElementById("difficulty-select");
const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const results = document.getElementById("results");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

let textToType = "";
let startTime = null;
let typedText = "";
let errorCount = 0;

const texts = {
  easy: ["cat", "dog", "bird", "apple", "tree"],
  medium: ["The quick brown fox jumps over the lazy dog.", "A journey of a thousand miles begins with a single step."],
  hard: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer."],
};

function generateText(difficulty) {
  const options = texts[difficulty];
  return options[Math.floor(Math.random() * options.length)];
}

function calculateWPM() {
  const elapsedTime = (Date.now() - startTime) / 1000 / 60; // in minutes
  const wordsTyped = typedText.split(" ").length;
  return Math.round(wordsTyped / elapsedTime);
}

function calculateAccuracy() {
  const totalChars = typedText.length;
  const correctChars = totalChars - errorCount;
  return Math.round((correctChars / totalChars) * 100);
}

function startTrainer() {
  textToType = generateText(difficultySelect.value);
  textDisplay.textContent = textToType;
  textInput.value = "";
  textInput.disabled = false;
  textInput.focus();
  results.classList.add("hidden");
  restartButton.classList.remove("hidden");
  startButton.classList.add("hidden");
  startTime = Date.now();
  typedText = "";
  errorCount = 0;
}

function finishTrainer() {
  textInput.disabled = true;
  const wpm = calculateWPM();
  const accuracy = calculateAccuracy();
  wpmElement.textContent = `Words Per Minute: ${wpm}`;
  accuracyElement.textContent = `Accuracy: ${accuracy}%`;
  results.classList.remove("hidden");
}

textInput.addEventListener("input", () => {
  typedText = textInput.value;

  if (typedText === textToType) {
    finishTrainer();
    return;
  }

  errorCount = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] !== textToType[i]) {
      errorCount++;
      textDisplay.innerHTML =
        `<span style="color: red;">` +
        textToType.slice(0, i + 1) +
        `</span>` +
        textToType.slice(i + 1);
      break;
    } else {
      textDisplay.innerHTML =
        `<span style="color: green;">` +
        textToType.slice(0, i + 1) +
        `</span>` +
        textToType.slice(i + 1);
    }
  }
});

startButton.addEventListener("click", startTrainer);
restartButton.addEventListener("click", () => {
  startTrainer();
});
