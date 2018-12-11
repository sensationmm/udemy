import {
  GUESS_WORD,
  CORRECT_GUESS
} from '../config/constants';
import { getLetterMatchCount } from '../functions/index';

export const guessWord = (guessedWord) => {
  return function(dispatch, getState) {
    const secretWord = getState().secretWord;

    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: GUESS_WORD,
      payload: {
        guessedWord,
        letterMatchCount
      }
    });

    if(guessedWord === secretWord) {
      dispatch({
        type: CORRECT_GUESS
      })
    }
  };
};
