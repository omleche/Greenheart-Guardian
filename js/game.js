


class Game {
    constructor(gameSpace, playerDiv) {
        this.gameSpace = gameSpace;
        this.player = new Player(0,110,15, playerDiv, gameSpace); // calling the player
        this.slimes =[]; // calling the slime
         // Getting the bounds of the player and slime
         this.boundsPlayer = this.player.getBounds();
      
         this.gameOver = false;
         
    }

   
//Collision formula
checkCollision() {
    this.boundsPlayer = this.player.getBounds();
    this.slimes.forEach((slime)=>{
        this.boundsSlime = slime.getBounds();
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

    })
    
    
}

start() {
    this.gameOver = false;
    //Drop slime and check collision periodically
    for(let amount= 0; amount < 5; amount++) {
        const slime = new SlimeObstacle(this.gameSpace); // calling the slime
        slime.dropSlime();
        this.slimes.push(slime);
    };
   

    const gameRun = setInterval(() => {
        if (this.checkCollision()) {
            clearInterval(gameRun)
            console.log('Game Over! Slime hit the player!');
            
        }
    }, 50); // Check for collisions every 50ms
}
}

