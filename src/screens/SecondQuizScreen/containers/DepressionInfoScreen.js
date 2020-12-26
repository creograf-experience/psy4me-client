import React, { PureComponent } from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  DepressionInfoScreenWrapper,
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

export class DepressionInfoScreen extends PureComponent {
  state = {
    disabled: false,
    depression: this.props.depression,
    secondQuiz: this.props.secondQuiz,
  };

  componentWillMount() {
    const { depression, secondQuiz } = this.state;

    this.setState({
      depression: secondQuiz ? secondQuiz.depression : depression,
    });
  }

  componentWillUnmount() {
    const { onReturn } = this.props;
    const { depression } = this.state;

    onReturn(depression);
  }

  onPress = () => {
    const { onChange } = this.props;
    const { depression } = this.state;
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    if (depression !== null) {
      onChange(depression);
    } else {
      showMessage({
        message: strings("secondQuiz.chooseOne"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  render() {
    const { disabled, depression } = this.state;
    return (
      <DepressionInfoScreenWrapper>
        <HintTextWrapper>
          <HintText>
            {strings("secondQuiz.depression")}
          </HintText>
        </HintTextWrapper>

        <AnswerWrapper>
          <RadioButton
            title={strings("secondQuiz.yes3")}
            picked={depression}
            onPress={() => this.setState({ depression: true })}
          />
          <RadioButton
            title={strings("secondQuiz.no")}
            picked={depression === false}
            onPress={() => this.setState({ depression: false })}
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
      </DepressionInfoScreenWrapper>
    );
  }
}

DepressionInfoScreen.defaultProps = {
  onChange: () => {},
  onReturn: () => {},
};
