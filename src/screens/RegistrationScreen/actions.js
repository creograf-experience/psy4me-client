import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';

import { registerNetworkRequest } from '../../networkers';
import { setToken } from '../../actions';

export const registerRequest = createAction('REGISTER_REQUEST');
export const registerSuccess = createAction('REGISTER_SUCCESS');
export const registerFailure = createAction('REGISTER_FAILURE');

export const register = (phone, password) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const response = await registerNetworkRequest(phone, password);
    const { token } = response;
    dispatch(setToken({ token }));
    AsyncStorage.setItem('jwt', token);
    dispatch(registerSuccess(phone));
  } catch (error) {
    dispatch(registerFailure({ serverError: error }));
  }
};
