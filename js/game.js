


class Game {
    constructor(gameSpace, playerDiv, safePlace) {
        this.gameSpace = gameSpace;
        this.player = new Player(0, 110, 15, playerDiv, gameSpace); // calling the player
        this.slimes = []; // calling the slime
        // Getting the bounds of the player and slime
        this.boundsPlayer = this.player.getBounds();
        this.safePlace = safePlace
        this.boundsSafePlace = new DOMRect();
        this.gameOver = false;
        this.kills = 0;
        this.gamestarted = false;

    }



    //Collision formula
    checkCollision() {
        if (this.gameOver == false) {
            this.boundsPlayer = this.player.getBounds();
            this.boundsSafePlace = this.getBounds();

            this.slimes.forEach((slime,index) => {
                this.boundsSlime = slime.getBounds();

       
                // AABB collision detection with slime

                if (
                    this.boundsPlayer.left + 32 < this.boundsSlime.right - 50 &&
                    this.boundsPlayer.right - 32 > this.boundsSlime.left + 50 &&
                    this.boundsPlayer.top - 32 < this.boundsSlime.bottom - 50 &&
                    this.boundsPlayer.bottom - 32 > this.boundsSlime.top - 70
                ) {
                    // killing the slime
                    if (this.player.isKilling == true) {
                        this.kills++;
                        this.slimes.splice(index, 1);
                        this.gameSpace.removeChild(slime.newSlime);
                        //showing killing number
                        const killings = document.getElementById('counter');
                        killings.innerText = this.kills;

                        return; 
                    }
                    this.doSoundCollition();
                    this.player.changeDead();
                    this.doLose();
                    this.gameOver = true
                    return true;
                }
            
            })
            // AABB collision detection Player with safePlace

            if (
                this.boundsPlayer.left < this.boundsSafePlace.right - 150 &&
                this.boundsPlayer.right > this.boundsSafePlace.left + 150 &&
                this.boundsPlayer.top < this.boundsSafePlace.bottom - 50 &&
                this.boundsPlayer.bottom > this.boundsSafePlace.top - 50
            ) {
                console.log('Win!');
                this.doWin();
                this.gameOver = true
                return true;
            }

            return false;
        }
    }
    doWin() {
        // Message
        const messageBlock = document.getElementById('message-game')
        // Create an h1 element
        const h1 = document.createElement('h1');
        h1.textContent = 'You have save her!';
        h1.classList.add('h1');
        messageBlock.innerHTML = '';
        messageBlock.appendChild(h1);
        this.player.doStop();

        const h2 = document.createElement('h2');
        h2.textContent = 'Do you want to play again?';
        h2.classList.add('h2');
        messageBlock.appendChild(h2);

        // audio 
        const audio = document.createElement("audio");
        audio.src = "./assets/safePlace.wav";
        audio.volume = 0.1;
        document.body.appendChild(audio);

        // Play the audio
        audio.play()
            .then(() => console.log("Audio is playing"))
            .catch(error => console.error("Autoplay blocked:", error));

        //button
        const btn = document.createElement('button');
        btn.textContent = 'Play again!';
        btn.classList.add('BTN');
        messageBlock.appendChild(btn);
        btn.addEventListener('click', () => {
            window.location.reload();
        })

    }
    doLose() {
        const messageBlock = document.getElementById('message-game')
        // Create an h1 element
        const h1 = document.createElement('h1');
        h1.textContent = 'Game Over';
        h1.classList.add('h1');
        messageBlock.innerHTML = '';
        messageBlock.appendChild(h1);

        const h2 = document.createElement('h2');
        h2.textContent = 'Do you want to try again?';
        h2.classList.add('h2');
        messageBlock.appendChild(h2);

        // audio 
        const audio = document.createElement("audio");
        audio.src = "./assets/gameover.wav";
        audio.volume = 0.02;
        document.body.appendChild(audio);

        // Play the audio
        audio.play()
            .then(() => console.log("Audio is playing"))
            .catch(error => console.error("Autoplay blocked:", error));

        const btn = document.createElement('button');
        btn.textContent = 'Play again!';
        btn.classList.add('BTN');
        messageBlock.appendChild(btn);
        btn.addEventListener('click', () => {
            window.location.reload();
        })

    }
    prestage(){
        const messageBlock = document.getElementById('message-game')
        // Create an h1 element
        const h1 = document.createElement('h1');
        h1.textContent = 'Let\'s protect her in her sanctuary!';
        h1.classList.add('h1');
        messageBlock.innerHTML = '';
        messageBlock.appendChild(h1);

        const h2 = document.createElement('h2');
        h2.textContent = 'Be careful with the evil slime!';
        h2.classList.add('h2');
        messageBlock.appendChild(h2);

        const inst = document.createElement('p');
        inst.textContent = 'Press arrow left to start moving and arrow down to kill the slime';
        inst.classList.add('p');
        messageBlock.appendChild(inst);

    };

    start() {
        this.gameOver = false;
        let acc = 0;
        //Drop slime and check collision periodically
        const slimeAppear = setInterval(() => {
            if (acc != 8) {

                const slime = new SlimeObstacle(this.gameSpace); // calling the slime
                slime.dropSlime();
                acc++
                this.slimes.push(slime);

            } else {
                clearInterval(slimeAppear);
            }
        }, 2000);

        const gameRun = setInterval(() => {
            if (this.checkCollision()) {
                clearInterval(gameRun)
            }
        }, 50); // Check for collisions every 50ms
    }
    getBounds() {
        // Getting the left, top, right, bottom, x, y, width, and height properties in px
        this.boundsSafePlace = this.safePlace.getBoundingClientRect();
        return this.boundsSafePlace;
    }
    doSoundCollition() {
        const audio = document.createElement("audio");
        audio.src = "./assets/collitionsound.wav";
        audio.volume = 1;
        document.body.appendChild(audio);

        // Play the audio
        audio.play()
            .then(() => console.log("Audio is playing"))
            .catch(error => console.error("Autoplay blocked:", error));
    }
};

// END.

