import React, { PureComponent } from 'react';
import {
  TouchableWithoutFeedback, Keyboard, Animated, Platform, AsyncStorage,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

import {
  AvoidingContainerWrapper,
  Line,
  TwoFieldsWrapper,
  AuthUIWrapper,
  ContentWrapper,
} from '../../components';
import { LoginFormWrapper, ButtonsWrapper } from './components';
import {
  ImageContainer, Button, TextButton, AuthField,
} from '../../containers';
import {
  SECOND_QUIZ_SCREEN,
  RESET_PASSWORD_SCREEN,
  REGISTRATION_SCREEN,
  colors,
  PROFILE_SCREEN,
} from '../../constants';
import logo from '../../../assets/images/logos/logo.png';
import { logInNetworkRequest } from '../../networkers';
import { connectSocket } from '../../actions';
import { strings } from "../../../locale/i18n";

type Props = {};

export default class AuthenticationScreen extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      phoneNumber: '',
      password: '',
      errors: {
        serverError: '',
      },
      quizDone: null,
    };

    this.keyboardHeight = new Animated.Value(0);
  }

  async componentDidMount(){
    const {navigation}=this.props;
    if (await AsyncStorage.getItem('jwt')) {
      this.props.connectSocket();
     //if(await AsyncStorage.getItem('quizDone')){
        navigation.navigate(PROFILE_SCREEN);
      //} else {
      //  navigation.navigate(SECOND_QUIZ_SCREEN);
      //}
    }
  }


  validateRequest = async () => {
    const { phoneNumber, password } = this.state;
    const { errors } = this.props;
  
    try{
      const data = await logInNetworkRequest(phoneNumber, password);
      await AsyncStorage.setItem('jwt', data.token);
      if(data.quizDone){
        this.setState({quizDone:data.quizDone})
      }
      this.props.connectSocket();
      this.goToMainScreen()
    }catch(err) {
      this.setState(
        {
          errors: {
            ...errors,
            serverError: err,
          },
        },
        () => showMessage({
          message: err,
          type: 'danger',
          backgroundColor: colors.errorColor,
        })
      );
    }
  };

  goToMainScreen = async () => {
    const { navigation } = this.props;
    const { quizDone } = this.state;

    if (quizDone) {
      navigation.navigate(PROFILE_SCREEN);
    } else {
      navigation.navigate(SECOND_QUIZ_SCREEN);
    }
  };

  changePassword = async () => {
    const { navigation } = this.props;
    navigation.navigate(RESET_PASSWORD_SCREEN);
  };

  signUp = async () => {
    const { navigation } = this.props;
    navigation.navigate(REGISTRATION_SCREEN);
  };

  componentWillMount() {
    const { navigation } = this.props;
    const keyboardWhat = Platform.OS === 'ios' ? 'keyboardWill' : 'keyboardDid';

    this.keyboardWillShowSub = Keyboard.addListener(`${keyboardWhat}Show`, this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener(`${keyboardWhat}Hide`, this.keyboardWillHide);
  }

  componentWillUnmount() {
    if (this.keyboardWillShowSub) {
      this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
    }
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.keyboardHeight, {
      duration: Platform.OS === 'ios' ? event.duration : 10,
      toValue: event.endCoordinates.height,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.keyboardHeight, {
      duration: Platform.OS === 'ios' ? event.duration : 10,
      toValue: 0,
    }).start();
  };

  render() {
    const { errors } = this.state;

    return (
      <AvoidingContainerWrapper style={[(Platform.OS === 'ios') ? {bottom: this.keyboardHeight} : null]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ContentWrapper>
            <ImageContainer flex={4} image={logo} styleImage={{width:200,height:170}} />

            <AuthUIWrapper>
              <LoginFormWrapper>
                <TwoFieldsWrapper>
                  <AuthField
                    icon="phoneIcon"
                    placeholder={strings("auth.authPhone")}
                    keyboardType="phone-pad"
                    onChange={phoneNumber => this.setState({ phoneNumber })}
                    error={errors.serverError}
                    maxLength={13}
                  />
                  <Line />
                  <AuthField
                    icon="keyholeIcon"
                    onChange={password => this.setState({ password })}
                    placeholder={strings("auth.authPass")}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize="none"
                    error={errors.serverError}
                  />
                </TwoFieldsWrapper>
              </LoginFormWrapper>

              <ButtonsWrapper>
                <Button type="primary" text={strings("auth.authBtn")} onPress={this.validateRequest} />

                <TextButton
                  location="center"
                  textColor={colors.greyButtonColor}
                  buttonText="Забыли пароль?"
                  onPress={this.changePassword}
                />
                <TextButton
                  location="flex-end"
                  textColor={colors.colorPrimary}
                  buttonText={strings("auth.authReg")}
                  onPress={this.signUp}
                />
              </ButtonsWrapper>
            </AuthUIWrapper>
          </ContentWrapper>
        </TouchableWithoutFeedback>
      </AvoidingContainerWrapper>
    );
  }
}

AuthenticationScreen.defaultProps = {};

AuthenticationScreen.navigationOptions = {
  header: null,
};
