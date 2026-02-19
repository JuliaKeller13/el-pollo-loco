class Chicken extends MovableObject {
    width = 50;
    height = 60;
    constructor() {
    super().loadImage("assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.posX = 200 + Math.random() * 500;
  }
}