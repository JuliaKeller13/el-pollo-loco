let canvas;
let world;
let keyboard = new Keyboard();
let gameContainer;
let gameOver = false;
let isMuted = false;

const ELEMENTS = {
  start: document.getElementById("startScreen"),
  end: document.getElementById("endScreen"),
  info: document.getElementById("infoScreen"),
  impressum: document.getElementById("impressumScreen"),
  status: document.getElementById("statusMessage"),
  muteIcon: document.getElementById("muteIcon"),
  fullscreenBtn: document.getElementById("fullscreenButton")
};

const KEY_MAP = {
  " ": "SPACE",
  "c": "C",
  "ArrowLeft": "LEFT",
  "ArrowRight": "RIGHT",
  "ArrowUp": "UP",
  "ArrowDown": "DOWN"
};

function openStartScreen() {
  gameContainer = document.querySelector(".game-container");
  if (ELEMENTS.start) {
    ELEMENTS.start.show();
    ELEMENTS.start.addEventListener("cancel", (e) => e.preventDefault());
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
  if (!ELEMENTS.fullscreenBtn) return;
  ELEMENTS.fullscreenBtn.src = document.fullscreenElement === gameContainer
    ? "./assets/img/fullscreenOff.png"
    : "./assets/img/fullscreen.png";
}

document.addEventListener("fullscreenchange", updateFullscreenButton);

function startGame() {
  ELEMENTS.start?.close();
  init();
}

function init() {
  canvas = document.getElementById("canvas");
  gameSounds.background.loop = true;
  gameSounds.background.currentTime = 0;
  playSound(gameSounds.gameStart);
  playQuietSound(gameSounds.background);
  initLevel();
  world = new World(canvas, keyboard, level1);
}

function openInfo() {
  ELEMENTS.info.show();
  if (world) world.gamePaused = true;
}

function closeInfo() {
  ELEMENTS.info.close();
  if (world) world.gamePaused = false;
}

function openImpressum() {
  ELEMENTS.impressum?.show();
}

function closeImpressum() {
  ELEMENTS.impressum?.close();
}

function toggleMute() {
  isMuted = !isMuted;
  [...Object.values(gameSounds), ...chickenDead].forEach(s => s.muted = isMuted);
  ELEMENTS.muteIcon.src = isMuted
    ? "./assets/img/9_intro_outro_screens/mute.png"
    : "./assets/img/9_intro_outro_screens/ton.png";
}

function loseWinScreen(win) {
  if (gameOver) return;
  gameOver = true;
  world.stopGame();

  const config = win 
    ? { sound: gameSounds.gameWin, img: "You Win A.png" }
    : { sound: gameSounds.gameOver, img: "Game over A.png" };

  playSound(config.sound);
  renderEndScreen(`./assets/img/9_intro_outro_screens/${config.img}`);
  setupRestartButton();
}

function renderEndScreen(imgSrc) {
  ELEMENTS.status.innerHTML = `
    <div class="end-screen-wrapper">
      <img src="${imgSrc}" alt="Result" class="end-screen-img">
    </div>`;
}

function setupRestartButton() {
  ELEMENTS.end.show();
  ELEMENTS.end.oncancel = (e) => e.preventDefault();
  const btn = document.getElementById("restartButton");
  if (!btn) return;
  btn.style.display = "none";
  setTimeout(() => {
    btn.style.display = "block";
    btn.classList.add("fade-in");
  }, 1000);
}

function restartGame() {
  gameOver = false;
  ELEMENTS.end.close();
  init();
}

const handleKeyEvent = (e, isPressed) => {
  if (KEY_MAP[e.key]) {
    keyboard[KEY_MAP[e.key]] = isPressed;
  }
};

document.addEventListener("keydown", (e) => handleKeyEvent(e, true));
document.addEventListener("keyup", (e) => handleKeyEvent(e, false));

function initMobileControls() {
  const isTouch = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  if (!isTouch) return;

  document.querySelector(".mobile-controls")?.classList.add("show");

  const bindTouch = (id, key) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("touchstart", (e) => { e.preventDefault(); keyboard[key] = true; });
    el.addEventListener("touchend", (e) => { e.preventDefault(); keyboard[key] = false; });
  };

  bindTouch("btnLeft", "LEFT");
  bindTouch("btnRight", "RIGHT");
  bindTouch("btnJump", "SPACE");
  bindTouch("btnThrow", "C");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMobileControls);
} else {
  initMobileControls();
}