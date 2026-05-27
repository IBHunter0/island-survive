# 🏝️ Island Survival

A multiplayer survival game built with JavaScript and Phaser. Survive on an island with your friends!

## Features

### Gameplay
- **Class System**: Choose from 5 unique classes with different starting items and perks
  - Stranded (Free)
  - Newbie Survivor (6 Jewels)
  - Expert Survivor (30 Jewels)
  - Bodybuilder (12 Jewels)
  - Soldier (50 Jewels)

- **Stat System**: Manage 5 vital stats
  - Hunger
  - Thirst
  - Happiness
  - Energy
  - Sanity

- **Crafting System**: Craft items and buildings with different levels
  - Walls (Wood, Stone, Metal)
  - Storage structures
  - Tools and equipment

- **Day/Night Cycle**: Dynamic time system with different enemy spawning
  - Day: Weaker animals
  - Night: Stronger animals spawn more frequently

- **Randomly Generated World**: 9x9 baseplate world with various structures
  - Abandoned military base
  - Abandoned camp
  - Abandoned RV
  - Old temple
  - Cave
  - Abandoned cabin
  - Harbor
  - River & Lake
  - Plane wreck, Ship wreck, Helicopter crash

## Controls

- **Arrow Keys / WASD**: Move around
- **E**: Interact with structures
- **C**: Open crafting menu
- **I**: Open inventory

## How to Play

1. Open `index.html` in a web browser
2. Select your class at the main menu
3. Click "Start Game"
4. Survive by managing your stats, crafting items, and building structures
5. Avoid enemies, especially during night time

## Project Structure

```
island-survive/
├── index.html                 # Main HTML file
├── style.css                  # Game styling
├── js/
│   ├── config.js             # Game configuration
│   ├── main.js               # Game initialization
│   ├── scenes/
│   │   ├── MenuScene.js      # Class selection menu
│   │   ├── GameScene.js      # Main game loop
│   │   └── CraftingScene.js  # Crafting interface
│   ├── player/
│   │   └── Player.js         # Player class and mechanics
│   ├── world/
│   │   └── World.js          # World generation
│   ├── crafting/
│   │   └── CraftingSystem.js # Crafting recipes and logic
│   └── ui/
│       └── UIManager.js      # UI and HUD management
└── README.md
```

## Technologies Used

- **Phaser 3**: Game engine
- **Vanilla JavaScript**: Game logic
- **HTML5 Canvas**: Rendering

## Next Steps

- [ ] Add enemy AI and spawning
- [ ] Implement multiplayer networking
- [ ] Add more crafting recipes
- [ ] Create building system
- [ ] Add sound effects and music
- [ ] Improve graphics and animations
- [ ] Add more structures and biomes
- [ ] Implement save/load system

## License

MIT License - Feel free to use this project for learning and development!
