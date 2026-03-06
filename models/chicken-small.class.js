/**
 * Small chicken enemy class.
 * @extends Chicken
 */
class SmallChicken extends Chicken {
  /** @type {number} Small chicken width */
  width = 50;
  /** @type {number} Small chicken height */
  height = 50;
  /** @type {string[]} Walking animation image paths */
  walkingImages = [
    "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /** @type {string[]} Dead image path */
  deadImg = ["assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Creates a new SmallChicken with custom sprite images.
   */
  constructor() {
    super().loadImage(this.walkingImages[0]);
    this.loadImages(this.walkingImages);
    this.loadImages(this.deadImg);
  }
}