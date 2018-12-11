import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware, compose } from 'redux';
import { middleware } from '../store';

import rootReducer from '../reducers/index';

export const storeFactory = (initialState) => {
  const composedEnhancers = compose(applyMiddleware(...middleware));
  return createStore(rootReducer, initialState, composedEnhancers);
}

/**
* Return ShallowWrapper containing nodes with the given data-test attribute
* @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
* @param {string} val - Value of data-test attribute to search
* @return {ShallowWrapper}
*/
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes, 
    conformingProps, 
    'prop', 
    component.name
  );

  expect(propError).toBeUndefined();
}
