import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';

export const setToken = createAction('SET_TOKEN');

export const logOutRequest = createAction('LOG_OUT_REQUEST');
export const logOutSuccess = createAction('LOG_OUT_SUCCESS');
export const logOutFailure = createAction('LOG_OUT_FAILURE');
export const loginUser = createAction('LOGIN_USER');

export const logOut = () => async (dispatch) => {
  dispatch(logOutRequest());

  try {
    await AsyncStorage.removeItem('jwt');
    await AsyncStorage.removeItem('quizDone');

    dispatch(setToken({ token: null }));
    dispatch(logOutSuccess());
  } catch (e) {
    dispatch(logOutFailure());
  }
};
