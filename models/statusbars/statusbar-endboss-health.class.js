/**
 * End boss health status bar.
 * @extends StatusBar
 */
class StatusBarEndbossHealth extends StatusBar {
  /**
   * Creates a new end boss health bar positioned on the right side.
   */
  constructor() {
    const imgs = [
      "assets/img/7_statusbars/2_statusbar_endboss/green/green0.png",
      "assets/img/7_statusbars/2_statusbar_endboss/green/green20.png",
      "assets/img/7_statusbars/2_statusbar_endboss/green/green40.png",
      "assets/img/7_statusbars/2_statusbar_endboss/green/green60.png",
      "assets/img/7_statusbars/2_statusbar_endboss/green/green80.png",
      "assets/img/7_statusbars/2_statusbar_endboss/green/green100.png",
    ];
    super(imgs);
    this.posX = canvas.width - this.width - 15;
  }
}