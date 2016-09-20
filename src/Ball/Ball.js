import { sample } from 'lodash';
import inherit from '../utils/inherit';
import UniqueObject from '../utils/mixins/uniqueObject';
import { ImageFlyweightFactory, randomImagePicker } from './ImageManager';

export default class BallClass extends inherit(UniqueObject) {
  static BALL_SIZE = 50;

  constructor(posX, posY, limitDistanceX, limitDistanceY, ImageType = 'Brands', ...args) {
    super(...args);
    this.x = posX;
    this.y = posY;
    this.initX = this.x - (BallClass.BALL_SIZE / 2);
    this.initY = this.y - (BallClass.BALL_SIZE / 2);
    this.angle = (Math.PI / 8) * Math.floor((Math.random() * 16) + 1); // Random angle.
    this.speed = 20 * Math.floor((Math.random() * 5) + 1); // Random angle.
    this.limitDistanceX = limitDistanceX;
    this.limitDistanceY = limitDistanceY;
    this.timeElapsed = 0;
    this.backgroundImage = ImageFlyweightFactory.get(randomImagePicker(ImageType), ImageType);
    this.strokeColor = this.getRandomColor();

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
    if (this.x < 0) {
      //
    }

    if (this.x > maxWidth - BallClass.BALL_SIZE) {
      //
    }

    if (this.y < 0) {
      //
    }

    if (this.y > maxHeight - BallClass.BALL_SIZE) {
      //
    }

    this.timeElapsed += diffTime;
    this.move(maxWidth, maxHeight);
  }

  move(maxWidth = 800, maxHeight = 600) {
    const sec = this.timeElapsed / 150;
    this.x = ((this.speed * Math.cos(this.angle)) * sec) + this.initX;
    this.y = -1 * (-5.40 * Math.pow(sec, 2)) + (this.speed * Math.sin(-1 * this.angle)) + this.initY;
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

    ctx.drawImage(
      this.backgroundImage.img,
      this.x,
      this.y,
      BallClass.BALL_SIZE,
      BallClass.BALL_SIZE
    );

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
