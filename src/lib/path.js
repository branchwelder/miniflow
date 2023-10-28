export class Path {
  constructor(segments = []) {
    this.segments = segments;
    this.transform = [0, 0];
  }

  moveTo(x, y) {
    this.segments.push([[x, y]]);
  }

  lineTo(x, y) {
    this.segments.at(-1).push([x, y]);
  }

  translate(dx, dy) {
    return new Path(
      this.segments.map((segment) => segment.map(([x, y]) => [x + dx, y + dy]))
    );
  }

  scale(sx, sy) {
    return new Path(
      this.segments.map((segment) => segment.map(([x, y]) => [x * sx, y * sy]))
    );
  }

  draw(ctx) {
    let p = new Path2D();

    this.segments.forEach((segment) => {
      if (segment.length < 2) return;
      p.moveTo(segment[0][0], segment[0][1]);
      segment.slice(1).forEach(([x, y]) => p.lineTo(x, y));
    });

    ctx.stroke(p);
  }
}
