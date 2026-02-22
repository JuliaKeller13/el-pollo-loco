class SmallChicken extends Chicken {
  width = 35;
  height = 35;
  posY = 385;
  walkingImages = [
    "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage(this.walkingImages[0]);
    this.loadImages(this.walkingImages);
  }
}