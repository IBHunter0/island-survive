class Player {
    constructor(x, y, classData) {
        this.x = x;
        this.y = y;
        this.classData = classData;
        
        // Stats
        this.stats = {
            strength: classData.stats.strength || 0,
            endurance: classData.stats.endurance || 0,
            intelligence: classData.stats.intelligence || 0,
            luck: classData.stats.luck || 0,
            stamina: classData.stats.stamina || 0
        };

        // Bars (0-100)
        this.hunger = 100;
        this.thirst = 100;
        this.happiness = 100;
        this.energy = 100;
        this.sanity = 100;

        // Inventory
        this.inventory = {};
        
        // Add starting items
        Object.entries(classData.startItems).forEach(([item, quantity]) => {
            this.inventory[item] = quantity;
        });

        // Speed
        this.speed = 150;
    }

    update(delta) {
        // Decrease stats over time
        const deltaSeconds = delta / 1000;
        this.hunger = Math.max(0, this.hunger - deltaSeconds * 0.5);
        this.thirst = Math.max(0, this.thirst - deltaSeconds * 0.8);
        this.energy = Math.max(0, this.energy - deltaSeconds * 0.3);
        this.happiness = Math.max(0, this.happiness - deltaSeconds * 0.2);

        // Sanity decreases more when hunger/thirst is low
        if (this.hunger < 30 || this.thirst < 30) {
            this.sanity = Math.max(0, this.sanity - deltaSeconds * 0.5);
        }
    }

    addItem(item, quantity) {
        this.inventory[item] = (this.inventory[item] || 0) + quantity;
    }

    removeItem(item, quantity) {
        if (this.inventory[item]) {
            this.inventory[item] = Math.max(0, this.inventory[item] - quantity);
            if (this.inventory[item] === 0) {
                delete this.inventory[item];
            }
        }
    }

    hasItem(item, quantity = 1) {
        return (this.inventory[item] || 0) >= quantity;
    }

    eat(amount = 30) {
        this.hunger = Math.min(100, this.hunger + amount);
    }

    drink(amount = 30) {
        this.thirst = Math.min(100, this.thirst + amount);
    }

    sleep(amount = 50) {
        this.energy = Math.min(100, this.energy + amount);
        this.sanity = Math.min(100, this.sanity + 20);
    }

    isDead() {
        return this.hunger <= 0 || this.thirst <= 0 || this.sanity <= 0;
    }
}
