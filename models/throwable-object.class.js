class ThrowableObject extends Bottle {
  constructor(x, y) {
    super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.posX = x + 20;
    this.posY = y + 70;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() {
    this.speedY = 25;
    this.applyGravity();
    this.animate();
    setInterval(() => {
      this.posX += 15;
    }, 25);
  }

  animate() {
    setInterval(() => {
        this.playAnimation(this.bottleRotationImgs)
    }, 100);
  }

  
}