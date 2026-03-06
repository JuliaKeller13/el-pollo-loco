/** @type {Level} The first game level instance */
let level1;
/** @type {number} Maximum number of coins in the level */
maxCoins = 20;
/** @type {number} Maximum number of bottles in the level */
maxBottles = 30;

/**
 * Initializes level 1 with specified amounts of game objects.
 * Creates clouds, coins, bottles, and enemy pairs.
 */
function initLevel() {
  level1 = new Level(8, maxCoins, maxBottles, 7);
}