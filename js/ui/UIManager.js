class UIManager {
    constructor(scene) {
        this.scene = scene;
        this.currentHour = 6;
        this.isNight = false;
    }

    createStatsDisplay(player) {
        const x = 15;
        let y = 15;
        const width = 220;
        const barHeight = 12;

        // Background panel
        this.statsPanel = this.scene.add.rectangle(x + width / 2, y + 100, width, 180, 0x1f2937, 0.8)
            .setDepth(100);

        // Title
        this.scene.add.text(x + 5, y, 'STATS', {
            fontSize: '14px',
            fill: '#4ade80',
            fontStyle: 'bold'
        }).setDepth(100);

        const stats = [
            { label: 'Hunger', value: player.hunger, color: '#ef4444' },
            { label: 'Thirst', value: player.thirst, color: '#3b82f6' },
            { label: 'Energy', value: player.energy, color: '#fbbf24' },
            { label: 'Sanity', value: player.sanity, color: '#a78bfa' },
            { label: 'Happiness', value: player.happiness, color: '#ec4899' }
        ];

        this.statBars = {};
        stats.forEach((stat, idx) => {
            y += 25;
            
            // Label
            this.scene.add.text(x + 5, y - 8, stat.label, {
                fontSize: '11px',
                fill: '#ccc'
            }).setDepth(100);

            // Bar background
            this.scene.add.rectangle(x + 5 + 60, y + 2, 150, barHeight, 0x374151)
                .setDepth(100);

            // Bar fill
            this.statBars[stat.label] = this.scene.add.rectangle(
                x + 5 + 60, y + 2, 150 * (stat.value / 100), barHeight, stat.color
            ).setOrigin(0, 0.5).setDepth(100);

            // Value text
            this.scene.add.text(x + 210, y - 8, `${Math.round(stat.value)}%`, {
                fontSize: '10px',
                fill: stat.color
            }).setOrigin(1, 0).setDepth(100);
        });
    }

    createInventoryDisplay(player) {
        const x = 15;
        const y = this.scene.scale.height - 120;
        const width = 220;

        // Background panel
        this.scene.add.rectangle(x + width / 2, y + 50, width, 100, 0x1f2937, 0.8)
            .setDepth(100);

        // Title
        this.scene.add.text(x + 5, y - 15, 'INVENTORY', {
            fontSize: '14px',
            fill: '#4ade80',
            fontStyle: 'bold'
        }).setDepth(100);

        // Items
        let itemY = y;
        Object.entries(player.inventory).slice(0, 5).forEach(([item, qty]) => {
            this.scene.add.text(x + 5, itemY, `${item}: ${qty}`, {
                fontSize: '11px',
                fill: '#ccc'
            }).setDepth(100);
            itemY += 16;
        });
    }

    createDayNightDisplay() {
        const x = this.scene.scale.width - 150;
        const y = 15;

        // Background
        this.scene.add.rectangle(x - 50, y + 15, 100, 40, 0x1f2937, 0.8)
            .setDepth(100);

        // Time text
        this.timeText = this.scene.add.text(x - 50, y + 15, `Time: ${String(this.currentHour).padStart(2, '0')}:00`, {
            fontSize: '14px',
            fill: '#4ade80',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(100);

        // Day/Night indicator
        this.dayNightText = this.scene.add.text(x - 50, y + 35, this.isNight ? 'NIGHT' : 'DAY', {
            fontSize: '12px',
            fill: this.isNight ? '#a78bfa' : '#fbbf24'
        }).setOrigin(0.5).setDepth(100);
    }

    updateStats(player) {
        const stats = [
            { label: 'Hunger', value: player.hunger },
            { label: 'Thirst', value: player.thirst },
            { label: 'Energy', value: player.energy },
            { label: 'Sanity', value: player.sanity },
            { label: 'Happiness', value: player.happiness }
        ];

        stats.forEach(stat => {
            const barWidth = 150 * (stat.value / 100);
            this.statBars[stat.label].setDisplayOriginX(-(150 - barWidth) / 2);
            this.statBars[stat.label].setScale(barWidth / 150, 1);
        });
    }

    updateTime() {
        this.currentHour += 0.016; // ~1 hour per second
        if (this.currentHour >= 24) this.currentHour = 0;

        this.isNight = this.currentHour < 6 || this.currentHour >= 20;

        this.timeText.setText(`Time: ${String(Math.floor(this.currentHour)).padStart(2, '0')}:${String(Math.floor((this.currentHour % 1) * 60)).padStart(2, '0')}`);
        this.dayNightText.setText(this.isNight ? 'NIGHT ⭐' : 'DAY ☀️').setFill(this.isNight ? '#a78bfa' : '#fbbf24');
    }
}
