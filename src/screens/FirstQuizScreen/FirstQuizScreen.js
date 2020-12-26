import React, { PureComponent } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Platform,
  BackHandler,
  AsyncStorage,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import ActionSheet from 'react-native-actionsheet';
import { scale } from 'react-native-size-matters';
import { showMessage } from 'react-native-flash-message';

import {
  ContainerWrapper,
  ContentWrapper,
  ScrollContentWrapper,
  PlaceholderText,
  AvoidingView,
  ErrorText,
} from '../../components';
import { ButtonWrapper } from './components';
import {
  Button, Header, AddButton, ExclamationError, ExtraField,
} from '../../containers';
import { QuizField, BigField, ModalAgreements } from './containers';
import {
  SECOND_QUIZ_SCREEN,
  AUTHENTICATION_STACK,
  PROFILE_STACK,
  cities,
  countries,
  languages,
  emailRegex,
  colors,
  timezones,
  PROFILE_SCREEN,
} from '../../constants';

import { strings } from "../../../locale/i18n";

export default class FirstQuizScreen extends PureComponent {
  constructor(props) {
    super(props);

    const { quiz, userID } = this.props;
    this.state = {
      quiz: !quiz
        ? {
          activityStartDate: new Date(),
          sex: strings("firstQuiz.sex"),
          avatar: null,
          birthDay: new Date(),
        }
        : {
          firstName: quiz.firstName,
          lastName: quiz.lastName,
          patronymic: quiz.middleName,
          sex: quiz.gender,
          birthDay: quiz.birthDay,
          email: quiz.email,
          country: quiz.country,
          city: quiz.city,
          timezone: quiz.timezone,
          language: quiz.language,
          personalInfo: quiz.aboutMe,
        },
      userID,
      hasCameraPermission: null,
      hasCameraRollPermission: null,
      errors: {},
      visible: false,
      disabled: false,
      editingMode: !!quiz,
    };

    this.keyboardHeight = new Animated.Value(0);
    this.androidEventDuration = 10;

    this.quizFields = [
      {
        type: 'text',
        name: 'lastName',
        placeholder: strings("firstQuiz.lastName"),
      },
      {
        type: 'text',
        name: 'firstName',
        placeholder: strings("firstQuiz.firstName"),
      },
      {
        type: 'text',
        name: 'patronymic',
        placeholder: strings("firstQuiz.middleName"),
      },
      {
        type: 'radio',
        name: 'sex',
        placeholder: strings("firstQuiz.gender"),
      },
      {
        type: 'datePicker',
        name: 'birthDay',
        placeholder: strings("firstQuiz.birthDay"),
      },
      {
        type: 'email',
        name: 'email',
        placeholder: strings("firstQuiz.email"),
      },
      {
        type: 'list',
        name: 'country',
        placeholder: strings("firstQuiz.country"),
        options: countries,
      },
      {
        type: 'empty',
        name: 'city',
        placeholder: strings("firstQuiz.city"),
      },
      {
        type: 'list',
        name: 'timezone',
        placeholder: strings("firstQuiz.timeZone"),
        options: timezones,
      },
      {
        type: 'list',
        name: 'language',
        placeholder: strings("firstQuiz.language"),
        options: languages,
      },
    ];
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { errors } = this.state;
    if (nextProps.fetching) {
      return;
    }

    if (nextProps.errors) {
      this.setState(
        {
          errors: {
            ...errors,
            serverError: nextProps.errors,
          },
        },
        () => showMessage({
          message: nextProps.errors,
          type: 'danger',
          backgroundColor: colors.errorColor,
        })
      );
    } else {
      this.setState(
        {
          errors: {
            ...errors,
            serverError: null,
          },
        },
        this.goToSecondQuiz
      );
    }
  }

  onQuizFieldChange = (fieldName, newValue) => {
    const { quiz } = this.state;

    this.setState({
      quiz: {
        ...quiz,
        city: fieldName === 'country' ? '' : quiz.city,
        [fieldName]: newValue,
      },
    });
  };

  goToAgreements = async () => {
    const { quiz } = this.state;
    const {
      lastName, firstName, email, country, city, language, personalTherapyHours,
    } = quiz;

    const fields = ['lastName', 'firstName', 'email', 'country', 'city', 'language'];

    for (let i = 0; i < fields.length; i++) {
      if (!quiz[fields[i]]) {
        this.setState({ errors: { ...this.state.errors, [fields[i]]: strings("firstQuiz.required") } });
      } else if (this.state.errors[fields[i]]) {
        var { errors } = this.state;
        delete errors[fields[i]];
        this.setState({errors});
      }
    }

    if (email) {
      if (!emailRegex.test(email)) {
        await this.setState({ errors: { ...this.state.errors, email: strings("firstQuiz.wrongMail") } });
      } else {
        var { errors } = this.state;
        delete errors.email;
        await this.setState(errors);
      }
    }

    var { errors } = this.state;

    if (!Object.keys(errors).length) {
      this.setState({ visible: true });
    } else {
      showMessage({
        message: (() => {
          let errorMessage = '';
          if (errors) {
            if (errors.email === strings("firstQuiz.wrongMail")) {
              errorMessage += `${strings("firstQuiz.wrongData")}\n`;
            }

            if (errors.serverError) {
              errorMessage += `${errors.serverError}`;
            } else {
              errorMessage += strings("firstQuiz.fillRequired");
            }
          }

          return errorMessage.trim();
        })(),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });

      this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  submitQuiz = async () => {
    const { submitQuiz } = this.props;
    const { quiz } = this.state;
    const { avatar } = quiz;

    const fullQuiz = new FormData();
    if (avatar) {
      fullQuiz.append('avatar', {
        uri: avatar,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      });
    }
    fullQuiz.append('quiz', JSON.stringify(quiz));
    await submitQuiz(fullQuiz);
    this.setState({
      visible: false,
      disabled: true,
    });
  };

  goToSecondQuiz = () => {
    const { navigation } = this.props;
    const { editingMode } = this.state;

    if (editingMode) {
      navigation.navigate(AUTHENTICATION_STACK);
      navigation.navigate(PROFILE_STACK);
      navigation.closeDrawer();
    } else {
      navigation.navigate(SECOND_QUIZ_SCREEN);
    }
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillMount() {
    const keyboardWhat = Platform.OS === 'ios' ? 'keyboardWill' : 'keyboardDid';

    this.keyboardWillShowSub = Keyboard.addListener(`${keyboardWhat}Show`, this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener(`${keyboardWhat}Hide`, this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => true;

  keyboardWillShow = (event) => {
    Animated.timing(this.keyboardHeight, {
      duration: Platform.OS === 'ios' ? event.duration : this.androidEventDuration,
      toValue: event.endCoordinates.height,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.keyboardHeight, {
      duration: Platform.OS === 'ios' ? event.duration : this.androidEventDuration,
      toValue: 0,
    }).start();
  };

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _requestCameraRollPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({
      hasCameraRollPermission: status === 'granted',
    });
  };

  pickPhoto = async () => {
    await this._requestCameraRollPermission();
    const { hasCameraRollPermission } = this.state;
    if (hasCameraRollPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [9, 16],
      });

      if (!result.cancelled) {
        this.setState({ quiz: { ...this.state.quiz, avatar: result.uri } });
      }
    }
  };

  takePhoto = async () => {
    await this._requestCameraPermission();
    await this._requestCameraRollPermission();
    const { hasCameraPermission, hasCameraRollPermission } = this.state;
    if (hasCameraPermission && hasCameraRollPermission) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [9, 16],
      });

      if (!result.cancelled) {
        this.setState({ quiz: { ...this.state.quiz, avatar: result.uri } });
      }
    }
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  onBackPress = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  render() {
    const {
      quiz, errors, disabled, userID,
    } = this.state;

    if (quiz.country) {
      this.quizFields[7].type = 'list';
      this.quizFields[7].options = cities[quiz.country];
    }

    return (
      <ContainerWrapper>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ContentWrapper>
            <Header
              title={strings("firstQuiz.firstQuizTitle")}
              leftText={strings("consultation.back")}
              onLeftPress={this.onBackPress}
            />

            <ScrollContentWrapper
              ref={ref => (this.scroll = ref)}
              contentContainerStyle={{ alignItems: 'center' }}
            >
              <AddButton
                type="big"
                text={strings("firstQuiz.addPhoto")}
                icon="cameraIcon"
                onPress={this.showActionSheet}
                image={quiz.avatar}
                userID={userID}
              />
              <ActionSheet
                ref={ref => (this.ActionSheet = ref)}
                title={strings("firstQuiz.addPhoto")}
                options={
                  [
                    strings("firstQuiz.makePhoto"),
                    strings("firstQuiz.choosePhoto"),
                    strings("firstQuiz.cancel"),
                  ]
                }
                cancelButtonIndex={2}
                onPress={(index) => {
                  switch (index) {
                  case 0:
                    return this.takePhoto();
                  case 1:
                    return this.pickPhoto();
                  default:
                  }
                }}
              />

              <ErrorText>{strings("firstQuiz.required1")}</ErrorText>

              {this.quizFields.map(({
                type, name, placeholder, options,
              }, idx) => (
                <QuizField
                  key={idx}
                  type={type}
                  options={options}
                  value={this.state.quiz[name]}
                  placeholder={placeholder}
                  onChange={newValue => this.onQuizFieldChange(name, newValue)}
                  error={errors[name]}
                />
              ))}

              <BigField
                placeholder={strings("firstQuiz.about")}
                value={quiz.personalInfo}
                onChange={value => this.onQuizFieldChange('personalInfo', value)}
              />

              <ButtonWrapper>
                <Button
                  type="primary"
                  disabled={disabled}
                  text={strings("secondQuiz.save")}
                  onPress={this.submitQuiz}
                  style={{ width: scale(315) }}
                />
              </ButtonWrapper>

              {/* <ModalAgreements
                visible={this.state.visible}
                onCancel={() => this.setState({ visible: false })}
                onButtonPress={this.submitQuiz}
              /> */}

              <AvoidingView style={{ height: this.keyboardHeight }} />
            </ScrollContentWrapper>
          </ContentWrapper>
        </TouchableWithoutFeedback>
      </ContainerWrapper>
    );
  }
}

FirstQuizScreen.defaultProps = {};

FirstQuizScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false,
};
