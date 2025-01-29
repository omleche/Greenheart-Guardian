class SlimeObstacle {
    constructor(gameSpace) {
        this.newSlime = document.createElement('div');
        this.currentPosition = 0;
        this.boundsSlime = new DOMRect();
        this.gameSpace = gameSpace
    }

    getBounds() {
        // We are getting the left, top, right, bottom, x, y, width, and height properties in px.
        this.boundSlime = this.newSlime.getBoundingClientRect();
        return this.boundSlime;
    };

    // Falling Slime
    dropSlime() {
        let altitud = 0;
        // Create new slime
        this.newSlime = document.createElement('div');
        this.newSlime.classList.toggle("slime");
        this.gameSpace.appendChild(this.newSlime);

        // Random initialPosition
        this.currentPosition = Math.floor(Math.random() * 100);

        // Speed between 5-10
        let randomSpeed = Math.floor(Math.random() * 6) + 5;

        this.newSlime.style.left = `${this.currentPosition}%`;

        // Slime starts falling
        let fallingSlime = setInterval(() => {
            if (altitud < gameSpace.offsetHeight - 100) {
                altitud += 5;
                this.newSlime.style.top = `${altitud}px`;
            } else {
                clearInterval(fallingSlime);
                this.runSlime(); // Start moving slime on the floor
                this.removeSlime(); // Remove slime after 3 seconds of being on the floor
            }
        }, randomSpeed);
       
    }

    // Slime movement on the floor
    runSlime() {
        let slimeSteps = 0;
        let direction = Math.random();
        const runDirection = setInterval(() => {
            if (direction < 0.5) {
                this.currentPosition+= 5; // Move left
            } else {
                this.currentPosition-= 5; // Move right
            }
            slimeSteps++;

            // Ensure it stays between 0% and 100%
            if (slimeSteps < 10) {
                this.newSlime.style.left = `${this.currentPosition}%`;
            } else {
                clearInterval(runDirection); // Stop moving slime
            }
        }, 1000);
    }

    // Remove slime after 3 seconds
    removeSlime() {
        setTimeout(() => {
            if (this.gameSpace.contains(this.newSlime)) {
                this.gameSpace.removeChild(this.newSlime); // Remove slime from the game
            }
        }, 3000); // 3 seconds after the slime touches the floor
    }
};