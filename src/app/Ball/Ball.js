import { sample } from 'lodash';
import inherit from '../utils/inherit';
import UniqueObject from '../utils/mixins/uniqueObject';
import { ImageFlyweightFactory, randomImagePicker } from './ImageManager';
import Point from './Point';

const G_FORCE = 9.81; // Gravitionnal force value

/**
* @class BallClass
* @extends UniqueObject, (... potentially other classes)
* @description Ball class used by UI to render moving ball shaped
* @constructor {Number} x - X coordinate in canvas
* @constructor {Number} y - Y coordinate in canvas
* @constructor {String} ImageType - Image's type
* @constructor {Object} opts - Options
*/
export default class BallClass extends inherit(UniqueObject) {

  static BALL_SIZE = 50;

  constructor(x, y, ImageType = 'Brands', opts = {}, ...args) {
    super(...args);

    const posX = opts.recenter ? x - (BallClass.BALL_SIZE / 2) : x;
    const posY = opts.recenter ? y - (BallClass.BALL_SIZE / 2) : y;

    this.coord = new Point(posX, posY);
    this.virtX = posX;

    // Initial coordinate of point. Used as initial condition to calculate ball trajectory.
    this.initPoint = new Point(posX - (BallClass.BALL_SIZE / 2), posY - (BallClass.BALL_SIZE / 2));

    this.angle = (Math.PI / 8) * sample([1, 2, 3, 5, 6, 7, 9, 10, 14, 15]); // Random angle.
    this.velocity = 20 * Math.floor((Math.random() * 5) + 1); // Random velocity.
    this.xDir = 1; // Direction on X axis

    this.timeElapsed = 0; // Time elapsed during simulation

    // Background image fecthed from factory
    this.backgroundImage = ImageFlyweightFactory.get(randomImagePicker(ImageType), ImageType);

    // GUI paramter
    this.strokeColor = this.getRandomColor();
    this.animate = true;

    // Bind some method to object context.
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
  }

  /**
  * @function getRandomColor
  * @description Generate hexa color
  * @return {String} color - The generated color
  */
  getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += sample(letters);
    }
    return color;
  }

  /**
  * @function updatePosition
  * @description Update position in next point in time
  * @param {Number} maxWidth - Canvas width is a maximum
  * @param {Number} maxHeight - Canvas height is a maximum
  */
  updatePosition(maxWidth, maxHeight, diffTime) {
    this.timeElapsed += diffTime;

    // Only if ball is animated
    if (this.animate) {
      this.move(maxWidth, maxHeight);
    }
  }

  /**
  * @function move
  * @description Compute and mutate ball coordinate
  * @NOTE: This could be achieved otherwise
  * @NOTE : We start with checking Y position to see if ball has bounced.
  * (Y > maxHeight of canvas because window coordonate are upside down)
  * If so, we compute an approximation of the angle of attack on the ground.
  * From the new angle we initiate a new curve from the bouncing point with decreased speed
  * Only after we update X.
  * @param {Number} maxWidth - Canvas width is a maximum
  * @param {Number} maxHeight - Canvas height is a maximum
  */
  move(maxWidth = 800, maxHeight = 600) {
    let t = this.timeElapsed / 150; // Slow down simulation
    let { x: initX, y: initY } = this.initPoint;

    /**
    * rightEdgeReached is how many times right edge has been rightEdgeReached
    * Means if ball has bounced once already on canvase's right edge
    * rightEdgeReached is equal to 1, twice bounced then equal to 2 and so on
    */
    const rightEdgeReached = this.virtX > 0 ?
      Math.abs(Math.floor(this.virtX / (maxWidth - BallClass.BALL_SIZE))) :
      Math.abs(Math.ceil(this.virtX / (maxWidth - BallClass.BALL_SIZE)));

    /**
    * frameMirrorChecker is equal to 0 is mirror effect is on
    * Mirror effect is wether the ball is going from the right to the left
    */
    const frameMirrorChecker = rightEdgeReached % 2;

    /* Y update */
    const pastPoint = new Point(
      this.computeXPos(this.velocity, this.angle, (t - 1) / 4, initX),
      this.computeYPos(this.velocity, this.angle, (t - 1) / 4, initY)
    );

    /**
     * Stop condition. If euclidean distance between current point and a previous one
     * (close in time) is to small and if balls are close to limit then we have a ball
     * that about to stop.
     */
    if (this.coord.euclideanDistance(pastPoint) < 5
      && this.coord.y > (maxHeight - BallClass.BALL_SIZE - 5)) {
      this.animate = false; // If condition stop then we stop by setting animate
      return; // Exit
    }

    /**
    * If Y is higher than maxHeight (from user POV, if Y is lower than lower limit of canvas)
    * then the ball is bouncing on the ground
    */
    if (this.coord.y > maxHeight - BallClass.BALL_SIZE) {
      // console.log(this.coord.x);
      // console.log(rightEdgeReached);
      const alpha = Point.computeAngle(pastPoint, this.coord); // Approx new angle
      this.initPoint = new Point(
        this.coord.x,
        maxHeight - BallClass.BALL_SIZE
      );
      this.angle = alpha; // angle definition
      this.velocity -= 5; // Decrease speed
      this.timeElapsed = 0; // Reset time
    }

    // Reload correct parameter;
    t = this.timeElapsed / 150;
    initX = this.initPoint.x;
    initY = this.initPoint.y;

    this.coord.x = this.computeXPos(this.velocity, this.angle, t, initX);
    this.coord.y = this.computeYPos(this.velocity, this.angle, t, initY);

    // Update virtual X
    this.virtX = this.coord.x;

    const xOffset = (rightEdgeReached + 1) * (maxWidth - BallClass.BALL_SIZE);

    // Change direction of X axis
    if (this.coord.x < 0) {
      this.xDir *= -1;
      return;
    }

    // Change direction of X axis
    // @FIXME: Edge case here when rightEdgeReached is greater than 1
    if ((rightEdgeReached >= 1 && frameMirrorChecker === 1)) {
      this.coord.x = xOffset - this.coord.x;
    }
  }

  /**
  * @function computeXPos
  * @description Update position on x Axis according to the parametric equation
  * of parabol : v*cos(θ)*t + X0
  * @param {Number} velocity - velocity
  * @param {Number} angle - angle
  * @param {Number} sec - sec
  * @param {Number} x0 - initial X
  */
  computeXPos(velocity, angle, sec, x0) {
    return (this.xDir * (((velocity * Math.cos(angle)) * sec) + x0));
  }

  /**
  * @function computeYPos
  * @description Update position on x Axis according to the parametric equation
  * of parabol : -(1/2)*g*t^2 + v*sin(θ)*t + Y0
  * @param {Number} velocity - velocity
  * @param {Number} angle - angle
  * @param {Number} sec - sec
  * @param {Number} x0 - initial X
  */
  computeYPos(velocity, angle, sec, y0) {
    return (-1 * (-1 / 2) * G_FORCE * Math.pow(sec, 2))
      + (velocity * Math.sin(-1 * angle) * sec)
      + y0;
  }

  /**
  * @function draw
  * @description Draw ball on canvas
  * @param {Object} context - Context
  */
  draw(context) {
    const ctx = context;
    ctx.save();
    ctx.beginPath();

    ctx.arc(
      this.coord.x + (BallClass.BALL_SIZE / 2),
      this.coord.y + (BallClass.BALL_SIZE / 2),
      BallClass.BALL_SIZE / 2,
      0, Math.PI * 2, true
    );

    ctx.lineWidth = 8;
    ctx.strokeStyle = this.strokeColor;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      this.backgroundImage.img,
      this.coord.x,
      this.coord.y,
      BallClass.BALL_SIZE,
      BallClass.BALL_SIZE
    );

    ctx.beginPath();
    ctx.arc(
      this.coord.x,
      this.coord.y,
      BallClass.BALL_SIZE / 2,
      0, Math.PI * 2, true
    );
    ctx.clip();
    ctx.closePath();
    ctx.restore();
  }
}
