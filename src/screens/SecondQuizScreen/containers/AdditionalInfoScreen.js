import React, { PureComponent } from 'react';

import {
  AdditionalInfoScreenWrapper,
  HintTextWrapper,
  UntouchableAnswerWrapper as AnswerWrapper,
  ButtonWrapper,
  SecondBigFieldWrapper,
} from '../components';

import {
  Button,
} from '../../../containers';
import {
  HintText,
  BigTextField,
  QuizBigFieldFrame,
} from '../../../components';

import { strings } from "../../../../locale/i18n";

export class AdditionalInfoScreen extends PureComponent {
  state = {
    disabled: false,
    infoObject: this.props.infoObject,
    secondQuiz: this.props.secondQuiz,
  };

  componentWillMount() {
    const { infoObject, secondQuiz } = this.state;

    this.setState({
      infoObject: secondQuiz ? secondQuiz.infoObject : infoObject,
    });
  }

  componentWillUnmount() {
    const { onReturn } = this.props;
    const { infoObject } = this.state;

    onReturn(infoObject);
  }

  onPress = () => {
    const { onChange } = this.props;
    const { infoObject } = this.state;
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    onChange(infoObject);
  };

  render() {
    const { disabled, infoObject } = this.state;

    return (
      <AdditionalInfoScreenWrapper>
        <HintTextWrapper>
          <HintText>
            {strings("secondQuiz.additionalInfo")}
          </HintText>
        </HintTextWrapper>
        <AnswerWrapper>
          <SecondBigFieldWrapper activeOpacity={1}>
            <QuizBigFieldFrame>
              <BigTextField
                value={infoObject}
                multiline
                onChangeText={value => this.setState({ infoObject: value })}
              />
            </QuizBigFieldFrame>
          </SecondBigFieldWrapper>
        </AnswerWrapper>

        <ButtonWrapper>
          <Button
            disabled={disabled}
            text={strings("firstQuiz.next")}
            type="primary"
            onPress={this.onPress}
          />
        </ButtonWrapper>
      </AdditionalInfoScreenWrapper>
    );
  }
}

AdditionalInfoScreen.defaultProps = {
  onChange: () => {},
  onReturn: () => {},
};
