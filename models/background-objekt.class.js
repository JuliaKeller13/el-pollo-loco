/**
 * Background layer object for parallax scrolling.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /** @type {number} Background width */
    width = 800;
    /** @type {number} Background height */
    height = 480;

  /**
   * Creates a new BackgroundObject at specified position.
   *
   * @param {string} imagePath - Path to the background image.
   * @param {number} posX - X position of the background.
   */
  constructor(imagePath, posX) {
    super().loadImage(imagePath);
    this.posX = posX;
    this.posY = 480 - this.height;
  }
}