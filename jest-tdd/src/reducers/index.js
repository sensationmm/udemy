import { combineReducers } from 'redux';
import { ui } from './ui';
import { loader } from './loader';
import { error } from './error';
import { success } from './success';
import { guessedWords } from './guessedWords';
import { secretWord } from './secretWord';

export default combineReducers({
  success,
  guessedWords,
  secretWord
});
