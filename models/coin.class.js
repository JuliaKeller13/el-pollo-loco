/**
 * Collectible coin class.
 * @extends MovableObject
 */
class Coin extends MovableObject {
  /** @type {number} Coin width */
  width = 130;
  /** @type {number} Coin height */
  height = 130;
  /** @type {number} Y position */
  posY = 70;
  /** @type {string[]} Coin animation image paths */
  coinImages = [
    "assets/img/8_coin/coin_1.png",
    "assets/img/8_coin/coin_2.png"
  ];
  /** @type {Object} Collision detection offset values */
  offset = {
    top: 47,
    left: 47,
    right: 47,
    bottom: 47,
  };

  /**
   * Creates a new Coin with random position and starts animation.
   */
  constructor() {
    super().loadImage(this.coinImages[0]);
    this.loadImages(this.coinImages);
    this.posX = 200 + Math.random() * 8000;
    this.posY = 100 + Math.random() * 200;
    this.animate();
  }

  /**
   * Starts animation interval for coin sprite.
   */
  animate() {
    setInterval(() => {
        if (this.world && this.world.gameOver) return;
      
      this.playAnimation(this.coinImages);
    }, 450);
  }
}