/**
 * Base class for all drawable objects in the game.
 */
class DrawableObject {
  /** @type {number} X position of the object */
  posX = 30;
  /** @type {number} Y position of the object */
  posY = 370;
  /** @type {number} Height of the object */
  height = 260;
  /** @type {number} Width of the object */
  width = 140;
  /** @type {Image} Current image being displayed */
  img;
  /** @type {Object.<string, Image>} Cache of loaded images */
  imageCache = {};
  /** @type {number} Current animation frame index */
  currentImage = 0;

  constructor() {}

  /**
   * Loads a single image from the specified path.
   *
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    if (typeof getPreloadedImage === "function") {
      const preloaded = getPreloadedImage(path);
      if (preloaded) {
        this.img = preloaded;
        return;
      }
    }

    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images and stores them in the image cache.
   *
   * @param {string[]} array - Array of image paths to load.
   */
  loadImages(array) {
    array.forEach((path) => {
      if (typeof getPreloadedImage === "function") {
        const preloaded = getPreloadedImage(path);
        if (preloaded) {
          this.imageCache[path] = preloaded;
          return;
        }
      }

      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on the canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
  }
}