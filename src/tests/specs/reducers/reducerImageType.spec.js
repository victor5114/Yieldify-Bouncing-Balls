import { expect } from '../../testHelper';
import reducerImageType, { INITIAL_STATE } from '../../../app/reducers/reducerImageType';
import { CHANGE_IMAGE_TYPE } from '../../../app/actions';

describe('***** Image Reducer *****', () => {
  it('handles actions with unknown type', () => {
    const unknowAction = { type: 'Unknown action', payload: null };
    const newSate = reducerImageType(undefined, unknowAction);
    expect(reducerImageType(undefined, unknowAction)).to.be.instanceof(Object);
    expect(newSate).to.be.eql(INITIAL_STATE);
  });

  it('CHANGE_IMAGE_TYPE', () => {
    const action = { type: CHANGE_IMAGE_TYPE, payload: 'New image type' };
    const newState = reducerImageType(INITIAL_STATE, action);
    expect(newState.imageType).to.be.eql('New image type');
  });
});
