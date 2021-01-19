class Segment {
  constructor() {
    this.x = w / 2;
    this.y = h / 2;
  }
  update(prevSeg) { 
    this.x = prevSeg.x;
    this.y = prevSeg.y;
  }
}