import { storeFactory } from '../test-utils';
import { guessWord } from '../../actions/guessedWords';

describe('guessedWord action dispatcher', () => {
  const secretWord = 'party';
  const unsuccessfulGuess = 'train';

  describe('no words guessed', () => {
    let store;
    const initialState = {
      secretWord
    };

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [
          {
            guessedWord: unsuccessfulGuess,
            letterMatchCount: 3
          }
        ]
      };

      expect(newState).toEqual(expectedState);
    });

    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();

      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [
          {
            guessedWord: secretWord,
            letterMatchCount: 5
          }
        ]
      };

      expect(newState).toEqual(expectedState);
    });
  });

  describe('some words guessed', () => {
    let store;
    const guessedWords = [ { guessedWord: 'agile', letterMatchCount: 1 } ];

    const initialState = {
      secretWord,
      guessedWords: guessedWords
    };

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();

      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: unsuccessfulGuess,
            letterMatchCount: 3
          }
        ] 
      };

      expect(newState).toEqual(expectedState);
    });

    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();

      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: secretWord,
            letterMatchCount: 5
          }
        ] 
      };

      expect(newState).toEqual(expectedState);
    });
  });
});
