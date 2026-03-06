/**
 * Base class for all movable objects in the game, extends DrawableObject.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /** @type {number} Horizontal movement speed */
  speed = 0.15;
  /** @type {number} Vertical speed for gravity and jumping */
  speedY = 0;
  /** @type {number} Gravity acceleration value */
  acceleration = 3;
  /** @type {boolean} Flag indicating if object faces opposite direction */
  otherDirection = false;
  /** @type {Object} Collision detection offset values */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  /** @type {number} Health points of the object */
  health = 100;
  /** @type {number} Timestamp of last hit received */
  lastHit = 0;
  /** @type {boolean} Flag indicating if death animation finished */
  isAnimationFinished = false;
  /** @type {number} Current frame index of death animation */
  deadImgIndex = 0;

  constructor() {
    super();
  }

  /**
   * Plays an animation by cycling through provided images.
   *
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Plays an animation once without looping.
   *
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimationOnce(images) {
    if (this.deadImgIndex < images.length) {
      let path = images[this.deadImgIndex];
      this.img = this.imageCache[path];
      this.deadImgIndex++;
    }
  }

  /**
   * Moves the object to the right if game is not paused.
   */
  moveRight() {
    if (!this.world || !this.world.gamePaused) {
      this.posX += this.speed;
    }
  }

  /**
   * Moves the object to the left if game is not paused.
   */
  moveLeft() {
    if (!this.world || !this.world.gamePaused) {
      this.posX -= this.speed;
    }
  }

  /**
   * Applies gravity to the object, making it fall.
   */
  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.world && this.world.gamePaused) return;
  if (this.world && this.world.gameOver) return;

      if (this.isAboveGround() || this.speedY > 0) {
        this.posY -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above ground level.
   *
   * @returns {boolean} True if object is above ground.
   */
  isAboveGround() {
    if (this.isDead() || this instanceof Bottle) {
      return true;
    }
    return this.posY < 133;
  }

  /**
   * Checks if this object is colliding with another movable object.
   *
   * @param {MovableObject} mo - The other movable object to check collision with.
   * @returns {boolean} True if objects are colliding.
   */
  isColliding(mo) {
    return (
      this.posX + this.width - this.offset.right > mo.posX + mo.offset.left &&
      this.posY + this.height - this.offset.bottom > mo.posY + mo.offset.top &&
      this.posX + this.offset.left < mo.posX + mo.width - mo.offset.right &&
      this.posY + this.offset.top < mo.posY + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces health by 10 points when hit.
   */
  hit() {
    this.health -= 10;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
      return;
    }
  }

  /**
   * Checks if the object was recently hurt.
   *
   * @returns {boolean} True if object was hurt within the last 0.2 seconds.
   */
  isHurt() {
    let timepassed = (new Date().getTime() - this.lastHit) / 1000; // Time difference in s
    return timepassed < 0.2;
  }

  /**
   * Checks if the object is dead.
   *
   * @returns {boolean} True if health is 0.
   */
  isDead() {
    return this.health == 0;
  }
}