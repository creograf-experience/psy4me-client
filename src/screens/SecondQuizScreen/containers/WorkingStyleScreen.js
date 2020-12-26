import React, { PureComponent } from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  WorkingStyleScreenWrapper,
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
  HintText,
} from '../../../components';
import { colors } from '../../../constants';

import { strings } from "../../../../locale/i18n";

export class WorkingStyleScreen extends PureComponent{
  state = {
    disabled: false,
    workingStyle: this.props.workingStyle,
    secondQuiz: this.props.secondQuiz,
  };

  componentWillMount() {
    const { workingStyle, secondQuiz } = this.state;

    this.setState({
      workingStyle: secondQuiz ? secondQuiz.workingStyle : workingStyle,
    });
  }

  componentWillUnmount() {
    const { onReturn } = this.props;
    const { workingStyle } = this.state;

    onReturn(workingStyle);
  }

  onPress = () => {
    const { onChange } = this.props;
    const { workingStyle } = this.state;
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    if (workingStyle) {
      onChange(workingStyle);
    } else {
      showMessage({
        message: strings("secondQuiz.chooseOne"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  render() {
    const { disabled, workingStyle } = this.state;
    return (
      <WorkingStyleScreenWrapper>
        <HintTextWrapper>
          <HintText>
            {strings("secondQuiz.styleInfo")}
          </HintText>
        </HintTextWrapper>

        <AnswerWrapper>
          <RadioButton
            title={strings("secondQuiz.style1")}
            picked={workingStyle === strings("secondQuiz.style1")}
            onPress={() => this.setState({ workingStyle: strings("secondQuiz.style1") })}
          />
          <RadioButton
            title={strings("secondQuiz.style2")}
            picked={workingStyle === strings("secondQuiz.style2")}
            onPress={() => this.setState({ workingStyle: strings("secondQuiz.style2") })}
          />
          <RadioButton
            title={strings("secondQuiz.style3")}
            picked={workingStyle === strings("secondQuiz.style3")}
            onPress={() => this.setState({ workingStyle: strings("secondQuiz.style3") })}
          />
        </AnswerWrapper>

        <ButtonWrapper>
          <Button
            disabled={disabled}
            text={strings("firstQuiz.next")}
            type="primary"
            onPress={this.onPress}
          />
        </ButtonWrapper>
      </WorkingStyleScreenWrapper>
    );
  }
}

WorkingStyleScreen.defaultProps = {
  onChange: () => {},
  onReturn: () => {},
};
