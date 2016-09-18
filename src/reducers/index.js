import { combineReducers } from 'redux';
import BallsReducer from '../reducers/reducerBalls';

const rootReducer = combineReducers({
  balls: BallsReducer,
});

export default rootReducer;
