class CraftingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CraftingScene', active: false });
    }

    init(data) {
        this.player = data.player;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Semi-transparent background
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);

        // Title
        this.add.text(width / 2, 30, 'CRAFTING MENU', {
            fontSize: '32px',
            fill: '#4ade80',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Close instruction
        this.add.text(width / 2, 60, 'Press C to close', {
            fontSize: '14px',
            fill: '#ccc'
        }).setOrigin(0.5);

        // Crafting recipes (placeholder)
        const recipes = [
            { name: 'Wooden Wall', materials: ['wood: 5'], time: 30 },
            { name: 'Stone Wall', materials: ['stone: 5'], time: 40 },
            { name: 'Metal Wall', materials: ['metal: 3'], time: 60 },
            { name: 'Workbench', materials: ['wood: 10', 'stone: 5'], time: 120 }
        ];

        let yPos = 100;
        recipes.forEach((recipe, index) => {
            // Recipe background
            this.add.rectangle(width / 2, yPos + 30, 400, 60, 0x374151, 1)
                .setStrokeStyle(2, 0x4ade80);

            // Recipe name
            this.add.text(width / 2 - 190, yPos + 10, recipe.name, {
                fontSize: '16px',
                fill: '#4ade80',
                fontStyle: 'bold'
            });

            // Materials
            this.add.text(width / 2 - 190, yPos + 30, 'Materials: ' + recipe.materials.join(', '), {
                fontSize: '12px',
                fill: '#ccc'
            });

            // Time
            this.add.text(width / 2 - 190, yPos + 45, `Time: ${recipe.time}s`, {
                fontSize: '12px',
                fill: '#fbbf24'
            });

            // Craft button
            const craftButton = this.add.text(width / 2 + 150, yPos + 30, 'CRAFT', {
                fontSize: '14px',
                fill: '#000',
                fontStyle: 'bold',
                backgroundColor: '#4ade80',
                padding: { x: 15, y: 8 }
            }).setOrigin(0.5).setInteractive();

            craftButton.on('pointerdown', () => {
                console.log('Crafting ' + recipe.name);
                // TODO: Implement crafting
            });

            yPos += 80;
        });

        // Close button
        const closeButton = this.add.text(width - 50, 30, 'X', {
            fontSize: '32px',
            fill: '#ff6b6b',
            fontStyle: 'bold'
        }).setInteractive();

        closeButton.on('pointerdown', () => {
            this.scene.stop();
        });

        // Keyboard close
        this.input.keyboard.on('keydown-C', () => {
            this.scene.stop();
        });
    }
}
