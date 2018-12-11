import { guessWord } from '../actions/guessedWords';
import { GUESS_WORD } from '../config/constants';

const defaultState = [];

export const guessedWords = (state = defaultState, action = {}) => {
  switch(action.type) {
    case GUESS_WORD:

      return [
        ...state,
        action.payload
      ];

    default: 
      return state;
  }
};
