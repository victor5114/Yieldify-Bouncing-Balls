import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { resumeBall, pauseBall, deleteBall } from '../actions/index';
import styles from '../index.scss';

class listBall extends Component {
  static propTypes = {
    ballList: PropTypes.object.isRequired,
    resumeBall: PropTypes.func.isRequired,
    pauseBall: PropTypes.func.isRequired,
    deleteBall: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderBallElement = this.renderBallElement.bind(this);
  }

  // Optimization performance.
  // Don't render unless we have a new element around in the list
  shouldComponentUpdate(nextProps) {
    const now = Object.keys(this.props.ballList).length;
    const next = Object.keys(nextProps.ballList).length;
    return now !== next;
  }

  renderBallElement() {
    const { ballList } = this.props;
    const prepToRenderList = Object.keys(ballList).map(key => ballList[key]);
    return prepToRenderList.map(ball =>
      <li className="list-group-item clearfix" key={ball.uuid}>
        <strong>{ball.uuid} : </strong>
        <img src={ball.backgroundImage.img.src} alt="ball.uuid" height="40" width="40" />
        <span className="pull-right">
          <button className="btn btn-default">
            <span className="glyphicon glyphicon-pause" />
          </button>
          <button className="btn btn-danger">
            <span className="glyphicon glyphicon-trash" />
          </button>
        </span>
      </li>
    );
  }

  render() {
    return (
      <div className={styles['container-list-ball']}>
        <span>LIST OF BALLS</span>
        <ul className="list-group">
          {this.renderBallElement()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ballList: state.balls.ballList };
}

export default connect(mapStateToProps, { resumeBall, pauseBall, deleteBall })(listBall);
