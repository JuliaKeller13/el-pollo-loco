class Cloud extends MovableObject {
  width = 600;
  height = 300;
  cloudsImgs = ["assets/img/5_background/layers/4_clouds/1.png", "assets/img/5_background/layers/4_clouds/2.png"];

    constructor() {
    super();
    this.loadImage(this.cloudsImgs[Math.floor(Math.random() * this.cloudsImgs.length)]);
    this.posX = Math.random() * 5000;
    this.posY = Math.random() * 50;
    this.speed = 0.15 + Math.random() * 0.4;
    this.animate();
  }

  animate() {
    setInterval(() => {
        if (this.world && this.world.gameOver) return;
      
      this.moveLeft();
    }, 1000 / 60);
  }
}