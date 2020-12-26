import { executeRequest } from '../utils';

export const addConsultationRequest = (infoCons,token) => executeRequest({
  method: 'POST',
  url: 'private/client/consultations',
  body: {
    content: JSON.stringify(infoCons),
    contentType: 'application/json',
  },
  token
});

export const fetchAllConsultationRequest = token => executeRequest({
  method: 'GET',
  url: 'private/client/consultations',
  token
});

export const rescheduleConsultationRequest = (newDate, token) => executeRequest({
  method:'PUT',
  url: 'private/client/consultations',
  body: {
    content: JSON.stringify( newDate ),
    contentType: 'application/json',
  },
  token,
});

export const acceptRescheduleConsultationRequest = (id,token) => executeRequest({
  method:'PUT',
  url: 'private/client/consultations/accept-reschedule',
  body: {
    content: JSON.stringify({ id }),
    contentType: 'application/json'
  },
  token
});

export const completeConsultationRequest = (id,token) => executeRequest({
  method:'PUT',
  url: 'private/client/consultations/complete',
  body: {
    content: JSON.stringify( {id} ),
    contentType: 'application/json'
  },
  token
});

export const rateConsultationRequest = (rate,token) => executeRequest({
  method:'PUT',
  url: 'private/client/consultations/rate',
  body: {
    content: JSON.stringify( rate ),
    contentType: 'application/json'
  },
  token
});