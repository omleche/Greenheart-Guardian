import Player from './player.js';
import SlimeObstacle from '.slime.js';
// export default class Game {};


class Game {
    constructor(gameSpace) {
        this.gameSpace = gameSpace; 
        this.player = new Player(gameSpace); // calling the player
        this.slime = new SlimeObstacle(gameSpace); // calling the slime
    }
//Collision formula
    checkCollision() {
        const playerBounds = this.player.getBounds();
        const slimeBounds = this.slime.getBounds();

        // AABB collision detection
        if (
            playerBounds.left < slimeBounds.right &&
            playerBounds.right > slimeBounds.left &&
            playerBounds.top < slimeBounds.bottom &&
            playerBounds.bottom > slimeBounds.top
        ) {
            console.log('Collision detected!');
            return true;
        }

        return false;
    }

    start() {
        // Example setup to drop slime and check collision periodically
        this.slime.dropSlime();

        setInterval(() => {
            if (this.checkCollision()) {
                console.log('Game Over! Slime hit the player!');
            }
        }, 50); // Check for collisions every 50ms
    }
}