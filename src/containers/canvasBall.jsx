import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { each } from 'lodash';
import { addBall, updateBalls } from '../actions/index';

class canvasBall extends Component {
  static propTypes = {
    ballList: PropTypes.object.isRequired,
    addBall: PropTypes.func.isRequired,
    updateBalls: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.drawAll = this.drawAll.bind(this);
    this.moveAll = this.moveAll.bind(this);
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener('click', () => {
      this.props.addBall();
    }, true);
    this.updateCanvas();
  }

  updateCanvas() {
    window.requestAnimFrame(this.updateCanvas);
    this.drawAll();
    const updatedBalls = this.moveAll();
    this.props.updateBalls(updatedBalls);
  }

  moveAll() {
    each(this.props.ballList, (ball) => {
      ball.move();
    });
    return this.props.ballList;
  }

  drawAll() {
    const { ballList } = this.props;

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    each(ballList, (ball) => {
      ball.draw(this.ctx);
    });
  }

  render() {
    return (
      <canvas ref={c => { this.canvas = c; }} width="800" height="600" />
    );
  }
}

function mapStateToProps(state) {
  return { ballList: state.balls.ballList };
}

export default connect(mapStateToProps, { addBall, updateBalls })(canvasBall);
