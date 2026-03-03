let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;
let endScreen;
let infoScreen;
let statusMessage = document.getElementById("statusMessage");
let gameOver = false;
let isMuted = false;
let gamePaused = false;

function openStartScreen() {
  startScreen = document.getElementById("startScreen");
  endScreen = document.getElementById("endScreen");
  infoScreen = document.getElementById("infoScreen");

  if (startScreen) {
    startScreen.showModal();
    startScreen.addEventListener("cancel", (e) => e.preventDefault());
  }
}

function startGame() {
  if (startScreen) {
    startScreen.close();
  }
  init();
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function openInfo() {
  infoScreen.showModal();
  world.gamePaused = true;
}

function closeInfo() {
  infoScreen.close();
  world.gamePaused = false;
}

function toggleMute() {
  isMuted = !isMuted;
  muteIcon = document.getElementById("muteIcon");
}

function loseWinScreen(win) {
  if (gameOver) return;
  gameOver = true;

  world.stopGame();

  if (win) {
    statusMessage.innerText = "YOU WIN!";
    statusMessage.style.color = "green";
  } else {
    statusMessage.innerText = "GAME OVER";
    statusMessage.style.color = "red";
  }

  if (endScreen) {
    endScreen.showModal();
    endScreen.oncancel = (e) => e.preventDefault();
  }
}

function restartGame() {
  gameOver = false;
  endScreen.close();
  init();
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ":
      keyboard.SPACE = true;
      break;
    case "c":
      keyboard.C = true;
      break;
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "ArrowUp":
      keyboard.UP = true;
      break;
    case "ArrowDown":
      keyboard.DOWN = true;
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case " ":
      keyboard.SPACE = false;
      break;
    case "c":
      keyboard.C = false;
      break;
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case "ArrowUp":
      keyboard.UP = false;
      break;
    case "ArrowDown":
      keyboard.DOWN = false;
      break;
  }
});
