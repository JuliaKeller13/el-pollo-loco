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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          if (this.character.speedY < 0 && this.character.isAboveGround()) {
            enemy.health = 0;
          } else {
            if (!enemy.isDead()){
            this.character.hit();
            this.statusBarHealth.setPerscentage(this.character.health);
            playSound(gameSounds.characterDamage);
          }
          }
            
        }
      });

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
      this.level.bottles.forEach((bottle, bottleIndex) => {
        if (this.character.isColliding(bottle)) {
          this.level.bottles.splice(bottleIndex, 1);
          this.character.collectedBottles += 1;
          this.statusBarBottle.setPerscentage(
            (this.character.collectedBottles /
              (this.character.collectedBottles + this.level.bottles.length)) *
              100,
          );
          playSoundOften(gameSounds.bottleCollectSound);
        }
      });
    }, 50);
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
    mo.drawFrame(this.ctx);

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
