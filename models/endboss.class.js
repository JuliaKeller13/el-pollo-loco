class EndBoss extends MovableObject {
  health = 60;
  maxHealth = 60;
  height = 250;
  width = 200;
  speed = 20;
  posY = 185;
  offset = {
    top: 80,
    left: 40,
    right: 25,
    bottom: 60,
  };
  world;
  isAttacking = false;
  speedY = 20;
  winTrigg = false;

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
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world && this.world.gameOver) return;

      if (this.isDead()) {
        this.playAnimationOnce(this.deadImages);
        if (!this.winTriggered) {
          this.winTriggered = true;
          setTimeout(() => {
            loseWinScreen(true);
          }, 1000);
        }
      } else if (this.isHurt()) {
        this.playAnimation(this.hurtImages);
      } else if (this.isAttacking) {
        this.playAnimation(this.attackImages);
      } else if (this.isNearCharacter()) {
        this.playAnimation(this.walkingImages);
        this.posX -= this.speed;
      } else {
        this.playAnimation(this.alertImages);
      }
      this.checkDirection();
    }, 150);

    setInterval(() => {
      if (this.world && this.world.gameOver) return;
      if (!this.isDead() && this.isNearCharacter()) {
        this.moveToCharacter();
      }
    }, 1000 / 60);
  }

  startAttack() {
    if (!this.isAttacking) {
      this.isAttacking = true;
      this.speedY = 35;
      setTimeout(() => {
        this.isAttacking = false;
      }, 2000);
    }
  }

  isAboveGround() {
    return this.posY < 185;
  }

  isNearCharacter() {
    if (!this.world || !this.world.character) return false;
    let distanceLeft = Math.abs(this.posX - this.world.character.posX);
    let distanceReight = Math.abs(this.world.character.posX - this.posX);
    return distanceLeft < 250 || distanceReight < 250;
  }

  checkDirection() {
    if (!this.world || !this.world.character) return;
    if (this.world.character.posX > this.posX) {
      this.otherDirection = true;
    } else {
      this.otherDirection = false;
    }
  }

  moveToCharacter() {
    let currentSpeed = this.isAttacking ? 7 : 3;
    if (this.world.character.posX > this.posX) {
      this.posX += currentSpeed;
    } else if (this.world.character.posX < this.posX) {
      this.posX -= currentSpeed;
    }
    if (this.health <= this.maxHealth / 2) {
      this.startAttack();
    }
  }
}