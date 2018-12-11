import React from 'react';
import { shallow } from 'enzyme';
import Counter from '../../components/Counter';

/**
* Factory function to create a ShallowWrapper for the Home component
* @function setup
* @param {object} props - Component props specifric to this setup
* @param {any} state
* @return {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
  const wrapper = shallow(<Counter {...props} />)
  
  if(state) {
    wrapper.setState(state);
  }

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

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-counter');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counter = findByTestAttr(wrapper, 'counter-display');
  expect(counter.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('clicking button increments counter display', () => {
  const counter = 7;
  const wrapper = setup({}, { counter });

  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  wrapper.update();

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});
