


class Game {
    constructor(gameSpace, playerDiv) {
        this.gameSpace = gameSpace;
        this.player = new Player(0,110,15, playerDiv, gameSpace); // calling the player
        this.slime = new SlimeObstacle(gameSpace); // calling the slime
         // Getting the bounds of the player and slime
         this.boundsPlayer = this.player.getBounds();
         this.boundsSlime = this.slime.getBounds();
         this.gameOver = false;
         
    }

   
//Collision formula
checkCollision() {
    this.boundsPlayer = this.player.getBounds();
    this.boundsSlime = this.slime.getBounds();
    // AABB collision detection
    if (
        this.boundsPlayer.left < this.boundsSlime.right &&
        this.boundsPlayer.right > this.boundsSlime.left &&
        this.boundsPlayer.top < this.boundsSlime.bottom &&
        this.boundsPlayer.bottom > this.boundsSlime.top
    ) {
        console.log('Collision detected!');
        this.gameOver = true
        return true;
    }

    return false;
}

start() {
    this.gameOver = false;
    //Drop slime and check collision periodically
    for(let amount= 0; amount < 5; amount++) {
        this.slime.dropSlime();
    };
   

    const gameRun = setInterval(() => {
        if (this.checkCollision()) {
            console.log('Game Over! Slime hit the player!');
            clearInterval(gameRun)
        }
    }, 50); // Check for collisions every 50ms
}
}

