class Coin extends MovableObject {
  width = 130;
  height = 130;
  posY = 70;
  coinImages = [
    "assets/img/8_coin/coin_1.png",
    "assets/img/8_coin/coin_2.png"
  ];
  offset = {
    top: 47,
    left: 47,
    right: 47,
    bottom: 47,
  };

  constructor() {
    super().loadImage(this.coinImages[0]);
    this.loadImages(this.coinImages);
    this.posX = 200 + Math.random() * 4000;
    this.posY = 100 + Math.random() * 200;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.coinImages);
    }, 450);
  }
}
