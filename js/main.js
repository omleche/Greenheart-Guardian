const player = document.getElementById('player');
const gameSpace = document.getElementById('game-container');
const slime = new SlimeObstacle();


// this gives a chance to add powerups in the future
let playerSpeed = 15;

// Boundary for the player movement
const playerSpaceLimits = 110;

const playerClass = new Player(0,playerSpaceLimits,playerSpeed,player,gameSpace);

document.addEventListener('keydown', (event)=>{
    playerClass.doWalking(event);
})





// calling functions to start the game

slime.dropSlime();
slime.runSlime();


