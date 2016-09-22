import { listImageType } from '../Ball/ImageManager';

import {
  CHANGE_IMAGE_TYPE,
} from '../actions/index';

export const INITIAL_STATE = {
  imageType: listImageType[0],
  // We can add here other state properties so we can be more scalable later on.
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_IMAGE_TYPE: {
      return {
        ...state,  // In case we add another state property
        imageType: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
