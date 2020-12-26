import React, { PureComponent } from 'react';
import Image from 'react-native-remote-svg';
import { scale } from 'react-native-size-matters';
import { BackHandler } from 'react-native';

import {
  ContainerWrapper,
  ContentWrapper,
  BlueBodyText,
  HintText,
} from '../../components';
import {
  Button,
  Header,
} from '../../containers';
import {
  QuizDoneWrapper,
  BottomButtonWrapper,
} from './components';
import {
  PROFILE_SCREEN,
  CONSULTANT_SELECTING_SCREEN,
} from '../../constants';
import documentImage from '../../../assets/images/documentImage.svg';

import { strings } from "../../../locale/i18n";

export default class QuizDoneScreenComponent extends PureComponent {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => true;

  render() {
    const { navigation } = this.props;

    return (
      <ContainerWrapper>
        <ContentWrapper>
          <Header
            title={strings("secondQuiz.secondQuizTitle")}
          />

          <QuizDoneWrapper>
            <Image
              source={documentImage}
              style={
                {
                  width: scale(100),
                  height: scale(110),
                  marginBottom: 25,
                }
              }
            />
            <BlueBodyText>
              {strings("secondQuiz.dataIsSent1")}
            </BlueBodyText>
            {/* <HintText>
              {strings("secondQuiz.dataIsSent2")}
              {'\n'}
              {strings("secondQuiz.dataIsSent3")}
              {'\n'}
              {strings("secondQuiz.dataIsSent4")}
            </HintText> */}
          </QuizDoneWrapper>

          <BottomButtonWrapper>
            <Button
              text={strings("secondQuiz.goToProfile")}
              type="primary"
              onPress={() => {
                navigation.navigate(PROFILE_SCREEN);
              }}
            />
          </BottomButtonWrapper>
        </ContentWrapper>
      </ContainerWrapper>
    );
  }
}

QuizDoneScreenComponent.defaultProps = {};

QuizDoneScreenComponent.navigationOptions = {
  header: null,
  gesturesEnabled: false,
};
