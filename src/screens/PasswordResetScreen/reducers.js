import { handleActions } from 'redux-actions';

import {
  passwordResetRequest,
  phoneSubmissionSuccess,
  codeSubmissionSuccess,
  newPasswordSubmissionSuccess,
  passwordResetFailure,
  setPhone,
} from './actions';
import { setToken } from '../../actions';


const initialState = {
  fetching: false,
  token: null,
  phone: null,
  status: null,
  errors: null,
};

export const resetPW = handleActions(
  {
    [setToken](state, { payload }) {
      return { ...state, token: payload.token };
    },
    [setPhone](state, { payload }) {
      return { ...state, phone: payload.phone };
    },
    [passwordResetRequest](state) {
      return { ...state, fetching: true };
    },
    [phoneSubmissionSuccess](state) {
      return {
        ...state,
        errors: null,
        status: 'phoneSubmitted',
        fetching: false,
      };
    },
    [codeSubmissionSuccess](state) {
      return {
        ...state,
        errors: null,
        status: 'codeSubmitted',
        fetching: false,
      };
    },
    [newPasswordSubmissionSuccess](state) {
      return {
        ...state,
        errors: null,
        status: 'newPasswordSubmitted',
        fetching: false,
      };
    },
    [passwordResetFailure](state, { payload }) {
      return {
        ...state,
        errors: payload.serverError,
        status: 'error',
        fetching: false,
      };
    },
  },
  initialState
);
