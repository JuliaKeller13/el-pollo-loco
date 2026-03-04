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
let gameContainer;

function openStartScreen() {
  gameContainer = document.querySelector(".game-container");
  startScreen = document.getElementById("startScreen");
  endScreen = document.getElementById("endScreen");
  infoScreen = document.getElementById("infoScreen");

  if (startScreen) {
    startScreen.show();
    startScreen.addEventListener("cancel", (e) => e.preventDefault());
  }
}

function toggleFullscreen() {
  if (!gameContainer) return;

  if (document.fullscreenElement === gameContainer) {
    document.exitFullscreen();
  } else {
    gameContainer.requestFullscreen();
  }
}

function updateFullscreenButton() {
  let fullscreenButton = document.getElementById("fullscreenButton");
  if (!fullscreenButton) return;

  fullscreenButton.innerText =
    document.fullscreenElement === gameContainer ? "🗗" : "⛶";
}

document.addEventListener("fullscreenchange", updateFullscreenButton);

function startGame() {
  if (startScreen) {
    startScreen.close();
  }
  init();
}

function init() {
  canvas = document.getElementById("canvas");
  initLevel();
  world = new World(canvas, keyboard, level1);
}

function openInfo() {
  infoScreen.show();
  world.gamePaused = true;
  toggleMute();
}

function closeInfo() {
  infoScreen.close();
  world.gamePaused = false;
  toggleMute();
}

function toggleMute() {
  isMuted = !isMuted;

  Object.values(gameSounds).forEach(sound => {
    sound.muted = isMuted;
  });

  chickenDead.forEach(sound => {
    sound.muted = isMuted;
  });

  let muteIcon = document.getElementById("muteIcon");
  muteIcon.src = isMuted ? "./assets/img/9_intro_outro_screens/mute.png" : "./assets/img/9_intro_outro_screens/ton.png";
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
    endScreen.show();
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
