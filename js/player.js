//export dafault class Player {};

class Player{
    constructor(position,playerSpaceLimits,playerSpeed,player, gameSpace){
        this.position = position;
        this.playerSpaceLimits = playerSpaceLimits;
        this.playerSpeed = playerSpeed;
        this.player = player; 
        this.gameSpace = gameSpace;
        this.boundsPlayer = new DOMRect();
    }

    doWalking(event) {
        
        if (event.key === 'ArrowLeft' && this.position > 0) {
            // this.player.style.left = `${this.position - this.playerSpeed}px`;
            this.position -= this.playerSpeed; // For ArrowLeft
            this.player.style.left = `${this.position}px`;
        } else if (event.key === 'ArrowRight' && this.position < this.gameSpace.offsetWidth - this.playerSpaceLimits) {
            // this.player.style.left = `${this.position + this.playerSpeed}px`;
            this.position += this.playerSpeed; // For ArrowRight
            this.player.style.left = `${this.position}px`;
        };
        
    }
    getBounds(){
         // we are getting the left, top, right, bottom, x, y, width, and height properties in px.
        this.boundsPlayer = this.player.getBoundingClientRect();
        return this.boundsPlayer;

    };
    
    // check this for movement?
    // move(x, y) {
    //     this.player.style.left = `${x}px`;
    //     this.player.style.top = `${y}px`;
    // }


};




