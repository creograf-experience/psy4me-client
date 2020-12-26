import { createStackNavigator } from 'react-navigation';

import {
  AuthenticationScreen,
  PasswordResetScreen,
  RegistrationScreen,
  FirstQuizScreen,
  SecondQuizScreen,
  QuizDoneScreen,
} from '../screens';
import {
  AUTHENTICATION_SCREEN,
  RESET_PASSWORD_SCREEN,
  REGISTRATION_SCREEN,
  FIRST_QUIZ_SCREEN,
  SECOND_QUIZ_SCREEN,
  QUIZ_DONE_SCREEN,
} from '../constants';

const AuthenticationStack = createStackNavigator(
  {
    [AUTHENTICATION_SCREEN]: {
      screen: AuthenticationScreen,
    },
    [RESET_PASSWORD_SCREEN]: {
      screen: PasswordResetScreen,
    },
    [REGISTRATION_SCREEN]: {
      screen: RegistrationScreen,
    },
    [FIRST_QUIZ_SCREEN]: {
      screen: FirstQuizScreen,
    },
    [SECOND_QUIZ_SCREEN]: {
      screen: SecondQuizScreen,
    },
    [QUIZ_DONE_SCREEN]: {
      screen: QuizDoneScreen,
    },
  },
  {
    initialRouteName: AUTHENTICATION_SCREEN,
  }
);

export default AuthenticationStack;
