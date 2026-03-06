/**
 * Health status bar for the player character.
 * @extends StatusBar
 */
class StatusBarHealth extends StatusBar {
  /**
   * Creates a new health status bar with green color scheme.
   */
  constructor() {
    const imgs = [
      "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
      "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
      "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
      "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
      "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
      "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ];
    super(imgs);
  }
}