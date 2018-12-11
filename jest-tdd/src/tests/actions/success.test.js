import { correctGuess } from '../../actions/success';
import { CORRECT_GUESS } from '../../config/constants';

describe('correctGuess', () => {
  test('returns an action with type `CORRECT_GUESS`', () => {
    const action = correctGuess();
    expect(action).toEqual({ type: CORRECT_GUESS });
  });
})