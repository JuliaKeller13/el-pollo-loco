class Level {
    enemies;
    clouds;
    backgroundObjects;
    levelPosXEnd = 2800;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}