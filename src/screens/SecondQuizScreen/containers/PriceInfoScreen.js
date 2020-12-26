import React, { PureComponent } from 'react';
import { showMessage } from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native';

import {
  PriceInfoScreenWrapper,
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

export class PriceInfoScreen extends PureComponent {
  state = {
    disabled: false,
    priceObject: this.props.priceObject,
    secondQuiz: this.props.secondQuiz,
  };

  componentWillMount() {
    const { priceObject, secondQuiz } = this.state;

    this.setState({
      priceObject: secondQuiz ? secondQuiz.priceObject : priceObject,
    });
  }

  componentWillUnmount() {
    const { onReturn } = this.props;
    const { priceObject } = this.state;

    onReturn(priceObject);
  }

  onPress = () => {
    const { onChange } = this.props;
    const { priceObject } = this.state;
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    if (priceObject) {
      onChange(priceObject);
    } else {
      showMessage({
        message: strings("secondQuiz.chooseOne"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  render() {
    const { disabled, priceObject } = this.state;
    return (
      <PriceInfoScreenWrapper>
        <TouchableOpacity activeOpacity={1}>
          <HintTextWrapper>
            <HintText>
              {strings("secondQuiz.price1")}
              {'\n'}
              {strings("secondQuiz.price2")}
              {'\n'}
              {strings("secondQuiz.price3")}
            </HintText>
          </HintTextWrapper>

          <AnswerWrapper>
            <HintText>
              {strings("secondQuiz.psychEducation1")}
              {'\n'}
              {strings("secondQuiz.psychEducation2")}
            </HintText>
            <RadioButton
              title={`1500 р / ${strings("secondQuiz.hour")}`}
              picked={priceObject === `1500 р / ${strings("secondQuiz.hour")}`}
              onPress={() => this.setState({ priceObject: `1500 р / ${strings("secondQuiz.hour")}` })}
            />
            <HintText>
              {strings("secondQuiz.psychEducation1")}
              {'\n'}
              {strings("secondQuiz.psychEducation3")}
            </HintText>
            <RadioButton
              title={`3000 р / ${strings("secondQuiz.hour")}`}
              picked={priceObject === `3000 р / ${strings("secondQuiz.hour")}`}
              onPress={() => this.setState({ priceObject: `3000 р / ${strings("secondQuiz.hour")}` })}
            />
            <HintText>
              {strings("secondQuiz.psychEducation4")}
              {'\n'}
              {strings("secondQuiz.psychAchievements")}
            </HintText>
            <RadioButton
              title={`10 000 р / ${strings("secondQuiz.hour")}`}
              picked={priceObject === `10 000 р / ${strings("secondQuiz.hour")}`}
              onPress={() => this.setState({ priceObject: `10 000 р / ${strings("secondQuiz.hour")}` })}
            />
            <RadioButton
              title={strings("secondQuiz.noMatter")}
              picked={priceObject === strings("secondQuiz.noMatter")}
              onPress={() => this.setState({ priceObject: strings("secondQuiz.noMatter") })}
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
        </TouchableOpacity>
      </PriceInfoScreenWrapper>
    );
  }
}

PriceInfoScreen.defaultProps = {
  onChange: () => {},
  onReturn: () => {},
};
