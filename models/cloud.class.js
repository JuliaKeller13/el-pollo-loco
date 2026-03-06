/**
 * Background cloud class.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  /** @type {number} Cloud width */
  width = 600;
  /** @type {number} Cloud height */
  height = 300;
  /** @type {string[]} Cloud image paths */
  cloudsImgs = ["assets/img/5_background/layers/4_clouds/1.png", "assets/img/5_background/layers/4_clouds/2.png"];

    /**
     * Creates a new Cloud with random position and speed.
     */
    constructor() {
    super();
    this.loadImage(this.cloudsImgs[Math.floor(Math.random() * this.cloudsImgs.length)]);
    this.posX = Math.random() * 5000;
    this.posY = Math.random() * 50;
    this.speed = 0.15 + Math.random() * 0.4;
    this.animate();
  }

  /**
   * Starts animation interval for cloud movement.
   */
  animate() {
    setInterval(() => {
        if (this.world && this.world.gameOver) return;
      
      this.moveLeft();
    }, 1000 / 60);
  }
}