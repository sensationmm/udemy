import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../test-utils.js';

import App from '../../containers/App';

test('Should run tests', () => {
  expect(1).toBe(1);
});

test('renders without error', () => {
  const wrapper = shallow(<App />);
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});
