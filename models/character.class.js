class Character extends MovableObject {
  posX = 30;
  posY = 120;
  height = 320;
  width = 180;

  constructor() {
    super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
  }

  jump() {}
}
