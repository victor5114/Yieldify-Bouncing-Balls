import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { resumeBall, pauseBall, deleteBall } from '../actions/index';
import styles from '../../index.scss';

class listBall extends Component {
  static propTypes = {
    ballList: PropTypes.object.isRequired,
    activeBallIds: PropTypes.array.isRequired,
    resumeBall: PropTypes.func.isRequired,
    pauseBall: PropTypes.func.isRequired,
    deleteBall: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderBallElement = this.renderBallElement.bind(this);
  }

  // Optimization performance.
  // Don't render unless we have an element update in the list
  shouldComponentUpdate(nextProps) {
    const nowBallList = Object.keys(this.props.ballList).length;
    const nextBallList = Object.keys(nextProps.ballList).length;

    if (nowBallList !== nextBallList) {
      return true;
    }

    const nowActiveBall = this.props.activeBallIds.length;
    const nextActiveBall = nextProps.activeBallIds.length;

    if (nowActiveBall !== nextActiveBall) {
      return true;
    }

    return false;
  }

  renderBallElement() {
    const { ballList } = this.props;
    const prepToRenderList = Object.keys(ballList).map(key => ballList[key]);

    if (prepToRenderList.length === 0) {
      return (
        <div className={styles['empty-ball-list']}>
          <b>Click on canvas</b>
          <span className="glyphicon glyphicon-arrow-right" />
        </div>
      );
    }

    return prepToRenderList.map(ball =>
      <li className="list-group-item clearfix" key={ball.uuid}>
        <strong>{ball.uuid} : </strong>
        <img src={ball.backgroundImage.img.src} alt="ball.uuid" height="40" width="40" />
        <span className="pull-right">
          {(() => {
            if (this.props.activeBallIds.indexOf(ball.uuid) > -1) {
              return (
                <button
                  className="btn btn-default"
                  onClick={() => { this.props.pauseBall(ball); }}
                >
                  <span className="glyphicon glyphicon-pause" />
                </button>
              );
            }

            return (
              <button
                className="btn btn-primary"
                onClick={() => { this.props.resumeBall(ball); }}
              >
                <span className="glyphicon glyphicon-play" />
              </button>
            );
          })()}

          <button
            className="btn btn-danger"
            onClick={() => { this.props.deleteBall(ball); }}
          >
            <span className="glyphicon glyphicon-trash" />
          </button>
        </span>
      </li>
    );
  }

  render() {
    return (
      <div className={styles['container-list-ball']}>
        <ul className="list-group">
          {this.renderBallElement()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ballList: state.balls.ballList,
    activeBallIds: state.balls.activeBallIds,
  };
}

export default connect(mapStateToProps, { resumeBall, pauseBall, deleteBall })(listBall);
