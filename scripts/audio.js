const gameSounds = {
  // background: new Audio(''),
  characterDamage: new Audio("assets/audio/sounds/character/characterDamage.mp3"),
  characterDead: new Audio("assets/audio/sounds/character/characterDead.wav"),
  characterJump: new Audio("assets/audio/sounds/character/characterJump.wav"),
  characterRun: new Audio("assets/audio/sounds/character/characterRun.mp3"),
  characterSnoring: new Audio("assets/audio/sounds/character/characterSnoring.mp3"),
  bottlebrake: new Audio("assets/audio/sounds/throwable/bottleBreak.mp3"),
  bottleCollectSound: new Audio("assets/audio/sounds/collectibles/bottleCollectSound.wav"),
  collectSound: new Audio("assets/audio/sounds/collectibles/collectSound.wav"),
  endbossApproach: new Audio("assets/audio/sounds/endboss/endbossApproach.wav"),
  gameStart: new Audio("assets/audio/sounds/game/gameStart.mp3"),
};

const chickenDeadSounds = [
  new Audio("assets/audio/sounds/chicken/chickenDead.mp3"),
  new Audio("assets/audio/sounds/chicken/chickenDead2.mp3"),
]
 
function playSound(sound) {
  sound.play();
}

function playSoundOften(sound) {
  sound.currentTime = 0;
  sound.play();
}

function pauseSound(sound) {
  sound.pause();
}
