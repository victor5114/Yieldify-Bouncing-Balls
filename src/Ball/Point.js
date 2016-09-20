export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static computeAngle(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  }

  static computeAngleDeg(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
  }

  euclideanDistance(p) {
    return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
  }
}
