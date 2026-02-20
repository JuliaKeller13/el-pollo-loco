const level1 = new Level(
    [new Chicken(), new Chicken(), new Chicken()],
    [new Cloud(), new Cloud()],
    drawBackground()
);

function drawBackground() {
    let backgroundObjects = [];
    for (let i = -1; i < 5; i++) {
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