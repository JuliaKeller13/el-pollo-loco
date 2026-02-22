class MovableObject {
  posX = 30;
  posY = 370;
  height = 260;
  width = 140;
  speed = 0.15;
  speedY = 0;
  acceleration = 2;
  img;
  imageCache = {};
  currentImage = 0;
  otherDirection = false;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

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

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.posX += this.speed;
  }

  moveLeft() {
    this.posX -= this.speed;
  }

  aplyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.posY -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.posY < 130;
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
      this instanceof EndBoss
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

  isColliding(mo) {
    return (
      this.posX + this.width - this.offset.right > mo.posX + mo.offset.left &&
      this.posY + this.height - this.offset.bottom > mo.posY + mo.offset.top &&
      this.posX + this.offset.left < mo.posX + mo.width - mo.offset.right &&
      this.posY + this.offset.top < mo.posY + mo.height - mo.offset.bottom
    );
  }

  constructor() {}
}
