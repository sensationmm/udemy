// import {
//   GET_WEATHER_BEGIN,
//   GET_WEATHER_ERROR,
//   GET_WEATHER_SUCCESS
// } from '../config/constants';

const initialState = {
  isLoading: false
};

export const loader = (state = initialState, action) => {
  switch (action.type) {
    // case GET_WEATHER_BEGIN:
    //   return {
    //     ...initialState,
    //     isLoading: true,
    //   };

    // case GET_WEATHER_SUCCESS:
    // case GET_WEATHER_ERROR:
    //   return initialState;

    default:
      return state;
  }
};
