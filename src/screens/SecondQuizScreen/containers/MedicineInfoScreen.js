import React, { PureComponent } from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  MedicineInfoScreenWrapper,
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

export class MedicineInfoScreen extends PureComponent {
  state = {
    disabled: false,
    medicine: this.props.medicine,
    secondQuiz: this.props.secondQuiz,
  };

  componentWillMount() {
    const { medicine, secondQuiz } = this.state;

    this.setState({
      medicine: secondQuiz ? secondQuiz.medicine : medicine,
    });
  }

  componentWillUnmount() {
    const { onReturn } = this.props;
    const { medicine } = this.state;

    onReturn(medicine);
  }

  onPress = () => {
    const { onChange } = this.props;
    const { medicine } = this.state;
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    if (medicine !== null) {
      onChange(medicine);
    } else {
      showMessage({
        message: strings("secondQuiz.chooseOne"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  render() {
    const { disabled, medicine } = this.state;
    return (
      <MedicineInfoScreenWrapper>
        <HintTextWrapper>
          <HintText>
            {strings("secondQuiz.drugs1")}
            {'\n'}
            {strings("secondQuiz.drugs2")}
          </HintText>
        </HintTextWrapper>

        <AnswerWrapper>
          <RadioButton
            title={strings("secondQuiz.yes3")}
            picked={medicine}
            onPress={() => this.setState({ medicine: true })}
          />
          <RadioButton
            title={strings("secondQuiz.no")}
            picked={medicine === false}
            onPress={() => this.setState({ medicine: false })}
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
      </MedicineInfoScreenWrapper>
    );
  }
}

MedicineInfoScreen.defaultProps = {
  onChange: () => {},
  onReturn: () => {},
};
