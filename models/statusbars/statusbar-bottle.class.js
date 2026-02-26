class StatusBarBottle extends StatusBar {
  constructor() {
    const imgs = [
      "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
      "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
      "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
      "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
      "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
      "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];
    super(imgs);
    this.posY = 80;
    this.setPerscentage(0);
  }
}