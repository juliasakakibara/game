//   context.drawImage(player, 0, 137, 40, 50);
//   context.drawImage(player.playerImg,10, 137, 37, 50);
const canvas  = document.querySelector('#canvas');
 canvas.width = 332;
 canvas.height = 238;
 
const context = canvas.getContext('2d');


  const player = {
    playerImg: document.querySelector('#player'),
    speed: 8,
    x: 10,
    y: 137
  };

  const drawPlayer = () => {
    context.drawImage(player.playerImg, player.x, player.y, 37, 50);
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  
  setInterval(() => {
    clearCanvas();
    drawPlayer();
  }, 10);
  
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

