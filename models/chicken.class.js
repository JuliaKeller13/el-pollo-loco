class Chicken extends MovableObject {
  width = 50;
  height = 60;
  walkingImages = [
      "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

  constructor() {
    super().loadImage("assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.walkingImages);

    this.posX = 200 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.4;
    this.animate();
  }

  animate() {
    this.moveLeft();
    setInterval(() => {
      let i = this.currentImage % this.walkingImages.length;
      let path = this.walkingImages[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 200);
  }
}
