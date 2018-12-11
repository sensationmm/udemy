import {
  SET_SECRET_WORD
} from '../config/constants';

export const secretWord = (state = 'party', action = {}) => {
  switch(action.type) {
    case SET_SECRET_WORD:
      return action.payload;

    default:
      return state;
  }
};
