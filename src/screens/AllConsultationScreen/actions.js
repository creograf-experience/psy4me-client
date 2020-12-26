import { createAction } from 'redux-actions';
import { fetchAllConsultationRequest } from '../../networkers';

export const getAllConsultationRequest = createAction('GET_ALL_CONSULTATION_REQUEST');
export const getAllConsultationSuccess = createAction('GET_ALL_CONSULTATION_SUCCESS');
export const getAllConsultationFailure = createAction('GET_ALL_CONSULTATION_FAILURE');

export const getAllConsultation = token => async (dispatch) => {
  dispatch(getAllConsultationRequest());
  try {
    const { consultations } = await fetchAllConsultationRequest(token);
    dispatch(getAllConsultationSuccess({ consultations }));
  } catch (error) {
    dispatch(getAllConsultationFailure({ serverError: error }));
  }
};