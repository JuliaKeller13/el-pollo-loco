const level1 = new Level(
    addEnemies(7),
    addClouds(8),
    addCoins(30),
    addBottles(25),
    drawBackground()
);

totalCoins = 30; // Münzen die Character schon hat + die, die er noch sammeln kann
totalBottles = 35; //statisch, später eventuell dynamisch, Anzahl Flaschen im Level + gesammelten Flaschen des Charakters