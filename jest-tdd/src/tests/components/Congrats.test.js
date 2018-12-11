import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../test-utils.js';

import Congrats from '../../components/Congrats';

const setup = (props={}) => {
  const setupProps = {...Congrats.defaultProps, ...props};

  return shallow(<Congrats {...setupProps} />);
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-congrats');
  expect(appComponent.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  const expectedProps = { success: false };
  
  checkProps(Congrats, expectedProps);
});

test('renders no text when `success` prop is false', () => {
  const wrapper = setup({ success: false });
  const appComponent = findByTestAttr(wrapper, 'component-congrats');
  expect(appComponent.text()).toBe('');

});

test('renders congrats message when `success` prop is true', () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.text().length).not.toBe(0);
});

/*
test('asasd', () => {

});
*/
