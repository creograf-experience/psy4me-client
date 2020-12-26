import { createAction } from 'redux-actions';
import { fetchYourPsych, deleteYourPsychNetworkRequest } from '../../networkers';

export const getYourPsychRequest = createAction('GET_YOUR_PSYCH_REQUEST');
export const getYourPsychSuccess = createAction('GET_YOUR_PSYCH_SUCCESS');
export const getYourPsychFailure = createAction('GET_YOUR_PSYCH_FAILURE');

export const deletePsychForClientRequest = createAction('DELETE_PSYCH_FOR_CLIENT_REQUEST');
export const deletePsychForClientSuccess = createAction('DELETE_PSYCH_FOR_CLIENT_SUCCESS');
export const deletePsychForClientFailure = createAction('DELETE_PSYCH_FOR_CLIENT_FAILURE');

export const getYourPsych = token => async (dispatch) => {
  dispatch(getYourPsychRequest());
  try {
    const {psychprofile} = await fetchYourPsych(token);
    dispatch(getYourPsychSuccess({psychprofile}));
  } catch (error) {
    dispatch(getYourPsychFailure({ serverError: error }));
  }
};

export const deletePsychForClient = (comment, token) => async (dispatch) => {
  dispatch(deletePsychForClientRequest());
  try {
    const response = await deleteYourPsychNetworkRequest(comment, token);
    dispatch(deletePsychForClientSuccess());
  } catch (error) {
    dispatch(deletePsychForClient({ serverError: error }));
  }
};