class Chicken extends MovableObject {
  width = 50;
  height = 50;
  walkingImages = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  offset = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 7,
  };

  constructor() {
    super().loadImage(this.walkingImages[0]);
    this.loadImages(this.walkingImages);
    this.posX = 200 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.4;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.walkingImages);
    }, 200);
  }
}
