// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var img = new Image(200, 200);
img.src = 'spencer_crop_large.png';
var imgMatt = new Image(72, 85);
imgMatt.src = 'matt_crop.png';
var imgWill = new Image(70, 82);
imgWill.src = 'will_crop.png';
var imgCollin = new Image(70, 93);
imgCollin.src = 'collin_crop.png';
var audio = new Audio('Your_Mom-Kevan.mp3');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  var num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// define Shape constructor

function Shape(x, y, velX, velY, exists, image) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
  this.image = image;
  this.rotate = 0;
}

// define EvilCircle constructor
function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists, img);

  // this.color = "white";
  this.size = 100;
}

EvilCircle.prototype = Object.create(Shape.prototype);

// define EvilCircle draw method

EvilCircle.prototype.draw = function () {
  // ctx.beginPath();
  // ctx.strokeStyle = this.color;
  // ctx.lineWidth = 3;
  // ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  // ctx.stroke();
  this.rotate += 1;
  ctx.translate(this.x + this.size, this.y + this.size);
  ctx.rotate(this.rotate * Math.PI / 180);
  ctx.translate(-1 * (this.x + this.size), -1 * (this.y + this.size));
  ctx.drawImage(this.image, this.x, this.y);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// define EvilCircle checkBounds method

EvilCircle.prototype.checkBounds = function () {
  if (this.x + this.size >= width) {
    this.x = this.x - this.size;
  }

  if (this.x - this.size <= 0) {
    this.x = this.size;
  }

  if (this.y + this.size >= height) {
    this.y = this.y - this.size;
  }

  if (this.y - this.size <= 0) {
    this.y = this.size;
  }
}

// define EvilCircle setControls method

EvilCircle.prototype.setControls = function () {
  var _this = this; // allows us to refer to EvilCircle while in window's onkeydown event handler
  window.onkeydown = function (e) {
    if (e.keyCode === 65) { // key press is "a"
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) { // key press is "d"
      _this.x += _this.velX;
    } else if (e.keyCode === 87) { // key press is "w"
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) { // key press is "s"
      _this.y += _this.velY;
    }
  }
}

// define EvilCircle collisionDetect method

EvilCircle.prototype.collisionDetect = function () {
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      var dx = this.x - balls[i].x;
      var dy = this.y - balls[i].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[i].size) {
        balls[i].exists = false;
        audio.play();
        score--;
      }

    }
  }
}

// define Ball constructor

function Ball(x, y, velX, velY, exists, color, size, image) {
  Shape.call(this, x, y, velX, velY, exists, image);

  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
// define ball draw method

Ball.prototype.draw = function () {
  this.rotate += 1;
  ctx.translate(this.x + this.size, this.y + this.size);
  ctx.rotate(this.rotate * Math.PI / 180);
  ctx.translate(-1 * (this.x + this.size), -1 * (this.y + this.size));
  ctx.drawImage(this.image, this.x, this.y);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
};

// define ball update method

Ball.prototype.update = function () {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function () {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
    }
  }
};

// define array to store balls

var balls = [];
var evilCircle = new EvilCircle(50, 50, true);
evilCircle.setControls();
var score = 0;

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < 30) {
    var size = 43
    var ball1 = new Ball(
      // ball position always drawn at least one ball width
      // away from the adge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-4, 4),
      random(-4, 4),
      true,
      'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
      size,
      imgWill
    );

    var ball2 = new Ball(
      // ball position always drawn at least one ball width
      // away from the adge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      true,
      'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
      size,
      imgMatt
    );

    var ball3 = new Ball(
      // ball position always drawn at least one ball width
      // away from the adge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      true,
      'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
      size,
      imgCollin
    );
    balls.push(ball1);
    balls.push(ball2);
    balls.push(ball3);
    score++;
  }



  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  for (var i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  requestAnimationFrame(loop);
}



loop();
