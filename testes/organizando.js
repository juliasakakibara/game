//declaring variables 
const fps = 30; // frames per second
const virusSize = 20; //starting size of viruses in px
const virusNum = 3; //starting number of viruses
const vaccineSize = 20; // height and width in px
const virusSpeed = 80; //starting speed
const bounding = false; 
const infecDuration = 0.3; // duration of infectation
const handSanDist = 0.38; // hand sanitizer distance

const textSize = 40; // font size
const txtFade = 2; // txt fade

const gameLives = 1; //starting game lives


// creating canvas
canvas  = document.querySelector('#canvas');
canvas.width = 332;
canvas.height = 238;

const context = canvas.getContext('2d');


// set up game
let level, viruses, player, text, txtAlpha, lives;
newGame();

function newGame() {
  lives = gameLives;
  level = 0;
  player = newPlayer();
  newLevel();
}





// set up player
function newPlayer() {
  return {
    speed: 30, // px per second
    x: 290, // position in x
    y: 137, //position in y
    r: 50 / 2, // radius in px
    a: 90 / 180 * Math.PI, //players angle for shooting
    width: 37, // players width
    height: 50, // players height
    canShoot: true,
    handSanitizer: [],
    infectionTime: 0,
    vaccination: [],
  }
}
  
// set up virus
function createVirus() {
  viruses = [];
  let x,y;
  for (let i = 0; i < virusNum + level; i++){
    x= Math.floor(Math.random() * canvas.width);
    y= Math.floor(Math.random() * canvas.height);
    viruses.push(newVirus(x,y));
  }
}

function newVirus(x,y) {
 let levelMult = 1 + 0.1 * level;
 let virus = {
    x:x,
    y:y,
    xv: Math.random() * virusSpeed * levelMult / fps * (Math.random() < 0.5 ? 1 : -1),
    yv: Math.random() * virusSpeed * levelMult / fps * (Math.random() < 0.5 ? 1 : -1),
    a: Math.random() * Math.PI * 2, //in radians
    r: virusSize / 2,
    size: 20,
    dead: false,
 }
 return virus
};


//set up vaccines
const vaccine = {
  speed: 3,
  x: Math.random() * canvas.width,
  y: 0,
};

//set up hand sanitazer
const handSanitizers = {
  shoot : 6, // max on screen
  speed: 12,
  maxDist: 0.5, // mas dist shot can travel
};

function shootHandSanitizer() {
  //create hand sanitizer
  if (player.canShoot && player.handSanitizer.length < handSanitizers.shoot) {
    player.handSanitizer.push({
      x: player.x + player.width / 2, //posicao do tiro
      y: player.y,
      xv: handSanitizers.speed * Math.cos(player.a), //direcao do tiro
      yv: -handSanitizers.speed * Math.sin(player.a),
      dist: 0,
    })
  }
  //prevent further shooting
  //  player.canShoot = false;
}


// set up hearts
const hearts = {
  x: 10,
  y: 10,
  width: 15,
  height: 12,
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


function distBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function infection() {
  player.infectionTime = Math.floor(infecDuration * fps)

  //testing boundaries
  // context.fillStyle='red';
  // context.beginPath();
  // context.rect(player.x, player.y, player.width, player.height);
  // context.fill();
};

function vaccination() {
  context.font='30px VT323';   
  context.fillStyle='#2B2B2B';
  context.fillText(`${player.vaccination}ST DOSE`,120, 50);
    
  //testing boundaries
  // context.fillStyle='red';
  // context.beginPath();
  // context.rect(player.x, player.y, player.width, player.height);
  // context.fill();
};


function gameOver(){
  player.dead = true;
  text = 'Game Over'
  txtAlpha = 1;
}



function update() {

    let colliding = player.infectionTime > 0;

    //draw the player
    if(!colliding){
      const drawPlayer1 = () => {
        let image = new Image;
        image.src = '../img/player1.svg'
        image.onload = (e) => {context.drawImage(image, player.x, player.y, player.width, player.height)} 
        }
      drawPlayer1();
      } else { // else {blink and return to the staring position};
        if (infection === 0){
          lives--;
          if (lives === 0){
            gameOver();
          }else {
            player = newPlayer();
          }
        }  
      } 
    

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
    for(let i = 0; i < viruses.length; i ++) {
      
    //draw virus
    const drawVirus = (virus) => {
        let image = new Image;
        image.src = '../img/coronga.svg'
        image.onload = (e) => {context.drawImage(image, virus.x, virus.y, virus.size, virus.size)}
    };
    drawVirus(viruses[i]);
    

    //move the virus
    if(!colliding){
      viruses[i].x += viruses[i].xv;
      viruses[i].y += viruses[i].yv;
    }
    //bounce the viruses[i] off each wall
      if (viruses[i].x - viruses[i].size / 2 < 0 && viruses[i].xv < 0) {
          viruses[i].xv = -viruses[i].xv;}
  
      if (viruses[i].x + viruses[i].size / 2 > canvas.width && viruses[i].xv > 0) {
          viruses[i].xv = -viruses[i].xv;}
  
      if (viruses[i].y - viruses[i].size / 2 < 0 && viruses[i].yv < 0) {
          viruses[i].yv = -viruses[i].yv;}
  
      if (viruses[i].y + viruses[i].size / 2 > canvas.height && viruses[i].yv > 0) {
          viruses[i].yv = -viruses[i].yv;}
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
      context.arc(player.handSanitizer[i].x, player.handSanitizer[i].y, player.r / 10, 45, Math.PI * 2, false);
      
      context.fill();
    }

    // detect when hand sannitizer hits virus
    let virX, virY, virR, hsX, hsY;
    for (let i = viruses.length -1; i  >= 0; i--){
      //virus prop
      virX = viruses[i].x;
      virY = viruses[i].y;
      virR = viruses[i].size;

      //loop over the hs
      for (let j = player.handSanitizer.length -1; j  >= 0; j--){

        //hs prop
        hsX = player.handSanitizer[j].x;
        hsY = player.handSanitizer[j].y;

        //detect hits
        if (distBetweenPoints(hsX, hsY, virX, virY) < virR){
          //remove hand sinitizer
          player.handSanitizer.splice(j, 1);

          //remove virus
          viruses.splice(i, 1);

          //new level when there is no more viruses
          if(viruses.length === 0) {
            level++;
            newLevel();
          }
          break;
        }
      }
    }


    // throw hand sanitizer
    for (let i = player.handSanitizer.length -1; i  >= 0; i--){
      //check dist travelled
      if(player.handSanitizer[i].dist > handSanDist * canvas.width) {
        player.handSanitizer.splice(i,1);
        continue;
      }

      // move handsanitizer
      player.handSanitizer[i].x += player.handSanitizer[i].xv;
      player.handSanitizer[i].y += player.handSanitizer[i].yv;

      // distance hand sanitizer travel
      player.handSanitizer[i].dist += Math.sqrt(Math.pow(player.handSanitizer[i].xv, 2) + Math.pow(player.handSanitizer[i].yv, 2))
      
      // edge  off the screen
      if (player.handSanitizer[i].x <0){
        player.handSanitizer[i].x = canvas.width;
      } else if (player.handSanitizer[i].x > canvas.width){
        player.handSanitizer[i].x = 0;
      }

      if (player.handSanitizer[i].y <0){
        player.handSanitizer[i].y = canvas.height;
      } else if (player.handSanitizer[i].y > canvas.height){
        player.handSanitizer[i].y = 0;
      }
    }

    // draw games text
    if (txtAlpha >= 0){
      context.fillStyle=`rgba(43, 43, 43, ${txtAlpha})`;
      context.font='40px VT323';   
      context.textAlign='center';
      context.textBaseline='center';
      context.fillText(`Level ${level + 1}`,canvas.width / 2, canvas.height / 3);
      txtAlpha -= (1 / txtFade / fps);
    }

    //draw hearts
    for (let i = 0; i < lives; i++){
      function drawHearts (heart){
        let image = new Image;
        image.src = '../img/full-heart.svg';
        image.onload = (e) => {context.drawImage(image, hearts.x, hearts.y, hearts.width, hearts.height)};
        }
        drawHearts(hearts[i]);
    }
    

    //players boundaries
    if (bounding) {
      context.strokeStyle='red';
      context.beginPath();
      context.rect(player.x, player.y, player.width, player.height);
      context.stroke();
    }
    
    //virus boundaries
    if (bounding) {
      context.strokeStyle='red';
      context.beginPath();
      context.arc(virus.x+ virus.size / 2, virus.y + virus.size / 2, virus.size / 2, 0, Math.PI  * 2, false);
      context.stroke();
    }
  

    //vaccine boundaries
    if (bounding) {
      context.strokeStyle='red';
      context.beginPath();
      context.rect(vaccine.x, vaccine.y, vaccineSize, vaccineSize);
      context.stroke();
    }

    // checking for virus collision - loop no virus tb
    for(let i = 0; i < viruses.length; i++) {
      if (distBetweenPoints(player.x, player.y, viruses[i].x, viruses[i].y) < (player.width + player.height) / 5 + virusSize / 4) {
        infection()
      }
    }

    // checking for vaccine collision
    if (distBetweenPoints(player.x, player.y, vaccine.x, vaccine.y) < (player.width + player.height) / 4 + vaccineSize / 2) {
      vaccination()
      player.vaccination++;     //splice
      
    }


    // checking for hand sanitizer collision
    // for(let i = 0; i < handSanitizers.length; i++) {
    //   if (distBetweenPoints(handSanitizers.x, handSanitizers.y, virus.x, virus.y) < player.r / 8 + virusSize / 2) {
    //     infection()
    //   }
    // }


  }
