/**
 * Level class containing all game objects and background layers.
 */
class Level {
  /** @type {Array} Array of enemy objects */
  enemies;
  /** @type {Coin[]} Array of coin objects */
  coins;
  /** @type {Bottle[]} Array of bottle objects */
  bottles;
  /** @type {Cloud[]} Array of cloud objects */
  clouds;
  /** @type {number} Level end X position */
  levelPosXEnd = 9100;
  /** @type {number} Maximum number of coins */
  maxCoins;
  /** @type {number} Maximum number of bottles */
  maxBottles;
  /** @type {BackgroundObject[]} First background layer */
  backgroundLayer1;
  /** @type {BackgroundObject[]} Second background layer */
  backgroundLayer2;
  /** @type {BackgroundObject[]} Third background layer */
  backgroundLayer3;

  /**
   * Creates a new Level with specified amounts of objects.
   *
   * @param {number} cloudAm - Number of clouds to create.
   * @param {number} coinAm - Number of coins to create.
   * @param {number} bottleAm - Number of bottles to create.
   * @param {number} enemyAm - Number of enemy pairs to create.
   */
  constructor(cloudAm, coinAm, bottleAm, enemyAm) {
    this.clouds = this.addClouds(cloudAm);
    this.coins = this.addCoins(coinAm);
    this.bottles = this.addBottles(bottleAm);
    this.enemies = this.addEnemies(enemyAm);
    this.initBAckgroundLayers();
    this.maxCoins = coinAm;
    this.maxBottles = bottleAm;
  }

  /**
   * Initializes all three background layers with parallax effect.
   */
  initBAckgroundLayers() {
    this.backgroundLayer1 = [];
    this.backgroundLayer2 = [];
    this.backgroundLayer3 = [];
    for (let i = -1; i < 14; i++) {
      let posX = i * 799;
      let imageNum = i % 2 === 0 ? 1 : 2;
      this.backgroundLayer3.push(new BackgroundObject(`assets/img/5_background/layers/3_third_layer/${imageNum}.png`, posX));
      this.backgroundLayer2.push(new BackgroundObject(`assets/img/5_background/layers/2_second_layer/${imageNum}.png`, posX));
      this.backgroundLayer1.push(new BackgroundObject(`assets/img/5_background/layers/1_first_layer/${imageNum}.png`, posX));
  }
}
  /**
   * Creates an array of coin objects.
   *
   * @param {number} amount - Number of coins to create.
   * @returns {Coin[]} Array of coin objects.
   */
  addCoins(amount) {
    let coins = [];
    for (let i = 0; i < amount; i++) {
      coins.push(new Coin());
    }
    return coins;
  }

  /**
   * Creates an array of bottle objects.
   *
   * @param {number} amount - Number of bottles to create.
   * @returns {Bottle[]} Array of bottle objects.
   */
  addBottles(amount) {
    let bottles = [];
    for (let i = 0; i < amount; i++) {
      bottles.push(new Bottle());
    }
    return bottles;
  }

  /**
   * Creates an array of cloud objects.
   *
   * @param {number} amount - Number of clouds to create.
   * @returns {Cloud[]} Array of cloud objects.
   */
  addClouds(amount) {
    let clouds = [];
    for (let i = 0; i < amount; i++) {
      clouds.push(new Cloud());
    }
    return clouds;
  }

  /**
   * Creates an array of enemy objects including chickens and end boss.
   *
   * @param {number} amount - Number of chicken pairs to create.
   * @returns {Array} Array of enemy objects.
   */
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