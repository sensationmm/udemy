import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory } from '../test-utils.js';

import Home, { UnconnectedHome } from '../../components/Home';


const setup = (initialState={}) => {
  const store = storeFactory(initialState);

  const wrapper = shallow(<Home store={store} />).dive();
  
  return wrapper;
}

/**
* Return ShallowWrapper containing nodes with the given data-test attribute
* @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
* @param {string} val - Value of data-test attribute to search
* @return {ShallowWrapper}
*/
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

describe('render', () => {
  test('renders without error', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-home');
    expect(appComponent.length).toBe(1);
  });
});

describe('redux props', () => {
  test('has `success` piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;

    expect(successProp).toEqual(success);
  });

  test('has `guessedWords` piece of state as prop', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;

    expect(guessedWordsProp).toEqual(guessedWords);
  });

  test('has `secretWord` piece of state as prop', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;

    expect(secretWordProp).toBe(secretWord);
  });

  test('`getSecretWord` action creator is a function prop', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;

    expect(getSecretWordProp).toBeInstanceOf(Function);
  });

});

describe('setup', () => {
  test('`getSecretWord` runs on app mount', () => {
    const getSecretWordMock = jest.fn();

    //dont use setup, this uses connected component
    const props = {
      getSecretWord: getSecretWordMock,
      success: false,
      guessedWords: []
    };
    const wrapper = shallow(<UnconnectedHome {...props} />);

    wrapper.instance().componentDidMount();

    const getSecretWordMockCallCount = getSecretWordMock.mock.calls.length;

    expect(getSecretWordMockCallCount).toBe(1);
  });
});
