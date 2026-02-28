class EndBoss extends MovableObject {
  health = 100;
  maxHealth = 100;
  height = 250;
  width = 200;
  speed = 40;
  posY = 185;
  offset = {
    top: 80,
    left: 40,
    right: 25,
    bottom: 60,
  };
  world;
  isAttacking = false;

  walkingImages = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  alertImages = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  attackImages = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  hurtImages = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  deadImages = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.walkingImages[0]);
    this.loadImages(this.walkingImages);
    this.loadImages(this.alertImages);
    this.loadImages(this.attackImages);
    this.loadImages(this.hurtImages);
    this.loadImages(this.deadImages);
    this.posX = 8800;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimationOnce(this.deadImages);
        return;
      }
      if (this.isHurt()) {
        this.playAnimation(this.hurtImages);
      } else if (this.isNearCharacter()) {
        this.attackSequence();
      } else {
        this.playAnimation(this.alertImages);
        this.isAttacking = false; 
      }
    }, 200);
  }

  attackSequence() {
    if (!this.isAttacking) {
      this.isAttacking = true;
      this.posX -= this.speed;
      this.playAnimation(this.walkingImages);

      setTimeout(() => {
        if (!this.isDead()) {
          this.playAnimation(this.attackImages);
        }

        setTimeout(() => {
          this.isAttacking = false;
        }, 1000);
      }, 500);
    }
  }

  isNearCharacter() {
    if (!this.world || !this.world.character) return false;
    let distance = Math.abs(this.posX - this.world.character.posX);
    return distance < 400;
  }
}
