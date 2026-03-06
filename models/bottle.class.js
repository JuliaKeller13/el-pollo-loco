/**
 * Collectible bottle class.
 * @extends MovableObject
 */
class Bottle extends MovableObject {
  /** @type {number} Bottle width */
  width = 70;
  /** @type {number} Bottle height */
  height = 70;
  /** @type {string[]} Bottle ground image paths */
  bottleImgs = [
    "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];
  /** @type {string[]} Bottle rotation animation image paths */
  bottleRotationImgs = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  /** @type {string[]} Bottle splash animation image paths */
  bottleSplashImgs = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  /** @type {Object} Collision detection offset values */
  offset = {
    top: 10,
    left: 30,
    right: 18,
    bottom: 10,
  };

  /**
   * Creates a new Bottle and places it randomly on the ground.
   */
  constructor() {
    super();
    this.loadImages(this.bottleImgs);
    this.loadImages(this.bottleRotationImgs);
    this.loadImages(this.bottleSplashImgs);
    this.bottleOnTheGround(this.bottleImgs[Math.floor(Math.random() * this.bottleImgs.length)]);
  }

  /**
   * Places bottle at random position on the ground.
   *
   * @param {string} img - Image path for the bottle.
   */
  bottleOnTheGround(img) {
    this.posX = 500 + Math.random() * 8000;
    this.posY = 350 + Math.random() * 5;
    this.loadImage(img);
  }
}