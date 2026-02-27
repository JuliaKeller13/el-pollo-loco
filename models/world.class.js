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
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowableObjects();
    }, 50);
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
        if (
          this.character.speedY < 0 &&
          this.character.isAboveGround() &&
          !(enemy instanceof EndBoss)
        ) {
          this.killChicken(enemy, enemyIndex);
        } else {
          if (!enemy.isDead() && !this.character.isHurt()) {
            this.character.hit();
            this.statusBarHealth.setPerscentage(this.character.health);
            playSound(gameSounds.characterDamage);
          }
        }
      }
    });
  }

  collosionsWithCoins() {
    this.level.coins.forEach((coin, coinIndex) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(coinIndex, 1);
        this.character.collectedCoins += 1;
        this.statusBarCoin.setPerscentage(
          (this.character.collectedCoins /
            (this.character.collectedCoins + this.level.coins.length)) *
            100,
        );
        playSoundOften(gameSounds.collectSound);
      }
    });
  }

    collosionsWithBottles() {
    this.level.bottles.forEach((bottle, bottleIndex) => {
      if (this.character.isColliding(bottle)) {
        this.level.bottles.splice(bottleIndex, 1);
        this.character.collectedBottles += 1;
        this.statusBarBottle.setPerscentage(
        (this.character.collectedBottles / (this.character.collectedCoins + this.level.coins.length)) * 100);
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
      );
      this.throwableObjects.push(bottle);
      this.character.collectedBottles--;
      this.statusBarBottle.setPerscentage(
        (this.character.collectedBottles / (this.character.collectedCoins + this.level.coins.length)) * 100);
    }
  }

  checkCollThrowObj() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bottle.isColliding(enemy)) {
          if (enemy instanceof EndBoss) {
            enemy.hit();
            let pct = (enemy.health / enemy.maxHealth) * 100;
            this.statusBarEndbossHealth.setPerscentage(pct);
          } else {
            this.killChicken(enemy, enemyIndex);
          }
          this.throwableObjects.splice(bottleIndex, 1);
        }
      });
      if (bottle.posY > 350) {
        this.throwableObjects.splice(bottleIndex, 1);
        //splach animation hinzufügen
      }
    });
  }

  killChicken(enemy, enemyIndex) {
    if (enemy.health > 0) {
      enemy.health = 0;
      this.character.speedY = 18;
      playSound(
        chickenDeadSounds[Math.floor(Math.random() * chickenDeadSounds.length)],
      );
      setTimeout(() => {
        this.level.enemies.splice(enemyIndex, 1);
      }, 500);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);

    this.ctx.translate(-this.cameraX, 0);
    // ------ Space for fixed objects ------
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndbossHealth);
    this.drawCoinsAmount();
    this.drawBottlesAmount();
    this.ctx.translate(this.cameraX, 0);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.cameraX, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawCoinsAmount() {
    this.ctx.font = "19px Arial";
    this.ctx.fillStyle = "white";
    let coins = this.character.collectedCoins;
    this.ctx.fillText(`${coins}/${totalCoins}`, 180, 77);
  }

  drawBottlesAmount() {
    this.ctx.font = "19px Arial";
    this.ctx.fillStyle = "white";
    let bottles = this.character.collectedBottles;
    this.ctx.fillText(`${bottles}/${totalBottles}`, 180, 116);
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
    // mo.drawFrame(this.ctx);
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