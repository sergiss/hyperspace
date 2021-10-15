 const STARS = 200;
 const SPEED = 15;
  
  const Star = function (x, y) {
    this.x = x;
    this.y = y;
    this.v = 0;
    this.speed = SPEED;

    this.render = function (ctx, x, y, radius) {
      let dx = this.x - x;
      let dy = this.y - y;
      let len = dx * dx + dy * dy;
      let nx, ny;
      if (len != 0) {        
        len = Math.sqrt(len);   
        if(len > radius) {
          return false;
        }
        nx = dx / len;
        ny = dy / len;        
      } else {
        nx = 1;
        ny = 0;
      }
      let tmpX = this.x;
      let tmpY = this.y;

      let w = (len / radius);
      this.x += nx * this.speed * w;
      this.y += ny * this.speed * w;
          
      ctx.strokeStyle = "#FFF";
      ctx.beginPath();      
      ctx.moveTo(tmpX, tmpY);     
      ctx.lineTo(this.x, this.y);
      ctx.lineWidth = w * 2.5;
      ctx.stroke();
      return true;
    };
  }

  const Hyperspace = function(canvas) {

  }

  var el = document.querySelector(".not_found");

  var canvas = el.querySelector("canvas");
  canvas.width  = 640;
  canvas.height = 480;

  let ctx = canvas.getContext("2d");
  el.appendChild(canvas);
  let stars = [];
  let loop = function () {
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    while (stars.length < STARS) {
      stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height));
    }
    for (let i = 0; i < stars.length; ++i) {
      if (!stars[i].render(ctx, canvas.width * 0.5, canvas.height * 0.5, 380)) {
        stars.splice(i--, 1);
      } 
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);