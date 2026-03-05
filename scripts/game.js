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

  fullscreenButton.src =
    document.fullscreenElement === gameContainer
      ? "./assets/img/fullscreenOff.png"
      : "./assets/img/fullscreen.png";
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
}

function closeInfo() {
  infoScreen.close();
  world.gamePaused = false;
}

function toggleMute() {
  isMuted = !isMuted;

  Object.values(gameSounds).forEach((sound) => {
    sound.muted = isMuted;
  });

  chickenDead.forEach((sound) => {
    sound.muted = isMuted;
  });

  let muteIcon = document.getElementById("muteIcon");
  muteIcon.src = isMuted
    ? "./assets/img/9_intro_outro_screens/mute.png"
    : "./assets/img/9_intro_outro_screens/ton.png";
}

function loseWinScreen(win) {
  if (gameOver) return;
  gameOver = true;

  world.stopGame();

  const imgSrc = win 
    ? "./assets/img/9_intro_outro_screens/You Win A.png" 
    : "./assets/img/9_intro_outro_screens/Game over A.png";

  statusMessage.innerHTML = `
    <div class="end-screen-wrapper">
      <img src="${imgSrc}" alt="Game Result" class="end-screen-img">
    </div>
  `;

  if (endScreen) {
    endScreen.show();
    endScreen.oncancel = (e) => e.preventDefault();

    const restartBtn = document.getElementById('restartButton'); 
    
    if (restartBtn) {
      restartBtn.style.display = "none";
      
      setTimeout(() => {
        restartBtn.style.display = "block";
        restartBtn.classList.add('fade-in');
      }, 1000);
    }
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

// Mobile Touch Controls
function initMobileControls() {
  const isTouchDevice = () => {
    return (
      (typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(hover: none) and (pointer: coarse)").matches) ||
      (typeof navigator !== "undefined" &&
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2)
    );
  };

  if (isTouchDevice()) {
    const mobileControls = document.querySelector(".mobile-controls");
    if (mobileControls) {
      mobileControls.classList.add("show");
    }

    // Left Button
    const btnLeft = document.getElementById("btnLeft");
    if (btnLeft) {
      btnLeft.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
      });
      btnLeft.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
      });
      btnLeft.addEventListener("mousedown", () => {
        keyboard.LEFT = true;
      });
      btnLeft.addEventListener("mouseup", () => {
        keyboard.LEFT = false;
      });
    }

    // Right Button
    const btnRight = document.getElementById("btnRight");
    if (btnRight) {
      btnRight.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
      });
      btnRight.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
      });
      btnRight.addEventListener("mousedown", () => {
        keyboard.RIGHT = true;
      });
      btnRight.addEventListener("mouseup", () => {
        keyboard.RIGHT = false;
      });
    }

    // Jump Button
    const btnJump = document.getElementById("btnJump");
    if (btnJump) {
      btnJump.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
      });
      btnJump.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
      });
      btnJump.addEventListener("mousedown", () => {
        keyboard.SPACE = true;
      });
      btnJump.addEventListener("mouseup", () => {
        keyboard.SPACE = false;
      });
    }

    // Throw Button
    const btnThrow = document.getElementById("btnThrow");
    if (btnThrow) {
      btnThrow.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.C = true;
      });
      btnThrow.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.C = false;
      });
      btnThrow.addEventListener("mousedown", () => {
        keyboard.C = true;
      });
      btnThrow.addEventListener("mouseup", () => {
        keyboard.C = false;
      });
    }
  }
}

// Initialize mobile controls on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMobileControls);
} else {
  initMobileControls();
}
