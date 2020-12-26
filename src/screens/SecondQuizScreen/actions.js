import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';

import { secondQuizSubmissionNetworkRequest/* , getPsychsNetWorkRequest */ } from '../../networkers';

export const secondQuizSubmissionRequest = createAction('QUIZ_SUBMISSION_REQUEST');
export const secondQuizSubmissionSuccess = createAction('QUIZ_SUBMISSION_SUCCESS');
export const secondQuizSubmissionFailure = createAction('QUIZ_SUBMISSION_FAILURE');

/* export const getPsychsRequest = createAction('GET_PSYCHS_REQUEST');
export const getPsychsSuccess = createAction('GET_PSYCHS_SUCCESS');
export const getPsychsFailed = createAction('GET_PSYCHS_FAILED'); */

export const submitQuiz = quiz => async (dispatch) => {
  dispatch(secondQuizSubmissionRequest());

  try {
    const token = await AsyncStorage.getItem('jwt');
    const response = await secondQuizSubmissionNetworkRequest(quiz, token);
    dispatch(secondQuizSubmissionSuccess());
    AsyncStorage.setItem('quizDone', 'done');
  } catch (error) {
    dispatch(secondQuizSubmissionFailure({ serverError: error }));
  }
};

/* export const getPsychs = token => async (dispatch) => {
  dispatch(getPsychsRequest());
  try {
    const response = await getPsychsNetWorkRequest(token);
    dispatch(getPsychsSuccess(response.listofpsych));
  } catch (error) {
    dispatch(getPsychsFailed({ serverError: error }));
  }
}; */
