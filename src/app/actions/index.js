import Ball from '../Ball/Ball';

export const ADD_BALL = 'ADD_BALL';
export const UPDATE_BALL = 'UPDATE_BALL';
export const PAUSE_BALL = 'PAUSE_BALL';
export const RESUME_BALL = 'RESUME_BALL';
export const DELETE_BALL = 'DELETE_BALL';
export const CHANGE_IMAGE_TYPE = 'CHANGE_IMAGE_TYPE';

/**
* @function addBall
* @description Action controller fn - Adding a ball to state
* @param ...args - See Ball Class argument
* @return {Object} - Action created (Must return type&payload properties)
*/
export function addBall(...args) {
  const ball = new Ball(...args);

  return {
    type: ADD_BALL,
    payload: ball,
  };
}

/**
* @function updateBall
* @description Action controller fn - Update a ball
* @param {Ball} ball - The ball with updated parameter
* @return {Object} - Action created (Must return type&payload properties)
*/
export function updateBall(ball) {
  return {
    type: UPDATE_BALL,
    payload: ball,
  };
}

/**
* @function pauseBall
* @description Action controller fn - Stop a ball from rendering into the canvas
* @param {Ball} ball - The ball with updated parameter
* @return {Object} - Action created (Must return type&payload properties)
*/
export function pauseBall(ball) {
  return {
    type: PAUSE_BALL,
    payload: ball,
  };
}

/**
* @function resumeBall
* @description Action controller fn - Resume a ball inside canvas
* @param {Ball} ball - The ball with updated parameter
* @return {Object} - Action created (Must return type&payload properties)
*/
export function resumeBall(ball) {
  return {
    type: RESUME_BALL,
    payload: ball,
  };
}

/**
* @function deleteBall
* @description Action controller fn - Delete a ball from the canvas
* @param {Ball} ball - The ball with updated parameter
* @return {Object} - Action created (Must return type&payload properties)
*/
export function deleteBall(ball) {
  return {
    type: DELETE_BALL,
    payload: ball,
  };
}

/**
* @function changeImageType
* @description Action controller fn - Change background image of canvas and next ball
* @param {string} type - The image's type
* @return {Object} - Action created (Must return type&payload properties)
*/
export function changeImageType(type) {
  return {
    type: CHANGE_IMAGE_TYPE,
    payload: type,
  };
}
