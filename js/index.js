//   context.drawImage(player, 0, 137, 40, 50);
//   context.drawImage(player.playerImg,10, 137, 37, 50);




// ------- CANVAS ------- //

const canvas  = document.querySelector('#canvas');
 canvas.width = 332;
 canvas.height = 238;
 
const context = canvas.getContext('2d');




// ------- PLAYER E MOVIMENTO ------- //

/*criando e posicionando o player*/
  const player = {
    playerImg: document.querySelector('#player'),
    speed: 8,
    x: 10,
    y: 137
  };


  /* movimenta o player */
  const drawPlayer = () => {
    context.drawImage(player.playerImg, player.x, player.y, 37, 50);
  };


/* limpa o canvas */
  const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  

  /* atualiza o canvas com a posicao do player */
  setInterval(() => {
    clearCanvas();
    drawPlayer();
  }, 10);


  /* movimento do player */
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


//declaring variables
    const fps = 30;
    let ballSize = 20;
    let ballX, ballY;
    let xVel, yVel;

// setting interval (game loop))
    setInterval(update, 200) /*calls something(func) every certain amount of time*/

//ball starting position

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

// random ball starting speed (pps - pixels per second)
    xVel = Math.floor(Math.random() * 101 + 10) / fps;
    yVel = Math.floor(Math.random() * 101 + 10) / fps;

//random ball direction
    if (Math.floor(Math.random() * 2) === 0){
        xVel = -xVel;
    }
    if (Math.floor(Math.random() * 2) === 0){
        yVel = -yVel;
    }

// update function 
    function update() {
        //move the ball
        ballX += xVel;
        ballY += yVel;

        //bounce the ball off each wall
        if (ballX - ballSize / 2 < 0 && xVel < 0) {
            xVel = -xVel;
        }

        if (ballX + ballSize / 2 > canvas.width && xVel > 0) {
            xVel = -xVel;
        }

        if (ballY - ballSize / 2 < 0 && yVel < 0) {
            yVel = -yVel;
        }

        if (ballY + ballSize / 2 > canvas.height && yVel > 0) {
            yVel = -yVel;
        }


        //draw background and ball
        context.fillStyle='green';
        context.fillRect(ballX - ballSize / 2, ballY - ballSize / 2 ,ballSize,ballSize)
        
        
        
        
        
        
    }