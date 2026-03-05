class ThrowableObject extends Bottle {
  splashing = false;
  throwToLeft = false;

  constructor(x, y, throwToLeft = false) {
    super().loadImage(
      "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    );
    this.throwToLeft = throwToLeft;
    this.posX = this.throwToLeft ? x - 20 : x + 20;
    this.posY = y + 70;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() {
    this.speedY = 25;
    this.speedX = this.throwToLeft ? -10 : 10;
    this.applyGravity();
    this.animate();
    setInterval(() => {
        if (this.world && this.world.gameOver) return;
      
      if (!this.splashing) {
        this.posX += this.speedX;
      }
    }, 25);
  }

  animate() {
    setInterval(() => {
        if (this.world && this.world.gameOver) return;
      
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
      return false;
    } else{
      return true;
    }
  }
}
