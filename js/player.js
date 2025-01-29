//export dafault class Player {};

class Player{
    constructor(position,playerSpaceLimits,playerSpeed,playerDiv, gameSpace){
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
            // this.player.style.left = `${this.position - this.playerSpeed}px`;
            this.position -= this.playerSpeed; // For ArrowLeft
            this.playerDiv.style.left = `${this.position}px`;
        } else if (event.key === 'ArrowRight' && this.position < this.gameSpace.offsetWidth - this.playerSpaceLimits) {
            // this.player.style.left = `${this.position + this.playerSpeed}px`;
            this.position += this.playerSpeed; // For ArrowRight
            this.playerDiv.style.left = `${this.position}px`;
        };
        const currentBottom = parseInt(this.playerDiv.style.bottom) ;
        console.log(currentBottom);
        if (event.key === 'ArrowUp' && currentBottom == this.bottom){
            console.log('jumping!')
            let acc = 0
            const playerJump = setInterval(()=>{
                acc++;
                this.playerDiv.style.bottom = `${this.bottom + acc}px`
            },50)
        }
    }
    getBounds(){
         // we are getting the left, top, right, bottom, x, y, width, and height properties in px.
        this.boundsPlayer = this.playerDiv.getBoundingClientRect();
        return this.boundsPlayer;

    };




};




