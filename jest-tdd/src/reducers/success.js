import { CORRECT_GUESS } from '../config/constants';

const defaultState = false;

export const success = (state = defaultState, action = {}) => {
  switch(action.type) {
    case CORRECT_GUESS:
      return true;

    default:
      return state;
  }
};
