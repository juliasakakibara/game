//declaring variables 
const fps = 20; // frames per second
const virusSize = 15; //starting size of viruses in px
const virusNum = 3; //starting number of viruses
const vaccineSize = 20; // height and width in px


// creating canvas
const canvas  = document.querySelector('#canvas');
canvas.width = 332;
canvas.height = 238;

const context = canvas.getContext('2d');


// set up player
const player = {
    speed: 20, // px per second
    x: 290, // position in x
    y: 137, //position in y
    r: 50, // radius in px
    a: 90 / 180 * Math.PI,
    width: 37, // players width
    height: 50, // players height
    canShoot: true,
    handSanitizer: [],
  };

  

//set up viruses
const virus = {
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  xv: Math.floor(Math.random() * 150) / fps,
  yv: Math.floor(Math.random() * 150) / fps,
  r: virusSize,
};


// random virus direction
if (Math.floor(Math.random() * 2) === 0){
  virus.xv = -virus.xv;
}
if (Math.floor(Math.random() * 2) === 0){
  virus.yv = -virus.yv;
}


//set up vaccines
const vaccine = {
  speed: 3,
  x: Math.random() * canvas.width,
  y: 0,
};

//set up hand sanitazer
const handSanitizers = {
  shoot : 10, // max shoots on screen
  speed: 10,
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

        case " ": //shoot hand sanitizer
            shootHandSanitizer();
            break;

        default:
            console.log("comando invalido");
    }
};

function shootHandSanitizer() {
  //create hand sanitizer
  if (player.canShoot && player.handSanitizer.length < handSanitizers.shoot) {
    player.handSanitizer.push({
      x: player.x + player.width / 2, //posicao do shot
      y: player.y,
      xv: handSanitizers.speed * Math.cos(player.a),
      yv: -handSanitizers.speed * Math.sin(player.a),
      //xv: -handSanitizers.speed / fps, //direcao do shoot
      //yv: -handSanitizers.speed / fps, 
    })
  }
  //prevent further shooting
  // player.canShoot = false;
}

function update() {

    //draw the player
    const drawPlayer = () => {
        let image = new Image;
        image.src = '../img/player1.svg'
        image.onload = (e) => {context.drawImage(image, player.x, player.y, player.width, player.height)} 
    };
    drawPlayer();

    //clear canvas
    const clearCanvas = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };
    clearCanvas();

    //players edge of canvas
    if (player.x < 0 - player.r) {
        player.x = canvas.width + player.r;
    } else if (player.x > canvas.width + player.r) {
        player.x = 0 - player.r;
    }

    //draw viruses
    const drawCoronga = () => {
      let image = new Image;
      image.src = '../img/coronga.svg'
      image.onload = (e) => {context.drawImage(image,virus.x, virus.y, virusSize, virusSize)}
    };
    drawCoronga();

    //move the virus
      virus.x += virus.xv;
      virus.y += virus.yv;
  
    //bounce the virus off each wall
      if (virus.x - virusSize / 2 < 0 && virus.xv < 0) {
          virus.xv = -virus.xv;
      }
  
      if (virus.x + virusSize / 2 > canvas.width && virus.xv > 0) {
          virus.xv = -virus.xv;
      }
  
      if (virus.y - virusSize / 2 < 0 && virus.yv < 0) {
          virus.yv = -virus.yv;
      }
  
      if (virus.y + virusSize / 2 > canvas.height && virus.yv > 0) {
          virus.yv = -virus.yv;
      }

    // draw vaccine
    const drawVaccine = () => {
      let image = new Image;
      image.src = '../img/vaccine.svg'
      image.onload = (e) => {context.drawImage(image, vaccine.x, vaccine.y, vaccineSize, vaccineSize)}
    };
    drawVaccine();

    //falling vaccines
    vaccine.y += vaccine.speed;

    // draw hand sanitizer
    for (let i = 0; i < player.handSanitizer.length; i++){
      context.fillStyle='blue';
      context.beginPath();
      context.arc(player.handSanitizer[i].x, player.handSanitizer[i].y, player.r / 15, 45, Math.PI * 2, false);
      
      context.fill();
            
    }

    // throw hand sanitizer
    for (let i = 0; i < player.handSanitizer.length; i++){
      player.handSanitizer[i].x += player.handSanitizer[i].xv;
      player.handSanitizer[i].y += player.handSanitizer[i].yv;
    }
}

