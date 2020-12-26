import { handleActions } from 'redux-actions';
import {
  firstQuizSubmissionRequest,
  firstQuizSubmissionSuccess,
  firstQuizSubmissionFailure,
} from './actions';


const initialState = {
  fetching: false,
  status: null,
  errors: null,
};

export const firstQuiz = handleActions(
  {
    [firstQuizSubmissionRequest](state) {
      return { ...state, fetching: true };
    },
    [firstQuizSubmissionSuccess](state) {
      return {
        ...state,
        errors: null,
        status: 'ok',
        fetching: false,
      };
    },
    [firstQuizSubmissionFailure](state, { payload }) {
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
