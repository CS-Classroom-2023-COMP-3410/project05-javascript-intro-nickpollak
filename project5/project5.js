const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
const brushSizeInput = document.getElementById("brush-size");
const brushColorInput = document.getElementById("brush-color");
const canvasBgInput = document.getElementById("canvas-bg");
const undoButton = document.getElementById("undo");
const clearButton = document.getElementById("clear");
const saveButton = document.getElementById("save");

let drawing = false;
let brushSize = 5;
let brushColor = "#000000";
let canvasBg = "#ffffff";
let history = [];

canvas.width = 600;
canvas.height = 400;
ctx.fillStyle = canvasBg;
ctx.fillRect(0, 0, canvas.width, canvas.height);

function startDrawing(e) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = brushColor;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function stopDrawing() {
  if (drawing) {
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    drawing = false;
  }
}

function undoLastStroke() {
  if (history.length > 0) {
    history.pop();
    const lastState = history[history.length - 1];
    if (lastState) {
      ctx.putImageData(lastState, 0, 0);
    } else {
      ctx.fillStyle = canvasBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
}

function clearCanvas() {
  ctx.fillStyle = canvasBg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  history = [];
}

function saveCanvas() {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "drawing.png";
  link.click();
}

brushSizeInput.addEventListener("input", (e) => {
  brushSize = e.target.value;
});

brushColorInput.addEventListener("input", (e) => {
  brushColor = e.target.value;
});

canvasBgInput.addEventListener("input", (e) => {
  canvasBg = e.target.value;
  ctx.fillStyle = canvasBg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  history = [];
});

undoButton.addEventListener("click", undoLastStroke);
clearButton.addEventListener("click", clearCanvas);
saveButton.addEventListener("click", saveCanvas);

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
