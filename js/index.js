//declaring variables 
const fps = 20; // frames per second
const virusSize = 20; //starting size of viruses in px
const virusNum = 3; //starting number of viruses
const vaccineSize = 20; // height and width in px
const virusSpeed = 10; //starting speed
const bounding = false; 
const infecDuration = 0.3; // duration of infectation


// creating canvas
canvas  = document.querySelector('#canvas');
canvas.width = 332;
canvas.height = 238;

const context = canvas.getContext('2d');


// set up player
let player = newPlayer();

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
// const virus = {
//   x: Math.random() * canvas.width,
//   y: Math.random() * canvas.height,
//   xv: Math.floor(Math.random() * 50 + 100) / fps, // random speed between 100 and 150
//   yv: Math.floor(Math.random() * 50 + 100) / fps,
//   r: virusSize / 2,
//   size: 15,
//   speed: 10,
// };
 
let viruses = [];
createVirus();

function createVirus() {
  viruses = [];
  let x,y;
  for (let i = 0; i < virusNum; i++){
    x= Math.floor(Math.random() * canvas.width);
    y= Math.floor(Math.random() * canvas.height);
    viruses.push(newVirus(x,y));
  }
}

function newVirus(x,y) {
 let virus = {
    x:x,
    y:y,
    xv: Math.random() * virusSpeed / fps * Math.random() < 0.5 ? 1 : -1,
    yv: Math.random() * virusSpeed / fps * Math.random() < 0.5 ? 1 : -1,
    r: virusSize / 2,
    a: Math.random() * Math.PI * 2, //in radians
    r: virusSize / 2,
    size: 15,
    speed: 10,
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
  shoot : 10, // max on screen
  speed: 12,

};

function shootHandSanitizer() {
  //create hand sanitizer
  if (player.canShoot && player.handSanitizer.length < handSanitizers.shoot) {
    player.handSanitizer.push({
      x: player.x + player.width / 2, //posicao do tiro
      y: player.y,
      xv: handSanitizers.speed * Math.cos(player.a), 
      yv: -handSanitizers.speed * Math.sin(player.a),
    })
  }
  //prevent further shooting
  // player.canShoot = false;
}

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
  context.fillStyle='red';
  context.beginPath();
  context.rect(player.x, player.y, player.width, player.height);
  context.fill();
};

function vaccination() {
  context.font='30px VT323';
  context.fillStyle='#2B2B2B';
  context.fillText(`${player.vaccination}ST DOSE`,120, 50);
    
  //testing boundaries
  context.fillStyle='red';
  context.beginPath();
  context.rect(player.x, player.y, player.width, player.height);
  context.fill();
};




console.log(viruses)



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
        player = newPlayer();
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
        // const virus = {
        //   x: Math.random() * canvas.width,
        //   y: Math.random() * canvas.height,
        //   size: 15,
        // };
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

    // throw hand sanitizer
    for (let i = 0; i < player.handSanitizer.length; i++){
      player.handSanitizer[i].x += player.handSanitizer[i].xv;
      player.handSanitizer[i].y += player.handSanitizer[i].yv;
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

    // checking for virus collision
    for(let i = 0; i < viruses.length; i++) {
      if (distBetweenPoints(player.x, player.y, viruses[i].x, viruses[i].y) < (player.width + player.height) / 5 + virusSize / 2) {
        infection()
      }
    }

    // checking for vaccine collision
    if (distBetweenPoints(player.x, player.y, vaccine.x, vaccine.y) < (player.width + player.height) / 4 + vaccineSize / 2) {
      vaccination()
      player.vaccination++;     
    }


    // checking for hand sanitizer collision
    // for(let i = 0; i < handSanitizers.length; i++) {
    //   if (distBetweenPoints(handSanitizers.x, handSanitizers.y, virus.x, virus.y) < player.r / 8 + virusSize / 2) {
    //     infection()
    //   }
    // }


  }
  
    