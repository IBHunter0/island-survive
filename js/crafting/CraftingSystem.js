class CraftingSystem {
    constructor() {
        this.recipes = {
            'wooden_wall': {
                name: 'Wooden Wall',
                materials: { wood: 5 },
                craftTime: 30,
                result: { wooden_wall: 1 },
                levels: [1, 2, 3]
            },
            'stone_wall': {
                name: 'Stone Wall',
                materials: { stone: 5 },
                craftTime: 40,
                result: { stone_wall: 1 },
                levels: [1, 2, 3, 4, 5]
            },
            'metal_wall': {
                name: 'Metal Wall',
                materials: { metal: 3, wood: 2 },
                craftTime: 60,
                result: { metal_wall: 1 },
                levels: [1, 2, 3, 4, 5]
            },
            'workbench': {
                name: 'Workbench',
                materials: { wood: 10, stone: 5 },
                craftTime: 120,
                result: { workbench: 1 },
                levels: [1]
            },
            'chest': {
                name: 'Storage Chest',
                materials: { wood: 8 },
                craftTime: 60,
                result: { chest: 1 },
                levels: [1]
            },
            'furnace': {
                name: 'Furnace',
                materials: { stone: 15, metal: 2 },
                craftTime: 180,
                result: { furnace: 1 },
                levels: [1]
            }
        };
    }

    canCraft(player, recipeId) {
        const recipe = this.recipes[recipeId];
        if (!recipe) return false;

        // Check if player has all materials
        for (const [material, quantity] of Object.entries(recipe.materials)) {
            if (!player.hasItem(material, quantity)) {
                return false;
            }
        }

        return true;
    }

    craft(player, recipeId) {
        const recipe = this.recipes[recipeId];
        if (!this.canCraft(player, recipeId)) {
            return false;
        }

        // Remove materials
        for (const [material, quantity] of Object.entries(recipe.materials)) {
            player.removeItem(material, quantity);
        }

        // Add result
        for (const [item, quantity] of Object.entries(recipe.result)) {
            player.addItem(item, quantity);
        }

        // Skip time based on craft time and equipment
        const speedBonus = 1; // TODO: Calculate based on equipment
        const timeSkip = recipe.craftTime / speedBonus;

        return { success: true, timeSkip };
    }

    getRecipes() {
        return this.recipes;
    }
}
