import Ball from '../ballClass';

export const ADD_BALL = 'ADD_BALL';
export const UPDATE_BALL = 'UPDATE_BALL';
export const UPDATE_BALLS = 'UPDATE_BALLS';

export function addBall() {
  const ball = new Ball(3, 4);

  return {
    type: ADD_BALL,
    payload: ball,
  };
}

export function updateBall(ball) {
  return {
    type: UPDATE_BALL,
    payload: ball,
  };
}

export function updateBalls(balls) {
  return {
    type: UPDATE_BALLS,
    payload: balls,
  };
}
