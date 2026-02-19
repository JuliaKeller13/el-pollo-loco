class MovableObject {
  posX = 30;
  posY = 370;
  img;
  height = 260;
  width = 140;

  loadImage(path){
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    console.log("Moving left");
  }

  constructor() {}
}
