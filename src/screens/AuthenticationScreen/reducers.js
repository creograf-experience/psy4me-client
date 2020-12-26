import { handleActions } from 'redux-actions';
import { logInFailure, logInRequest, logInSuccess } from './actions';
import { setToken } from '../../actions';


const initialState = {
  fetching: false,
  token: null,
  phone: null,
  status: null,
  errors: null,
  quizDone: null,
};

export const logIn = handleActions(
  {
    [setToken](state, { payload }) {
      return { ...state, token: payload.token };
    },
    [logInRequest](state) {
      return { ...state, fetching: true };
    },
    [logInSuccess](state, { payload }) {
      return {
        ...state,
        phone: payload.phone,
        errors: null,
        status: 'ok',
        fetching: false,
        quizDone: payload.quizDone,
      };
    },
    [logInFailure](state, { payload }) {
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
