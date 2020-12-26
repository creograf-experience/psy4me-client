import { handleActions } from 'redux-actions';
import { logOutSuccess, setToken, loginUser } from '../actions';

const initialState = {
  token: '',
  user:null
};

export const auth = handleActions(
  {
    [setToken](state, { payload }) {
      return { ...state, token: payload.token };
    },
    [logOutSuccess](state) {
      return { ...state, token: '' };
    },
    [loginUser](state, {payload}) {
      return {...state, user:payload}
    }
  },
  initialState
);
