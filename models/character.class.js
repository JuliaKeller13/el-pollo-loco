/**
 * Main player character class.
 * @extends MovableObject
 */
class Character extends MovableObject {
  /** @type {number} Initial X position */
  posX = 40;
  /** @type {number} Initial Y position */
  posY = 133;
  /** @type {number} Character height */
  height = 295;
  /** @type {number} Character width */
  width = 150;
  /** @type {number} Movement speed */
  speed = 12;
  /** @type {number} Idle timer for long idle detection */
  idleTimer = 0;
  /** @type {string[]} Idle animation image paths */
  idleImages = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  /** @type {string[]} Long idle animation image paths */
  longIdleImages = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  /** @type {string[]} Walking animation image paths */
  walkingImages = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  /** @type {string[]} Jumping animation image paths */
  jumpingImages = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ];
  /** @type {string[]} Hurt animation image paths */
  hurtImages = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];
  /** @type {string[]} Death animation image paths */
  deadImages = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
  ];

  /** @type {World} Reference to the game world */
  world;
  /** @type {Object} Collision detection offset values */
  offset = {
    top: 135,
    left: 50,
    right: 60,
    bottom: 15,
  };
  /** @type {number} Number of collected coins */
  collectedCoins = 0;
  /** @type {number} Number of collected bottles */
  collectedBottles = 0;

  /**
   * Creates a new Character instance and initializes animations.
   */
  constructor() {
    super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.idleImages);
    this.loadImages(this.longIdleImages);
    this.loadImages(this.walkingImages);
    this.loadImages(this.jumpingImages);
    this.loadImages(this.hurtImages);
    this.loadImages(this.deadImages);
    this.animate();
    this.applyGravity();
  }

  /**
   * Starts animation intervals for movement and animation updates.
   */
  animate() {
    setInterval(() => this.updateMovement(), 1000 / 60);
    setInterval(() => this.updateAnimation(), 80);
  }

  /**
   * Updates character movement based on keyboard input.
   */
  updateMovement() {
    if (this.world?.gameOver) return;

    this.handleRunSound();
    if (this.handleDeath()) return;

    this.checkLongIdle();
    this.handleMovement();
    this.handleJump();

    this.world.cameraX = -this.posX + 100;
  }

  /**
   * Updates character animation based on current state.
   */
  updateAnimation() {
    if (this.world?.gameOver) return;

    if (this.isDead()) return this.playAnimationOnce(this.deadImages);
    if (this.isHurt()) return this.playAnimation(this.hurtImages);
    if (this.isAboveGround()) return this.jumpAnimation();
    if (this.isMoving()) return this.playAnimation(this.walkingImages);

    this.idleAnimation();
  }

  /**
   * Handles run sound playback based on movement.
   */
  handleRunSound() {
    if (this.isMoving()) {
      playQuietSound(gameSounds.characterRun);
    } else {
      pauseSound(gameSounds.characterRun);
    }
  }

  /**
   * Handles character death logic and triggers game over.
   *
   * @returns {boolean} True if character is dead.
   */
  handleDeath() {
    if (!this.isDead()) return false;

    playQuietSound(gameSounds.characterDamage);

    if (!this.isAnimationFinished) {
      this.speedY = 20;
      playSound(gameSounds.characterDead);
      this.isAnimationFinished = true;

      setTimeout(() => loseWinScreen(false), 1000);
    }

    return true;
  }

  /**
   * Handles character movement left and right based on keyboard input.
   */
  handleMovement() {
    const { RIGHT, LEFT } = this.world.keyboard;

    if (RIGHT && this.posX < this.world.level.levelPosXEnd) {
      this.moveRight();
      this.otherDirection = false;
    }

    if (LEFT && this.posX > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  /**
   * Handles jump action when space key is pressed.
   */
  handleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
    }
  }

  /**
   * Checks if character is currently moving.
   *
   * @returns {boolean} True if character is moving left or right.
   */
  isMoving() {
    const { RIGHT, LEFT } = this.world.keyboard;
    return (RIGHT || LEFT) && !this.isAboveGround();
  }
  
  /**
   * Makes the character jump.
   */
  jump() {
    this.speedY = 30;
    playQuietSound(gameSounds.characterJump);
  }

  /**
   * Displays jump animation based on vertical speed.
   */
  jumpAnimation() {
    let i = 0;
    if (this.speedY > 20) i = 1;
    else if (this.speedY > 17) i = 2;
    else if (this.speedY > 11) i = 3;
    else if (this.speedY > 5) i = 4;
    else if (this.speedY > 0) i = 4;
    else if (this.speedY > -5) i = 5;
    else if (this.speedY > -11) i = 6;
    else if (this.speedY > -17) i = 7;
    else if (this.speedY > -20) i = 7;

    let path = this.jumpingImages[i];
    if (this.imageCache[path]) {
      this.img = this.imageCache[path];
    }
  }

  /**
   * Displays idle animation (short or long idle).
   */
  idleAnimation() {
    if (!this.idleCounter) this.idleCounter = 0;
    if (this.idleTimer > 10000 && this.idleCounter % 4 == 0) {
      this.playAnimation(this.longIdleImages);
      playQuietSound(gameSounds.characterSnoring);
    } else if (this.idleCounter % 4 == 0) {
      this.playAnimation(this.idleImages);
    }
    this.idleCounter++;
  }

  /**
   * Reduces health and resets idle timer when character is hit.
   */
  hit() {
    super.hit();
    this.idleTimer = 0;
  }

  /**
   * Checks for long idle state and updates idle timer.
   */
  checkLongIdle() {
    if (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.SPACE
    ) {
      this.idleTimer = 0;
    } else {
      this.idleTimer += 1000 / 60;
    }
  }
}