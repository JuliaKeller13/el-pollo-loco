class StatusBar extends DrawableObject {
  healthStatImgs = [
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.healthStatImgs);
    this.posX = 0;
    this.posY = 0;
    this.width = 160;
    this.height = 45;
    this.setPerscentage(100);
  }

  setPerscentage(percentage) {
    this.percentage = percentage;
    let path = this.healthStatImgs[this.resolveImgIndex()];
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
