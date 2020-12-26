import { handleActions } from 'redux-actions';
import {
  getAllConsultationSuccess,
  getAllConsultationFailure,
  getAllConsultationRequest
} from './actions';

const initialState = {
  allConsultations:[],
  fetching: false,
  status: null,
  errors: null,
};

export const consultations = handleActions(
  {
    [getAllConsultationRequest](state) {
      return { ...state, fetching: true };
    },
    [getAllConsultationSuccess](state,{ payload }) {
      return {
        ...state,
        allConsultations:payload.consultations,
        errors: null,
        status: 'ok',
        fetching: false,
      };
    },
    [getAllConsultationFailure](state, { payload }) {
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