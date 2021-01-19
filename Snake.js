class Snake {
  constructor(length, x, y) {
    this.body = [];
    for (let i = 0; i < length; i++) {
      this.body.push(new Segment());
    }
    this.head = this.body[0];
    this.head.x = x;
    this.head.y = y;
    this.a = random(TWO_PI);
    this.c = [floor(random(255)), floor(random(255)), floor(random(255))];
    this.target = this.rTarget();
  }
  draw() {

    this.head.x += cos(this.a) * speed;
    this.head.y += sin(this.a) * speed;
    
    this.head.x += w;
    this.head.x %= w;    
    this.head.y += h;
    this.head.y %= h;
    
    fill(this.c);
    stroke(this.c);
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].update(this.body[i - 1]);
      for (let j = -1; j < 2; j++) {
        for (let k = -1; k < 2; k++) {
          drawEllipse(this.body[i].x - x - w * j, this.body[i].y - y - w * k, this.c);
        }
      }     
    }
    drawEllipse(this.head.x - x, this.head.y - y, this.c);
     
    if (abs(this.head.x - this.target[0]) < 10 && abs(this.head.y - this.target[1]) < 10) {
      this.target = this.rTarget();
    }
    this.a += (atan2(this.target[1] - this.head.y, this.target[0] - this.head.x) - this.a) / 5;
    this.a += sin(frameCount) * 0.5;
  }
  rTarget() {
    return [random(w), random(h)];
  }
}