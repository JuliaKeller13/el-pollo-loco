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
    let i = this.currentImage % this.walkingImages.length;
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
      this instanceof EndBoss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(mo) {
    return this.posX + this.width > mo.posX &&
    this.posY + this.height > mo.posY &&
    this.posX < mo.posX &&
    this.posY < mo.posY + mo.height
  }

  constructor() {}
}
