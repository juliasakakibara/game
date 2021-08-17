class Pandemic {
    constructor(x, y, radius) {

        this.color = "rgb(" + Math.floor(Math.random() * 127 + 73) + "," + 255 + "," + Math.floor(Math.random() * 127 + 73) + ")";
        this.direction = Math.random() * Math.PI * 2;
        this.radius = radius;
        this.speed = Math.random() * 3 + 1;
        this.x = x;
        this.y = y;

    }
    updatePosition(width, height) {

        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
        } else if (this.x + this.radius > width) {
            this.x = width - this.radius;
            this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
        } else if (this.y + this.radius > height) {
            this.y = height - this.radius;
            this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
        }
    }
}


  var context = document.querySelector("canvas").getContext("2d");

  var viruses = new Array();

  let x = document.documentElement.clientWidth * 0.5;
  let y = document.documentElement.clientHeight * 0.5;

  for(let i = 0; i < 10; i ++) {

    viruses.push(new Pandemic(x, y, Math.floor(Math.random() * 10 + 20)));

  }

  function loop() {

    window.requestAnimationFrame(loop);

    let height = document.documentElement.clientHeight; //resize canvas
    let width  = document.documentElement.clientWidth; //resize canvas

    context.canvas.height = height;
    context.canvas.width = width;


    for(let i = 0; i < viruses.length; i ++) {

      let virus = viruses[i];

      context.fillStyle = virus.color;
      context.beginPath();
      context.arc(virus.x, virus.y, virus.radius, 0, Math.PI * 2);
      context.fill();

      virus.updatePosition(width, height);

    }

  }

  loop();













  //  // set up virus 
// class Pandemic {
//   constructor(x, y, r) {
//     // virus proprieties
//     this.color = "rgb(" + Math.floor(Math.random() * 127 + 73) + "," + 255 + "," + Math.floor(Math.random() * 127 + 73) + ")";
//     this.direction = Math.random() * Math.PI * 2;
//     this.speed = Math.random() * 3 + 1;
//     this.x = x;
//     this.y = y;
//     this.r = r;
//   }

//   updatePosition(width, height) {
//     //virus movement
//     this.x += Math.cos(this.direction) * this.speed;
//     this.y += Math.sin(this.direction) * this.speed;

//     //bounce off the walls
//     if (this.x - this.r < 0) {
//       this.x = this.r
//       this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
//     } else if (this.x + this.r > width) {
//         this.x = width - this.r
//         this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
//     }
//     if (this.y - this.r < 0) {
//         this.y = this.r
//         this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
//     } else if (this.y + this.r > height) {
//         this.y = height - this.r
//         this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
//     }
//   }
// }

// let viruses = new Array();

// let x = canvas.width / 2;
// let y = canvas.height / 2;

// for (let i = 0; i < viruses.length; i++) {
//   viruses.push(new Pandemic(x, y, virusSize / 2));
// }

// class Virus {
//   constructor(x, y, xv, yv, r) {

//       // this.color = "rgb(" + Math.floor(Math.random() * 127 + 73) + "," + 255 + "," + Math.floor(Math.random() * 127 + 73) + ")";
//       this.x = x;
//       this.y = y;
//       this.xv = xv;
//       this.yv = yv;
//       this.r = r;

//   }
// }  

// let virus = new Virus(Math.random() * canvas.width,Math.random() * canvas.height,Math.floor(Math.random() * 50 + 80) / fps,Math.floor(Math.random() * 50 + 80) / fps, virusSize);
// let virus2 = new Virus(Math.random() * canvas.width,Math.random() * canvas.height,Math.floor(Math.random() * 50 + 80) / fps,Math.floor(Math.random() * 50 + 80) / fps, 20);

//set up viruses
// const virus = {
//   x: Math.random() * canvas.width,
//   y: Math.random() * canvas.height,
//   xv: Math.floor(Math.random() * 50 + 80) / fps,
//   yv: Math.floor(Math.random() * 50 + 80) / fps,
//   r: virusSize,
// };
// random virus direction
// if (Math.floor(Math.random() * 2) === 0){
//   virus.xv = -virus.xv;
// }
// if (Math.floor(Math.random() * 2) === 0){
//   virus.yv = -virus.yv;
// }