
class SlimeObstacle {
    constructor() {
        this.newSlime = document.createElement('div');
        this.currentPosition = 0;
        this.boundsSlime = new DOMRect();
    }


    getBounds(){
        // we are getting the left, top, right, bottom, x, y, width, and height properties in px.
        this.boundSlime = this.newSlime.getBoundingClientRect(); 
        return this.boundSlime;

    };


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
            if (slimeSteps < 8){
                this.newSlime.style.left = `${this.currentPosition}%`;
            } else {
                 // Check if `this.newSlime` is still a child of `gameSpace`
            if (gameSpace.contains(this.newSlime)) {
                gameSpace.removeChild(this.newSlime);
            }
                
                clearInterval(runDirection);
                
            } 

        },1000)

    }

    getBounds(){
        this.bounds.getBounding();
    };
    

};