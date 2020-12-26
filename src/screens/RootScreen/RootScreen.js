import React, { PureComponent } from 'react';
import FlashMessage from 'react-native-flash-message';

import AppStack from '../../routers';
import { ContainerWrapper } from '../../components';


export default class RootScreen extends PureComponent {
  state = {};

  render() {
    return (
      <ContainerWrapper>
        <AppStack />

        <FlashMessage
          duration={3000}
        />
      </ContainerWrapper>
    );
  }
}
