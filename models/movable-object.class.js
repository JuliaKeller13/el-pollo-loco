class MovableObject extends DrawableObject {
  speed = 0.15;
  speedY = 0;
  acceleration = 3;
  otherDirection = false;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  health = 100;
  lastHit = 0;
  isAnimationFinished = false;
  deadImgIndex = 0;

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationOnce(images) {
    if (this.deadImgIndex < images.length) {
      let path = images[this.deadImgIndex];
      this.img = this.imageCache[path];
      this.deadImgIndex++;
    }
  }

  moveRight() {
    this.posX += this.speed;
  }

  moveLeft() {
    this.posX -= this.speed;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.posY -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this.isDead() || this instanceof Bottle) {
      return true;
    }
    return this.posY < 133;
  }

  isColliding(mo) {
    return (
      this.posX + this.width - this.offset.right > mo.posX + mo.offset.left &&
      this.posY + this.height - this.offset.bottom > mo.posY + mo.offset.top &&
      this.posX + this.offset.left < mo.posX + mo.width - mo.offset.right &&
      this.posY + this.offset.top < mo.posY + mo.height - mo.offset.bottom
    );
  }

  hit() {
    this.health -= 10;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
      return;
    }
  }

  isHurt() {
    let timepassed = (new Date().getTime() - this.lastHit) / 1000; // Time difference in s
    return timepassed < 0.2;
  }

  isDead() {
    return this.health == 0;
  }
  constructor() {
    super();
  }
}