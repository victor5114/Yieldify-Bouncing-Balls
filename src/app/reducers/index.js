import { combineReducers } from 'redux';
import BallsReducer from '../reducers/reducerBalls';
import ImageTypeReducer from '../reducers/reducerImageType';

// Combine all reducers in one global state
const rootReducer = combineReducers({
  balls: BallsReducer,
  img: ImageTypeReducer,
});

export default rootReducer;
