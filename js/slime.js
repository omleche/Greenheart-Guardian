class SlimeObstacle {
    constructor() {
        this.newSlime = document.createElement('div');
        this.currentPosition = 0;
    }

    // Falling Slime


    dropSlime() {
        let altitud = 0;
        // Create new slime
        this.newSlime = document.createElement('div');

        this.newSlime.classList.toggle("slime");
        gameSpace.appendChild(this.newSlime);

        // random initialPosition
        this.currentPosition = Math.floor(Math.random() * 100)
        let randomSpeed = Math.floor(5, Math.random() * 10)
        this.newSlime.style.left = `${this.currentPosition}%`;
        // slime starting to fall
        let fallingSlime = setInterval(() => {
            console.log(altitud)
            console.log(gameSpace.offsetHeight)
            if (altitud < gameSpace.offsetHeight - 100) {
                altitud++;
                this.newSlime.style.top = `${altitud}px`
            } else {
                clearInterval(fallingSlime);
                this.runSlime();
                return;
                //this.dropSlime();
            }

        }, randomSpeed)

    }


    // Slime movement on floor

    runSlime() {
        let slimeSteps = 0
        let direction = Math.random();
        const runDirection = setInterval(()=>{
            if (direction < 0.5) {
                this.currentPosition ++; // Move left
            } else {
                this.currentPosition --; // Move right
            }
            slimeSteps ++;
            // Ensure it stays between 0% and 100%
    
            // this.currentPosition = Math.min(100, Math.max(0, this.currentPosition + randomDirection)
            // ); 
            if (slimeSteps < 8){
                this.newSlime.style.left = `${this.currentPosition}%`;
            } else {
                clearInterval(runDirection);
                gameSpace.removeChild(this.newSlime);
                
            }
            

        },1000)




    }

};