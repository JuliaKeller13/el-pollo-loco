class ThrowableObject extends Bottle {
  splashing = false;

  constructor(x, y) {
    super().loadImage(
      "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    );
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
      if (!this.splashing) {
        this.posX += 10;
      }
    }, 25);
  }

  animate() {
    setInterval(() => {
      if (this.splashing) {
        this.playAnimationOnce(this.bottleSplashImgs);
      } else {
        this.playAnimation(this.bottleRotationImgs);
      }
    }, 100);
  }

  splash() {
    this.splashing = true;
    this.speedY = 0;
    this.speedX = 0;
  }

  isAboveGround() {
    if (this.splashing) {
      return false; // Stoppt die Schwerkraft-Berechnung sofort
    } else{
      return true;
    }
  }
}
