

const playerDiv = document.getElementById('player');
const gameSpace = document.getElementById('game-container');
const safePlace = document.getElementById('gemPlant');



// this gives a chance to add powerups in the future
let playerSpeed = 15;

// Boundary for the player movement
const playerSpaceLimits = 110;

const game = new Game(gameSpace,playerDiv,safePlace);

document.addEventListener('keydown', (event)=>{
    if(game.gameOver == false){
        game.player.doWalking(event);
        
    };
   
})

document.addEventListener('keyup', (event)=>{
    if(game.gameOver == false){
        game.player.doStop();
    };
})

//background Audio
const audio = document.createElement("audio");
audio.src = "./assets/forest.wav";
audio.loop = true;
audio.volume = 0.3;
document.body.appendChild(audio);
audio.play();

// calling functions to start the game
game.start();

// slime.dropSlime();
// slime.runSlime();




