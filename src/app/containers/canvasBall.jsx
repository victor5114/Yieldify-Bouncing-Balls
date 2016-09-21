import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { each } from 'lodash';
import { addBall, updateBalls } from '../actions/index';
import { ImageFlyweightFactory } from '../Ball/ImageManager';

class canvasBall extends Component {
  static propTypes = {
    ballList: PropTypes.object.isRequired,
    activeBallIds: PropTypes.array.isRequired,
    imageType: PropTypes.string.isRequired,
    addBall: PropTypes.func.isRequired,
    updateBalls: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.execTime = Date.now(); // Execution time.
    this.updateTime = this.updateTime.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.drawAll = this.drawAll.bind(this);
    this.moveAll = this.moveAll.bind(this);
    this.respondCanvas = this.respondCanvas.bind(this);
    this.addBallOnClick = this.addBallOnClick.bind(this);
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    // console.log(this.props.imageType);
    // this.props.imageType is equal to either Brands, Countries, Politics
    const { img } = ImageFlyweightFactory.get(this.props.imageType, 'Backgrounds');
    this.background = img;

    // Click event listener
    this.canvas.addEventListener('click', this.addBallOnClick);

    // Resize window listener
    window.addEventListener('resize', this.respondCanvas);

    // Update canvas
    this.updateCanvas();
  }

  componentWillUpdate() {
    // perform any preparations for an upcoming update
    const { img } = ImageFlyweightFactory.get(this.props.imageType, 'Backgrounds');
    this.background = img;
  }

  componentWillUnmount() {
    // Remove event listeners
    this.canvas.removeEventListener('click');
    this.canvas = null;
    window.removeEventListener('resize', this.respondCanvas);
  }

  respondCanvas() {
    const { clientWidth, clientHeight } = this.canvas.parentNode;
    this.canvas.setAttribute('width', Math.min(clientWidth, 800)); // max width
    this.canvas.setAttribute('height', Math.min(clientHeight, 600)); // max height
    // //Call a function to redraw other content (texts, images etc)
    // this.updateCanvas();
  }

  addBallOnClick(event) {
    this.props.addBall(
      event.layerX,
      event.layerY,
      this.props.imageType,
    );
  }

  updateCanvas() {
    window.requestAnimFrame(this.updateCanvas);
    this.drawAll();
    const updatedBalls = this.moveAll();
    this.props.updateBalls(updatedBalls);
  }

  moveAll() {
    const { width, height } = this.canvas;
    this.updateTime(diffTime => {
      each(this.props.ballList, (ball) => {
        if (this.props.activeBallIds.indexOf(ball.uuid) > -1) {
          ball.updatePosition(width, height, diffTime);
        }
      });
    });
    return this.props.ballList;
  }

  drawAll() {
    const { ballList } = this.props;

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.background, 0, 0);
    each(ballList, (ball) => {
      ball.draw(this.ctx);
    });
  }

  updateTime(callback) {
    const now = Date.now();
    callback(now - this.execTime);
    this.execTime = now;
  }

  render() {
    return (
      <div>
        <canvas id="canvas" ref={c => { this.canvas = c; }} width="800" height="600" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ballList: state.balls.ballList,
    activeBallIds: state.balls.activeBallIds,
    imageType: state.img.imageType,
  };
}

export default connect(mapStateToProps, { addBall, updateBalls })(canvasBall);
