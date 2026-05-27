class World {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.structures = [];
        this.generateWorld();
    }

    generateWorld() {
        // Generate random structures around the world
        const numStructures = Phaser.Math.Between(8, 12);
        
        for (let i = 0; i < numStructures; i++) {
            const structure = {
                x: Phaser.Math.Between(100, this.width - 100),
                y: Phaser.Math.Between(100, this.height - 100),
                type: STRUCTURES[Phaser.Math.Between(0, STRUCTURES.length - 1)],
                id: i,
                health: 100,
                loot: this.generateLoot()
            };
            
            this.structures.push(structure);
        }
    }

    generateLoot() {
        const lootTable = {
            wood: { chance: 0.8, min: 2, max: 5 },
            stone: { chance: 0.7, min: 1, max: 3 },
            metal: { chance: 0.3, min: 1, max: 2 },
            water_bottle: { chance: 0.5, min: 1, max: 2 },
            food: { chance: 0.4, min: 1, max: 3 }
        };

        const loot = {};
        Object.entries(lootTable).forEach(([item, data]) => {
            if (Math.random() < data.chance) {
                loot[item] = Phaser.Math.Between(data.min, data.max);
            }
        });

        return loot;
    }

    getStructureAt(x, y, radius = 50) {
        return this.structures.find(s => {
            const dist = Phaser.Math.Distance.Between(x, y, s.x, s.y);
            return dist < radius;
        });
    }

    collectLoot(structureId) {
        const structure = this.structures.find(s => s.id === structureId);
        if (structure) {
            const loot = structure.loot;
            structure.loot = {};
            return loot;
        }
        return {};
    }
}
