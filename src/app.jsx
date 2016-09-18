import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Ball from './ballClass';

export default class App extends Component {

  constructor(props) {
    super(props);
    const ball1 = new Ball(3, 4);
    const ball2 = new Ball(2, 6);
    const ball3 = new Ball(1, 3);
    const ball4 = new Ball(5, 2);
    const ball5 = new Ball(7, 7);

    this.state = { ballList: [ball1, ball2, ball3, ball4, ball5] };
    this.updateCanvas = this.updateCanvas.bind(this);
    this.drawAll = this.drawAll.bind(this);
    this.moveAll = this.moveAll.bind(this);
  }

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    this.ctx = this.canvas.getContext('2d');
    window.requestAnimFrame(this.updateCanvas);
    this.drawAll();
    this.moveAll();
  }

  moveAll() {
    const newBallList = this.state.ballList.map((ball) => {
      ball.move();
      return ball;
    });

    this.setState({ ballList: newBallList });
  }

  drawAll() {
    const { ballList } = this.state;

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ballList.forEach(ball => {
      ball.draw(this.ctx);
    });
  }

  render() {
    return (
      <canvas ref={c => { this.canvas = c; }} width="800" height="600" />
    );
  }
}
