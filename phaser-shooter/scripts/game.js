// Basic Phaser Game Setup
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Load images for player and bullets
    this.load.image('player', 'assets/player.png');
    this.load.image('bullet', 'assets/bullet.png');
}

function create() {
    // Create player at the center of the screen
    this.player = this.physics.add.image(400, 300, 'player');
    this.player.setCollideWorldBounds(true); // Prevent player from going off screen

    // Setup keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create a group for bullets
    this.bullets = this.physics.add.group();
}

function update() {
    // Handle player movement
    if (this.cursors.left.isDown) {
        this.player.x -= 5;
    } else if (this.cursors.right.isDown) {
        this.player.x += 5;
    }

    if (this.cursors.up.isDown) {
        this.player.y -= 5;
    } else if (this.cursors.down.isDown) {
        this.player.y += 5;
    }

    // Fire bullets when mouse is clicked
    if (this.input.activePointer.isDown) {
        fireBullet.call(this);
    }
}

// Function to fire bullets
function fireBullet() {
    const bullet = this.bullets.create(this.player.x, this.player.y, 'bullet');
    bullet.setVelocityY(-300); // Move bullet upwards
}
