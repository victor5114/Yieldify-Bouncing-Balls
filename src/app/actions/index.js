import Ball from '../Ball/Ball';

export const ADD_BALL = 'ADD_BALL';
export const UPDATE_BALL = 'UPDATE_BALL';
export const PAUSE_BALL = 'PAUSE_BALL';
export const RESUME_BALL = 'RESUME_BALL';
export const DELETE_BALL = 'DELETE_BALL';
export const CHANGE_IMAGE_TYPE = 'CHANGE_IMAGE_TYPE';

export function addBall(...args) {
  const ball = new Ball(...args);

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

export function pauseBall(ball) {
  return {
    type: PAUSE_BALL,
    payload: ball,
  };
}

export function resumeBall(ball) {
  return {
    type: RESUME_BALL,
    payload: ball,
  };
}

export function deleteBall(ball) {
  return {
    type: DELETE_BALL,
    payload: ball,
  };
}

export function changeImageType(type) {
  return {
    type: CHANGE_IMAGE_TYPE,
    payload: type,
  };
}
