class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

  constructor(imagePath, posX) {
    super().loadImage(imagePath);
    this.posX = posX;
    this.posY = 480 - this.height;
  }
}
