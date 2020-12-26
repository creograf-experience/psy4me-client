import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ContainerWrapper, BodyText, HeaderText } from '../../components';
import { ContentWrapper } from './components';

export default class MainScreen extends PureComponent {
  state = {};

  render() {
    return (
      <ContainerWrapper>
        <ContentWrapper>
          <HeaderText size="h3">Main Screen</HeaderText>

          <BodyText>This is a React Native template!</BodyText>
        </ContentWrapper>
      </ContainerWrapper>
    );
  }
}

MainScreen.navigationOptions = {
  headerTitle: 'Экран',
};
