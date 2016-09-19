import inherit from '../utils/inherit';
import UniqueObject from '../utils/mixins/uniqueObject';
import { ImageFlyweightFactory, randomImagePicker } from './ImageManager';

export default class BallClass extends inherit(UniqueObject) {
  static BALL_SIZE = 30;

  constructor(speedX = 5, speedY = 5, ImageType = 'Brands', ...args) {
    super(...args);
    this.speedX = speedX;
    this.speedY = speedY;
    this.x = 75;
    this.y = 75;
    this.timeElapsed = 0;

    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
    this.Image = ImageFlyweightFactory.get(randomImagePicker(ImageType), ImageType);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0) {
      this.speedX *= -1;
    }

    if (this.x > 800 - BallClass.BALL_SIZE) {
      this.speedX *= -1;
    }

    if (this.y < 0) {
      this.speedY *= -1;
    }

    if (this.y > 600 - BallClass.BALL_SIZE) {
      this.speedY *= -1;
    }
  }

  draw(context) {
    const ctx = context;
    ctx.save();
    ctx.beginPath();

    ctx.arc(
      this.x + (BallClass.BALL_SIZE / 2),
      this.y + (BallClass.BALL_SIZE / 2),
      BallClass.BALL_SIZE / 2,
      0, Math.PI * 2, true
    );

    ctx.lineWidth = 5;
    ctx.strokeStyle = '#FF5F88';
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(this.Image.img, this.x, this.y, BallClass.BALL_SIZE, BallClass.BALL_SIZE);

    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      BallClass.BALL_SIZE / 2,
      0, Math.PI * 2, true
    );
    ctx.clip();
    ctx.closePath();
    ctx.restore();
  }
}
