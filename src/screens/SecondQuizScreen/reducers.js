import { handleActions } from 'redux-actions';
import {
  secondQuizSubmissionRequest,
  secondQuizSubmissionSuccess,
  secondQuizSubmissionFailure,
  // getPsychsSuccess,
} from './actions';


const initialState = {
  fetching: false,
  status: null,
  errors: null,
  // psychs: [],
};

export const secondQuiz = handleActions(
  {
    [secondQuizSubmissionRequest](state) {
      return { ...state, fetching: true };
    },
    [secondQuizSubmissionSuccess](state) {
      return {
        ...state,
        errors: null,
        status: 'ok',
        fetching: false,
      };
    },
    [secondQuizSubmissionFailure](state, { payload }) {
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

/* export const psychs = handleActions(
  {
    [getPsychsSuccess](state, { payload }) {
      return { ...state, psychs: payload };
    },
  },
  initialState
); */
