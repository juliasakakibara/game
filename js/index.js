

//declaring variables 
const fps = 20; // frames per second
const virusNum = 3; // starting number of viruses
const virusSize = 20; // starting size of viruses
const virusSpeed = 50; // max starting speed of viruses
const bounding = false; //show or hide collision bounding
const sickDuration = 0.3 //durantion of getting sick
const invisDuration = 3; // invisibility during death
const blinkDuration = 0.1; // blink during invisibility 
const maxHandSanitizer = 6 //max num of shots on screen
const handSanDist = 0.38; // hand sanitizer distance
const txtFade = 2; // txt fade
const gameLives = 3; //starting game lives
const heartSize = 15;

let isGameOver = false;


// creating canvas
canvas  = document.querySelector('#canvas');
canvas.width = 333;
canvas.height = 238;

const context = canvas.getContext('2d');

// set up the game loop
setInterval(() => {
  if (isGameOver) {
    // createBtn();
    return gameOver();
  }
  return update();
},1000 / fps) 


// function createBtn() {
//   const btn = document.createElement('button');
//   btn.innerText = 'Restart';
//   btn.addEventListener('click', newGame)
//   btn.classList.add('restart-btn');
//   document.body.appendChild(btn) 
// }


// set up game
let level, viruses, player, text, txtAlpha;
newGame();

function newGame() {
  lives = gameLives;
  level = 0;
  player = newPlayer();
  newLevel();

}

function newLevel() {
  txtAlpha = 1;
  createPandemic();  
}

function gameOver() {
  context.fillStyle=`rgba(43, 43, 43, ${txtAlpha})`;
  context.font='50px VT323';   
  context.textAlign='center';
  context.textBaseline='center';
  context.fillText(`GAME OVER`,canvas.width / 2, canvas.height / 3);
  txtAlpha -= (1 / txtFade / fps);

  player.dead = true;
  txtAlpha = 1;
  // newGame();

}





//set up player
function newPlayer() {
  return {
      x: 290, // position in x
      y: 137, //position in y
      width: 37, // players width
      height: 50, // players height
      r: 50 / 2, // radius in px
      a: 90 / 180 * Math.PI, // player direction converted in radians
      speed: 30, // px per second
      collision: 0, // collision  
      blinkTime: Math.floor(blinkDuration * fps),
      blinkNum: Math.floor(invisDuration / blinkDuration),
      canShoot: true,
      handSanitizer: [],
      dead: false,

  }
} 

function getSick() { 
  player.collision =  Math.floor(sickDuration* fps)
  // context.fillStyle='red';
  // context.beginPath();
  // context.rect(player.x, player.y, player.width, player.height);
  // context.fill();
};

//set up virus
function createPandemic(){
  viruses= [];
  let x,y;
  for (let i = 0; i < virusNum + level; i++){
    do {
    x= Math.floor(Math.random() * canvas.width);
    y= Math.floor(Math.random() * canvas.height);
  } while (distBetweenPoints(player.x, player.y, x, y) < virusSize * 4 + player.r); //not to start with viruses close to the player
    viruses.push(newVirus(x,y, Math.ceil(virusSize / 4)));
  };
};

function newVirus(x,y,r) {
  let levelMult = 1 + 0.1 * level;
  let virus = {
    x: x,
    y: y,
    xv: Math.random() * virusSpeed * levelMult / fps * (Math.random() < 0.5 ? 1 : -1),
    yv: Math.random() * virusSpeed * levelMult / fps * (Math.random() < 0.5 ? 1 : -1),
    r: virusSize / 2,
    a: Math.random() * Math.PI * 2, //converted in radians
    size: virusSize,
    }
  return virus
};

function destroyVirus(index) {
  let x = viruses[index].x;
  let y = viruses[index].y;
  let r = viruses[index].r;

  //split virus ???????
  if(r === Math.ceil(virusSize / 4)) {
    viruses.push(newVirus(x, y, Math.floor(virusSize / 8)))
    viruses.push(newVirus(x, y, Math.floor(virusSize / 8)))
  } else {
    viruses.splice(index, 1);

    //new level
    if(viruses.length === 0) {
      level++;

      context.fillStyle=`rgba(43, 43, 43, ${txtAlpha})`;
      context.font='40px VT323';   
      context.textAlign='center';
      context.textBaseline='center';
      context.fillText(`Level ${level + 1}`,canvas.width / 2, canvas.height / 3);
      txtAlpha -= (1 / txtFade / fps);

      newLevel();
    }
  }
  
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


function distBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

//set up keyboard commands
document.onkeydown = (event) => {
  switch (event.key.toLowerCase()) {
    case "arrowleft": //move player left
      player.x -= player.speed;
      break;
      
    case "arrowright"://move player right
      player.x += player.speed;
      break;

    case " ": //shoot hand sanitizer
        shootHandSanitizer();
        break;

    default:
      console.log("comando invalido");
  };
};





function update() {
  let gettingSick = player.collision > 0;
  let blinkOn = player.blinkNum % 2 === 0;


  if(!gettingSick) {
    if(blinkOn){
      //draw player
      const drawPlayer1 = () => {
        let image = new Image;
        image.src = '../img/player1.svg';
        image.onload = (e) => {context.drawImage(image, player.x, player.y, player.width, player.height)} 
        }
      drawPlayer1();
    }
    //blinkoff
    if (player.blinkNum > 0) {
      //reduce blink time
      player.blinkTime--;

      //reduce blink num
      if (player.blinkTime === 0){
        player.blinkTime = Math.ceil(blinkDuration * fps);
        player.blinkNum--;        
      }
    }

  } else {
    //dead player
    const drawPlayer1 = () => {
      let image = new Image;
      image.src = '../img/player1MORTO.svg';
      image.onload = (e) => {context.drawImage(image, player.x, player.y, player.width, player.height)} 
      }
    drawPlayer1();
    player.speed = 0

  }


  //clear canvas
  const clearCanvas = () => {context.clearRect(0, 0, canvas.width, canvas.height);};
  clearCanvas();

  if(!gettingSick) {
      if(player.blinkNum === 0){

      //check for collisions
      for(let i = 0; i < viruses.length; i++) {
        if (distBetweenPoints(player.x + player.width/2, player.y + player.height/2, viruses[i].x, viruses[i].y) < (player.width/2 + player.height) / 3 + virusSize / 4) {
          getSick()
        }
      }
    } 
  }  else {
    player.collision--;

    if(player.collision === 0){
      lives--;
      if( lives === 0){
        isGameOver = true;
      }else {
        player = newPlayer();        
      }
    }
  }

  //players edge of canvas
  if (player.x < 0 - player.r) {
    player.x = canvas.width + player.r;
  } else if (player.x > canvas.width + player.r) {
    player.x = 0 - player.r;
  };
  
  //players boundaries
  if (bounding) {
    context.strokeStyle='red';
    context.beginPath();
    context.rect(player.x, player.y, player.width, player.height);
    context.stroke();
  }

  //draw virus
  for(let i = 0; i < viruses.length; i ++) {

    //viruses boundaries
    if (bounding) {
      context.strokeStyle='red';
      context.beginPath();
      context.arc(viruses[i].x + viruses[i].r, viruses[i].y + viruses[i].r, viruses[i].size, 0, Math.PI / 180 * 2, false);
      context.stroke();
    }

    const drawVirus = (virus) => {
      let image = new Image;
      image.src = '../img/coronga.svg'
      image.onload = (e) => {context.drawImage(image, virus.x, virus.y, virus.size, virus.size)}
    };
    drawVirus(viruses[i]);
  };
 
  for(let i = 0; i < viruses.length; i ++) {
    //move the virus
    viruses[i].x += viruses[i].xv;
    viruses[i].y += viruses[i].yv;

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
        destroyVirus(i);

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

  
  //draw the lives
  
  const drawHeart = (positionX) => {
    let image = new Image;
    image.src = '../img/full-heart.svg';
    image.onload = (e) => {context.drawImage(image, 10 + positionX * 20, 10, 15, 12)}
  };

  for (let i = 0; i < lives; i++) {
    drawHeart(i);    
  };

};