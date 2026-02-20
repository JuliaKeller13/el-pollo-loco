class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud(), new Cloud()];
  backgroundObjects = [];
  canvas;
  ctx;
  keyboard;
  cameraX = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.drawBackground();
  }

  drawBackground() {
    for (let i = -2; i < 4; i++) {
      let posX = i * 720;
      let imageNum = (Math.abs(i) % 2 === 0) ? 1 : 2;
      this.backgroundObjects.push(
        new BackgroundObject(`assets/img/5_background/layers/3_third_layer/${imageNum}.png`, posX),
        new BackgroundObject(`assets/img/5_background/layers/2_second_layer/${imageNum}.png`, posX),
        new BackgroundObject(`assets/img/5_background/layers/1_first_layer/${imageNum}.png`, posX),
      );
  }
}

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.cameraX, 0);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.cameraX, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((objekt) => {
      this.addToMap(objekt);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.posX = mo.posX / -1;
    }
    this.ctx.drawImage(mo.img, mo.posX, mo.posY, mo.width, mo.height);
    if (mo.otherDirection) {
      mo.posX = mo.posX / -1;
      this.ctx.restore();
    }
  }
}
