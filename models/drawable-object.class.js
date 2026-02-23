class DrawableObject {
  posX = 30;
  posY = 370;
  height = 260;
  width = 140;
  img;
  imageCache = {};
  currentImage = 0;

  constructor() {}

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
  }
}
