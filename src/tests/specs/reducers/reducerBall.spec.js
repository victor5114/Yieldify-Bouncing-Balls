import { expect } from '../../testHelper';
import reducerBall, { INITIAL_STATE } from '../../../app/reducers/reducerBalls';

import { ball1 } from '../../mocks/ball';
import { listLenght1, pausedLength1 } from '../../mocks/states';
import {
  ADD_BALL,
  UPDATE_BALL,
  PAUSE_BALL,
  RESUME_BALL,
  DELETE_BALL,
} from '../../../app/actions';

describe('***** Ball Reducer *****', () => {
  it('handles actions with unknown type', () => {
    const unknowAction = { type: 'Unknown action', payload: null };
    expect(reducerBall(undefined, unknowAction)).to.be.instanceof(Object);
    expect(reducerBall(undefined, unknowAction)).to.be.eql(INITIAL_STATE);
  });

  it('ADD_BALL', () => {
    const action = { type: ADD_BALL, payload: ball1 };
    expect(reducerBall(INITIAL_STATE, action)).to.be.eql(listLenght1.balls);
  });

  it('UPDATE_BALL', () => {
    const action = { type: UPDATE_BALL, payload: { ...ball1, coord: { x: 10, y: 10 } } };
    const newState = reducerBall(listLenght1, action);
    expect(newState.ballList['0'].coord.x).to.be.equal(10);
    expect(newState.ballList['0'].coord.y).to.be.equal(10);
  });

  it('PAUSE_BALL', () => {
    // Before pause
    expect(listLenght1.balls.activeBallIds).to.be.instanceof(Array);
    expect(listLenght1.balls.activeBallIds).to.be.eql([0]);

    // After pause
    const action = { type: PAUSE_BALL, payload: ball1 };
    const newState = reducerBall(listLenght1, action);
    expect(newState.activeBallIds).to.be.eql([]);
  });

  it('RESUME_BALL', () => {
    // Before pause
    expect(pausedLength1.balls.activeBallIds).to.be.instanceof(Array);
    expect(pausedLength1.balls.activeBallIds).to.be.eql([]);

    // After pause
    const action = { type: RESUME_BALL, payload: ball1 };
    // console.log(listLenght1);
    // console.log(pausedLength1);
    const newState = reducerBall(pausedLength1, action);
    expect(newState.activeBallIds).to.be.eql([0]);
  });

  it('DELETE_BALL', () => {
    const action = { type: DELETE_BALL, payload: ball1 };
    const newState = reducerBall(listLenght1, action);
    expect(newState.activeBallIds).to.be.eql([]);
    expect(newState.ballList).to.be.eql({});
  });
});
