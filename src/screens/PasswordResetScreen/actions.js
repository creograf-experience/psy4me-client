import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';

import {
  resetPasswordNetworkRequest,
  codeSubmissionNetworkRequest,
  newPasswordNetworkRequest,
} from '../../networkers';
import { setToken } from '../../actions';


export const passwordResetRequest = createAction('PASSWORD_RESET_REQUEST');

export const phoneSubmissionSuccess = createAction('PHONE_SUBMISSION_SUCCESS');
export const codeSubmissionSuccess = createAction('CODE_SUBMISSION_SUCCESS');
export const newPasswordSubmissionSuccess = createAction('NEW_PASSWORD_SUBMISSION_SUCCESS');

export const passwordResetFailure = createAction('PASSWORD_RESET_FAILURE');

export const setPhone = createAction('SET_PHONE');

export const sendCode = phone => async (dispatch) => {
  dispatch(passwordResetRequest());

  try {
    const response = await resetPasswordNetworkRequest(phone);
    dispatch(phoneSubmissionSuccess());
  } catch (error) {
    dispatch(passwordResetFailure({ serverError: error }));
  }
};

export const submitCode = (phone, code) => async (dispatch) => {
  dispatch(passwordResetRequest());

  try {
    const response = await codeSubmissionNetworkRequest(phone, code);
    const { token } = response;
    dispatch(setToken({ token }));
    AsyncStorage.setItem('jwt', token);
    dispatch(setPhone(phone));
    dispatch(codeSubmissionSuccess());
  } catch (error) {
    dispatch(passwordResetFailure({ serverError: error }));
  }
};

export const submitNewPassword = (password, token) => async (dispatch) => {
  dispatch(passwordResetRequest());
  try {
    const response = await newPasswordNetworkRequest(password, token);
    dispatch(newPasswordSubmissionSuccess());
  } catch (error) {
    dispatch(passwordResetFailure({ serverError: error }));
  }
};
