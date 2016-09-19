import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { resumeBall, pauseBall, deleteBall } from '../actions/index';

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
      <li className="list-group-item" key={ball.uuid}>
        <span className="pull-xs-right">{ball.uuid}</span>
        <strong>Ball {ball.uuid}</strong>
      </li>
    );
  }

  render() {
    return (
      <div>
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
