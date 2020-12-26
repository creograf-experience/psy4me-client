import React, { PureComponent } from 'react';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  PsychoHelpScreenWrapper,
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

export class PsychoHelpScreen extends PureComponent {
  state = {
    disabled: false,
    psychoHelp: this.props.psychoHelp,
    secondQuiz: this.props.secondQuiz,
  };

  componentWillMount() {
    const { psychoHelp, secondQuiz } = this.state;

    this.setState({
      psychoHelp: secondQuiz ? secondQuiz.psychoHelp : psychoHelp,
    });
  }

  componentWillUnmount() {
    const { onReturn } = this.props;
    const { psychoHelp } = this.state;

    onReturn(psychoHelp);
  }

  onPress = () => {
    const { onChange } = this.props;
    const { psychoHelp } = this.state;
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    if (psychoHelp) {
      onChange(psychoHelp);
    } else {
      showMessage({
        message: strings("secondQuiz.chooseOne"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  render() {
    const { disabled, psychoHelp } = this.state;
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
      >
        <PsychoHelpScreenWrapper>
          <HintTextWrapper>
            <HintText>
              {strings("secondQuiz.psych")}
            </HintText>
          </HintTextWrapper>

          <AnswerWrapper>
            <RadioButton
              title={strings("secondQuiz.forMe")}
              picked={psychoHelp === strings("secondQuiz.forMe")}
              onPress={() => this.setState({ psychoHelp: strings("secondQuiz.forMe") })}
            />
            <RadioButton
              title={strings("secondQuiz.forChild")}
              picked={psychoHelp === strings("secondQuiz.forChild")}
              onPress={() => this.setState({ psychoHelp: strings("secondQuiz.forChild") })}
            />
            <RadioButton
              title={strings("secondQuiz.familyOrCouple")}
              picked={psychoHelp === strings("secondQuiz.familyOrCouple")}
              onPress={() => this.setState({ psychoHelp: strings("secondQuiz.familyOrCouple") })}
            />
            <SecondQuizFieldFrame>
              <SecondQuizTextField
                placeholder={strings("secondQuiz.other")}
                placeholderTextColor="#9db1c0"
                keyboardType="default"
                onChangeText={value => this.setState({ psychoHelp: value })}
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
        </PsychoHelpScreenWrapper>
      </KeyboardAwareScrollView>
    );
  }
}

PsychoHelpScreen.defaultProps = {
  onChange: () => {},
  onReturn: () => {},
};
