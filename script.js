const setAlarmBtn = document.getElementById("setAlarm"); 
const alarmInput = document.getElementById("alarmTime");
const statusText = document.getElementById("status");
const alarmSound = document.getElementById("alarmSound");

const puzzleBox = document.getElementById("puzzleBox");
const guessInput = document.getElementById("guessInput");
const submitGuess = document.getElementById("submitGuess");
const feedback = document.getElementById("feedback");

let alarmTime = null;
let alarmTriggered = false;

const words = ["APPLE", "HOUSE", "PLANT", "GRAPE", "BREAD"];
let WORD = words[Math.floor(Math.random() * words.length)];

// Set alarm
setAlarmBtn.onclick = () => {
  alarmTime = alarmInput.value.slice(0,5);
  statusText.textContent = "Alarm set for " + alarmTime;
};
// Check time every second
setInterval(() => {
  const now = new Date();
  const currentTime =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");

  if (currentTime === alarmTime && !alarmTriggered) {
    triggerAlarm();
  }
}, 1000);

function triggerAlarm() {
  alarmTriggered = true;
  alarmSound.play();
  puzzleBox.classList.remove("hidden");
}

// Puzzle
const grid = document.getElementById("grid");
let currentRow = 0;

function createGrid() {
  for (let r = 0; r < 6; r++) {
    const row = document.createElement("div");
    row.className = "row";

    for (let c = 0; c < 5; c++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      row.appendChild(tile);
    }

    grid.appendChild(row);
  }
}

createGrid();

submitGuess.onclick = () => {

  if (currentRow >= 6) return;

  const guess = guessInput.value.toUpperCase();

  if (guess.length !== 5) {
    feedback.textContent = "Enter 5 letters";
    return;
  }

  const row = grid.children[currentRow];

  for (let i = 0; i < 5; i++) {
    const tile = row.children[i];
    tile.textContent = guess[i];

    if (guess[i] === WORD[i]) {
      tile.classList.add("green");
    } 
    else if (WORD.includes(guess[i])) {
      tile.classList.add("yellow");
    } 
    else {
      tile.classList.add("gray");
    }
  }

  if (guess === WORD) {
    feedback.textContent = "Solved! Alarm stopped.";
    alarmSound.pause();
    alarmSound.currentTime = 0;
    return;
  }

  currentRow++;

  if (currentRow === 6) {
    feedback.textContent = "Out of attempts! Alarm stopped.";
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }

  guessInput.value = "";
};
