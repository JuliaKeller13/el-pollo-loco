/**
 * Main game world class managing all game objects and logic.
 */
class World {
  /** @type {Character} The player character */
  character = new Character();
  /** @type {Level} The current game level */
  level = level1;
  /** @type {HTMLCanvasElement} The game canvas */
  canvas;
  /** @type {CanvasRenderingContext2D} The canvas rendering context */
  ctx;
  /** @type {Keyboard} Keyboard input handler */
  keyboard;
  /** @type {number} Camera X offset for scrolling */
  cameraX = 0;
  /** @type {StatusBarHealth} Health status bar */
  statusBarHealth = new StatusBarHealth();
  /** @type {StatusBarCoin} Coin status bar */
  statusBarCoin = new StatusBarCoin();
  /** @type {StatusBarBottle} Bottle status bar */
  statusBarBottle = new StatusBarBottle();
  /** @type {StatusBarEndbossHealth} End boss health status bar */
  statusBarEndbossHealth = new StatusBarEndbossHealth();
  /** @type {Bottle} Bottle reference */
  bottle = new Bottle();
  /** @type {ThrowableObject[]} Array of thrown bottles */
  throwableObjects = [];
  /** @type {number} Cooldown time between throws in milliseconds */
  throwCooldown = 500;
  /** @type {number} Timestamp of last throw */
  lastThrow = 0;
  /** @type {boolean} Flag indicating if game is paused */
  gamePaused = false;

  /**
   * Creates a new World instance and starts the game loop.
   *
   * @param {HTMLCanvasElement} canvas - The game canvas element.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets world reference for all game objects.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    this.level.coins.forEach((coin) => {
      coin.world = this;
    });
    this.level.bottles.forEach((bottle) => {
      bottle.world = this;
    });
    this.level.clouds.forEach((cloud) => {
      cloud.world = this;
    });
  }

  /**
   * Starts the game loop for collision detection.
   */
  run() {
    this.runInterval = setInterval(() => {
      if (!this.gamePaused) {
        this.checkCollisions();
        this.checkThrowableObjects();
      }
    }, 20);
  }

  /**
   * Stops the game and clears all sounds.
   */
  stopGame() {
    clearInterval(this.runInterval);
    this.gameOver = true;
    Object.values(gameSounds).forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
    chickenDead.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  /**
   * Checks all collision types.
   */
  checkCollisions() {
    this.collosionsWithEnemies();
    this.collosionsWithCoins();
    this.collosionsWithBottles();
    this.checkCollThrowObj();
  }

  /**
   * Handles collisions between character and enemies.
   */
  collosionsWithEnemies() {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      if (this.character.isColliding(enemy)) {
        if (!enemy.isDead() && this.checkJump(enemy)) {
          this.killChicken(enemy, enemyIndex);
          this.character.speedY = 18;
        } else {
          if (!enemy.isDead() && !this.character.isHurt()) {
            this.character.hit();
            playSound(gameSounds.characterDamage);
            this.updateStatusbars();
          }
        }
      }
    });
  }

  /**
   * Checks if character is jumping on enemy.
   *
   * @param {MovableObject} enemy - The enemy to check.
   * @returns {boolean} True if character is jumping on enemy.
   */
  checkJump(enemy) {
    return (
      this.character.speedY < 0 &&
      this.character.isAboveGround() &&
      this.character.health > 0 &&
      !(enemy instanceof EndBoss)
    );
  }

  /**
   * Handles collisions between character and coins.
   */
  collosionsWithCoins() {
    this.level.coins.forEach((coin, coinIndex) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(coinIndex, 1);
        this.character.collectedCoins += 1;
        this.updateStatusbars();
        playSoundOften(gameSounds.collectSound);
      }
    });
  }

  /**
   * Handles collisions between character and bottles.
   */
  collosionsWithBottles() {
    this.level.bottles.forEach((bottle, bottleIndex) => {
      if (this.character.isColliding(bottle)) {
        this.level.bottles.splice(bottleIndex, 1);
        this.character.collectedBottles += 1;
        this.updateStatusbars();
        playSoundOften(gameSounds.bottleCollectSound);
      }
    });
  }

  /**
   * Checks for bottle throwing input and creates throwable objects.
   */
  checkThrowableObjects() {
    const now = new Date().getTime();
    if (
      this.keyboard.C &&
      this.character.collectedBottles > 0 &&
      now - this.lastThrow > this.throwCooldown
    ) {
      this.lastThrow = now;
      let bottle = new ThrowableObject(
        this.character.posX,
        this.character.posY,
        this.character.otherDirection,
      );
      this.throwableObjects.push(bottle);
      bottle.world = this;
      this.character.collectedBottles--;
      this.updateStatusbars();
    }
  }

  /**
   * Checks collisions between thrown bottles and enemies.
   */
  checkCollThrowObj() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      if (bottle.splashing) return;

      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bottle.isColliding(enemy)) {
          this.enemyHit(enemy, enemyIndex);
          this.brokeBottle(bottle);
        }
      });

      if (bottle.posY > 353) {
        this.brokeBottle(bottle, bottleIndex);
      }
    });
  }

  /**
   * Handles bottle breaking animation and removal.
   *
   * @param {ThrowableObject} bottle - The bottle that broke.
   */
  brokeBottle(bottle) {
    bottle.splash();
    playSoundOften(gameSounds.bottlebrake);
    setTimeout(() => {
      let currentIndex = this.throwableObjects.indexOf(bottle);
      if (currentIndex > -1) {
        this.throwableObjects.splice(currentIndex, 1);
      }
    }, 500);
  }

  /**
   * Handles enemy being hit by a bottle.
   *
   * @param {MovableObject} enemy - The enemy that was hit.
   * @param {number} enemyIndex - Index of the enemy in the array.
   */
  enemyHit(enemy, enemyIndex) {
    if (enemy instanceof EndBoss) {
      if (enemy.health > 0) {
        enemy.hit();
        playSound(chickenDead[Math.floor(Math.random() * chickenDead.length)]);
        this.updateStatusbars(enemy);
      } else {
        this.killEndBoss();
      }
    } else {
      this.killChicken(enemy, enemyIndex);
    }
  }

  /**
   * Kills a chicken enemy.
   *
   * @param {MovableObject} enemy - The chicken to kill.
   * @param {number} enemyIndex - Index of the enemy in the array.
   */
  killChicken(enemy, enemyIndex) {
    if (enemy.health > 0) {
      enemy.health = 0;
      playSound(chickenDead[Math.floor(Math.random() * chickenDead.length)]);
      setTimeout(() => {
        this.level.enemies = this.level.enemies.filter(e => e !== enemy);
      }, 500);
    }
  }

  /**
   * Handles end boss death and triggers win screen.
   */
  killEndBoss() {
    playSound(chickenDead[Math.floor(Math.random() * chickenDead.length)]);
    loseWinScreen(true);
  }

  /**
   * Updates all status bars with current values.
   *
   * @param {EndBoss} [enemy] - The end boss if updating its health bar.
   */
  updateStatusbars(enemy) {
    this.statusBarCoin.setPercentage(
      this.character.collectedCoins,
      this.level.maxCoins,
    );
    this.statusBarBottle.setPercentage(
      this.character.collectedBottles,
      this.level.maxBottles,
    );
    this.statusBarHealth.setPercentage(this.character.health);
    if (enemy instanceof EndBoss) {
      this.statusBarEndbossHealth.setPercentage(enemy.health, enemy.maxHealth);
    }
  }

  /**
   * Main draw loop for rendering all game objects.
   */
  draw() {
    if (this.gameOver) return;
    if (this.gamePaused) {
      requestAnimationFrame(() => this.draw());
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawLayer(this.level.backgroundLayer3, 0.2);
    this.drawLayer(this.level.clouds, 0.2);
    this.drawLayer(this.level.backgroundLayer2, 0.3);
    this.drawLayer(this.level.backgroundLayer1, 0.5);

    this.drawUI();
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.cameraX, 0);
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws a layer with parallax scrolling effect.
   *
   * @param {Array} objects - Objects to draw in this layer.
   * @param {number} factor - Parallax scrolling factor.
   */
  drawLayer(objects, factor) {
    this.ctx.translate(this.cameraX * factor, 0);
    this.addObjectsToMap(objects);
    this.ctx.translate(-(this.cameraX * factor), 0);
  }

  /**
   * Draws all UI elements (status bars and counters).
   */
  drawUI() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndbossHealth);

    this.drawCoinsAmount();
    this.drawBottlesAmount();
  }

  /**
   * Draws coin collection counter.
   */
  drawCoinsAmount() {
    this.ctx.font = "19px Arial";
    this.ctx.fillStyle = "white";
    let coins = this.character.collectedCoins;
    this.ctx.fillText(`${coins}/${this.level.maxCoins}`, 180, 77);
  }

  /**
   * Draws bottle collection counter.
   */
  drawBottlesAmount() {
    this.ctx.font = "19px Arial";
    this.ctx.fillStyle = "white";
    let bottles = this.character.collectedBottles;
    this.ctx.fillText(`${bottles}/${this.level.maxBottles}`, 180, 116);
  }

  /**
   * Adds multiple objects to the map.
   *
   * @param {Array} objects - Array of objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((objekt) => {
      this.addToMap(objekt);
    });
  }

  /**
   * Adds a single object to the map with direction handling.
   *
   * @param {DrawableObject} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the canvas for drawing mirrored objects.
   *
   * @param {DrawableObject} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.posX = mo.posX / -1;
  }

  /**
   * Restores canvas after flipping.
   *
   * @param {DrawableObject} mo - The object to restore.
   */
  flipImageBack(mo) {
    mo.posX = mo.posX / -1;
    this.ctx.restore();
  }
}
