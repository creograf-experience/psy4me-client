import React, { PureComponent } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Platform,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

import {
  AvoidingContainerWrapper,
  HintText,
  ErrorText,
  ContentWrapper,
} from '../../components';
import {
  UIWrapper,
  FieldWrapper,
  ErrorWrapper,
  ButtonWrapper,
  TimerButtonWrapper,
  HorizontalFormWrapper,
} from './components';
import {
  ImageContainer,
  Button,
  SingleField,
} from '../../containers';
import {
  SquareField,
} from './containers';
import { colors, MAIN_SCREEN } from '../../constants';
import logo from '../../../assets/images/logos/logo.png';
import { strings } from "../../../locale/i18n";


type Props = {};

export default class PasswordResetScreen extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      phoneEntered: false,
      code: '',
      codeFormMounted: false,
      firstEditable: false,
      secondEditable: false,
      thirdEditable: false,
      fourthEditable: false,
      seconds: 30,
      timeElapsed: false,
      codeEntered: false,
      newPassword: '',
      token: null,
      errors: {
        passwordError: '',
        serverError: '',
      },
    };

    this.keyboardHeight = new Animated.Value(0);
    this.androidEventDuration = 10;
  }

  handleFirstFieldChange = async digit => {
    if (digit.length === 1) {
      await this.setState({
        code: this.state.code + digit.toString(),
        secondEditable: true,
      });
      this.secondField.focus();

      await this.setState({
        firstEditable: false,
      });
    }
  };

  handleSecondFieldChange = async digit => {
    if (digit.length === 1) {
      await this.setState({
        code: this.state.code + digit.toString(),
        thirdEditable: true
      });
      this.thirdField.focus();

      await this.setState({
        secondEditable: false,
      });
    }
  };

  handleSecondBackspacePress = async ({ nativeEvent: { key: keyValue } }) => {
    if (keyValue === 'Backspace') {
      await this.setState({
        code: this.state.code.slice(0, 0),
        firstEditable: true,
        secondEditable: false
      });
      this.firstField.focus();
    }
  };

  handleThirdFieldChange = async digit => {
    if (digit.length === 1) {
      await this.setState({
        code: this.state.code + digit.toString(),
        fourthEditable: true
      });
      this.fourthField.focus();

      await this.setState({
        thirdEditable: false,
      });
    }
  };

  handleThirdBackspacePress = async ({ nativeEvent: { key: keyValue } }) => {
    if (keyValue === 'Backspace') {
      await this.setState({
        code: this.state.code.slice(0, 1),
        secondEditable: true,
        thirdEditable: false,
      });
      this.secondField.focus();
    }
  };

  handleFourthFieldChange = async digit => {
    if (digit.length === 1) {
      await this.setState({ code: this.state.code + digit.toString() });
      this.submitCode();
    }
  };

  handleFourthBackspacePress = async ({ nativeEvent: { key: keyValue } }) => {
    if (keyValue === 'Backspace') {
      await this.setState({
        code: this.state.code.slice(0, 2),
        thirdEditable: true,
        fourthEditable: false,
      });
      this.thirdField.focus();
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { errors } = this.state;

    if (nextProps.fetching) {
      return;
    }

    if (nextProps.errors) {
      this.setState({
        errors: {
          ...errors,
          serverError: nextProps.errors,
        },
        code: this.state.code.slice(0, 0),
        fourthEditable: false,
        firstEditable: true,
      }, () => {
        showMessage({
          message: nextProps.errors,
          type: 'danger',
          backgroundColor: colors.errorColor,
        });
        if (this.firstField) {
          this.firstField.focus();
        }
      });
    } else {
      this.setState({
        errors: {
          ...errors,
          serverError: '',
        },
      }, () => {
        if (nextProps.status === 'phoneSubmitted') {
          this.setState({
            phoneEntered: true,
            timeElapsed: false,
            seconds: 30,
          });
          this.setTimer();
        } else if (nextProps.status === 'codeSubmitted') {
          this.setState({ codeEntered: true, token: nextProps.token });
        } else if (nextProps.status === 'newPasswordSubmitted') {
          this.goToMainScreen();
        }
      });
    }
  }

  sendCode = async () => {
    const { phoneNumber } = this.state;
    const { sendCode } = this.props;

    await sendCode(phoneNumber);
  };

  submitCode = async () => {
    const { code, phoneNumber } = this.state;
    const { submitCode } = this.props;

    await submitCode(phoneNumber, code);
  };

  submitNewPassword = () => {
    const { errors, newPassword } = this.state;

    this.setState({
      errors: {
        ...errors,
        passwordError: newPassword.length < 6 ? strings("passReset.pasRequired") : '',
      },
    }, this.validateNewPassword);
  };

  validateNewPassword = async () => {
    const { errors } = this.state;

    if (!errors.passwordError) {
      const { newPassword, token } = this.state;
      const { submitNewPassword } = this.props;
      await submitNewPassword(newPassword, token);
    } else {
      showMessage({
        message: errors.passwordError,
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  goToMainScreen = () => {
    const { navigation } = this.props;
    navigation.navigate(MAIN_SCREEN);
  };

  setTimer = () => {
    this.interval = setInterval(
      () => this.setState(prevState => ({ seconds: prevState.seconds - 1 })),
      1000
    );
  };

  componentDidUpdate() {
    if (this.state.seconds === 1) {
      clearInterval(this.interval);
      this.setState({ timeElapsed: true });
    }

    if (this.firstField && !this.state.codeFormMounted) {
      this.setState({
        firstEditable: true,
        codeFormMounted: true,
      });
      this.firstField.focus();
    }
  }

  componentWillMount() {
    const keyboardWhat = Platform.OS === 'ios' ? 'keyboardWill' : 'keyboardDid';

    this.keyboardWillShowSub = Keyboard.addListener(
      keyboardWhat + 'Show',
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      keyboardWhat + 'Hide',
      this.keyboardWillHide
    );
  }

  keyboardWillShow = event => {
    Animated.timing(this.keyboardHeight, {
      duration: Platform.OS === 'ios' ? event.duration : this.androidEventDuration,
      toValue: event.endCoordinates.height,
    }).start();
  };

  keyboardWillHide = event => {
    Animated.timing(this.keyboardHeight, {
      duration: Platform.OS === 'ios' ? event.duration : this.androidEventDuration,
      toValue: 0,
    }).start();
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  renderPhoneForm = () => (
    <UIWrapper>
      <HintText>
        {strings("passReset.fillPhone")}
      </HintText>

      <FieldWrapper>
        <SingleField
          icon='phoneIcon'
          placeholder={strings("profile.phone")}
          keyboardType='phone-pad'
          onChange={phoneNumber => this.setState({ phoneNumber })}
          error={this.state.errors.serverError}
          maxLength={13}
        />
      </FieldWrapper>

      <ButtonWrapper>
        <Button
          text={strings("passReset.sendCode")}
          onPress={this.sendCode}
        />
      </ButtonWrapper>
    </UIWrapper>
  );

  renderCodeForm = () => {
    var { code, errors, timeElapsed, seconds } = this.state;

    return (
      <UIWrapper>
        <HintText>
          {strings("passReset.fillCode")}
        </HintText>

        <HorizontalFormWrapper>
          <SquareField
            keyboardType='number-pad'
            value={code[0]}
            editable={this.state.firstEditable}
            onChangeText={this.handleFirstFieldChange}
            reference={input => { this.firstField = input }}
            maxLength={1}
          />
          <SquareField
            keyboardType='number-pad'
            value={code[1]}
            editable={this.state.secondEditable}
            onChangeText={this.handleSecondFieldChange}
            onKeyPress={this.handleSecondBackspacePress}
            reference={input => { this.secondField = input }}
            maxLength={1}
          />
          <SquareField
            keyboardType='number-pad'
            value={code[2]}
            editable={this.state.thirdEditable}
            onChangeText={this.handleThirdFieldChange}
            onKeyPress={this.handleThirdBackspacePress}
            reference={input => { this.thirdField = input }}
            maxLength={1}
          />
          <SquareField
            keyboardType='number-pad'
            value={code[3]}
            editable={this.state.fourthEditable}
            onChangeText={this.handleFourthFieldChange}
            onKeyPress={this.handleFourthBackspacePress}
            reference={input => { this.fourthField = input }}
            maxLength={1}
          />
        </HorizontalFormWrapper>

        <ErrorWrapper>
          {errors.serverError !== '' && <ErrorText>{strings("passReset.wrongCode")}</ErrorText>}
        </ErrorWrapper>

        <TimerButtonWrapper>
          {
            timeElapsed
              ? <Button
                  type='primary'
                  text={strings("passReset.sendAgain")}
                  onPress={this.sendCode}
                />
              : <Button
                  type='secondary'
                  disabled
                  text={`${strings("passReset.sendAgain")} 00:` + (seconds.toString().length === 1 ? '0' : '') + seconds}
                />
          }
        </TimerButtonWrapper>
      </UIWrapper>
    );
  };

  renderPasswordForm = () => (
    <UIWrapper>
      <HintText>
        {strings("passReset.createPass")}
      </HintText>

      <FieldWrapper>
        <SingleField
          icon='keyholeIcon'
          placeholder={strings("passReset.newPass")}
          secureTextEntry
          onChange={newPassword => this.setState({ newPassword })}
          error={this.state.errors.passwordError}
        />
      </FieldWrapper>

      <ButtonWrapper>
        <Button
          text={strings("passReset.savePass")}
          onPress={this.submitNewPassword}
        />
      </ButtonWrapper>
    </UIWrapper>
  );

  render() {
    var { phoneEntered, codeEntered } = this.state;

    return (
      <AvoidingContainerWrapper style={[(Platform.OS === 'ios') ? {bottom: this.keyboardHeight} : null]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ContentWrapper>
            <ImageContainer
              flex={4}
              image={logo}
              styleImage={{width:200,height:170}}
            />

            {
              codeEntered
                ? this.renderPasswordForm()
                : phoneEntered
                  ? this.renderCodeForm()
                  : this.renderPhoneForm()
            }
          </ContentWrapper>
        </TouchableWithoutFeedback>
      </AvoidingContainerWrapper>
    );
  }
}


PasswordResetScreen.defaultProps = {};

PasswordResetScreen.navigationOptions = {
  header: null,
};
