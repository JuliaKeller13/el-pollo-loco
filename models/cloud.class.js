class Cloud extends MovableObject {
  width = 500;
  height = 250;

    constructor() {
    super().loadImage("assets/img/5_background/layers/4_clouds/2.png");

    this.posX = Math.random() * 500;
    this.posY = Math.random() * 50;
  }
}