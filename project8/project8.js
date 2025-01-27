const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");
const restartButton = document.getElementById("restart-button");
const saveButton = document.getElementById("save-button");
const resumeButton = document.getElementById("resume-button");

const storyData = {
  start: {
    text: "You find yourself in a dark forest. Two paths lie ahead.",
    choices: [
      { text: "Take the left path", next: "leftPath" },
      { text: "Take the right path", next: "rightPath" },
    ],
  },
  leftPath: {
    text: "The left path leads to a clearing with a small cottage.",
    choices: [
      { text: "Enter the cottage", next: "cottage" },
      { text: "Explore the surrounding area", next: "clearing" },
      { text: "Return to the forest", next: "start" },
    ],
  },
  rightPath: {
    text: "The right path leads to a river. You see a boat and a bridge.",
    choices: [
      { text: "Take the boat", next: "boat" },
      { text: "Cross the bridge", next: "bridge" },
      { text: "Return to the forest", next: "start" },
    ],
  },
  cottage: {
    text: "Inside the cottage, you find a treasure chest. It’s locked.",
    choices: [
      { text: "Look for a key", next: "keySearch" },
      { text: "Break the chest open", next: "chestBreak" },
      { text: "Leave the cottage", next: "leftPath" },
    ],
  },
  clearing: {
    text: "You find a mysterious stone circle in the clearing.",
    choices: [
      { text: "Touch the stones", next: "stoneCircle" },
      { text: "Return to the cottage", next: "leftPath" },
    ],
  },
  boat: {
    text: "The boat takes you downstream to a hidden cave.",
    choices: [
      { text: "Enter the cave", next: "cave" },
      { text: "Row back to the riverbank", next: "rightPath" },
    ],
  },
  bridge: {
    text: "Crossing the bridge, you encounter a guard who demands a password.",
    choices: [
      { text: "Try to guess the password", next: "passwordGuess" },
      { text: "Return to the riverbank", next: "rightPath" },
    ],
  },
  keySearch: {
    text: "You find a rusty key hidden under the floorboards.",
    choices: [
      { text: "Use the key on the chest", next: "chestOpen" },
      { text: "Leave the cottage", next: "leftPath" },
    ],
  },
  chestBreak: {
    text: "The chest breaks open, revealing an ancient map!",
    choices: [
      { text: "Study the map", next: "mapStudy" },
      { text: "Leave the cottage", next: "leftPath" },
    ],
  },
  chestOpen: {
    text: "The key works! Inside the chest, you find gold and jewels.",
    choices: [
      { text: "Take the treasure", next: "treasure" },
      { text: "Leave the cottage", next: "leftPath" },
    ],
  },
  stoneCircle: {
    text: "Touching the stones, you are transported to another realm.",
    choices: [
      { text: "Explore the realm", next: "otherRealm" },
      { text: "Try to return", next: "start" },
    ],
  },
  cave: {
    text: "Inside the cave, you find glowing crystals and an ancient altar.",
    choices: [
      { text: "Examine the crystals", next: "crystals" },
      { text: "Approach the altar", next: "altar" },
    ],
  },
  passwordGuess: {
    text: "You guess the password, but the guard remains silent. You can’t pass.",
    choices: [
      { text: "Return to the riverbank", next: "rightPath" },
    ],
  },
  mapStudy: {
    text: "The map reveals a hidden treasure buried in the forest.",
    choices: [
      { text: "Search for the treasure", next: "treasureHunt" },
      { text: "Return to the forest", next: "start" },
    ],
  },
  treasure: {
    text: "You take the treasure and become wealthy beyond your dreams.",
    choices: [],
  },
  otherRealm: {
    text: "The realm is vast and strange, filled with creatures and wonders.",
    choices: [
      { text: "Explore further", next: "deepRealm" },
      { text: "Try to find a way back", next: "start" },
    ],
  },
  crystals: {
    text: "The crystals emit a soft hum. They feel warm to the touch.",
    choices: [
      { text: "Take a crystal", next: "crystalPower" },
      { text: "Leave them", next: "cave" },
    ],
  },
  altar: {
    text: "The altar glows as you approach. A voice whispers an ancient riddle.",
    choices: [
      { text: "Solve the riddle", next: "riddleSolved" },
      { text: "Step away", next: "cave" },
    ],
  },
  treasureHunt: {
    text: "After hours of searching, you find the treasure buried under an oak tree.",
    choices: [
      { text: "Celebrate your victory", next: "treasure" },
      { text: "Return to the forest", next: "start" },
    ],
  },
  crystalPower: {
    text: "The crystal grants you strange and magical abilities.",
    choices: [
      { text: "Use your new powers", next: "magicAdventure" },
      { text: "Leave the cave", next: "cave" },
    ],
  },
  riddleSolved: {
    text: "Solving the riddle, the altar reveals a hidden passage.",
    choices: [
      { text: "Enter the passage", next: "hiddenPassage" },
      { text: "Return to the cave", next: "cave" },
    ],
  },
  deepRealm: {
    text: "You journey deeper into the realm, encountering new adventures.",
    choices: [
      { text: "Continue exploring", next: "otherRealm" },
      { text: "Search for a way home", next: "start" },
    ],
  },
  hiddenPassage: {
    text: "The passage leads to a secret underground city.",
    choices: [
      { text: "Explore the city", next: "cityExploration" },
      { text: "Find your way out", next: "cave" },
    ],
  },
  cityExploration: {
    text: "The city is full of wonder and mystery, with endless paths to follow.",
    choices: [
      { text: "Choose a new path", next: "start" },
    ],
  },
};

let currentStoryNode = "start";

function displayStory(node) {
  const storyNode = storyData[node];
  storyElement.textContent = storyNode.text;

  choicesElement.innerHTML = "";
  storyNode.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.addEventListener("click", () => {
      currentStoryNode = choice.next;
      saveProgress();
      displayStory(choice.next);
    });
    choicesElement.appendChild(button);
  });

  restartButton.classList.toggle("hidden", node === "start");
  resumeButton.classList.add("hidden");
}

function saveProgress() {
  localStorage.setItem("interactiveStoryProgress", currentStoryNode);
}

function loadProgress() {
  const savedNode = localStorage.getItem("interactiveStoryProgress");
  if (savedNode && storyData[savedNode]) {
    currentStoryNode = savedNode;
    displayStory(savedNode);
  }
}

restartButton.addEventListener("click", () => {
  currentStoryNode = "start";
  saveProgress();
  displayStory("start");
});

saveButton.addEventListener("click", saveProgress);

resumeButton.addEventListener("click", () => {
  loadProgress();
});

window.addEventListener("load", () => {
  if (localStorage.getItem("interactiveStoryProgress")) {
    resumeButton.classList.remove("hidden");
  }
  displayStory(currentStoryNode);
});
