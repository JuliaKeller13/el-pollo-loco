/** @type {HTMLCanvasElement} Canvas element for game rendering */
let canvas;
/** @type {World} Main game world instance */
let world;
/** @type {Keyboard} Keyboard input handler */
let keyboard = new Keyboard();
/** @type {HTMLElement} Game container element for fullscreen */
let gameContainer;
/** @type {boolean} Game over state flag */
let gameOver = false;
/** @type {boolean} Mute state retrieved from localStorage */
let isMuted = localStorage.getItem('gameMuted') === 'true';

/**
 * Collection of DOM elements used throughout the game.
 * @type {Object}
 */
const ELEMENTS = {
  start: document.getElementById("startScreen"),
  end: document.getElementById("endScreen"),
  info: document.getElementById("infoScreen"),
  impressum: document.getElementById("impressumScreen"),
  orientation: document.getElementById("orientationScreen"),
  status: document.getElementById("statusMessage"),
  muteIcon: document.getElementById("muteIcon"),
  fullscreenBtn: document.getElementById("fullscreenButton")
};

/**
 * Maps keyboard keys to internal key names.
 * @type {Object.<string, string>}
 */
const KEY_MAP = {
  " ": "SPACE",
  "c": "C",
  "ArrowLeft": "LEFT",
  "ArrowRight": "RIGHT",
  "ArrowUp": "UP",
  "ArrowDown": "DOWN"
};

/**
 * Opens the start screen dialog and sets up cancel prevention.
 */
function openStartScreen() {
  gameContainer = document.querySelector(".game-container");
  if (ELEMENTS.start) {
    ELEMENTS.start.show();
    ELEMENTS.start.addEventListener("cancel", (e) => e.preventDefault());
  }
}

/**
 * Toggles fullscreen mode for the game container.
 */
function toggleFullscreen() {
  if (!gameContainer) return;
  if (document.fullscreenElement === gameContainer) {
    document.exitFullscreen();
  } else {
    gameContainer.requestFullscreen();
  }
}

/**
 * Updates the fullscreen button icon based on current fullscreen state.
 */
function updateFullscreenButton() {
  if (!ELEMENTS.fullscreenBtn) return;
  ELEMENTS.fullscreenBtn.src = document.fullscreenElement === gameContainer
    ? "./assets/img/fullscreenOff.png"
    : "./assets/img/fullscreen.png";
}

document.addEventListener("fullscreenchange", updateFullscreenButton);

/**
 * Starts the game by closing the start screen and initializing the game.
 */
function startGame() {
  ELEMENTS.start?.close();
  init();
}

/**
 * Initializes the game world, sounds, and starts the game loop.
 */
function init() {
  canvas = document.getElementById("canvas");
  gameSounds.background.loop = true;
  gameSounds.background.currentTime = 0;
  
  applyMuteSettings();
  playSound(gameSounds.gameStart);
  playQuietSound(gameSounds.background);
  initLevel();
  world = new World(canvas, keyboard, level1);
}

/**
 * Opens the info screen and pauses the game.
 */
function openInfo() {
  ELEMENTS.info.show();
  if (world) world.gamePaused = true;
}

/**
 * Closes the info screen and resumes the game.
 */
function closeInfo() {
  ELEMENTS.info.close();
  if (world) world.gamePaused = false;
}

/**
 * Opens the impressum (legal notice) screen.
 */
function openImpressum() {
  ELEMENTS.impressum?.show();
}

/**
 * Closes the impressum screen.
 */
function closeImpressum() {
  ELEMENTS.impressum?.close();
}

/**
 * Toggles the mute state and saves it to localStorage.
 */
function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem('gameMuted', isMuted);
  
  applyMuteSettings();
}

/**
 * Applies the current mute settings to all game sounds and updates the mute icon.
 */
function applyMuteSettings() {
  [...Object.values(gameSounds), ...chickenDead].forEach(s => s.muted = isMuted);
  
  if (ELEMENTS.muteIcon) {
    ELEMENTS.muteIcon.src = isMuted
      ? "./assets/img/9_intro_outro_screens/mute.png"
      : "./assets/img/9_intro_outro_screens/ton.png";
  }
}

/**
 * Displays the end screen based on win or lose condition.
 *
 * @param {boolean} win - True if player won, false if player lost.
 */
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

/**
 * Renders the end screen with the specified image.
 *
 * @param {string} imgSrc - Path to the end screen image.
 */
function renderEndScreen(imgSrc) {
  ELEMENTS.status.innerHTML = `
    <div class="end-screen-wrapper">
      <img src="${imgSrc}" alt="Result" class="end-screen-img">
    </div>`;
}

/**
 * Sets up the restart button with fade-in animation.
 */
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

/**
 * Restarts the game by reinitializing everything.
 */
function restartGame() {
  gameOver = false;
  ELEMENTS.end.close();
  init();
}

/**
 * Quits the current game and returns to the start screen.
 */
function quitGame() {
  if (world) {
    world.stopGame();
  }
  gameOver = false;
  ELEMENTS.end?.close();
  ELEMENTS.info?.close();
  ELEMENTS.start.show();
}

/**
 * Handles keyboard events and updates the keyboard state.
 *
 * @param {KeyboardEvent} e - The keyboard event.
 * @param {boolean} isPressed - True if key is pressed, false if released.
 */
const handleKeyEvent = (e, isPressed) => {
  if (KEY_MAP[e.key]) {
    keyboard[KEY_MAP[e.key]] = isPressed;
  }
};

document.addEventListener("keydown", (e) => handleKeyEvent(e, true));
document.addEventListener("keyup", (e) => handleKeyEvent(e, false));

/**
 * Initializes mobile touch controls if device supports touch input.
 */
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

/**
 * Checks device orientation and shows/hides orientation warning on mobile devices.
 */
function checkOrientation() {
  const isMobileDevice =
    window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0;
  const isPortrait = window.innerHeight > window.innerWidth;
  
  if (isMobileDevice && isPortrait && ELEMENTS.orientation) {
    ELEMENTS.orientation.show();
    ELEMENTS.orientation.oncancel = (e) => e.preventDefault();
  } else if (ELEMENTS.orientation?.open) {
    ELEMENTS.orientation.close();
  }
}

window.addEventListener("orientationchange", checkOrientation);
window.addEventListener("resize", checkOrientation);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", checkOrientation);
} else {
  checkOrientation();
}

/**
 * Toggles between German and English language in the info screen.
 */
function toggleLanguage() {
    let de = document.getElementById('content-de');
    let en = document.getElementById('content-en');
    let label = document.getElementById('langLabel');

    if (de.classList.contains('d-none')) {
        de.classList.remove('d-none');
        en.classList.add('d-none');
        label.innerText = "English";
    } else {
        de.classList.add('d-none');
        en.classList.remove('d-none');
        label.innerText = "Deutsch";
    }
}