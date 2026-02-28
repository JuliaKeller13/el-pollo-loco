class Level {
  enemies;
  coins;
  bottles;
  clouds;
  backgroundObjects;
  levelPosXEnd = 9100;
  maxCoins;
  maxBottles;

  constructor(enemyAm, cloudAm, coinAm, bottleAm) {
    this.enemies = this.addEnemies(enemyAm);
    this.clouds = this.addClouds(cloudAm);
    this.coins = this.addCoins(coinAm);
    this.bottles = this.addBottles(bottleAm);
    this.backgroundObjects = this.drawBackground();
    this.maxCoins = coinAm;
    this.maxBottles = bottleAm;
  }
  
  drawBackground() {
    let backgroundObjects = [];
    for (let i = -1; i < 14; i++) {
      let posX = i * 719;
      let imageNum = i % 2 === 0 ? 1 : 2;
      backgroundObjects.push(
        new BackgroundObject(`assets/img/5_background/layers/3_third_layer/${imageNum}.png`, posX),
        new BackgroundObject(`assets/img/5_background/layers/2_second_layer/${imageNum}.png`, posX),
        new BackgroundObject(`assets/img/5_background/layers/1_first_layer/${imageNum}.png`, posX),
      );
    }
    return backgroundObjects;
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