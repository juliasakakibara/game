//   context.drawImage(player, 0, 137, 40, 50);
//   context.drawImage(player.playerImg,10, 137, 37, 50);




// ------- CANVAS ------- //

const canvas  = document.querySelector('#canvas');
 canvas.width = 332;
 canvas.height = 238;
 
const context = canvas.getContext('2d');




// ------- PLAYER ------- //

/* player's creation and positioning */
  const player = {
    playerImg: document.querySelector('#player'),
    speed: 10,
    x: 10,
    y: 137
  };


  /* player on canvas */
  const drawPlayer = () => {
    context.drawImage(player.playerImg, player.x, player.y, 37, 50);
  };


  /* canvas cleanser */
  const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  

  /* calls the function every x time*/
  setInterval(() => {
    clearCanvas();
    drawPlayer();
  }, 5);


  /* comamnds */
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


  // ------- BOUNCING CORONA ------- //


/* declaring variables */
    const fps = 40;
    let virusSize = 15;
    let virusX, virusY;
    let xVel, yVel;

/* setting interval (game loop)*/
    setInterval(update, 5) 

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

 /* update function */
    function update() {

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

        //draw background and virus
        const coronga = document.querySelector('#coronga')
        context.drawImage(coronga, virusX, virusY, virusSize, virusSize);
    }