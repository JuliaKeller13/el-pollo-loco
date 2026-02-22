class Cloud extends MovableObject {
  width = 1100;
  height = 300;

    constructor() {
    super().loadImage("assets/img/5_background/layers/4_clouds/full.png");
    this.posX = Math.random() * 5000;
    this.posY = Math.random() * 50;
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}