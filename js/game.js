


class Game {
    constructor(gameSpace, playerDiv) {
        this.gameSpace = gameSpace;
        this.player = new Player(0, 110, 15, playerDiv, gameSpace); // calling the player
        this.slimes = []; // calling the slime
        // Getting the bounds of the player and slime
        this.boundsPlayer = this.player.getBounds();

        this.gameOver = false;

    }


    //Collision formula
    checkCollision() {
        if(this.gameOver == false){
            this.boundsPlayer = this.player.getBounds();
            this.slimes.forEach((slime) => {
                this.boundsSlime = slime.getBounds();
                // AABB collision detection

                if (
                    this.boundsPlayer.left +32 < this.boundsSlime.right -32 &&
                    this.boundsPlayer.right -32 > this.boundsSlime.left +32 &&
                    this.boundsPlayer.top -32 < this.boundsSlime.bottom -32 &&
                    this.boundsPlayer.bottom -32 > this.boundsSlime.top -32
                ) {
                    console.log('Collision detected!');
                    console.log(`${this.boundsPlayer.top} - ${this.boundsPlayer.bottom}`)
                    console.log(`${this.boundsSlime.top} - ${this.boundsSlime.bottom}`)
                    this.player.changeDead(); 
                    this.gameOver = true
                    return true;
                }
            })
        }
        return false;
     
    }
    doWin(){
        
    }

    start() {
        this.gameOver = false;
        let acc = 0;
        // Drop slime and check collision periodically
        const slimeAppear = setInterval(() => {
            if (acc != 3) {

                const slime = new SlimeObstacle(this.gameSpace); // calling the slime
                slime.dropSlime();
                acc++
                this.slimes.push(slime);

            } else {
                clearInterval(slimeAppear);
            }
        }, 2000);



        const gameRun = setInterval(() => {
            if (this.checkCollision()) {
                clearInterval(gameRun)
                console.log('Game Over! Slime hit the player!');

            }
        }, 50); // Check for collisions every 50ms
    }
}

