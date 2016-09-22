import { expect } from '../../testHelper';
import { ball1 } from '../../mocks/ball';
import {
  ADD_BALL, addBall,
  UPDATE_BALL, updateBall,
  PAUSE_BALL, pauseBall,
  RESUME_BALL, resumeBall,
  DELETE_BALL, deleteBall,
  CHANGE_IMAGE_TYPE, changeImageType,
} from '../../../app/actions';

describe('@@@@@ Actions @@@@@', () => {
  describe('ADD_BALL', () => {
    it('has the correct type', () => {
      const action = addBall();
      expect(action.type).to.equal(ADD_BALL);
    });

    it('has the correct payload', () => {

    });
  });

  describe('UPDATE_BALL', () => {
    it('has the correct type', () => {
      const action = updateBall();
      expect(action.type).to.equal(UPDATE_BALL);
    });

    it('has the correct payload', () => {
      const action = updateBall(ball1);
      expect(action.payload).to.eql(ball1);
    });
  });

  describe('PAUSE_BALL', () => {
    it('has the correct type', () => {
      const action = pauseBall();
      expect(action.type).to.eql(PAUSE_BALL);
    });

    it('has the correct payload', () => {
      const action = updateBall(ball1);
      expect(action.payload).to.eql(ball1);
    });
  });

  describe('RESUME_BALL', () => {
    it('has the correct type', () => {
      const action = resumeBall();
      expect(action.type).to.equal(RESUME_BALL);
    });

    it('has the correct payload', () => {
      const action = updateBall(ball1);
      expect(action.payload).to.eql(ball1);
    });
  });

  describe('DELETE_BALL', () => {
    it('has the correct type', () => {
      const action = deleteBall();
      expect(action.type).to.equal(DELETE_BALL);
    });

    it('has the correct payload', () => {
      const action = updateBall(ball1);
      expect(action.payload).to.eql(ball1);
    });
  });

  describe('CHANGE_IMAGE_TYPE', () => {
    it('has the correct type', () => {
      const action = changeImageType();
      expect(action.type).to.equal(CHANGE_IMAGE_TYPE);
    });

    it('has the correct payload', () => {
      const action = changeImageType('New image type');
      expect(action.payload).to.eql('New image type');
    });
  });
});
