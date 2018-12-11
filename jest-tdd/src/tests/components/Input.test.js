import React from 'react';
import { shallow } from 'enzyme';

import Input, { UnconnectedInput } from '../../components/Input';
import { storeFactory, findByTestAttr } from '../test-utils.js';

const setup = (initialState={}) => {
  const store = storeFactory(initialState);

  const wrapper = shallow(<Input store={store} />).dive();
  
  return wrapper;
}

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;

    beforeEach(() => {
      const initialState = {
        success: false
      };

      wrapper = setup(initialState);
    });

    test('renders the component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    test('renders the input box', () => {
      const component = findByTestAttr(wrapper, 'input-box');
      expect(component.length).toBe(1);
    });

    test('renders the submit button', () => {
      const component = findByTestAttr(wrapper, 'submit-button');
      expect(component.length).toBe(1);
    });
  });

  describe('word has been guessed', () => {
    let wrapper;

    beforeEach(() => {
      const initialState = {
        success: true
      };

      wrapper = setup(initialState);
    });

    test('it renders the component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    test('it does not render the input box', () => {
      const component = findByTestAttr(wrapper, 'input-box');
      expect(component.length).toBe(0);
    });

    test('it does not render the submit button', () => {
      const component = findByTestAttr(wrapper, 'submit-button');
      expect(component.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  test('has `success` piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;

    expect(successProp).toBe(success);
  });

  test('`guessWord` action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;

    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe('action calls', () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = 'train';

  beforeEach(() => {
    guessWordMock = jest.fn();
    wrapper = shallow(<UnconnectedInput guessWord={guessWordMock} />);

    //add value to input box
    wrapper.instance().inputBox.current = { value: guessedWord };

    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} } );
  });

  test('`guessWord` is called when submit button is clicked', () => {
    const guessWordCallCount = guessWordMock.mock.calls.length;

    expect(guessWordCallCount).toBe(1);
  });

  test('`guessWord` is called with correct input value as argument', () => {
    const guessedWordArg = guessWordMock.mock.calls[0][0];

    expect(guessedWordArg).toBe(guessedWord);
  });

  test('input box clears on submit', () => {
    expect(wrapper.instance().inputBox.current.value).toBe('');
  });
});
