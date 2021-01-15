let snakes = [];
let count = 25;

let speed = 5;
let size = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < count; i++) 
    snakes.push(new Snake(20, width/2, height/2));
}

function draw() {
  background(0);
  snakes.forEach(snake => {
    snake.draw();
  });
}