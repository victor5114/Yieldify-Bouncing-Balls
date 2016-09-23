/**
* @class Point
* @description Simple Point class definition
* @constructor {Number} x - X coordinate in canvas
* @constructor {Number} y - Y coordinate in canvas
*/
export default class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
  * @function computeAngle
  * @description Compute angle between two points in radian
  * @param {Point} p1 - point 1
  * @param {Point} p2 - point 2
  * @return {Number} angle (rad)
  */
  static computeAngle(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  }

  /**
  * @function computeAngle
  * @description Compute angle between two points in degree
  * @param {Point} p1 - point 1
  * @param {Point} p2 - point 2
  * @return {Number} angle (deg)
  */
  static computeAngleDeg(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
  }

  /**
  * @function euclideanDistance
  * @description Compute angle from the point in ctx
  * @param {Point} p - point
  * @return {Number} Euclidean distance
  */
  euclideanDistance(p) {
    return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
  }
}
