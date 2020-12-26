import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { AUTHENTICATION_STACK, MAIN_STACK } from '../constants';
import AuthenticationStack from './AuthenticationsStack';
import MainStack from './MainStack';


const root = createSwitchNavigator(
  {
    [AUTHENTICATION_STACK]: {
      screen: AuthenticationStack,
    },
    [MAIN_STACK]: {
      screen: MainStack,
    },
  },
  {},
);

export default createAppContainer(root);
