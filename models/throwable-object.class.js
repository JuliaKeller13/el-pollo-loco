/**
 * Throwable bottle object for attacking enemies.
 * @extends Bottle
 */
class ThrowableObject extends Bottle {
  /** @type {boolean} Flag indicating if bottle is splashing */
  splashing = false;
  /** @type {boolean} Flag indicating if bottle is thrown to the left */
  throwToLeft = false;

  /**
   * Creates a new ThrowableObject and initiates throw.
   *
   * @param {number} x - Starting X position.
   * @param {number} y - Starting Y position.
   * @param {boolean} [throwToLeft=false] - Whether to throw left or right.
   */
  constructor(x, y, throwToLeft = false) {
    super().loadImage(
      "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    );
    this.throwToLeft = throwToLeft;
    this.posX = this.throwToLeft ? x - 20 : x + 20;
    this.posY = y + 70;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  /**
   * Initiates the throw physics and animation.
   */
  throw() {
    this.speedY = 25;
    this.speedX = this.throwToLeft ? -10 : 10;
    this.applyGravity();
    this.animate();
    setInterval(() => {
        if (this.world && this.world.gameOver) return;
      
      if (!this.splashing) {
        this.posX += this.speedX;
      }
    }, 25);
  }

  /**
   * Starts animation intervals for rotation and splash.
   */
  animate() {
    setInterval(() => {
        if (this.world && this.world.gameOver) return;
      
      if (this.splashing) {
        this.playAnimationOnce(this.bottleSplashImgs);
      } else {
        this.playAnimation(this.bottleRotationImgs);
      }
    }, 100);
  }

  /**
   * Triggers splash effect and stops bottle movement.
   */
  splash() {
    this.splashing = true;
    this.speedY = 0;
    this.speedX = 0;
  }

  /**
   * Checks if bottle is above ground (always true unless splashing).
   *
   * @returns {boolean} False when splashing, true otherwise.
   */
  isAboveGround() {
    if (this.splashing) {
      return false;
    } else{
      return true;
    }
  }
}