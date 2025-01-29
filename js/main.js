

const playerDiv = document.getElementById('player');
const gameSpace = document.getElementById('game-container');



// this gives a chance to add powerups in the future
let playerSpeed = 15;

// Boundary for the player movement
const playerSpaceLimits = 110;

const game = new Game(gameSpace,playerDiv);

document.addEventListener('keydown', (event)=>{
    if(game.gameOver == false){
        game.player.doWalking(event);
    };
   
})


// calling functions to start the game
game.start();

// slime.dropSlime();
// slime.runSlime();




