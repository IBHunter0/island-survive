// Game configuration
const GAME_CONFIG = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MenuScene, GameScene, CraftingScene],
    backgroundColor: '#1a1a1a'
};

// Class definitions
const CLASSES = {
    stranded: {
        name: 'Stranded',
        description: 'Get nothing',
        price: 0,
        startItems: {},
        stats: { strength: 0, endurance: 0, intelligence: 0, luck: 0, stamina: 0 }
    },
    newbie: {
        name: 'Newbie Survivor',
        description: 'Get a flashlight and lighter',
        price: 6,
        startItems: { flashlight: 1, lighter: 1 },
        stats: { strength: 0, endurance: 0, intelligence: 0, luck: 0, stamina: 0 }
    },
    expert: {
        name: 'Expert Survivor',
        description: 'Start with Lvl 3 Intelligence',
        price: 30,
        startItems: { rechargeable_flashlight: 1, flint_steel: 1, gas_canister: 1, lockpick: 1 },
        stats: { strength: 0, endurance: 0, intelligence: 3, luck: 0, stamina: 0 }
    },
    bodybuilder: {
        name: 'Bodybuilder',
        description: 'Start with Lvl 1 Strength & Endurance',
        price: 12,
        startItems: { protein_shake: 1 },
        stats: { strength: 1, endurance: 1, intelligence: 0, luck: 0, stamina: 0 }
    },
    soldier: {
        name: 'Soldier',
        description: 'Start with Lvl 1 all stats',
        price: 50,
        startItems: { handgun: 1, bullets: 12, survival_knife: 1 },
        stats: { strength: 1, endurance: 1, intelligence: 1, luck: 1, stamina: 1 },
        perks: ['50% less bullet use', '-20% energy drain']
    }
};

// World structures
const STRUCTURES = [
    'Abandoned Military Base',
    'Abandoned Camp',
    'Abandoned RV',
    'Old Temple',
    'Cave',
    'Abandoned Cabin',
    'Harbor',
    'River',
    'Lake',
    'Plane Wreck',
    'Ship Wreck',
    'Helicopter Crash'
];
