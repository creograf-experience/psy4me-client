import { executeRequest } from '../utils';


export const getIDNetworkRequest = token => executeRequest({
  method: 'GET',
  url: 'private/client/personal/id',
  token,
});

export const getProfileNetworkRequest = token => executeRequest({
  method: 'GET',
  url: 'private/client/personal/profile',
  token,
});

export const fetchFirstQuizNetworkRequest = token => executeRequest({
  method: 'GET',
  url: 'private/client/personal/fetchfirstquiz',
  token,
});

export const fetchSecondQuizNetworkRequest = token => executeRequest({
  method: 'GET',
  url: 'private/client/personal/fetchsecondquiz',
  token,
});

export const getPsychsNetWorkRequest = token => executeRequest({
  method: 'GET',
  url: 'private/client/personal/listofpsych',
  token,
});

export const fetchYourPsych = token => executeRequest({
  method: 'GET',
  url: 'private/client/personal/psychforclient',
  token,
});

export const deleteYourPsychNetworkRequest = (comment, token) => executeRequest({
  method: 'PUT',
  url: 'private/client/personal/deleteYourPsych',
  body: {
    content: JSON.stringify(comment),
    contentType: 'application/json',
  },
  token,
});