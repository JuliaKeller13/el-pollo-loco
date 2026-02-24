class Cloud extends MovableObject {
  width = 1200;
  height = 350;

    constructor() {
    super();
    this.loadImage("assets/img/5_background/layers/4_clouds/full.png");
    this.posX = Math.random() * 5000;
    this.posY = Math.random() * 50;
    this.speed = 0.15 + Math.random() * 0.4;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}