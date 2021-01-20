let snakes = [];
let count = 250;

let speed = 3;
let size = 5;

let w;
let h;

let grabDist = 30;
let grabbed = null;

let x = 0;
let y = 0;
let panSpeed = 12;
let turnSpeed = 5;

let ell = [];

this.focus();

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = width*3;
  h = height*3;
  for (let i = 0; i < count; i++)
    snakes.push(new Snake(20, floor(random(w)), floor(random(h))));
  document.body.style.overflow = 'hidden';


  for (let i = 0; i < size * 2; i++) {
    for (let j = 0; j < size * 2; j++) {
      let k = i - size;
      let l = j - size;

      let d = dis([k, l], [0, 0]);

      if (d < size / 2)
        ell.push([k, l]);
    }
  }
}

function draw() {
  background(0);
  loadPixels();
  snakes.forEach(snake => {
    snake.draw();
  });
  updatePixels();
  if (grabbed  == null) {
    if (keyIsDown(37))
      x -= panSpeed;
    if (keyIsDown(39))
      x += panSpeed;
    if (keyIsDown(40))
      y += panSpeed;
    if (keyIsDown(38))
      y -= panSpeed;
    x = (x + w) % w;
    y = (y + h) % h;
  } else {
    x = grabbed.head.x - width / 2;
    y = grabbed.head.y - height / 2;
    
    if (keyIsDown(37))
      grabbed.a -= turnSpeed;
    if (keyIsDown(39))
      grabbed.a += turnSpeed;
  }
}

function dis(p1, p2) {
  let i = p1[0] - p2[0];
  let j = p1[1] - p2[1];
  return sqrt(i * i + j * j);
}

function mousePressed() {
  let stop = false;
  snakes.forEach(snake => {
    let d = dis([(mouseX + x) % w, (mouseY + y) % h], [snake.head.x, snake.head.y]);
    if (d < grabDist && !stop) { 
      grabbed = snake;
      grabbed.ignoreTarget = true;
      stop = true;
    }
  });
  if (!stop && grabbed != null) {
    grabbed.ignoreTarget = false; 
    grabbed = null;
  }
}

function drawEllipse(X, Y, c) {
  if (X > 0 && X < width && Y > 0 && Y < height) {
    for (let j = 0; j < ell.length; j++) {
      let k = X + ell[j][0];
      let l = Y + ell[j][1];

      let i = (round(k) + round(l) * width) * 4;

      pixels[i    ] = c[0];
      pixels[i + 1] = c[1];
      pixels[i + 2] = c[2];
      pixels[i + 3] = 255;
    }
  }
}
