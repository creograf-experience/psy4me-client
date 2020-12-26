import { handleActions } from 'redux-actions';
import { registerFailure, registerRequest, registerSuccess } from './actions';
import { setToken } from '../../actions';


const initialState = {
  fetching: false,
  token: null,
  phone: null,
  status: null,
  errors: null,
};

export const registration = handleActions(
  {
    [setToken](state, { payload }) {
      return { ...state, token: payload.token };
    },
    [registerRequest](state) {
      return { ...state, fetching: true };
    },
    [registerSuccess](state, { payload }) {
      return {
        ...state,
        phone: payload.phone,
        errors: null,
        status: 'ok',
        fetching: false,
      };
    },
    [registerFailure](state, { payload }) {
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
