class Segment {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }
  update(prevSeg) { 
    this.x = prevSeg.x;
    this.y = prevSeg.y;
  }
}