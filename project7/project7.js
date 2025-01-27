const display = document.getElementById("calculator-display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operation = null;
let memory = 0;

function updateDisplay() {
  display.value = currentInput || "0";
}

function handleButtonClick(event) {
  const button = event.target;
  const value = button.dataset.value;
  const action = button.dataset.action;

  if (value) {
    if (currentInput === "0" && value === "0") return;
    currentInput += value;
  } else if (action) {
    handleAction(action);
  }

  updateDisplay();
}

function handleAction(action) {
  switch (action) {
    case "clear":
      currentInput = "";
      previousInput = "";
      operation = null;
      break;
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
      if (currentInput) {
        previousInput = currentInput;
        currentInput = "";
        operation = action;
      }
      break;
    case "equals":
      if (previousInput && currentInput && operation) {
        calculate();
        operation = null;
      }
      break;
    case "sqrt":
      if (currentInput) {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
      }
      break;
    case "percent":
      if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
      }
      break;
    case "memory-recall":
      currentInput = memory.toString();
      break;
  }
}

function calculate() {
  const a = parseFloat(previousInput);
  const b = parseFloat(currentInput);

  switch (operation) {
    case "add":
      currentInput = (a + b).toString();
      break;
    case "subtract":
      currentInput = (a - b).toString();
      break;
    case "multiply":
      currentInput = (a * b).toString();
      break;
    case "divide":
      currentInput = b !== 0 ? (a / b).toString() : "Error";
      break;
  }

  previousInput = "";
}

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

updateDisplay();
