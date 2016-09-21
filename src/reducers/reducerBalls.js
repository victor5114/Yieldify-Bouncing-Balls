import _ from 'lodash';
import {
  ADD_BALL,
  UPDATE_BALL,
  UPDATE_BALLS,
  PAUSE_BALL,
  RESUME_BALL,
  DELETE_BALL,
} from '../actions/index';

const INITIAL_STATE = {
  ballList: {},
  activeBallIds: [],
  // We can add here other state properties so we can be more scalable later on.
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_BALL: {
      const UUID = action.payload.uuid;

      return {
        ...state,  // In case we add another state property
        ballList: {
          ...state.ballList,
          [UUID]: action.payload,
        },
        activeBallIds: state.activeBallIds.concat(UUID),
      };
    }
    case UPDATE_BALL: {
      const UUID = action.payload.uuid;

      return {
        ...state,
        ballList: {
          ...state.ballList,
          [UUID]: action.payload,
        },
      };
    }
    case UPDATE_BALLS: {
      return {
        ...state,
        ballList: {
          ...state.ballList,
        },
      };
    }
    case PAUSE_BALL: {
      const UUID = action.payload.uuid;
      return {
        ...state,
        ballList: {
          ...state.ballList,
          [UUID]: action.payload,
        },
        activeBallIds: _.filter(state.activeBallIds, (id) => id !== UUID),
      };
    }
    case RESUME_BALL: {
      const UUID = action.payload.uuid;

      return {
        ...state,
        ballList: {
          ...state.ballList,
          [UUID]: action.payload,
        },
        activeBallIds: state.activeBallIds.concat(UUID),
      };
    }
    case DELETE_BALL: {
      const UUID = action.payload.uuid;

      const copy = Object.assign({}, state.ballList);
      delete copy[UUID];

      return {
        ...state,
        ballList: copy,
        activeBallIds: _.filter(state.activeBallIds, (id) => id !== UUID),
      };
    }
    default: {
      return state;
    }
  }
}
