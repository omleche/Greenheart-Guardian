const player = document.getElementById('player');
const gameSpace = document.getElementById('game-container');



// this gives a chance to add powerups in the future
let playerSpeed = 15;

// Boundary for the player movement
const playerSpaceLimits = 110;

const playerClass = new Player(0,playerSpaceLimits,playerSpeed,player,gameSpace);

document.addEventListener('keydown', (event)=>{
    playerClass.doWalking(event);
})


// Falling Slime


function slimeDrop() {
    let altitud = 0;
    // Create new slime
    const newSlime = document.createElement('div');
    newSlime.classList.toggle("slime");
    gameSpace.appendChild(newSlime);

    // random initialPosition
    let random = Math.floor(Math.random() * 100 )
    let randomSpeed = Math.floor(Math.random() * 10 )
    newSlime.style.left = `${random}%`;
    // slime starting to fall
    let fallingSlime = setInterval(() => {
            console.log(altitud)
            console.log(gameSpace.offsetHeight )
        if( altitud < gameSpace.offsetHeight - 100 ) {
            altitud ++;
            newSlime.style.top = `${altitud}px`
        } else {
            clearInterval(fallingSlime);
            slimeDrop();
            gameSpace.removeChild(newSlime);
        }
        
    }, randomSpeed)



}



// calling functions to start the game
slimeDrop();
slimeDrop();
slimeDrop();
slimeDrop();


