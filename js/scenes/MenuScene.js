class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Background
        this.add.rectangle(width / 2, height / 2, width, height, 0x0f172a);

        // Title
        this.add.text(width / 2, 60, 'ISLAND SURVIVAL', {
            fontSize: '56px',
            fill: '#4ade80',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(width / 2, 120, 'Choose Your Class', {
            fontSize: '24px',
            fill: '#ccc'
        }).setOrigin(0.5);

        this.selectedClass = 'stranded';
        let yPos = 180;

        // Create class buttons
        Object.entries(CLASSES).forEach(([key, classData]) => {
            const isSelected = key === this.selectedClass;
            
            const button = this.add.rectangle(width / 2, yPos, 500, 70, 
                isSelected ? 0x4ade80 : 0x1f2937, 1)
                .setStrokeStyle(2, isSelected ? 0x4ade80 : 0x374151)
                .setInteractive();

            // Class name
            this.add.text(width / 2 - 240, yPos - 15, classData.name, {
                fontSize: '18px',
                fill: isSelected ? '#000' : '#4ade80',
                fontStyle: 'bold'
            });

            // Description
            this.add.text(width / 2 - 240, yPos + 10, classData.description, {
                fontSize: '12px',
                fill: isSelected ? '#000' : '#ccc'
            });

            // Price
            this.add.text(width / 2 + 180, yPos, `💎 ${classData.price}`, {
                fontSize: '14px',
                fill: isSelected ? '#000' : '#fbbf24',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            button.on('pointerdown', () => {
                this.selectedClass = key;
                this.scene.restart();
            });

            yPos += 90;
        });

        // Start button
        const startButton = this.add.rectangle(width / 2, height - 60, 200, 50, 0x4ade80)
            .setInteractive();

        this.add.text(width / 2, height - 60, 'START GAME', {
            fontSize: '18px',
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        startButton.on('pointerdown', () => {
            this.scene.start('GameScene', { 
                selectedClass: this.selectedClass,
                classData: CLASSES[this.selectedClass]
            });
        });
    }
}
