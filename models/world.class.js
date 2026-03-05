class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndbossHealth = new StatusBarEndbossHealth();
  bottle = new Bottle();
  throwableObjects = [];
  throwCooldown = 500;
  lastThrow = 0;
  gamePaused = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

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

  run() {
    this.runInterval = setInterval(() => {
      if (!this.gamePaused) {
        this.checkCollisions();
        this.checkThrowableObjects();
      }
    }, 50);
  }

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

  checkCollisions() {
    this.collosionsWithEnemies();
    this.collosionsWithCoins();
    this.collosionsWithBottles();
    this.checkCollThrowObj();
  }

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

  checkJump(enemy) {
    return (
      this.character.speedY < 0 &&
      this.character.isAboveGround() &&
      this.character.health > 0 &&
      !(enemy instanceof EndBoss)
    );
  }

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

  killChicken(enemy, enemyIndex) {
    if (enemy.health > 0) {
      enemy.health = 0;
      playSound(chickenDead[Math.floor(Math.random() * chickenDead.length)]);
      setTimeout(() => {
        this.level.enemies.splice(enemyIndex, 1);
      }, 500);
    }
  }

  killEndBoss() {
    playSound(chickenDead[Math.floor(Math.random() * chickenDead.length)]);
    loseWinScreen(true);
  }

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

  draw() {
    if (this.gameOver) return;
    if (this.gamePaused) {
      requestAnimationFrame(() => this.draw());
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Background Layer
    this.drawLayer(this.level.backgroundLayer3, 0.2);
    this.drawLayer(this.level.clouds, 0.2);
    this.drawLayer(this.level.backgroundLayer2, 0.3);
    this.drawLayer(this.level.backgroundLayer1, 0.5);

    this.drawUI();

    // Camera Layer
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.cameraX, 0);

    requestAnimationFrame(() => this.draw());
  }

  drawLayer(objects, factor) {
    this.ctx.translate(this.cameraX * factor, 0);
    this.addObjectsToMap(objects);
    this.ctx.translate(-(this.cameraX * factor), 0);
  }

  drawUI() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndbossHealth);

    this.drawCoinsAmount();
    this.drawBottlesAmount();
  }

  drawCoinsAmount() {
    this.ctx.font = "19px Arial";
    this.ctx.fillStyle = "white";
    let coins = this.character.collectedCoins;
    this.ctx.fillText(`${coins}/${this.level.maxCoins}`, 180, 77);
  }

  drawBottlesAmount() {
    this.ctx.font = "19px Arial";
    this.ctx.fillStyle = "white";
    let bottles = this.character.collectedBottles;
    this.ctx.fillText(`${bottles}/${this.level.maxBottles}`, 180, 116);
  }

  addObjectsToMap(objects) {
    objects.forEach((objekt) => {
      this.addToMap(objekt);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.posX = mo.posX / -1;
  }

  flipImageBack(mo) {
    mo.posX = mo.posX / -1;
    this.ctx.restore();
  }
}
