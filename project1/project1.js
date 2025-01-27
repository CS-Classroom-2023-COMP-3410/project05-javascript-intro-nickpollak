const clockElement = document.getElementById("clock");
const toggleFormatButton = document.getElementById("toggle-format");
const fontSizeInput = document.getElementById("font-size");
const colorPicker = document.getElementById("color-picker");
const alarmTimeInput = document.getElementById("alarm-time");
const setAlarmButton = document.getElementById("set-alarm");
const alarmMessage = document.getElementById("alarm-message");

let is24HourFormat = JSON.parse(localStorage.getItem("is24HourFormat")) || false;
let alarmTime = localStorage.getItem("alarmTime") || null;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  if (!is24HourFormat) {
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
  } else {
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  checkAlarm(hours, minutes);
}

function checkAlarm(hours, minutes) {
  if (alarmTime) {
    const [alarmHours, alarmMinutes] = alarmTime.split(":").map(Number);
    const currentHours = is24HourFormat ? hours : (hours % 12 || 12);

    if (currentHours === alarmHours && Number(minutes) === alarmMinutes) {
      alarmMessage.textContent = "Alarm Ringing!";
      setTimeout(() => {
        alarmMessage.textContent = "";
      }, 5000);
    }
  }
}

function toggleFormat() {
  is24HourFormat = !is24HourFormat;
  localStorage.setItem("is24HourFormat", JSON.stringify(is24HourFormat));
  updateClock();
}

toggleFormatButton.addEventListener("click", toggleFormat);

fontSizeInput.addEventListener("input", (e) => {
  const fontSize = e.target.value;
  clockElement.style.fontSize = `${fontSize}px`;
  localStorage.setItem("fontSize", fontSize);
});

colorPicker.addEventListener("input", (e) => {
  const color = e.target.value;
  clockElement.style.color = color;
  localStorage.setItem("clockColor", color);
});

setAlarmButton.addEventListener("click", () => {
  alarmTime = alarmTimeInput.value;
  localStorage.setItem("alarmTime", alarmTime);
  alarmMessage.textContent = "Alarm Set!";
  setTimeout(() => {
    alarmMessage.textContent = "";
  }, 2000);
});

function loadPreferences() {
  const savedFontSize = localStorage.getItem("fontSize");
  const savedColor = localStorage.getItem("clockColor");

  if (savedFontSize) {
    clockElement.style.fontSize = `${savedFontSize}px`;
    fontSizeInput.value = savedFontSize;
  }

  if (savedColor) {
    clockElement.style.color = savedColor;
    colorPicker.value = savedColor;
  }

  if (alarmTime) {
    alarmTimeInput.value = alarmTime;
  }
}

loadPreferences();
setInterval(updateClock, 1000);
updateClock();
