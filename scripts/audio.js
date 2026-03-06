/**
 * Collection of all game sound effects and background music.
 * @type {Object.<string, Audio>}
 */
const gameSounds = {
  background: new Audio("assets/audio/sounds/game/backgr.mp3"),
  gameOver: new Audio("assets/audio/sounds/game/game-over.mp3"),
  gameWin: new Audio("assets/audio/sounds/game/win-sound.mp3"),
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

/**
 * Array of chicken death sound effects for randomization.
 * @type {Audio[]}
 */
const chickenDead = [
  new Audio("assets/audio/sounds/chicken/chickenDead.mp3"),
  new Audio("assets/audio/sounds/chicken/chickenDead2.mp3"),
];

/**
 * Plays a sound effect at medium volume (0.5).
 *
 * @param {Audio} sound - The audio object to play.
 */
function playSound(sound) {
  sound.volume = 0.5;
  sound.play();
}

/**
 * Plays a sound effect repeatedly from the beginning at lower volume (0.3).
 *
 * @param {Audio} sound - The audio object to play.
 */
function playSoundOften(sound) {
  sound.currentTime = 0;
  sound.volume = 0.3;
  sound.play();
}

/**
 * Plays a sound effect at quiet volume (0.1).
 *
 * @param {Audio} sound - The audio object to play.
 */
function playQuietSound(sound) {
  sound.volume = 0.1;
  sound.play();
}

/**
 * Plays a sound effect repeatedly from the beginning at quiet volume (0.1).
 *
 * @param {Audio} sound - The audio object to play.
 */
function playQuietSoundOften(sound) {
  sound.currentTime = 0;
  sound.volume = 0.1;
  sound.play();
}

/**
 * Pauses the playback of a sound effect.
 *
 * @param {Audio} sound - The audio object to pause.
 */
function pauseSound(sound) {
  sound.pause();
}
