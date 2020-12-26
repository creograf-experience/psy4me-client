import { createAction } from 'redux-actions';

import { logInNetworkRequest } from '../../networkers';
import { setToken } from '../../actions';

export const logInRequest = createAction('LOG_IN_REQUEST');
export const logInSuccess = createAction('LOG_IN_SUCCESS');
export const logInFailure = createAction('LOG_IN_FAILURE');

export const logIn = (login, password) => async (dispatch, getState) => {
  dispatch(logInRequest());

  try {
    // const token = await logInNetworkRequest(login, password);
    const token = '123';
    

    dispatch(setToken({ token }));

    dispatch(logInSuccess());
  } catch (e) {
    dispatch(logInFailure());
  }
};
