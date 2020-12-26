import React, { PureComponent } from 'react';

import {
  StartScreenWrapper,
} from '../components';
import {
  Button,
} from '../../../containers';
import {
  HintText,
} from '../../../components';

import { strings } from "../../../../locale/i18n";


type Props = {};

export class StartScreen extends PureComponent<Props> {
  state = {
    disabled: false,
  };

  onPress = () => {
    const { onChange } = this.props;
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);
    onChange();
  };

  render() {
    const { disabled } = this.state;

    return (
      <StartScreenWrapper>
        <HintText>
          {strings("secondQuiz.quizInfo1")}
          {'\n'}
          {strings("secondQuiz.quizInfo2")}
          {'\n'}
          {strings("secondQuiz.quizInfo3")}
        </HintText>

        <Button
          disabled={disabled}
          text={strings("secondQuiz.forward")}
          type="primary"
          onPress={this.onPress}
        />
      </StartScreenWrapper>
    );
  }
}

StartScreen.defaultProps = {
  onChange: () => {},
};
