class Character extends MovableObject {
  posX = 30;
  posY = 120;
  height = 320;
  width = 180;
  walkingImages = [
      "assets/img/2_character_pepe/2_walk/W-21.png",
      "assets/img/2_character_pepe/2_walk/W-22.png",
      "assets/img/2_character_pepe/2_walk/W-23.png",
      "assets/img/2_character_pepe/2_walk/W-24.png",
      "assets/img/2_character_pepe/2_walk/W-25.png",
      "assets/img/2_character_pepe/2_walk/W-26.png",
    ];

  constructor() {
    super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.walkingImages);

    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.walkingImages.length;
      let path = this.walkingImages[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }

  jump() {}
}
