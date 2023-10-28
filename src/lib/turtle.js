export class Turtle {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.bearing = 0;
    this.states = [];

    this.segs = [];
    this.transform = [0, 0];
  }

  resetTransform() {
    this.transform = [0, 0];
  }

  translate(dx, dy) {
    this.transform[0] += dx;
    this.transform[1] += dy;
  }

  setTransform(x, y) {
    this.transform = [x, y];
  }

  lineTo(x, y) {
    this.x = x + this.transform[0];
    this.y = y + this.transform[1];
    this.segs.at(-1).push([this.x, this.y]);
  }

  moveTo(x, y) {
    this.x = x + this.transform[0];
    this.y = y + this.transform[1];
    this.segs.push([[this.x, this.y]]);
  }

  forward(dist) {
    this.moveTo(
      this.x + Math.cos(this.bearing) * dist,
      this.y + Math.sin(this.bearing) * dist
    );
  }

  left(rad) {
    this.bearing -= rad;
  }

  right(rad) {
    this.bearing += rad;
  }

  pushState() {
    this.stack.push({
      x: this.x,
      y: this.y,
      bearing: this.bearing,
      pen: this.pen,
      transform: this.transform,
    });
  }

  popState() {
    if (this.stack.length === 0) {
      console.error("No more stack :(");
      return;
    }
    const { x, y, bearing, pen, transform } = this.stack.pop();
    this.x = x;
    this.y = y;
    this.bearing = bearing;
    this.pen = pen;
    this.transform = transform;
  }
}
