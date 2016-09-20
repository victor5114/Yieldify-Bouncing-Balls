import { combineReducers } from 'redux';
import BallsReducer from '../reducers/reducerBalls';
import ImageTypeReducer from '../reducers/reducerImageType';

const rootReducer = combineReducers({
  balls: BallsReducer,
  img: ImageTypeReducer,
});

export default rootReducer;
