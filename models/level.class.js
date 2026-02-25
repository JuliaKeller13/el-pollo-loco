class Level {
    enemies;
    coins;
    bottles;
    clouds;
    backgroundObjects;
    levelPosXEnd = 5100;

    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}

function drawBackground() {
    let backgroundObjects = [];
    for (let i = -1; i < 8; i++) {
      let posX = i * 719;
      let imageNum = (i % 2 === 0) ? 1 : 2;
      backgroundObjects.push(
        new BackgroundObject(`assets/img/5_background/layers/3_third_layer/${imageNum}.png`, posX),
        new BackgroundObject(`assets/img/5_background/layers/2_second_layer/${imageNum}.png`, posX),
        new BackgroundObject(`assets/img/5_background/layers/1_first_layer/${imageNum}.png`, posX),
      );
  }
  return backgroundObjects;
}

function addCoins(amount) {
  let coins = [];
  for (let i = 0; i < amount; i++) {
    coins.push(new Coin());
  }
  return coins;
}

function addBottles(amount) {
  let bottles = [];
  for (let i = 0; i < amount; i++) {
    bottles.push(new Bottle());
  }
  return bottles;
}

function addClouds(amount) {
  let clouds = [];
  for (let i = 0; i < amount; i++) {
    clouds.push(new Cloud());
  }
  return clouds;
}

function addEnemies(amount) {
  let enemies = [];
  for (let i = 0; i < amount; i++) {
    enemies.push(new Chicken());
    enemies.push(new SmallChicken());
  }
  enemies.push(new EndBoss());
  return enemies;
}
