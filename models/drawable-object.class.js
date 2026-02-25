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

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof SmallChicken ||
      this instanceof Coin ||
      this instanceof EndBoss ||
      this instanceof Bottle
    ) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = "";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.posX + this.offset.left,
        this.posY + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom,
      );
      ctx.stroke();
    }
  }
}
