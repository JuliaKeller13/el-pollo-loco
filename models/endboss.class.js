class EndBoss extends MovableObject {
  height = 250;
  width = 200;
  speed = 10;
  posY = 185;
  offset = {
    top: 45,
    left: 5,
    right: 5,
    bottom: 10,
  };
  walkingImages = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];


  constructor() {
    super().loadImage(this.walkingImages[0]);
    this.loadImages(this.walkingImages);
    this.posX = 4800;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.walkingImages);
    }, 200);
  }
}
