class StatusBar extends DrawableObject {
  statusImgs;
  percentage = 100;

  constructor (imgs) {
    super();
    this.statusImgs = imgs;
    this.loadImages(this.statusImgs);
    this.posX = 15;
    this.posY = 0;
    this.width = 160;
    this.height = 45;
    this.setPercentage(100);
  }

  setPercentage (ammount, total) {
    if (total !== undefined) {
      this.percentage = (ammount / total) * 100;
    } else {
      this.percentage = ammount;
    }
    let path = this.statusImgs[this.resolveImgIndex()];
    this.img = this.imageCache[path]; 
  }

  resolveImgIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
