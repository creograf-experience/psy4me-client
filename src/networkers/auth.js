import { executeRequest } from '../utils';

export const logInNetworkRequest = (phone, password) => executeRequest({
  method: 'POST',
  url: 'public/client/auth/login',
  body: {
    content: JSON.stringify({ phone, password }),
    contentType: 'application/json',
  },
});

export const registerNetworkRequest = (phone, password) => executeRequest({
  method: 'POST',
  url: 'public/client/auth/reg',
  body: {
    content: JSON.stringify({ phone, password }),
    contentType: 'application/json',
  },
});

export const resetPasswordNetworkRequest = phone => executeRequest({
  method: 'POST',
  url: 'public/client/auth/code',
  body: {
    content: JSON.stringify({ phone }),
    contentType: 'application/json',
  },
});

export const codeSubmissionNetworkRequest = (phone, code) => executeRequest({
  method: 'PUT',
  url: 'public/client/auth/code',
  body: {
    content: JSON.stringify({ phone, code }),
    contentType: 'application/json',
  },
});

export const newPasswordNetworkRequest = (password, token) => executeRequest({
  method: 'PUT',
  url: 'private/client/auth/password',
  body: {
    content: JSON.stringify({ password }),
    contentType: 'application/json',
  },
  token,
});

export const firstQuizSubmissionNetworkRequest = (quiz, token) => executeRequest({
  method: 'PUT',
  url: 'private/client/auth/firstquiz/',
  body: {
    content: quiz,
    contentType: 'multipart/form-data',
  },
  token,
});

export const secondQuizSubmissionNetworkRequest = (quiz, token) => executeRequest({
  method: 'PUT',
  url: 'private/client/auth/secondquiz/',
  body: {
    content: JSON.stringify(quiz),
    contentType: 'application/json',
  },
  token,
});

export const connectPsychNetworkRequest = (couple, token) => executeRequest({
  method: 'PUT',
  url: 'private/client/auth/connectPsych',
  body: {
    content: JSON.stringify(couple),
    contentType: 'application/json',
  },
  token,
});
