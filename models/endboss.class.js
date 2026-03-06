/**
 * End boss enemy class.
 * @extends MovableObject
 */
class EndBoss extends MovableObject {
  /** @type {number} Current health points */
  health = 40;
  /** @type {number} Maximum health points */
  maxHealth = 40;
  /** @type {number} End boss height */
  height = 250;
  /** @type {number} End boss width */
  width = 200;
  /** @type {number} Movement speed */
  speed = 20;
  /** @type {number} Y position */
  posY = 185;
  /** @type {Object} Collision detection offset values */
  offset = {
    top: 80,
    left: 40,
    right: 25,
    bottom: 60,
  };
  /** @type {World} Reference to the game world */
  world;
  /** @type {boolean} Flag indicating if boss is attacking */
  isAttacking = false;
  /** @type {number} Vertical speed for jumping */
  speedY = 20;
  /** @type {boolean} Flag to prevent win screen trigger multiple times */
  winTrigg = false;

  /** @type {string[]} Walking animation image paths */
  walkingImages = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  /** @type {string[]} Alert animation image paths */
  alertImages = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  /** @type {string[]} Attack animation image paths */
  attackImages = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  /** @type {string[]} Hurt animation image paths */
  hurtImages = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  /** @type {string[]} Death animation image paths */
  deadImages = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates a new EndBoss and initializes position and animations.
   */
  constructor() {
    super();
    this.loadImgs();
    this.posX = 8800;
    this.applyGravity();
    this.animate();
  }

  /**
   * Loads all images for end boss animations.
   */
  loadImgs() {
    this.loadImage(this.walkingImages[0]);
    this.loadImages(this.walkingImages);
    this.loadImages(this.alertImages);
    this.loadImages(this.attackImages);
    this.loadImages(this.hurtImages);
    this.loadImages(this.deadImages);
  }

/**
 * Starts animation intervals for end boss behavior.
 */
animate() {
  const isGameOver = () => this.world && this.world.gameOver;

  setInterval(() => {
    if (isGameOver()) return;
    if (this.isDead()) return this.handleDeath();
    if (this.isHurt()) return this.playAnimation(this.hurtImages);
    if (this.isAttacking) return this.playAnimation(this.attackImages);
    if (this.isNearCharacter()) {
      this.playAnimation(this.walkingImages);
      this.posX -= this.speed;
    } else {
      this.playAnimation(this.alertImages);
    }
    this.checkDirection();
  }, 150);

  setInterval(() => {
    if (isGameOver()) return;
    if (!this.isDead() && this.isNearCharacter()) {
      this.moveToCharacter();
      playSound(gameSounds.endbossApproach);
    }
  }, 1000 / 60);
}

/**
 * Handles death animation and triggers win screen.
 */
handleDeath() {
  this.playAnimationOnce(this.deadImages);
  if (this.winTriggered) return;
  this.winTriggered = true;

  setTimeout(() => {
    loseWinScreen(true);
  }, 500);
}

  /**
   * Initiates an attack sequence with jump.
   */
  startAttack() {
    if (!this.isAttacking) {
      this.isAttacking = true;
      this.speedY = 30;
      setTimeout(() => {
        this.isAttacking = false;
      }, 2000);
    }
  }

  /**
   * Checks if end boss is above ground level.
   *
   * @returns {boolean} True if above ground.
   */
  isAboveGround() {
    return this.posY < 185;
  }

  /**
   * Checks if character is near the end boss.
   *
   * @returns {boolean} True if character is within detection range.
   */
  isNearCharacter() {
    if (!this.world || !this.world.character) return false;
    let distanceLeft = Math.abs(this.posX - this.world.character.posX);
    let distanceReight = Math.abs(this.world.character.posX - this.posX);
    return distanceLeft < 350 || distanceReight < 350;
  }

  /**
   * Updates end boss direction to face the character.
   */
  checkDirection() {
    if (!this.world || !this.world.character) return;
    if (this.world.character.posX > this.posX) {
      this.otherDirection = true;
    } else {
      this.otherDirection = false;
    }
  }

  /**
   * Moves end boss towards character position.
   */
  moveToCharacter() {
    let currentSpeed = this.isAttacking ? 7 : 3;
    if (this.world.character.posX > this.posX) {
      this.posX += currentSpeed;
    } else if (this.world.character.posX < this.posX) {
      this.posX -= currentSpeed;
    }
    if (this.health <= this.maxHealth / 2) {
      this.startAttack();
    }
  }
}