import React, { PureComponent } from 'react';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  ConsultInfoScreenWrapper,
  HintTextWrapper,
  UntouchableAnswerWrapper as AnswerWrapper,
  ButtonWrapper,
} from '../components';
import {
  RadioButton,
} from '.';
import {
  Button,
} from '../../../containers';
import {
  HintText, SecondQuizTextField, SecondQuizFieldFrame,
} from '../../../components';
import { colors } from '../../../constants';

import { strings } from "../../../../locale/i18n";

export class ConsultInfoScreen extends PureComponent {
  state = {
    disabled: false,
    consultingObject: this.props.consultingObject,
    secondQuiz: this.props.secondQuiz,
  };

  componentWillMount() {
    const { consultingObject, secondQuiz } = this.state;

    this.setState({
      consultingObject: secondQuiz ? secondQuiz.consultingObject : consultingObject,
    });
  }

  componentWillUnmount() {
    const { onReturn } = this.props;
    const { consultingObject } = this.state;

    onReturn(consultingObject);
  }

  onPress = () => {
    const { onChange } = this.props;
    const { consultingObject } = this.state;
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    if (consultingObject) {
      onChange(consultingObject);
    } else {
      showMessage({
        message: strings("secondQuiz.chooseOne"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  render() {
    const { disabled, consultingObject } = this.state;
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
      >
        <ConsultInfoScreenWrapper>
          <HintTextWrapper>
            <HintText>
              {strings("secondQuiz.psychHelp1")}
              {'\n'}
              {strings("secondQuiz.psychHelp2")}
            </HintText>
          </HintTextWrapper>

          <AnswerWrapper>
            <RadioButton
              title={strings("secondQuiz.yes")}
              picked={consultingObject === strings("secondQuiz.yes")}
              onPress={() => this.setState({ consultingObject: strings("secondQuiz.yes") })}
            />
            <RadioButton
              title={strings("secondQuiz.yes1")}
              picked={consultingObject === strings("secondQuiz.yes1")}
              onPress={() => this.setState({ consultingObject: strings("secondQuiz.yes1") })}
            />
            <RadioButton
              title={strings("secondQuiz.no")}
              picked={consultingObject === strings("secondQuiz.no")}
              onPress={() => this.setState({ consultingObject: strings("secondQuiz.no") })}
            />
            <SecondQuizFieldFrame>
              <SecondQuizTextField
                placeholder={strings("secondQuiz.other")}
                placeholderTextColor="#9db1c0"
                keyboardType="default"
                onChangeText={value => this.setState({ consultingObject: value })}
                maxLength={30}
              />
            </SecondQuizFieldFrame>
          </AnswerWrapper>

          <ButtonWrapper>
            <Button
              disabled={disabled}
              text={strings("firstQuiz.next")}
              type="primary"
              onPress={this.onPress}
            />
          </ButtonWrapper>
        </ConsultInfoScreenWrapper>
      </KeyboardAwareScrollView>
    );
  }
}

ConsultInfoScreen.defaultProps = {
  onChange: () => {},
  onReturn: () => {},
};
