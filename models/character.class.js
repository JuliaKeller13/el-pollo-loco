class Character extends MovableObject {
  posX = 30;
  posY = 130;
  height = 300;
  width = 140;
  speed = 10;
  walkingImages = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  world;

  constructor() {
    super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.walkingImages);

    this.animate();
  }

  animate() {

    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.posX < this.world.level.levelPosXEnd) {
        this.posX += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.posX > 0) {
        this.posX -= this.speed;
        this.otherDirection = true;
      }
      this.world.cameraX = -this.posX + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.walkingImages.length;
        let path = this.walkingImages[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 80);
  }

  jump() {}
}
