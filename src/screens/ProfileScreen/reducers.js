import { handleActions } from 'redux-actions';
import {
  getDataRequest,
  getIDSuccess,
  getProfileSuccess,
  fetchFirstQuizSuccess,
  fetchSecondQuizSuccess,
  getPsychsSuccess,
  getDataFailure,
} from './actions';

import { logOutSuccess } from '../../actions';

const initialState = {
  fetching: false,
  userID: null,
  profile: null,
  firstQuiz: null,
  secondQuiz: null,
  status: null,
  errors: null,
  psychList: null,
};

export const profile = handleActions(
  {
    [getDataRequest](state) {
      return {
        ...state,
        fetching: true,
      };
    },
    [getIDSuccess](state, { payload }) {
      return {
        ...state,
        userID: payload.userID,
        errors: null,
        status: 'ok',
        fetching: false,
      };
    },
    [getProfileSuccess](state, { payload }) {
      return {
        ...state,
        profile: payload.profile,
        errors: null,
        status: 'ok',
        fetching: false,
      };
    },
    [fetchFirstQuizSuccess](state, { payload }) {
      return {
        ...state,
        firstQuiz: payload.quiz,
        errors: null,
        status: 'ok',
        fetching: false,
      };
    },
    [fetchSecondQuizSuccess](state, { payload }) {
      return {
        ...state,
        secondQuiz: payload.quiz,
        errors: null,
        status: 'ok',
        fetching: false,
      };
    },
    [getPsychsSuccess](state, { payload }) {
      return {
        ...state,
        psychList: payload.psychList,
        errors: null,
        status: 'ok',
        fetching: false,
      };
    },
    [getDataFailure](state, { payload }) {
      return {
        ...state,
        errors: payload.serverError,
        status: 'error',
        fetching: false,
      };
    },
    [logOutSuccess](state) {
      return {
        ...state,
        firstQuiz: null,
      };
    },
  },
  initialState
);
