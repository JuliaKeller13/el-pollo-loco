class MovableObject {
  posX = 30;
  posY = 370;
  height = 260;
  width = 140;
  speed = 0.15;
  img;
  imageCache = {};
  currentImage = 0;
  otherDirection = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    setInterval(() => {
      this.posX -= this.speed;
    }, 1000 / 60);
  }

  constructor() {}
}
