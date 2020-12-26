import React, { PureComponent } from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  HintText,
  PointerHandlerWrapper,
} from '../../../components';
import {
  CheckButton,
  Button,
} from '../../../containers';
import {
  AnswerWrapper,
  HintTextWrapper,
  ButtonWrapper,
  TroubleScreenWrapper,
} from '../components';
import { colors } from '../../../constants';

import { strings } from "../../../../locale/i18n";

export class TroubleScreen extends PureComponent {
  state = {
    disabled: false,
    pickedTroubles: this.props.pickedTroubles,
    secondQuiz: this.props.secondQuiz,
  };

  componentWillMount() {
    const { pickedTroubles, secondQuiz } = this.state;

    this.setState({
      pickedTroubles: secondQuiz ? secondQuiz.troubles : pickedTroubles,
    });
  }

  componentWillUnmount() {
    const { onReturn } = this.props;
    const { pickedTroubles } = this.state;

    onReturn(pickedTroubles);
  }

  onPick = (picked, value, index) => {
    const { pickedTroubles } = this.state;

    pickedTroubles[index] = picked ? value : "";

    this.setState({ pickedTroubles });
  };

  onPress = () => {
    const { onChange } = this.props;
    const { pickedTroubles } = this.state;
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    const pickedSet = new Set(pickedTroubles);
    if (pickedSet.size > 1) {
      onChange(pickedTroubles);
    } else {
      showMessage({
        message: strings("secondQuiz.chooseTrouble"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  render() {
    const { disabled, pickedTroubles } = this.state;

    return (
      <TroubleScreenWrapper
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <HintTextWrapper>
          <HintText>
            {strings("secondQuiz.troubleInfo")}
          </HintText>
        </HintTextWrapper>

        <AnswerWrapper
          activeOpacity={1}
        >
          <PointerHandlerWrapper
            style={{ justifyContent: 'flex-start' }}
          >
            <CheckButton
              text={strings("secondQuiz.trouble1")}
              onPress={(picked, value) => this.onPick(picked, value, 0)}
              picked={!!pickedTroubles[0]}
            />
            <CheckButton
              text={strings("secondQuiz.trouble2")}
              onPress={(picked, value) => this.onPick(picked, value, 1)}
              picked={!!pickedTroubles[1]}
            />
            <CheckButton
              text={strings("secondQuiz.trouble3")}
              onPress={(picked, value) => this.onPick(picked, value, 2)}
              picked={!!pickedTroubles[2]}
            />
            <CheckButton
              text={strings("secondQuiz.trouble4")}
              onPress={(picked, value) => this.onPick(picked, value, 3)}
              picked={!!pickedTroubles[3]}
            />
            <CheckButton
              text={strings("secondQuiz.trouble5")}
              onPress={(picked, value) => this.onPick(picked, value, 4)}
              picked={!!pickedTroubles[4]}
            />
            <CheckButton
              text={strings("secondQuiz.trouble6")}
              onPress={(picked, value) => this.onPick(picked, value, 5)}
              picked={!!pickedTroubles[5]}
            />
            <CheckButton
              text={strings("secondQuiz.trouble7")}
              onPress={(picked, value) => this.onPick(picked, value, 6)}
              picked={!!pickedTroubles[6]}
            />
            <CheckButton
              text={strings("secondQuiz.trouble8")}
              onPress={(picked, value) => this.onPick(picked, value, 7)}
              picked={!!pickedTroubles[7]}
            />
            <CheckButton
              text={strings("secondQuiz.trouble9")}
              onPress={(picked, value) => this.onPick(picked, value, 8)}
              picked={!!pickedTroubles[8]}
            />
            <CheckButton
              text={strings("secondQuiz.trouble10")}
              onPress={(picked, value) => this.onPick(picked, value, 9)}
              picked={!!pickedTroubles[9]}
            />
            <CheckButton
              text={strings("secondQuiz.trouble11")}
              onPress={(picked, value) => this.onPick(picked, value, 10)}
              picked={!!pickedTroubles[10]}
            />
            <CheckButton
              text={strings("secondQuiz.trouble12")}
              onPress={(picked, value) => this.onPick(picked, value, 11)}
              picked={!!pickedTroubles[11]}
            />
            <CheckButton
              text={strings("secondQuiz.trouble13")}
              onPress={(picked, value) => this.onPick(picked, value, 12)}
              picked={!!pickedTroubles[12]}
            />
          </PointerHandlerWrapper>
        </AnswerWrapper>

        <ButtonWrapper>
          <Button
            disabled={disabled}
            text={strings("firstQuiz.next")}
            type="primary"
            onPress={this.onPress}
          />
        </ButtonWrapper>
      </TroubleScreenWrapper>
    );
  }
}

TroubleScreen.defaultProps = {
  onChange: () => {},
};
