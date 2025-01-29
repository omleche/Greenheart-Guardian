//export dafault class Player {};

class Player {
    constructor(position, playerSpaceLimits, playerSpeed, playerDiv, gameSpace) {
        this.position = position;
        this.playerSpaceLimits = playerSpaceLimits;
        this.playerSpeed = playerSpeed;
        this.playerDiv = playerDiv;
        this.gameSpace = gameSpace;
        this.boundsPlayer = new DOMRect();
        this.bottom = 5;
        this.playerDiv.style.bottom = '5px';

    }

    doWalking(event) {
        if (event.key === 'ArrowLeft' && this.position > 0) {
            //calling player animation
            this.playerDiv.classList.add('player-run');
            this.playerDiv.classList.add('player-left');
            this.playerDiv.classList.remove('player-stop');
            // this.player.style.left = `${this.position - this.playerSpeed}px`;
            this.position -= this.playerSpeed; // For ArrowLeft
            this.playerDiv.style.left = `${this.position}px`;
        } else if (event.key === 'ArrowRight' && this.position < this.gameSpace.offsetWidth - this.playerSpaceLimits) {
            // calling player animation
            this.playerDiv.classList.add('player-run');
            this.playerDiv.classList.remove('player-left');
            this.playerDiv.classList.remove('player-stop');
            // this.player.style.left = `${this.position + this.playerSpeed}px`;
            this.position += this.playerSpeed; // For ArrowRight
            this.playerDiv.style.left = `${this.position}px`;
        };

        const currentBottom = parseInt(this.playerDiv.style.bottom);

        // jumping
        let acc = 5
        let jumpingState = false;
        let downInterval;
        if (event.key === "ArrowUp") {
           
            if (this.bottom > 5 && this.bottom < 50) {
                return
            }
            this.doJump();
            const playerJump = setInterval(() => {

                if (this.bottom > 100) {
                    clearInterval(playerJump)
                    downInterval = setInterval(() => {
                        if (this.bottom <= 5) {
                            clearInterval(downInterval)
                            jumpingState = false
                            this.doStopJump();
                        }

                        this.bottom -= acc
                        this.playerDiv.style.bottom = `${this.bottom}px`
                    }, 50)
                }
                this.bottom += acc
                this.playerDiv.style.bottom = `${this.bottom}px`
            }, 50)

        }


    }
    doStop() {
        this.playerDiv.classList.add('player-stop');
        this.playerDiv.classList.remove('player-run');
    }
    changeDead() {
        this.playerDiv.classList.remove('player-jump');
        this.playerDiv.classList.remove('player-stop');
        this.playerDiv.classList.remove('player-run');
        this.playerDiv.classList.add('change-dead');
    }
    doJump() {
        this.playerDiv.classList.remove('player-stop');
        this.playerDiv.classList.remove('player-run');
        this.playerDiv.classList.add('player-jump');

    }
    doStopJump(){
        this.playerDiv.classList.remove('player-jump');
    }


    getBounds() {
        // we are getting the left, top, right, bottom, x, y, width, and height properties in px.
        this.boundsPlayer = this.playerDiv.getBoundingClientRect();
        return this.boundsPlayer;

    };




};




