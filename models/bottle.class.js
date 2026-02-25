class Bottle extends MovableObject {
  width = 75;
  height = 75;
  bottleImgs = ["assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];
  offset = {
    top: 13,
    left: 27,
    right: 18,
    bottom: 10,
  };

  constructor() {
    super().loadImage(this.bottleImgs[Math.floor(Math.random() * this.bottleImgs.length)]);
    this.loadImages(this.bottleImgs);
    this.posX = 500 + Math.random() * 4000;
    this.posY = 350 + Math.random() * 5;
    // this.animate();
  }

//   animate() {
//     setInterval(() => {
//       this.playAnimation(this.bottleimg);
//     }, 450);
//   }
}
