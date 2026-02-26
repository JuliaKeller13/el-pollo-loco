class Bottle extends MovableObject {
  width = 75;
  height = 75;
  bottleImgs = [
    "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];
  bottleRotationImgs = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  bottleSplashImgs = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  offset = {
    top: 13,
    left: 30,
    right: 18,
    bottom: 10,
  };

  constructor() {
    super();
    this.loadImages(this.bottleImgs);
    this.loadImages(this.bottleRotationImgs);
    this.loadImages(this.bottleSplashImgs);
    this.bottleOnTheGround(this.bottleImgs[Math.floor(Math.random() * this.bottleImgs.length)]);
  }

  bottleOnTheGround(img) {
    this.posX = 500 + Math.random() * 8000;
    this.posY = 350 + Math.random() * 5;
    this.loadImage(img);
  }
}