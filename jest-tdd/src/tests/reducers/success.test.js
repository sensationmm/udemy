import { CORRECT_GUESS } from '../../config/constants';
import { success } from '../../reducers/success';

test('return default initial state of `false` when no action is passed', () => {
  const newState = success();

  expect(newState).toBe(false);
});

test('returns state of `true` upon receiving an action of type `CORRECT_GUESS`', () => {
  const newState = success(undefined, { type: CORRECT_GUESS });
  expect(newState).toBe(true);
});
