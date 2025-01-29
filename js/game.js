


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
        this.boundsPlayer = this.player.getBounds();
        this.slimes.forEach((slime) => {
            this.boundsSlime = slime.getBounds();
            // AABB collision detection
            if (
                this.boundsPlayer.left < this.boundsSlime.right &&
                this.boundsPlayer.right > this.boundsSlime.left &&
                this.boundsPlayer.top < this.boundsSlime.bottom &&
                this.boundsPlayer.bottom > this.boundsSlime.top
            ) {
                console.log('Collision detected!');
                this.player.playerDiv.style.backgroundImage = `url('../assets/characterDead.png')`; // dead of the character
                this.gameOver = true
                return true;
            }

            return false;

        })


    }

    start() {
        this.gameOver = false;
        let acc = 0;
        //Drop slime and check collision periodically
        const slimeAppear = setInterval(() => {
            if (acc != 5) {

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

