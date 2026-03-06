/**
 * Normal chicken enemy class.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  /** @type {number} Chicken width */
  width = 60;
  /** @type {number} Chicken height */
  height = 60;
  /** @type {string[]} Walking animation image paths */
  walkingImages = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
  ];
  /** @type {string[]} Dead image path */
  deadImg = ["assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  /** @type {Object} Collision detection offset values */
  offset = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 7,
  };

  /**
   * Creates a new Chicken with random position and speed.
   */
  constructor() {
    super().loadImage(this.walkingImages[0]);
    this.loadImages(this.walkingImages);
    this.loadImages(this.deadImg);
    this.posX = 500 + Math.random() * 7500;
    this.speed = 0.15 + Math.random() * 1.5;
    this.animate();
  }

  /**
   * Starts animation intervals for movement and sprite animation.
   */
  animate() {
    setInterval(() => {
      if (this.world && this.world.gameOver) return;
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world && this.world.gameOver) return;
      if (this.isDead()) {
        this.playAnimationOnce(this.deadImg);
      } else {
      this.playAnimation(this.walkingImages);
      }
    }, 200);
  }
}