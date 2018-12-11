import axios from 'axios';

import {
  SET_SECRET_WORD
} from '../config/constants';

import { getLetterMatchCount } from '../functions/index';

export const getSecretWord = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3030').then((response) => {
      dispatch({
        type: SET_SECRET_WORD,
        payload: response.data
      });
    });
  };
};
