// import {
//   GET_WEATHER_ERROR,
//   GET_WEATHER_SUCCESS
// } from '../config/constants';

const initialState = {
  message: null
};

export const error = (state = initialState, action) => {
  switch (action.type) {
    // case GET_WEATHER_ERROR:
    //   return {
    //     message: action.message
    //   }

    // case GET_WEATHER_SUCCESS:    
    //   return initialState;

    default:
      return state;
  }
};
