/**
 * Base status bar class for displaying progress indicators.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /** @type {string[]} Array of status bar image paths */
  statusImgs;
  /** @type {number} Current percentage value (0-100) */
  percentage = 100;

  /**
   * Creates a new StatusBar with specified images.
   *
   * @param {string[]} imgs - Array of image paths for different percentage levels.
   */
  constructor (imgs) {
    super();
    this.statusImgs = imgs;
    this.loadImages(this.statusImgs);
    this.posX = 15;
    this.posY = 0;
    this.width = 160;
    this.height = 45;
    this.setPercentage(100);
  }

  /**
   * Sets the status bar percentage and updates the displayed image.
   *
   * @param {number} ammount - Current amount value.
   * @param {number} [total] - Total/maximum value (if provided, calculates percentage).
   */
  setPercentage (ammount, total) {
    if (total !== undefined) {
      this.percentage = (ammount / total) * 100;
    } else {
      this.percentage = ammount;
    }
    let path = this.statusImgs[this.resolveImgIndex()];
    this.img = this.imageCache[path]; 
  }

  /**
   * Resolves the correct image index based on current percentage.
   *
   * @returns {number} Index of the image to display (0-5).
   */
  resolveImgIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}