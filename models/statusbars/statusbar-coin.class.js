class StatusBarCoin extends StatusBar {
  constructor() {
      
    const imgs = [
      "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
      "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
      "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
      "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
      "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
      "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
    ];
    super(imgs);
    this.posY = 40;
    this.setPerscentage(0);  }
}