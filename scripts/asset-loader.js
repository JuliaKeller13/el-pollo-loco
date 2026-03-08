/**
 * Asset Loader System
 * Manages preloading of all game assets before starting the game
 */

const preloadedImageCache = new Map();

function normalizeAssetPath(path) {
  try {
    return new URL(path, window.location.href).href;
  } catch (_) {
    return path;
  }
}

function getPreloadedImage(path) {
  return preloadedImageCache.get(normalizeAssetPath(path)) || null;
}

class AssetLoader {
  /**
   * Creates a new AssetLoader instance
   */
  constructor() {
    this.totalAssets = 0;
    this.loadedAssets = 0;
    this.assets = [];
    this.startTime = 0;
    this.loaderScreen = document.getElementById("loaderScreen");
    this.loaderProgress = document.getElementById("loaderProgress");
  }

  /**
   * Adds an image to the asset queue
   * @param {string} path - Path to the image
   */
  addAsset(path) {
    const normalizedPath = normalizeAssetPath(path);
    if (!this.assets.includes(normalizedPath)) {
      this.assets.push(normalizedPath);
      this.totalAssets++;
    }
  }

  /**
   * Loads all assets and shows loading screen
   * @returns {Promise<void>}
   */
  async preload() {
    if (this.totalAssets === 0) return Promise.resolve();

    this.loadedAssets = 0;
    this.startTime = Date.now();
    this.showLoadingScreen();
    this.updateProgress();
    const loadPromises = this.assets.map(path => this.loadImage(path));

    try {
      await Promise.all(loadPromises);
    } catch (error) {
      console.error('Asset loading error:', error);
    }

    const elapsed = Date.now() - this.startTime;
    const minDuration = 1000;
    if (elapsed < minDuration) {
      await new Promise(resolve => setTimeout(resolve, minDuration - elapsed));
    }

    this.hideLoadingScreen();
  }

  /**
   * Loads a single image
   * @param {string} path
   * @returns {Promise<void>}
   */
  loadImage(path) {
    return new Promise((resolve) => {
      const cachedImage = getPreloadedImage(path);
      if (cachedImage) {
        this.loadedAssets++;
        this.updateProgress();
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        preloadedImageCache.set(path, img);
        this.loadedAssets++;
        this.updateProgress();
        resolve();
      };
      img.onerror = () => {
        console.warn(`Failed to load asset: ${path}`);
        this.loadedAssets++;
        this.updateProgress();
        resolve();
      };
      img.src = path;
    });
  }

  /**
   * Shows loader overlay.
   */
  showLoadingScreen() {
    if (this.loaderScreen) {
      this.loaderScreen.classList.add("is-visible");
      this.loaderScreen.setAttribute("aria-hidden", "false");
    }
  }

  /**
   * Hides loader overlay.
   */
  hideLoadingScreen() {
    if (this.loaderScreen) {
      this.loaderScreen.classList.remove("is-visible");
      this.loaderScreen.setAttribute("aria-hidden", "true");
    }
  }

  /**
   * Updates progress label.
   */
  updateProgress() {
    if (!this.loaderProgress) return;
    const progress = this.totalAssets > 0 ? (this.loadedAssets / this.totalAssets) * 100 : 0;
    this.loaderProgress.textContent = `Loading... ${Math.round(progress)}%`;
  }

  /**
   * Collects all game assets from existing class definitions.
   * Intervals are temporarily disabled to avoid early movement/animation.
   */
  collectAssets() {
    this.withIntervalsPaused(() => {
      initLevel();
      this.collectAssetsFromLevel(level1);
      this.collectStatusBarAssets();
      this.collectAssetsFromObject(new Character());
    });
  }

  /**
   * Collects all assets from a fully created level.
   * @param {Level} level - Level instance.
   */
  collectAssetsFromLevel(level) {
    if (!level) return;

    [
      ...(level.backgroundLayer1 || []),
      ...(level.backgroundLayer2 || []),
      ...(level.backgroundLayer3 || []),
      ...(level.clouds || []),
      ...(level.coins || []),
      ...(level.bottles || []),
      ...(level.enemies || []),
    ].forEach((obj) => this.collectAssetsFromObject(obj));
  }

  /**
   * Collects status bar images from their classes.
   */
  collectStatusBarAssets() {
    this.collectAssetsFromObject(new StatusBarHealth());
    this.collectAssetsFromObject(new StatusBarCoin());
    this.collectAssetsFromObject(new StatusBarBottle());
    this.collectAssetsFromObject(new StatusBarEndbossHealth());
  }

  /**
   * Collects assets from a single object instance.
   * @param {Object} obj - Source object.
   */
  collectAssetsFromObject(obj) {
    if (!obj) return;

    const arrayProps = [
      "idleImages",
      "longIdleImages",
      "walkingImages",
      "jumpingImages",
      "hurtImages",
      "deadImages",
      "deadImg",
      "alertImages",
      "attackImages",
      "coinImages",
      "cloudImgs",
      "cloudsImgs",
      "bottleImgs",
      "bottleRotationImgs",
      "bottleSplashImgs",
      "statusImgs",
    ];

    arrayProps.forEach((prop) => {
      if (Array.isArray(obj[prop])) {
        obj[prop].forEach((path) => this.addAsset(path));
      }
    });

    if (obj.imageCache && typeof obj.imageCache === "object") {
      Object.keys(obj.imageCache).forEach((path) => this.addAsset(path));
    }

    if (obj.img && obj.img.src) {
      this.addAsset(obj.img.src);
    }
  }

  /**
   * Runs a callback while interval creation is temporarily disabled.
   * Prevents object constructors from starting movement/animation too early.
   * @param {Function} callback - Work to run with paused intervals.
   */
  withIntervalsPaused(callback) {
    const originalSetInterval = window.setInterval;
    window.setInterval = () => -1;

    try {
      callback();
    } finally {
      window.setInterval = originalSetInterval;
    }
  }

}