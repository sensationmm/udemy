import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../test-utils.js';

import GuessedWords from '../../components/GuessedWords';

const setup = (props={}) => {
  const setupProps = {...GuessedWords.defaultProps, ...props};

  return shallow(<GuessedWords {...setupProps} />);
}

test('does not throw warning with expected props', () => {
  checkProps(GuessedWords, GuessedWords.defaultProps);
});

describe('if there are no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });

  test('renders without error', () => {
    const appComponent = findByTestAttr(wrapper, 'component-guessed-words');
    expect(appComponent.length).toBe(1);
  });

  test('renders instructions to guess word', () => {
    const instructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(instructions.exists()).toBe(true);
  }); 
});

describe('if there are words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [ 
      { 'guessedWord': 'train', 'letterMatchCount': 3 },
      { 'guessedWord': 'tarts', 'letterMatchCount': 1 },
      { 'guessedWord': 'party', 'letterMatchCount': 5 }
    ]});
  });

  test('renders without error', () => {
    const appComponent = findByTestAttr(wrapper, 'component-guessed-words');
    expect(appComponent.length).toBe(1);
  });

  test('does not render instructions to guess word', () => {
    const instructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(instructions.exists()).toBe(false);
  }); 

  test('renders guessed words', () => {
    const guessedWords = findByTestAttr(wrapper, 'guessed-words');
    expect(guessedWords.exists()).toBe(true);
  });

  test('correct number of guessed words', () => {
    const guessedWords = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWords.length).toBe(3);
  });
});

/*
test('asasd', () => {

});
*/
