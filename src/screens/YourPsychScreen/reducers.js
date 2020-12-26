import { handleActions } from 'redux-actions';
import {
  getYourPsychSuccess,
  getYourPsychFailure,
  getYourPsychRequest
} from './actions';

const initialState = {
  psychProfile:{},
  fetching: false,
  status: null,
  errors: null,
};

export const profilepsych = handleActions(
  {
    [getYourPsychRequest](state) {
      return { ...state, fetching: true };
    },
    [getYourPsychSuccess](state,{ payload }) {
      return {
        ...state,
        psychProfile:payload.psychprofile,
        errors: null,
        status: 'ok',
        fetching: false,
      };
    },
    [getYourPsychFailure](state, { payload }) {
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