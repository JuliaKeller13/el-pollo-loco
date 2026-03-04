class Level {
  enemies;
  coins;
  bottles;
  clouds;
  levelPosXEnd = 9100;
  maxCoins;
  maxBottles;
  backgroundLayer1;
  backgroundLayer2;
  backgroundLayer3;

  constructor(cloudAm, coinAm, bottleAm, enemyAm) {
    this.clouds = this.addClouds(cloudAm);
    this.coins = this.addCoins(coinAm);
    this.bottles = this.addBottles(bottleAm);
    this.enemies = this.addEnemies(enemyAm);
    this.initBAckgroundLayers();
    this.maxCoins = coinAm;
    this.maxBottles = bottleAm;
  }

  initBAckgroundLayers() {
    this.backgroundLayer1 = [];
    this.backgroundLayer2 = [];
    this.backgroundLayer3 = [];
    for (let i = -1; i < 14; i++) {
      let posX = i * 800;
      let imageNum = i % 2 === 0 ? 1 : 2;
      this.backgroundLayer3.push(new BackgroundObject(`assets/img/5_background/layers/3_third_layer/${imageNum}.png`, posX));
      this.backgroundLayer2.push(new BackgroundObject(`assets/img/5_background/layers/2_second_layer/${imageNum}.png`, posX));
      this.backgroundLayer1.push(new BackgroundObject(`assets/img/5_background/layers/1_first_layer/${imageNum}.png`, posX));
  }
}
  addCoins(amount) {
    let coins = [];
    for (let i = 0; i < amount; i++) {
      coins.push(new Coin());
    }
    return coins;
  }

  addBottles(amount) {
    let bottles = [];
    for (let i = 0; i < amount; i++) {
      bottles.push(new Bottle());
    }
    return bottles;
  }

  addClouds(amount) {
    let clouds = [];
    for (let i = 0; i < amount; i++) {
      clouds.push(new Cloud());
    }
    return clouds;
  }

  addEnemies(amount) {
    let enemies = [];
    for (let i = 0; i < amount; i++) {
      enemies.push(new Chicken());
      enemies.push(new SmallChicken());
    }
    enemies.push(new EndBoss());
    return enemies;
  }
}