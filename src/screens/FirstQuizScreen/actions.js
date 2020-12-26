import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';

import { firstQuizSubmissionNetworkRequest } from '../../networkers';

export const firstQuizSubmissionRequest = createAction('QUIZ_SUBMISSION_REQUEST');
export const firstQuizSubmissionSuccess = createAction('QUIZ_SUBMISSION_SUCCESS');
export const firstQuizSubmissionFailure = createAction('QUIZ_SUBMISSION_FAILURE');

export const submitQuiz = quiz => async (dispatch) => {
  dispatch(firstQuizSubmissionRequest());

  try {
    const token = await AsyncStorage.getItem('jwt');
    const response = await firstQuizSubmissionNetworkRequest(quiz, token);
    dispatch(firstQuizSubmissionSuccess());
  } catch (error) {
    dispatch(firstQuizSubmissionFailure({ serverError: error }));
  }
};
