import React, { PureComponent } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Platform,
  AsyncStorage
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

import {
  AvoidingContainerWrapper,
  Line,
  ThreeFieldsWrapper,
  AuthUIWrapper,
  ContentWrapper,
} from '../../components';
import {
  RegFormWrapper,
  ButtonWrapper,
} from './components';
import {
  ImageContainer,
  Button,
  AuthField,
  Header,
} from '../../containers';
import {
  FIRST_QUIZ_SCREEN,
  colors,
} from '../../constants';
import logo from '../../../assets/images/logos/logo.png';
import { registerNetworkRequest } from '../../networkers';
import { strings } from "../../../locale/i18n";

type Props = {};

export default class RegistrationScreen extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      password: '',
      passwordConfirm: '',
      errors: {
        phoneNumberError: '',
        passwordError: '',
        serverError: '',
      },
    };

    this.keyboardHeight = new Animated.Value(0);
  }

  validatePhoneNumber = () => {
    const { phoneNumber, errors } = this.state;

    this.setState({
      errors: {
        ...errors,
        phoneNumberError: phoneNumber.length < 11 ? `${strings("registration.wrongNumber")}\n` : '',
      },
    }, this.validatePassword);
  };

  validatePassword = () => {
    const { password, passwordConfirm, errors } = this.state;

    if (password.length < 6) {
      this.setState({
        errors: {
          ...errors,
          passwordError: `${strings("passReset.pasRequired")}\n`,
        },
      }, this.validateRequest);
    } else if (password !== passwordConfirm) {
      this.setState({
        errors: {
          ...errors,
          passwordError: `${strings("registration.passMatch")}\n`,
        },
      }, this.validateRequest);
    } else {
      this.setState({
        errors: {
          ...errors,
          passwordError: '',
        },
      }, this.validateRequest);
    }
  };

  validateRequest = async () => {
    const { errors } = this.state;

    if (!errors.phoneNumberError && !errors.passwordError) {
      const { phoneNumber, password } = this.state;
      const { register } = this.props;
      try {
        const data=await registerNetworkRequest(phoneNumber,password);
        await AsyncStorage.setItem('jwt', data.token);
        this.props.connectSocket();
        this.goToQuiz();
      }catch(err){
        this.setState({
          errors: {
            ...errors,
            serverError: err,
          },
        }, () => showMessage({
          message: err,
          type: 'danger',
          backgroundColor: colors.errorColor,
        }));
      }
    } else {
      showMessage({
        message: (() => {
          let errorMessage = '';
          if (errors.phoneNumberError) {
            errorMessage += errors.phoneNumberError;
          }
          if (errors.passwordError) {
            errorMessage += errors.passwordError;
          }
          return errorMessage.trim();
        })(),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  goToQuiz = () => {
    const { navigation } = this.props;
    const { errors } = this.state;

    if (!errors.phoneNumberError && !errors.passwordError && !errors.serverError) {
      navigation.navigate(FIRST_QUIZ_SCREEN);
    } else {
      showMessage({
        message: (() => {
          let errorMessage = '';
          if (errors.phoneNumberError) {
            errorMessage += errors.phoneNumberError;
          }
          if (errors.passwordError) {
            errorMessage += errors.passwordError;
          }
          if (errors.serverError) {
            errorMessage += errors.serverError;
          }
          return errorMessage;
        })(),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

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

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    Animated.timing(this.keyboardHeight, {
      duration: Platform.OS === 'ios' ? event.duration : 10,
      toValue: event.endCoordinates.height,
    }).start();
  };

  keyboardWillHide = event => {
    Animated.timing(this.keyboardHeight, {
      duration: Platform.OS === 'ios' ? event.duration : 10,
      toValue: 0,
    }).start();
  };

  render() {
    var { errors } = this.state;

    return (
      <AvoidingContainerWrapper style={[(Platform.OS === 'ios') ? {bottom: this.keyboardHeight} : null]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ContentWrapper>
            <Header title={strings("registration.regTitle")} />

            <ImageContainer
              flex={4}
              image={logo}
              styleImage={{width:200,height:170}}
            />

            <AuthUIWrapper>
              <RegFormWrapper>
                <ThreeFieldsWrapper>
                  <AuthField
                    icon='phoneIcon'
                    placeholder={strings("auth.authPhone")}
                    keyboardType='phone-pad'
                    onChange={phoneNumber => this.setState({ phoneNumber })}
                    maxLength={13}
                    error={errors.phoneNumberError ? errors.phoneNumberError : errors.serverError}
                  />
                  <Line />
                  <AuthField
                    icon='keyholeIcon'
                    onChange={password => this.setState({ password })}
                    placeholder={strings("auth.authPass")}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize='none'
                    error={errors.passwordError}
                  />
                  <Line />
                  <AuthField
                    icon='keyholeIcon'
                    onChange={passwordConfirm => this.setState({ passwordConfirm })}
                    placeholder={strings("registration.submitPass")}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize='none'
                    error={errors.passwordError}
                  />
                </ThreeFieldsWrapper>
              </RegFormWrapper>

              <ButtonWrapper>
                <Button
                  type='primary'
                  text='Далее'
                  onPress={this.validatePhoneNumber}
                />
              </ButtonWrapper>
            </AuthUIWrapper>
          </ContentWrapper>
        </TouchableWithoutFeedback>
      </AvoidingContainerWrapper>
    );
  }
}


RegistrationScreen.defaultProps = {};

RegistrationScreen.navigationOptions = {
  header: null,
};
