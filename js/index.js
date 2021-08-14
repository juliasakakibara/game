const canvas  = document.querySelector('#canvas');
 canvas.width = 332;
 canvas.height = 238;
 
const context = canvas.getContext('2d');

// window.onload = () => {
//     let img = new Image();
//     img.src = '/img/player1.svg'
//     context.drawImage(img, 0, 137, 40, 50);
//   };


// const playerImage = () => {
//     let img = new Image();
//     img.src = '/img/player1.svg'

// }

const player = {
    speed: 8,
    playerImage: '/img/player1.svg'

};

// player.playerImage.onload();
  
const drawPlayer = () => {
//   context.drawImage(player, 0, 137, 40, 50);
} 

  const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  
  setInterval(() => {
    clearCanvas();
    drawPlayer();
  }, 10);
  
  document.onkeydown = (event) => {
    switch (event.key.toLocaleLowerCase()) {
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

