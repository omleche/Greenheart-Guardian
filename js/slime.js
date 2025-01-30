class SlimeObstacle {
    constructor(gameSpace) {
        this.newSlime = document.createElement('div');
        this.currentPosition = 0;
        this.boundsSlime = new DOMRect();
        this.gameSpace = gameSpace;
    }

    getBounds() {
        // Getting the left, top, right, bottom, x, y, width, and height properties in px
        this.boundSlime = this.newSlime.getBoundingClientRect();
        return this.boundSlime;
    }

    // Falling Slime
    dropSlime() {
        let altitud = 5; // Starting altitude for the slime
        // Create new slime element
        this.newSlime.classList.toggle("slime");
        this.gameSpace.appendChild(this.newSlime);

        // Set the slime's CSS to absolute positioning
        this.newSlime.style.position = 'absolute';
        this.newSlime.style.top = `${altitud}px`; // Starting position for the slime

        // Random initial position (0-100%)
        this.currentPosition = Math.floor(Math.random() * 90);
        
        // Slime fall speed between 5-10 ms
        let randomSpeed = Math.floor(Math.random() * 6) + 5;

        // Set the slime's left position
        this.newSlime.style.left = `${this.currentPosition}%`;

        // Slime starts falling
        let fallingSlime = setInterval(() => {
            // Get the game container's height
            let gameHeight = this.gameSpace.offsetHeight;
            
            // If the slime hasn't reached the bottom of the game space
            if (altitud < gameHeight - this.newSlime.offsetHeight) {
                altitud += 5; // Move the slime downward
                this.newSlime.style.top = `${altitud}px`;
            } else {
                // If the slime reaches the floor, stop falling
                clearInterval(fallingSlime);
                
                // Add a delay before the slime starts moving
                setTimeout(() => {

                     // audio 
                    const audio = document.createElement("audio");
                    audio.src = "./assets/Slimefalling.wav";
                    audio.volume = 0.1;
                    document.body.appendChild(audio);

                    // Play the audio
                    audio.play()
                        .then(() => console.log("Audio is playing"))
                        .catch(error => console.error("Autoplay blocked:", error));

                    this.runSlime(); 
                }, 100); 

                this.removeSlime(); // Remove slime after 3 seconds on the floor
            }
        }, randomSpeed);
    }

    // Slime movement on the floor
    runSlime() {
        this.newSlime.classList.toggle('slime-attack'); // Add an image to the slime
        let slimeSteps = 0;
        let direction = Math.random(); // Random direction (left or right)
        
        // Move the slime back and forth on the floor
        const runDirection = setInterval(() => {
            if (direction < 0.5) {
                this.currentPosition += 5; // Move left
            } else {
                this.currentPosition -= 5; // Move right
            }
            slimeSteps++;

            // Ensure slime stays within 0% to 90% of the game container's width
            if (this.currentPosition < 0) {
                this.currentPosition = 0; // Prevent going out of the left bounds
            } else if (this.currentPosition > 90) {
                this.currentPosition = 90; // Prevent going out of the right bounds
            }

            if (slimeSteps < 10) {
                this.newSlime.style.left = `${this.currentPosition}%`; // Move slime
            } else {
                clearInterval(runDirection); // Stop moving slime after 10 steps
            }
        }, 1000);
    }

    // Remove slime after 3 seconds
    removeSlime() {
        setTimeout(() => {
            if (this.gameSpace.contains(this.newSlime)) {
                this.gameSpace.removeChild(this.newSlime); // Remove the slime from the game
            }
        }, 10000); // Remove the slime after 3 seconds
    }
}
