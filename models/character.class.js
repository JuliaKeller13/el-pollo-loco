class Character extends MovableObject {
  posX = 30;
  posY = 133;
  height = 300;
  width = 150;
  speed = 10;
  idleTimer = 0;
  idleImages = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  longIdleImages = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  walkingImages = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  jumpingImages = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ];
  hurtImages = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];
  deadImages = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    'assets/img/2_character_pepe/5_dead/D-52.png',
    'assets/img/2_character_pepe/5_dead/D-53.png',
    'assets/img/2_character_pepe/5_dead/D-54.png',
    'assets/img/2_character_pepe/5_dead/D-55.png',
    'assets/img/2_character_pepe/5_dead/D-56.png',
    'assets/img/2_character_pepe/5_dead/D-57.png',
  ];
  world;
  offset = {
    top: 120,
    left: 28,
    right: 40,
    bottom: 12,
  };

  constructor() {
    super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.idleImages);
    this.loadImages(this.longIdleImages);
    this.loadImages(this.walkingImages);
    this.loadImages(this.jumpingImages);
    this.loadImages(this.hurtImages);
    this.loadImages(this.deadImages);
    this.animate();
    this.aplyGravity();
  }

  animate() {
    setInterval(() => {
      this.checkLongIdle();
      if (
        this.world.keyboard.RIGHT &&
        this.posX < this.world.level.levelPosXEnd
      ) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.posX > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }
      this.world.cameraX = -this.posX + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.jumpAnimation();
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.walkingImages);
      } else {
        this.idleAnimation();
      }
    }, 80);
  }

  jump() {
    this.speedY = 23;
  }

  jumpAnimation() {
    let i = 0;
    if (this.speedY > 20) i = 1;
    else if (this.speedY > 15) i = 2;
    else if (this.speedY > 10) i = 3;
    else if (this.speedY > 5) i = 4;
    else if (this.speedY > 0) i = 4;
    else if (this.speedY > -5) i = 5;
    else if (this.speedY > -10) i = 6;
    else if (this.speedY > -15) i = 7;
    else if (this.speedY > -20) i = 7;

    let path = this.jumpingImages[i];
    if (this.imageCache[path]) {
      this.img = this.imageCache[path];
    }
  }

  idleAnimation() {
    if (!this.idleCounter) this.idleCounter = 0;

    if (this.idleTimer > 8000 && this.idleCounter % 4 == 0) {
      this.playAnimation(this.longIdleImages);
    } else if (this.idleCounter % 4 == 0) {
      this.playAnimation(this.idleImages);
    }
    this.idleCounter++;
  }

  checkLongIdle() {
    if (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.SPACE
    ) {
      this.idleTimer = 0;
    } else {
      this.idleTimer += 1000 / 60;
    }
  }
}
