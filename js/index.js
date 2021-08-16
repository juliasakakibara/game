//declaring variables 
const fps = 30; // frames per second
let virusSize = 15;
let virusX, virusY;
let xVel, yVel;
let playerSize = 50;// height in pixels

// creating canvas
const canvas  = document.querySelector('#canvas');
canvas.width = 332;
canvas.height = 238;

const context = canvas.getContext('2d');

const player = {
    speed: 10,
    x: 10,
    y: 137,
    r: playerSize / 2,
  };


// set up the game loop
setInterval(update, 1000 / fps ) 

// set up keyboard commands
document.onkeydown = (event) => {
    switch (event.key.toLowerCase()) {
        case "arrowleft":
            player.x -= player.speed;
            break;
        
        case "arrowright":
            player.x += player.speed;
            break;
        
        default:
            console.log("comando invalido");
    }
};

/* virus starting position */
 virusX = canvas.width / 2;
 virusY = canvas.height / 2;

/* random virus starting speed (pps - pixels per second) */
 xVel = Math.floor(Math.random() * 50 + 20) / fps;
 yVel = Math.floor(Math.random() * 50 + 20) / fps;

/* random virus direction */
 if (Math.floor(Math.random() * 2) === 0){
     xVel = -xVel;
 }
 if (Math.floor(Math.random() * 2) === 0){
     yVel = -yVel;
 }

function update() {
    //draw the player
    const drawPlayer = () => {
        let image = new Image;
        image.src = '../img/player1.svg'
        image.onload = (e) => {context.drawImage(image, player.x, player.y, 37, 50)}
    };
    drawPlayer();

    //clear canvas
    const clearCanvas = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };
    clearCanvas();

    //players edge of canvas
    if (player.x < 0) {
        player.x = canvas.width;
    } else if (player.x > canvas.width) {
        player.x = 0;
    }

    //draw virus
    const drawCoronga = () => {
        let image = new Image;
        image.src = '../img/coronga.svg'
        image.onload = (e) => {context.drawImage(image,virusX, virusY, virusSize, virusSize)}
    };
    drawCoronga();

    //move the virus
    virusX += xVel;
    virusY += yVel;

    //bounce the virus off each wall
    if (virusX - virusSize / 2 < 0 && xVel < 0) {
        xVel = -xVel;
    }

    if (virusX + virusSize / 2 > canvas.width && xVel > 0) {
        xVel = -xVel;
    }

    if (virusY - virusSize / 2 < 0 && yVel < 0) {
        yVel = -yVel;
    }

    if (virusY + virusSize / 2 > canvas.height && yVel > 0) {
        yVel = -yVel;
    }
}