class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene', active: false });
    }

    init(data) {
        this.selectedClass = data.selectedClass;
        this.classData = data.classData;
    }

    create() {
        // Create player
        this.player = new Player(400, 300, this.classData);
        this.playerGraphics = this.add.rectangle(this.player.x, this.player.y, 30, 30, 0x4ade80);

        // Create world
        this.world = new World(2048, 1536);

        // Create camera
        this.cameras.main.setBounds(0, 0, 2048, 1536);
        this.cameras.main.startFollow(this.playerGraphics);

        // Create background
        this.createBackground();

        // Draw structures
        this.drawStructures();

        // Create UI
        this.ui = new UIManager(this);
        this.ui.createStatsDisplay(this.player);
        this.ui.createInventoryDisplay(this.player);
        this.ui.createDayNightDisplay();

        // Input handling
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-W', () => this.movePlayer(0, -1));
        this.input.keyboard.on('keydown-A', () => this.movePlayer(-1, 0));
        this.input.keyboard.on('keydown-S', () => this.movePlayer(0, 1));
        this.input.keyboard.on('keydown-D', () => this.movePlayer(1, 0));

        // E to interact
        this.input.keyboard.on('keydown-E', () => this.interact());

        // C to craft
        this.input.keyboard.on('keydown-C', () => {
            this.scene.launch('CraftingScene', { player: this.player });
        });

        // I to inventory
        this.input.keyboard.on('keydown-I', () => {
            console.log('Inventory:', this.player.inventory);
        });

        this.lastMoveTime = 0;
    }

    createBackground() {
        // Create a simple grass background
        const width = 2048;
        const height = 1536;
        const tileSize = 64;

        for (let x = 0; x < width; x += tileSize) {
            for (let y = 0; y < height; y += tileSize) {
                const color = ((Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0) ? 0x1b4d2e : 0x2d5a3d;
                this.add.rectangle(x + tileSize / 2, y + tileSize / 2, tileSize, tileSize, color)
                    .setDepth(0);
            }
        }
    }

    drawStructures() {
        this.structureGraphics = this.add.graphics();
        this.structureTexts = this.add.container();

        this.world.structures.forEach(structure => {
            // Draw structure
            this.structureGraphics.fillStyle(0x8b4513, 1);
            this.structureGraphics.fillRect(structure.x - 25, structure.y - 25, 50, 50);
            this.structureGraphics.lineStyle(2, 0x654321);
            this.structureGraphics.strokeRect(structure.x - 25, structure.y - 25, 50, 50);

            // Structure label
            const text = this.add.text(structure.x, structure.y - 40, structure.type.split(' ')[0], {
                fontSize: '12px',
                fill: '#fff',
                backgroundColor: '#000',
                padding: { x: 4, y: 2 }
            }).setOrigin(0.5).setDepth(5);
        });
    }

    movePlayer(dx, dy) {
        const now = this.time.now;
        if (now - this.lastMoveTime < 100) return; // Throttle movement
        this.lastMoveTime = now;

        this.player.x += dx * 30;
        this.player.y += dy * 30;

        // Clamp to world bounds
        this.player.x = Phaser.Math.Clamp(this.player.x, 0, 2048);
        this.player.y = Phaser.Math.Clamp(this.player.y, 0, 1536);

        this.playerGraphics.setPosition(this.player.x, this.player.y);
    }

    interact() {
        const nearbyStructure = this.world.getStructureAt(this.player.x, this.player.y);
        if (nearbyStructure) {
            console.log('Interacting with:', nearbyStructure.type);
            const loot = this.world.collectLoot(nearbyStructure.id);
            Object.entries(loot).forEach(([item, qty]) => {
                this.player.addItem(item, qty);
            });
            this.ui.createInventoryDisplay(this.player);
        }
    }

    update(delta) {
        // Update player
        this.player.update(delta);

        // Update UI
        this.ui.updateStats(this.player);
        this.ui.updateTime();

        // Check if dead
        if (this.player.isDead()) {
            this.scene.stop();
            this.scene.start('MenuScene');
        }
    }
}
