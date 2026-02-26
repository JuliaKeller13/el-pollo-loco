class ThrowableObject extends Bottle {
  constructor(x, y) {
    super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.posX = x;
    this.posY = y;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.posX += 10;
    }, 25);
  }
}