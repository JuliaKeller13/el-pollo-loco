<div align="center">

# 🐔 El Pollo Loco

### A 2D Jump & Run browser game built with object-oriented JavaScript

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)
![Canvas](https://img.shields.io/badge/HTML5-Canvas-orange)

<br>

![El Pollo Loco Preview](./assets/img/9_intro_outro_screens/startscreen_1.png)

</div>

---

## 📖 About

**El Pollo Loco** is a 2D Jump & Run browser game developed with **HTML, CSS and object-oriented JavaScript**.

The player controls **Pepe**, who has to fight his way through chickens, collect coins and salsa bottles, and finally defeat the dangerous endboss **El Pollo Loco**.

The game is rendered using the **HTML5 Canvas API** and was built without an external game engine or JavaScript framework.

This project was created to practice object-oriented programming, game logic, animations, collision detection and responsive web development.

---

## ✨ Features

* 🎮 Classic 2D Jump & Run gameplay
* 🐔 Different enemy types
* 👑 Endboss fight against El Pollo Loco
* 🪙 Collectible coins
* 🍾 Collectible salsa bottles
* 💥 Throw bottles at enemies
* 🦘 Jump on smaller enemies
* ❤️ Health system
* 📊 Status bars for health, coins, bottles and the endboss
* 🔊 Sound effects and background music
* 🔇 Mute / unmute functionality
* 🖥️ Fullscreen mode
* 📱 Touch controls for mobile devices
* 🔄 Restart functionality
* ⏳ Asset preloading with loading progress
* 🌍 German and English game instructions
* 📐 Responsive design

---

## 🛠️ Tech Stack

| Technology    | Usage                         |
| ------------- | ----------------------------- |
| HTML5         | Game structure and UI         |
| CSS3          | Styling and responsive design |
| JavaScript    | Game logic                    |
| OOP           | Game architecture             |
| HTML5 Canvas  | Game rendering                |
| Web Audio     | Music and sound effects       |
| Local Storage | Saving sound preferences      |

No external game engine or JavaScript framework is required.

---

## 🧠 Object-Oriented Programming

The game is built using an **object-oriented architecture**.

Different parts of the game are separated into reusable JavaScript classes.

Some of the main classes include:

```text
World
├── Character
├── Chicken
├── ChickenSmall
├── Endboss
├── Coin
├── Bottle
├── ThrowableObject
├── Cloud
├── BackgroundObject
└── StatusBars
```

Base classes such as `DrawableObject` and `MovableObject` provide shared functionality for game objects.

This architecture helps separate responsibilities such as:

* Drawing objects
* Movement
* Animations
* Physics
* Collision detection
* Health management
* Enemy behavior
* Collectibles

---

## 🎮 How to Play

Help **Pepe** defeat the endboss **El Pollo Loco**.

During the level you can:

* Move through the world
* Jump over obstacles
* Jump on smaller chickens
* Collect coins
* Collect salsa bottles
* Throw salsa bottles at enemies
* Fight the final endboss

Your goal is to survive the level and defeat **El Pollo Loco**.

---

## ⌨️ Controls

### Desktop

| Key     | Action             |
| ------- | ------------------ |
| `←`     | Move left          |
| `→`     | Move right         |
| `Space` | Jump               |
| `C`     | Throw salsa bottle |

---

## 📱 Mobile Controls

Touch controls are automatically displayed on supported mobile devices.

Available controls include:

| Control       | Action             |
| ------------- | ------------------ |
| `←`           | Move left          |
| `→`           | Move right         |
| Jump Button   | Jump               |
| Bottle Button | Throw salsa bottle |

For the best experience on mobile devices, the game is designed to be played in **landscape orientation**.

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/JuliaKeller13/el-pollo-loco.git
```

### 2. Open the project directory

```bash
cd el-pollo-loco
```

### 3. Start the game

The project does not require a package manager or build process.

For development, you can open `index.html` using a local development server such as **Live Server** in Visual Studio Code.

Then start the game by clicking:

```text
START GAME
```

---

## 📁 Project Structure

```text
el-pollo-loco/
│
├── assets/
│   ├── audio/
│   │   └── sounds/
│   ├── fonts/
│   └── img/
│
├── levels/
│   └── level1.js
│
├── models/
│   ├── statusbars/
│   ├── background-objekt.class.js
│   ├── bottle.class.js
│   ├── character.class.js
│   ├── chicken-small.class.js
│   ├── chicken.class.js
│   ├── cloud.class.js
│   ├── coin.class.js
│   ├── drawable-object.class.js
│   ├── endboss.class.js
│   ├── keyboard.class.js
│   ├── level.class.js
│   ├── movable-object.class.js
│   ├── throwable-object.class.js
│   └── world.class.js
│
├── scripts/
│   ├── asset-loader.js
│   ├── audio.js
│   └── game.js
│
├── styles/
│
├── index.html
├── jsdoc.json
├── style.css
└── .gitignore
```

---

## 🕹️ Game Architecture

### `World`

The `World` class manages the main game world and connects the different game objects.

### `Character`

Handles Pepe's movement, animations and player interactions.

### `MovableObject`

Provides shared movement and physics functionality for movable game objects.

### `DrawableObject`

Provides basic rendering functionality for objects displayed on the canvas.

### `Chicken` & `ChickenSmall`

Represent the different enemy types in the game.

### `Endboss`

Contains the logic and behavior of the final enemy, **El Pollo Loco**.

### `ThrowableObject`

Handles throwable salsa bottles and their movement.

### `Level`

Defines the objects and enemies that belong to a game level.

---

## 🖼️ Canvas Rendering

The entire game world is rendered inside an HTML5 `<canvas>` element.

```html
<canvas id="canvas" width="800" height="480"></canvas>
```

JavaScript is responsible for continuously drawing and updating:

* Character animations
* Enemies
* Backgrounds
* Collectibles
* Throwable objects
* Status bars
* Game states

---

## 🔊 Audio

The game contains background music and sound effects for different interactions.

Players can toggle the sound using the mute button in the game interface.

The mute preference is stored locally so the selected setting can be preserved.

---

## 🖥️ Fullscreen Mode

The game supports fullscreen mode directly from the game interface.

This allows the canvas and game controls to use the available screen space for a more immersive experience.

---

## 🌍 Languages

The in-game instructions are available in:

* 🇬🇧 English
* 🇩🇪 German

The language can be switched directly inside the information dialog.

---

## 🎯 What I Learned

This project helped me practice and improve my knowledge of:

* Object-oriented JavaScript
* Classes and inheritance
* HTML5 Canvas
* Game loops
* Collision detection
* Character movement
* Gravity and jumping mechanics
* Sprite animations
* Audio management
* Keyboard events
* Touch events
* Responsive game design
* Code organization
* Asset preloading

---

## 🔮 Possible Future Improvements

* Add additional levels
* Add more enemy types
* Add difficulty settings
* Add a scoring system
* Add player high scores
* Add more power-ups
* Improve mobile controls
* Add automated tests
* Add additional boss mechanics

---

## 👩‍💻 Author

**Julia Keller**

GitHub: [JuliaKeller13](https://github.com/JuliaKeller13)

---

<div align="center">

### 🐔 ¡Viva El Pollo Loco! 🌵

Built with ❤️ and JavaScript

</div>
