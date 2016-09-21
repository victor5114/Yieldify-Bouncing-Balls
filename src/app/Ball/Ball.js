import { sample } from 'lodash';
import inherit from '../utils/inherit';
import UniqueObject from '../utils/mixins/uniqueObject';
import { ImageFlyweightFactory, randomImagePicker } from './ImageManager';
import Point from './Point';

const G_FORCE = 9.81;

export default class BallClass extends inherit(UniqueObject) {
  static BALL_SIZE = 50;

  constructor(x, y, ImageType = 'Brands', opts = {}, ...args) {
    super(...args);

    const posX = opts.recenter ? x - (BallClass.BALL_SIZE / 2) : x;
    const posY = opts.recenter ? y - (BallClass.BALL_SIZE / 2) : y;

    this.coord = new Point(posX, posY);
    this.virtX = posX;
    this.initPoint = new Point(posX - (BallClass.BALL_SIZE / 2), posY - (BallClass.BALL_SIZE / 2));
    this.angle = (Math.PI / 8) * Math.floor((Math.random() * 16) + 1); // Random angle.
    this.velocity = 30 * Math.floor((Math.random() * 5) + 1); // Random velocity.
    this.xDir = 1; // Direction on X axis

    this.timeElapsed = 0;
    this.backgroundImage = ImageFlyweightFactory.get(randomImagePicker(ImageType), ImageType);
    this.strokeColor = this.getRandomColor();
    this.animate = true;

    // Bind some method to object context.
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += sample(letters);
    }
    return color;
  }

  updatePosition(maxWidth, maxHeight, diffTime) {
    this.timeElapsed += diffTime;
    if (this.animate) {
      this.move(maxWidth, maxHeight);
    }
  }

  move(maxWidth = 800, maxHeight = 600) {
    let t = this.timeElapsed / 200;
    let { x: initX, y: initY } = this.initPoint;

    const rightEdgeReached = this.virtX > 0 ? // Virtual X to handle egde bouncing.
      Math.abs(Math.floor(this.virtX / (maxWidth - BallClass.BALL_SIZE))) :
      Math.abs(Math.ceil(this.virtX / (maxWidth - BallClass.BALL_SIZE)));

    const frameContainerChecker = rightEdgeReached % 2;

    const pastPoint = new Point(
      this.computeXPos(this.velocity, this.angle, (t - 5) / 4, initX),
      this.computeYPos(this.velocity, this.angle, (t - 5) / 4, initY)
    );

    // Stop condition
    if (this.coord.euclideanDistance(pastPoint) < 20
      && this.coord.y > (maxHeight - BallClass.BALL_SIZE - 5)) {
      this.animate = false;
      return;
    }

    if (this.coord.y > maxHeight - BallClass.BALL_SIZE) {
      const alpha = Point.computeAngle(pastPoint, this.coord); // Approx new angle
      this.initPoint = new Point(
        this.coord.x,
        maxHeight - BallClass.BALL_SIZE
      );
      this.angle = alpha;
      this.velocity -= 5;
      this.timeElapsed = 0;
    }
    // Reload correct parameter;
    t = this.timeElapsed / 200;
    initX = this.initPoint.x;
    initY = this.initPoint.y;

    this.coord.x = this.computeXPos(this.velocity, this.angle, t, initX);
    this.coord.y = this.computeYPos(this.velocity, this.angle, t, initY);

    this.virtX = this.coord.x;
    const xOffset = (rightEdgeReached + 1) * (maxWidth - BallClass.BALL_SIZE);

    if (this.coord.x < 0 || (rightEdgeReached > 0 && frameContainerChecker === 0)) {
      if (this.coord.x < 0) {
        this.xDir *= -1;
      }
      if (rightEdgeReached >= 2) {
        this.coord.x = xOffset - this.coord.x;
      }
    }

    if (rightEdgeReached >= 1 || frameContainerChecker === 1) {
      this.coord.x = xOffset - this.coord.x;
    }
  }
  // v*cos(θ)*t + X0
  computeXPos(velocity, angle, sec, x0) {
    return (this.xDir * (((velocity * Math.cos(angle)) * sec) + x0));
  }

  // -(1/2)*g*t^2 + v*sin(θ)*t + Y0
  computeYPos(velocity, angle, sec, y0) {
    return (-1 * (-1 / 2) * G_FORCE * Math.pow(sec, 2))
      + (velocity * Math.sin(-1 * angle) * sec)
      + y0;
  }

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
